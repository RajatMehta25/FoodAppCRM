import React, { useState, useEffect } from "react";
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
  VoucherHeading,
  VoucherHeadingMain,
  FullWidthMobileInput,
  OfferRadioSection,
  OfferSectionLabel,
  MobileViewCalender,
  HeadingButton,
  LoginButton,
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
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form, FieldArray } from "formik";
import Input from "../../components/Input";
import YearInput from "../../components/YearInput";
import { extractDate } from "../../utils/functions";
import axios from "../../axios";
import Overlay from "../../components/Overlay";
import { toast } from "react-toastify";
import EditIcon from "../../images/edit_profile_button_table.png";
import DeleteIcon from "../../images/delete_profile_button_table.png";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Modal } from "../../components/Modal/Modal";
// import EditIcon from "@material-ui/icons/Edit";
import { Delete } from "@material-ui/icons";

import * as IoIcons from "react-icons/io";
import * as HiIcons from "react-icons/hi";
import { get, isEmpty } from "lodash";
import classNames from "classnames";
import Select from "../../components/Select";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import { withRouter } from "react-router-dom";
// import SearchBar from "material-ui-search-bar";
import { ProductValidator } from "../../utils/validators";
import TextArea from "../../components/TextArea";
import FileInput from "../../components/FileInput";
import { uploadImage } from "../../utils/functions";
import { FaSearch } from "react-icons/fa";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import BlockIcon from "@material-ui/icons/Block";
import { Typography } from "antd";
import {
  SearchContainer,
  SearchBar,
  SearchIcon,
  SearchInput,
} from "../../components/SearchBar/SearchElements";
import moment from "moment";
// import { AgentInformation, AgentInput, AgentInputLabel, AgentInputText, PropertyButton } from './PropertyElements'

