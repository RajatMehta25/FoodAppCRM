import React, { useEffect, useState } from "react";
// import { Container, Row, Col } from "reactstrap";
// import axios from "../../axios";
import axios from "../../axios";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
// import Label from 'reactstrap/lib/Label';
import { Formik, Field, Form } from "formik";
// import './Notification.scss'
import Checkbox from "@material-ui/core/Checkbox";
import { Radio, TextareaAutosize, TextField } from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
import { toast } from "react-toastify";
import Select from "../../components/Select";
import { FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import { withRouter } from 'react-router-dom';
import { get, isEmpty } from "lodash";

import SearchBar from "material-ui-search-bar";
import {
  DashboardContainer,
  DashboardWrapper,
  DashboardHeading,
  DashHeading,
  SvgLogo,
  BackIcon,
  MenuAndBack,
  PreperationTime,
  LabelHeading,
  RetaurantDetailsForm,
  InputDivide,
  MiddleColumnProfile,
  InputPic,
  HeadingBlock,
  HeadingProfile,
  HeadingPara,
  MultipleButtons,
  TripleButton,
  MultipleButton,
  VoucherHeading,
  VoucherHeadingMain,
  FullWidthMobileInput,
  OfferRadioSection,
  OfferSectionLabel,
  MobileViewCalender,
  HeadingButton,
  LoginButton,
  ApproveButton,
  DisapproveButton,
  AgentApprove,
  NotificationButton
} from "../UserManagement/UserElements";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Tooltip,
  Button,
} from "@material-ui/core";
import Input from "../../components/Input";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    marginTop: "5rem",
    // verticalAlign: 'scroll'
  },
  tablePad: {
    padding: "20px 30px",
    lineHeight: "50px",
    // width: "60%",
  },
  textS: {
    fontSize: "1.2rem",
    color: "#525f7f",
    marginBottom: "-0.2rem",
  },
  textA: {
    display: "flex",
    flexDirection: "column",
    marginTop: "0.5rem",
  },
  btnSize: {
    fontSize: "1.1rem",
  },
  topM: {
    marginTop: "8rem",
    marginBottom: "2rem",
  },
  paperTableHeight: {
    height: "auto",
    width: "100%",
    padding: "10px 30px",
  },
  container: {
    marginTop: "2rem",
  },
  textMiddle: {
    margin: "auto",
    textAlign: "center",
  },
  // searchHeight: {
  //     // width: '50%',
  //     margin: 'auto'
  // },
  searchBox: {
    display: "flex",
    // backgroundColor: 'pink',
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 20px",
  },
  textSizes: {
    textAlign: "center",
    fontSize: "0.9rem",
  },
  //   checkSize: {
  //       height: '10px',
  //       width: '10px'
  //   }
 
}));

