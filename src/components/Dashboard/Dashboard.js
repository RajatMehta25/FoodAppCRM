import React, { useState, useEffect } from "react";
import {
  DashboardContainer,
  DashboardWrapper,
  DashboardHeading,
  DashCard,
  DashContent,
  DashContainerCard,
  DashContentCard,
  DashContainerCardIcon,
  DashContainerCardContent,
  DashContainerCardContentTotal,
  DashContainerCardContentNumber,
  DashContainerCardContentOrder,
  DashIcon,
  DashHeading,
} from "./DashboardElement";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FileInput from "../FileInput";
import Input from "../Input";
import { uploadImage } from "../../utils/functions";
import axios from "../../axios";
import Overlay from "../Overlay";
import { get } from "lodash";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import cancel from "../../images/cancelled.png";
import profileIcon from "../../images/lady.png";
import completeOrder from "../../images/completed.png";
import ongoing from "../../images/ongoing.png";
import total from "../../images/completed-1.png";
import totalrevenue from "../../images/revenue.png";
import moment from "moment";
import { Field, Form } from "formik";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Dashboard.css";

import { menuValidator, dishValidator } from "../../utils/validators";

const useStyles = makeStyles((theme) => ({
  textMiddle: {
    verticalAlign: "middle !important",
    textAlign: "center",
  },
  tablePadding: {
    padding: "0.5rem",
    textAlign: "center",
    fontSize: "0.8rem",
  },
  // paperHeight: {
  //     height: "auto",
  //     width: "auto",
  //     marginLeft: "2rem",
  //     padding: "10px 15px",
  //     marginBottom: '30px'
  // },
  "@media (max-width: 780px)": {
    paperHeight: {
      marginLeft: "0.75rem",
    },
  },
  "@media (max-width: 480px)": {
    paperHeight: {
      marginLeft: "0.75rem",
    },
  },
  tablePaginationStyle: {
    border: "1px solid #0000001a",
    borderRadius: "0rem 0rem 0.4rem 0.4rem",
  },
  tableFlex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  contentHeight: {
    fontSize: "1rem",
  },
  displayFlex: {
    height: "auto",
    width: "95%",
    marginLeft: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0px",
  },
}));

const Dashboard = ({ history, userData }) => {
  console.log("userData", userData);
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userData) {
      console.log("bie", "bie");
      history.push("/adminPanel");
    }
  }, []);

  const [tableData, setTableData] = useState([]);

  // Date Convert

  // let dates = new Date();

  // console.log(dates)

  // let convetDate = moment(dates).utc().format('YYYY/MM/DD')

  // let dailys = dates.setDate(dates.getDate() - 2);
  // let converToDay = moment(dailys).utc().format('YYYY/MM/DD');

  // let makeDate = dates.setMonth(dates.getMonth() - 1);
  // let converToMonth = moment(makeDate).utc().format('YYYY/MM/DD');

  // let makeYear = dates.setYear(dates.getFullYear() - 1);
  // let converToYear = moment(makeYear).utc().format('YYYY/MM/DD');

  // console.log(convetDate)
  // console.log(converToDay)
  // console.log(converToMonth)
  // console.log(converToYear)

  const reports = [
    // { icon: profileIcon, title: "Total User", value: tableData.cancelOrder },
    { icon: profileIcon, title: "Total Count", value: tableData.completedOrder },
    { icon: profileIcon, title: "Total count", value: tableData.ongoingOrder },
    { icon: profileIcon, title: "Total Count", value: tableData.ongoingOrder },
  ];

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  console.log(moment(startDate).format("L"));
  console.log(moment(endDate).format("L"));

  const SDate = moment(startDate).format("L");
  const EDate = moment(endDate).format("L");

  // console.log(SDate+" "+EDate)

  const getCategory = async () => {
    try {
      // if (startDate) {
      // const { data } = await axios.get(`/superMarket/get_Dashboard?dateObject="from":"${moment(startDate).format('L')}","to":"${moment(endDate).format('L')}"}`);
      // const { data } = await axios.get(`/superMarket/get_Dashboard?dateObject="{"from":"03/01/2022","to":"03/09/2022"}"}`);
      // const { data } = await axios.get(`/superMarket/get_Dashboard?dateObject={"from":"${moment(startDate).format('L')}","to":"${moment(endDate).format('L')}"}`);
      // setTableData(data.data);
      // console.log(data.data)
      // }
      // else {
      //     const { data } = await axios.get("/superMarket/get_Dashboard");
      //     setTableData(data.data);
      //     console.log(data.data)
      // }
    } catch (error) {
      console.log(error);
    }
  };
  {
    console.log(userData);
  }
  return (
    <>
      <div>
        <DashboardContainer>
          <DashboardWrapper>
            <DashboardHeading>
              <DashHeading>Dashboard</DashHeading>
              {/* <div style={{ display: 'flex', alignItems: 'center', width: 'auto', marginRight: '2rem' }}>
                                <label style={{ color: 'black', marginRight: '0.5rem' }}>From</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => {
                                        setStartDate(date);
                                        getCategory();
                                    }}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    className="dateInput"
                                    placeholderText="Start Date"
                                />
                                <label style={{ color: 'black', marginRight: '0.5rem', marginLeft: '0.5rem' }}>To</label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => {
                                        setEndDate(date);
                                        getCategory();
                                    }}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    className="dateInput"
                                    placeholderText="End Date"
                                />
                            </div> */}
            </DashboardHeading>

            <DashContainerCard>
              {reports.map((val, ind) => {
                return (
                  <DashContentCard key={ind}>
                    <DashContainerCardIcon>
                      <DashIcon src={val.icon} />
                    </DashContainerCardIcon>
                    <DashContainerCardContent>
                      <DashContainerCardContentOrder>{val.title}</DashContainerCardContentOrder>
                      <DashContainerCardContentNumber>{val.value}</DashContainerCardContentNumber>
                    </DashContainerCardContent>
                  </DashContentCard>
                );
              })}

              {/* <DashContentCard>
                                <DashContainerCardIcon style={{ backgroundColor: '#0E388E' }}><DashIcon src={cancel} /></DashContainerCardIcon>
                                <DashContainerCardContent>
                                    <DashContainerCardContentOrder>Cancel Order</DashContainerCardContentOrder>
                                    <DashContainerCardContentNumber>100</DashContainerCardContentNumber>
                                </DashContainerCardContent>
                            </DashContentCard> */}
            </DashContainerCard>
          </DashboardWrapper>
        </DashboardContainer>
      </div>
      {isLoading && <Overlay />}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));
