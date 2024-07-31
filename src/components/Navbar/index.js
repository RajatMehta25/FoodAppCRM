import React, { useState, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
  LoginTitle,
  LoginCenter,
  LoginAnchor,
  SvgLogo,
  NavIcon,
  SidebarMobileIcon,
} from "./NavbarElements";
import logoLogin from "../../images/logo.svg";
import logoWlogin from "../../images/savypackLogoWhite.png";
import "react-phone-input-2/lib/style.css";
import Overlay from "../Overlay";
import SidebarOverlay from "../SidebarOverlay";
import { withRouter, NavLink } from "react-router-dom";
import Menu from "../Menu";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import * as GrIcons from "react-icons/gr";
import Switch from "../Switch/Switch";
import { get } from "lodash";
import axios from "../../axios";
import { toast } from "react-toastify";

import lgIcon from "../../images/languageWhite.png";
import notificationIcon from "../../images/notificationWhite.png";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  loginObjOne,
  signUpObjOne,
  forgotObjOne,
  resetObjOne,
  restaurantDetailsObjOne,
  bankDetailsObjOne,
  verifyOtpObjOne,
  pendingApprovalObjOne,
} from "../LoginSection/Data";

const Navbar = (props) => {
  const { userData, toggle, history, sidebar, setSidebar, setUsers } = props;

  const [scrollNav, setScrollNav] = useState(false);
  const [bgLogin, setBgLogin] = useState(false);
  const [logoColor, setLogoColor] = useState(logoWlogin);
  const [defaultState, setDefaultState] = useState({
    isLogin: "",
    isSignup: "",
    isForget: "",
    isOtp: "",
    isReset: "",
    isProfileUpdate: "",
    isApproved: "",
    isRejected: "",
    isProfileComplete: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSidebarBackground, setIsLoadingSidebarBackground] = useState(false);
  const [isToggled, setIsToggled] = useState(get(userData, "restaurant_on", false));

  const showSidebar = () => setSidebar(!sidebar);
  const showBackOverlay = () => setIsLoadingSidebarBackground(!isLoadingSidebarBackground);

  console.log("userData", userData);

  const handleConfirm = async () => {
    // let modal = { ...modalData };
    if (window.confirm("Are you sure you want to Logout?")) {
      try {
        const { data } = await axios.post(`/admin/logout`);
      } catch (error) {
        console.log(error);
      }
      setUsers("");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
      localStorage.removeItem("order_data");
      // setUsers("");
      history.push("/adminPanel");
      setDefaultState(loginObjOne);
      history.go("0");
    } else {
    }
    // setDailogType("");
    // modal.type = "success";

    // setUsers(null);
    // modal.isOpen = false;
    // setModalData(modal);
  };

  const handleRestaurantOnOff = async (values) => {
    console.log(isToggled);
    let formvalues = {
      restaurant_on: isToggled == false ? 1 : 0,
    };

    // console.log(formvalues);
    try {
      const { data } = await axios.post("/restaurant/restaurant_on_off", formvalues);
      toast.success(`${data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      localStorage.setItem("accessToken", data.data.accessToken || data.data.access_token);
      localStorage.setItem("userData", JSON.stringify(data.data));
      localStorage.setItem("isUser", true);
      setUsers(data.data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (error.response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
        //window.location.pathname = "/";
      }
    }
  };

  // console.log(isToggled)

  const loginBox = (
    <>
      {!userData ? (
        <>
          <NavBtn>
            <NavBtnLink
              to="/adminPanel"
              primary="true"
              onClick={() => {
                setDefaultState({
                  isSignup: false,
                  isLogin: true,
                });
              }}
            >
              Login
            </NavBtnLink>

            <NavBtnLink
              to="/adminPanel"
              onClick={() => {
                setDefaultState({
                  isSignup: true,
                  isLogin: false,
                });
              }}
            >
              Create Account
            </NavBtnLink>
          </NavBtn>
        </>
      ) : (
        <>
          {userData.is_profile_completed == true && userData.is_approved_by_admin == "1" ? (
            <>
              <Menu userIcon={logoLogin} name="qwerfd">
                <div className="user_content">
                  <ul>
                    <li>
                      <NavLink to="/profile-details">
                        my_account
                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                      </NavLink>
                    </li>
                    <li>
                      <a
                        href="javascript:void()"
                        // onClick={handleLogout}
                      >
                        logout
                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </Menu>
            </>
          ) : (
            <>
              <NavBtn>
                <NavBtnLink
                  to="/restaurant"
                  primary="true"
                  onClick={() => {
                    if (userData.is_profile_completed == false) {
                      setDefaultState({
                        isSignup: false,
                        isLogin: false,
                        isProfileComplete: true,
                      });
                    } else {
                      if (userData.is_approved_by_admin == "0") {
                        setDefaultState({
                          isSignup: false,
                          isLogin: false,
                          isApproved: true,
                        });
                      } else if (userData.is_approved_by_admin == "2") {
                        setDefaultState({
                          isSignup: false,
                          isLogin: false,
                          isRejected: true,
                        });
                      }
                    }
                  }}
                >
                  Check Status
                </NavBtnLink>
                <NavBtnLink
                // onClick={handleLogout}
                >
                  Logout
                </NavBtnLink>
              </NavBtn>
            </>
          )}
        </>
      )}
    </>
  );

  const leftBox = (
    <>
      <NavMenu>
        {/* <NavItem>
          <NavLinks to="">
            <SvgLogo className="logoImage" src={notificationIcon} />
          </NavLinks>
        </NavItem> */}
        <Dropdown className="m-3 changeFocusofDropDown">
          <Dropdown.Toggle variant="" style={{ color: "white", fontSize: "1rem" }} id="dropdown-basic" >
            {userData?.email}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/adminPanel/change-password">Change Password</Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleConfirm}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <NavItem>
          {/* <NavLinks to="">
            <RiIcons.RiShutDownLine style={{ fontSize: "2em" }} onClick={handleConfirm} />
          </NavLinks> */}
        </NavItem>
      </NavMenu>
    </>
  );

  return (
    <>
      <IconContext.Provider value={{ color: "#ffffff" }}>
        <Nav scrollNav={scrollNav} bgLogin={bgLogin}>
          <NavbarContainer>
            <NavLogo to="/adminPanel/dashboard">
              <SvgLogo className="logoImage" style={{ width: "165px" }} src={logoColor} />
              {/*<img className="logoImage" src={logo} alt="logo" />*/}
              {/* <SidebarMobileIcon>
                <NavIcon to="#">
                  <FaIcons.FaBars
                    onClick={() => {
                      showBackOverlay();
                      showSidebar();
                    }}
                  />
                </NavIcon>
              </SidebarMobileIcon> */}
            </NavLogo>
            {/* <MobileIcon onClick={toggle}> */}
            <MobileIcon
              onClick={() => {
                showBackOverlay();
                showSidebar();
              }}
            >
              <FaBars />
            </MobileIcon>
            {leftBox}
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
      {isLoading && <Overlay />}
      {!sidebar ? <SidebarOverlay /> : ""}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
