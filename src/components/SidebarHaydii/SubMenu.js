import React, { useState } from "react";
import styled from "styled-components/macro";
import { withRouter, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

const SidebarLink = styled(Link)`
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0px 18px 18px;
  height: 45px;
  text-decoration: none;
  // font-size: 16.5px;
  background: ${({ sidebarActive }) => (sidebarActive ? "#bb2649" : "#FFFFFF")};
  border-left: ${({ sidebarActive }) => (sidebarActive ? "3px solid #6e011b" : "3px solid #FFFFFF")};

  /* &:hover {
        background: #EB7D35;
        color: white;
        cursor: pointer;
    } */
`;
const SidebarLabel = styled.span`
  margin-left: 16px;
  /* color: #fffff; */

  &:hover {
    color: #bb2649;
  }
`;

const DropdownLink = styled(Link)`
  /* background: #414757; */
  height: 45px;
  padding-left: 2rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  // font-size: 18px;
  background: ${({ sidebarActive }) => (sidebarActive ? "#bb2649" : "#FFFFFF")};
  border-left: ${({ sidebarActive }) => (sidebarActive ? "3px solid #ad032b" : "3px solid #FFFFFF")};

  &:hover {
    /* background: #EB7D35; */
    color: transparent;
    cursor: pointer;
  }
`;

const IconLabel = styled.div`
  width: 100%;
  border-radius: 1.5px;
  // color: grey;
  color: ${({ sidebarActive }) => (sidebarActive ? "#fff" : "grey")};

  &:hover {
    ${"" /* border-right: 2.5px solid #EB7D35; */}
    cursor: pointer;
  }

  /* &:visited {
        color: #EB7D35;
    } */
`;

const SidebarIcon = styled.span`
  /* color: #fffff; */

  &:hover {
    // color: #eb7d35;
    color: #fff;
  }
`;

const SubMenu = ({ userData, item, history, sidebar, setSidebar }) => {
  console.log("item".item);

  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  const showSidebar = () => setSidebar(!sidebar);

  console.log("history.location.pathname", history.location.pathname);
  const sidePathname = history.location.pathname.split("/")[2];
  console.log("sidePathname", sidePathname);

  console.log(history.location.pathname);
  console.log(item.path);
  return (
    <>
      <SidebarLink
        sidebarActive={history.location.pathname == item.path || sidePathname == item.path.split("/")[2] ? true : false}
        to={item.path}
        // onClick={() => {
        //     history.push(item.path)
        // }}
        onClick={(item.subNav && showSubnav) || (!sidebar ? showSidebar : "")}
        // style={{ borderRight: history.location.pathname == item.path ? "2px solid #D90066" : "" }}
      >
        <IconLabel
          sidebarActive={history.location.pathname == item.path || sidePathname == item.path.split("/")[2] ? true : false}

          // style={{ color: history.location.pathname == item.path ? "#fff" : "black" }}
        >
          {/* {item.icon} */}

          <SidebarIcon>{item.icon}</SidebarIcon>
          <SidebarLabel
            style={{
              color: history.location.pathname == item.path ? "#fff " : "",
              fontWeight: history.location.pathname == item.path ? "600" : "",
            }}
          >
            {item.title}
          </SidebarLabel>
        </IconLabel>
        <div>{item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null}</div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink
              to={item.path}
              sidebarActive={history.location.pathname == item.path || sidePathname == item.path.split("/")[2] ? true : false}
              key={index}
            >
              <IconLabel style={{ color: history.location.pathname == item.path ? "#fff" : "" }}>
                {/* {item.icon} */}
                {item.icon}
                <SidebarLabel
                  style={{
                    color: history.location.pathname == item.path ? "#fff" : "",
                    fontWeight: history.location.pathname == item.path ? "500" : "",
                  }}
                >
                  {item.title}
                </SidebarLabel>
              </IconLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    locationData: state.locations,
    defaultState: state.defaultState,
    sidebar: state.sidebar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (updatedValue) => {
      dispatch({
        type: actionTypes.UPDATE_USER,
        updatedUser: updatedValue,
      });
    },
    setDefaultState: (updatedValue) => {
      dispatch({
        type: actionTypes.UPDATE_DEFAULT,
        updateDefault: updatedValue,
      });
    },
    setSidebar: (updatedValue) => {
      dispatch({
        type: actionTypes.UPDATE_SIDEBAR,
        updateSidebar: updatedValue,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SubMenu));