const useStyles = makeStyles((theme) => ({
  textMiddle: {
    verticalAlign: "middle !important",
    textAlign: "center",
  },
  tablePadding: {
    padding: "0.5rem",
    textAlign: "center",
    fontSize: "0.8rem",
    fontWeight: "800",
  },
  paperTableHeight: {
    height: "650px",
    width: "95%",
    marginLeft: "2rem",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  "@media (max-width: 780px)": {
    paperTableHeight: {
      marginLeft: "0.75rem",
    },
  },
  "@media (max-width: 480px)": {
    paperTableHeight: {
      marginLeft: "0.75rem",
    },
  },
  tablePaginationStyle: {
    border: "1px solid #0000001a",
    borderRadius: "0rem 0rem 0.4rem 0.4rem",
    overflowY: "hidden",
  },
  tableFlex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchDesign: {
    borderRadius: "20px",
    boxShadow: "none",
    width: "21%",
  },
}));

const OfferManagement = ({ history, setUsers, userData }) => {
  const classes = useStyles();

  const [defaultState, setDefaultState] = useState({
    isAddMenu: "",
    isRestaurantDetails: "",
  });
  const [menuState, setMenuState] = useState({
    isOfferVoucher: true,
    isAddOffer: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editChange, setEditChange] = useState(false);
  const [searched, setSearched] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [pendingPopup, setPendingPopup] = useState({
    isPendingService: "",
    isPendingAmount: "",
  });
  const [pendingServiceTab, setPendingServiceTab] = useState({
    PendingServiceArea: true,
    PendingServiceAmount: false,
  });
  const [serviceAreaList, setServiceAreaList] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [serviceTotal, setServiceTotal] = useState("");

  useEffect(() => {
    if (!userData) {
      history.push("/adminPanel");
    }
  }, []);

  useEffect(() => {
    getSubAdminsList();
  }, []);

  // For Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getSubAdminsList = async () => {
    try {
      const { data } = await axios.get("/admin/subadmin");
      console.log("data", data);
      setTableData(data.data);
      setSearchedData(data.data);
    } catch (error) {
      console.log(error);
      setUsers("");
      history.push("/adminPanel");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
    }
  };

  const requestSearch = (searchedVal) => {
    console.log("searchedVal", searchedData);
    const filteredRows = searchedData.filter((row) => {
      let name = row?.property_unit_id;
      let loc = row?.address?.state + " " + row?.address?.country;
      return (
        name.toLowerCase().includes(searchedVal.target.value.toLowerCase()) ||
        row?.property_name
          .toLowerCase()
          .includes(searchedVal.target.value.toLowerCase()) ||
        loc.toLowerCase().includes(searchedVal.target.value.toLowerCase())
      );
    });
    setTableData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    getSubAdminsList();
  };

  const recordsAfterPagingAndSorting = () => {
    return stableSort(tableData, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };
  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const dateOfJoining = (e) => {
    var date = new Date(e).toLocaleDateString();
    return date;
  };

  const dataForAproved = (e) => {
    if (+e === 1) {
      return "Active";
    } else if (+e === 2) {
      return "Withdrawal";
    } else if (+e === 3) {
      return "Expired";
    } else if (+e === 4) {
      return "Pending";
    } else if (+e === 5) {
      return "Sold";
    } else if (+e === 6) {
      return "Incomplete";
    }
  };

  const deleteCategory = async (id, ak) => {
    console.log("id", id);
    if (window.confirm("Are you sure you want to delete this Sub-Admin?")) {
      try {
        const { data } = await axios.delete(`/admin/subadmin/${id}`);
        getSubAdminsList();
        toast.success("Sub-Admin deleted successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      getSubAdminsList();
    }
  };

  const [todos, setTodos] = useState([
    {
      id: "0",
      name: "Dashboard",
    },
    {
      id: "1",
      name: "Buyer Management",
    },
    {
      id: "2",
      name: "Agent Management",
    },
    {
      id: "3",
      name: "Seller Management",
    },
    {
      id: "4",
      name: "Notification Management",
    },
    {
      id: "5",
      name: "Subscription Management",
    },
    {
      id: "6",
      name: "Manage Service Area",
    },
    {
      id: "7",
      name: "Property Management",
    },
    {
      id: "8",
      name: "Content Management",
    },
    {
      id: "9",
      name: "Faq Management",
    },
    {
      id: "10",
      name: "Lead Management",
    },
  ]);

  console.log("todos", todos);
  console.log("tableData", tableData.access_module);

  return (
    <>
      <div>
        <DashboardContainer>
          <DashboardWrapper>
            <DashboardHeading>
              <MenuAndBack>
                <DashHeading>Sub Admin Management</DashHeading>
              </MenuAndBack>
              <SearchContainer>
                <SearchBar>
                  <SearchIcon>
                    <FaSearch style={{ color: "#666666" }} />
                    {/*<SearchIconn color="#000000" style={{fontWeight:"200"}}/>*/}
                    {/*<IconSearch/>*/}
                  </SearchIcon>
                  <SearchInput
                    type="text"
                    onChange={(searchVal) => requestSearch(searchVal)}
                    //   value={searched}
                    placeholder="Search"
                  ></SearchInput>
                </SearchBar>
              </SearchContainer>
              <HeadingButton
                onClick={() => {
                  history.push({
                    pathname: "/adminPanel/add-subadmin",
                  });
                }}
                // onClick={() => {
                //   setBranchFormValues({
                //     type: "",
                //     amount: "",
                //     name: "",
                //   });
                //   setDefaultState({
                //     isAddBranch: true,
                //   });
                //   setEditChange(false);
                // }}
              >
                Add Sub Admin
              </HeadingButton>
            </DashboardHeading>

            <Paper
              className={classes.paperTableHeight}
              style={{ overflow: "hidden", height: "100%" }}
            >
              <>
                <TableContainer className={classes.tableContainerHeight}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          className={classes.tablePadding}
                          style={{ fontWeight: "800" }}
                        >
                          S.&nbsp;No.
                        </TableCell>
                        <TableCell className={classes.tablePadding}>
                          Name
                        </TableCell>
                        <TableCell className={classes.tablePadding}>
                          Email Id
                        </TableCell>
                        <TableCell className={classes.tablePadding}>
                          Mobile Number
                        </TableCell>
                        <TableCell className={classes.tablePadding}>
                          Joining Date
                        </TableCell>
                        <TableCell className={classes.tablePadding}>
                          Module Alloted
                        </TableCell>
                        <TableCell className={classes.tablePadding}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recordsAfterPagingAndSorting().map((category, index) => (
                        <TableRow key={category._id}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.textMiddle}
                          >
                            {index + 1 + page * rowsPerPage}
                          </TableCell>
                          <TableCell className={classes.textMiddle}>
                            <div>
                              {category?.first_name} {category?.last_name}
                            </div>
                          </TableCell>
                          <TableCell className={classes.textMiddle}>
                            <div>{category?.email}</div>
                          </TableCell>
                          <TableCell className={classes.textMiddle}>
                            <div>
                              {category?.country_code} {category?.phone_number}
                            </div>
                          </TableCell>
                          <TableCell className={classes.textMiddle}>
                            <div>{dateOfJoining(category?.createdAt)}</div>
                          </TableCell>
                          <TableCell className={classes.textMiddle}>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography className={classes.heading}>
                                  {todos
                                    .filter(
                                      (data, index) =>
                                        data.id === +category.access_module
                                    )
                                    .slice(0, 1)
                                    .map((item) => (
                                      <Chip label={item.name}></Chip>
                                    ))}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography className={classes.disp}>
                                  {todos
                                    .filter(
                                      (data, index) =>
                                        +data.id === +category.access_module
                                    )

                                    .map((item) => (
                                      <Chip
                                        label={item.name}
                                        className={classes.marginChip}
                                      ></Chip>
                                    ))}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          </TableCell>
                          <TableCell className={classes.textMiddle}>
                            <SvgLogo
                              style={{ padding: "0rem 1.2rem" }}
                              className="logoImage"
                              src={EditIcon}
                              onClick={() => {
                                history.push({
                                  pathname: `/adminPanel/sub-admin/${category.id}`,
                                });
                              }}
                            />
                            <SvgLogo
                              style={{ padding: "0rem 0.2rem" }}
                              className="logoImage"
                              src={DeleteIcon}
                              onClick={() => deleteCategory(category.id)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  className={classes.tablePaginationStyle}
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={tableData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            </Paper>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OfferManagement));