const OfferManagement = ({ history, userData }) => {
  const classes = useStyles();

  // For Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (!userData) {
        history.push("/adminPanel")
    }
}, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [titleError, setTitleError] = useState("");
  const [messageError, setMessageError] = useState("");
  const[selectError,setSelectError]=useState("")
  const [defaultState, setDefaultState] = useState({ individual: false });
  const [selectUserType, setSelectUserType] = useState("USER");
  const [selectDeviceType, setSelectDeviceType] = useState("");
  const [individualType, setIndividualType] = useState(false);
  

  // For Search
  const [searched, setSearched] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  const requestSearch = (searchedVal) => {
    // console.log(searchedVal);
    const filteredRows = searchedData.filter((row) => {
      // console.log(searchedVal);
      //   console.log(row);
      let name=row.firstName+" "+row.lastName;
      let id= row.sequenceId;
      let email=row.email;
      let phone = row.countryCode+" "+row.mobileNumber;
      return (
        name.toLowerCase().includes(searchedVal.toLowerCase()) ||
        id.toLowerCase().includes(searchedVal.toLowerCase()) ||
        email.toLowerCase().includes(searchedVal.toLowerCase()) ||
        phone.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setUsers(filteredRows);
  };

  const getUsers = async (type = "USER") => {
    if(type==="USER"){
    try {
      const { data } = await axios.get(`/admin/listUsers`);
      setUsers(data.data);
      setSearchedData(data.data);
      console.log(data.data);
    } catch (error) {
      setUsers("");
      console.log(error);
    }
  }else if(type==="AGENT"){
    try {
      const { data } = await axios.get(`/admin/listAgents`);
      setUsers(data.data);
      setSearchedData(data.data);
      console.log(data.data);
    } catch (error) {
      setUsers("");
      console.log(error);
    }
  }else if(type==="MERCHANT"){
    try {
      const { data } = await axios.get(`/admin/listmerchants?approvalStatus=approved`);
      setUsers(data.data);
      setSearchedData(data.data);
      console.log(data.data);
    } catch (error) {
      setUsers("");
      console.log(error);
    }
  }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const cancelSearch = () => {
    setSearched("");
    getUsers();
  };

  // console.log(checkId.map((val) => val.id));

  const Submit = async (e) => {
    e.preventDefault();

    if (title == "") {
      setTitleError("Please enter the title");
    }
    if (title.length>20) {
      setTitleError("Maximum 20 characters allowed");
    }
    

    if (message == "") {
      setMessageError("Please enter the message");
    }
    if (message.length>40) {
      setMessageError("Maximum 40 characters allowed");
    }
if(selectDeviceType===""){
  setSelectError("Select atleast one option")
}
    if(individualType) {
      // setSelectUserType("")
    }

    console.log("selectUserType", selectUserType);




    if (title && message && selected&&selectDeviceType) {
      let values;
      if(selectDeviceType==="All"){
values={
  users: selected,
  message: message,
  heading: title,
  role: selectUserType.toLowerCase(),
// deviceType: selectDeviceType
}
      }else if(selectDeviceType==="Android"){
values={
  users: selected,
  message: message,
  heading: title,
  role: selectUserType.toLowerCase(),
deviceType: "1"
}
      }else if(selectDeviceType==="Web"){
values={
  users: selected,
  message: message,
  heading: title,
  role: selectUserType.toLowerCase(),
deviceType: "3"
}
      }else if(selectDeviceType==="Individual"){
      values=  {
          users: selected,
          message: message,
          heading: title,
          role: selectUserType.toLowerCase(),
        // deviceType: selectDeviceType
        }
      }

     
      try {
        await axios.post("/admin/notificationManagement", 
        // {
        //   users: selected,
        //   message: message,
        //   heading: title,
        //   role: selectUserType.toLowerCase(),
        // deviceType: selectDeviceType
        // }
        values
        );
        toast.success("Sent", {
          position: toast.POSITION.TOP_RIGHT,
        });
        getUsers();
        window.location.reload();
        // setMessage("");
        // setTitle("");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Enter All Fields");
    }
  };

  //Select Checkbox

  const [selected, setSelected] = React.useState([]);

  const handleSelectAllClick = (event) => {
    if (selected?.length) {
      setSelected([]);
    } else {
      const newSelecteds = users.map((n) => n._id);
      setSelected(newSelecteds);
    }
  };

  const handleClick = (event, name) => {
    console.log(name)
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const UserCheck = [
    {
      id: "1",
      name: "Android",
    },
    // {
    //   id: "2",
    //   name: "iOS",
    // },
    {
      id: "3",
      name: "Web",
    },
    {id:"4",
  name:"All"
}
  ];

  const UserTypes = [
    {
      label: "USER",
      value: "1",
    },
    {
      label: "AGENT",
      value: "2",
    },
    {
      label: "MERCHANT",
      value: "3",
    },
  ];

  return (
    <>
      <DashboardContainer>
        <>
          <Paper
            className={classes.paperTableHeight}
            style={{ overflow: "hidden", height: "100%" }}
          >
            <div className={classes.tablePad}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <DashHeading style={{marginBottom: '1rem'}}>Notification Management</DashHeading>
            <div style={{marginBottom: '1rem', lineHeight: '35px'}}>
                          <Select
                            // value={formikBag.values.selectUser}
                            defaultValue={UserTypes[0]}
                            options={UserTypes}
                            onChange={(option) => {
                              if(!selectDeviceType) {
                              setSelectUserType(option?.label)
                              }
                              getUsers(option?.label)
                            }}
                            // className="form-control"
                            placeholder="Choose Role"
                          />
                        </div>
            </div>
              <form onSubmit={Submit}>
                <div className="form-group">
                  <div className="colsone">
                    <label className={classes.textS}>Title</label>
                    <Input
                      type="text"
                      className="form-control"

                      variant="outlined"
                      placeholder="Title"
                      // inputProps={{ style: { fontSize: 16, padding: 12 } }}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        setTitleError("");
                      }}
                      // fullWidth
                    />
                    <span style={{ color: "red" }}>{titleError}</span>
                  </div>
                  <div className={classes.textA}>
                    <label className={classes.textS}>Description</label>
                    <TextareaAutosize
                      placeholder="Message"
                      maxRows={12}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        setMessageError("");
                      }}
                      style={{
                        height: 200,
                        borderRadius: 5,
                        borderColor: "lightgrey",
                        padding: "0 15px",
                        outline: "none",
                        color: "black",
                      }}
                    />
                    <span style={{ color: "red" }}>{messageError}</span>
                  </div>

                  <div className="user_box" style={{marginTop: '0.5rem'}}>
                  <label className={classes.textS}>User Type</label>
                    {/* <h4>User Type</h4> */}
                    <form>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                        <div style={{ display: "flex" }}>
                          {UserCheck.map((val) => {
                            return (
                              <label>
                                <input
                                  type="radio"
                                  name="user"
                                  style={{
                                    marginRight: "10px",
                                    marginLeft: "10px",
                                  }}
                                  onClick={() => {
                                    setDefaultState({ individual: false });
                                    setSelectDeviceType(val.name)
                                    setSelectError("")
                                  }}
                                  value={val.name}
                                />
                                <span style={{ fontSize: "1rem" }}>
                                  {val.name}
                                </span>
                              </label>
                            );
                          })}
                          <div>
                            <input
                              type="radio"
                              style={{
                                marginRight: "10px",
                                marginLeft: "10px",
                              }}
                              name="user"
                              onClick={() => {
                                setDefaultState({ individual: true });
                                setSelectDeviceType("Individual")
                                // setSelectUserType(selectUserType)
                                setIndividualType(true)
                                setSelectError("")
                              }}
                            />
                            <label style={{ fontSize: "1rem" }}>
                              Select User
                            </label>
                          </div>
                        </div>
                        <span style={{ color: "red" }}>{selectError}</span>
                        </div>
                      </div>
                    </form>
                  </div>
                  {defaultState.individual ? (
                    <div className={classes.container}>
                      <Paper elevation={0} className={classes.searchBox}>
                        <h2> Select User</h2>
                        <SearchBar
                          value={searched}
                          onChange={(searchVal) => requestSearch(searchVal)}
                          onCancelSearch={() => cancelSearch()}
                          className={classes.searchHeight}
                        />
                      </Paper>
                      <TableContainer
                        className={classNames(classes.tableContainerHeight)}
                      >
                        <Table className={classes.table} stickyHeader>
                          <TableHead>
                            <TableRow>
                              <TableCell className={classes.textMiddle}>
                                <Checkbox
                                  color="primary"
                                  // indeterminate={numSelected > 0 && numSelected < data.length  }
                                  indeterminate={
                                    selected.length > 0 &&
                                    selected.length < users.length
                                  }
                                  checked={
                                    users.length > 0 &&
                                    selected.length === users.length
                                  }
                                  onClick={handleSelectAllClick}
                                />
                              </TableCell>
                              <TableCell className={classes.textSizes}>
                                S. No.
                              </TableCell>
                              <TableCell className={classes.textSizes}>
                                Id
                              </TableCell>
                              <TableCell className={classes.textSizes}>
                                Name
                              </TableCell>
                              <TableCell className={classes.textSizes}>
                                Mobile Number
                              </TableCell>
                              <TableCell className={classes.textSizes}>
                                Email Id
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {users
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((user, index) => {
                                const isItemSelected = isSelected(user._id);

                                return (
                                  <TableRow
                                    key={user._id}
                                    hover
                                    onClick={(event) =>
                                      handleClick(event, user._id)
                                    }
                                    role="checkbox"
                                    tabIndex={-1}
                                    selected={isItemSelected}
                                  >
                                    <TableCell className={classes.textMiddle}>
                                      <div className="checkboxColour"><Checkbox
                                        color="primary"
                                        // className={classes.checkSize}
                                        className="form-control"
                                        checked={isItemSelected}
                                      /></div>
                                    </TableCell>
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      className={classes.textMiddle}
                                    >
                                      {index + 1 + page * rowsPerPage}
                                    </TableCell>
                                    <TableCell className={classes.textMiddle}>
                                      {get(user,"sequenceId","N/A")}
                                    </TableCell>
                                    <TableCell className={classes.textMiddle}>
                                      {get(user,"firstName","N/A")} {get(user,"lastName","N/A")}
                                    </TableCell>
                                    <TableCell className={classes.textMiddle}>
                                      {get(user,"countryCode","N/A")}{get(user,"mobileNumber","N/A")}
                                    </TableCell>
                                    <TableCell className={classes.textMiddle}>
                                      {!get(user,"email","N/A")?"N/A":get(user,"email","N/A")}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        className={classes.tablePaginationStyle}
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {/* <div className={classes.topM}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.btnSize}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div> */}

                  <div className="text-center login_btn_group" style={{ justifyContent: "center", marginTop: '3rem' }}>
                      <NotificationButton
                          type="submit"
                          className="buttonWidthResponsive"
                      >
                          Submit
                      </NotificationButton>
                  </div>

                </div>
              </form>
            </div>
          </Paper>
        </>
      </DashboardContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
      userData: state.userData,
      locationData: state.locations,
      defaultState: state.defaultState,
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
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OfferManagement));
