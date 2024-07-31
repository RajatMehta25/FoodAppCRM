import React, { useState, useEffect, useRef } from "react";
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
  PendingButton,
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
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form } from "formik";
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
import BlockIcon from "@material-ui/icons/Block";

import * as IoIcons from "react-icons/io";
import * as HiIcons from "react-icons/hi";
import { get, isEmpty } from "lodash";
import classNames from "classnames";
import Select from "../../components/Select";

import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import { withRouter } from "react-router-dom";
// import SearchBar from "material-ui-search-bar";
import { ProductValidator } from "../../utils/validators";
import VisibilityIcon from "@material-ui/icons/Visibility";
import TextArea from "../../components/TextArea";
import FileInput from "../../components/FileInput";
import { uploadImage } from "../../utils/functions";
import { FaSearch } from "react-icons/fa";
import { SearchContainer, SearchBar, SearchIcon, SearchInput } from "../../components/SearchBar/SearchElements";
import moment from "moment";
import { CSVLink, CSVDownload } from "react-csv";
import { TiExport } from "react-icons/ti";
import DatePicker from "react-date-picker";
import { BsFilter } from "react-icons/bs";
import Nodata from "../../components/Nodata";
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
  const exportRef = useRef(null);
  const [showFilter, setShowFilter] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [defaultState, setDefaultState] = useState({ isAddMenu: "", isRestaurantDetails: "" });
  const [menuState, setMenuState] = useState({ isOfferVoucher: true, isAddOffer: false });
  const [isLoading, setIsLoading] = useState(false);
  const [offersData, setOffersData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [offerRadio, setOfferRadio] = useState([
    {
      label: "spend more earn more",
      isActive: false,
    },
    {
      label: "free/heavy discount",
      isActive: false,
    },
  ]);
  const [categoryList, setCategoryList] = useState([]);
  const [searched, setSearched] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [buyerData, setBuyerData] = useState([]);

  const [offerValues, setOfferValues] = useState({
    product_name: "",
    category: "",
    category_name: "",
    subCategory: "",
    subcategory_name: "",
    quantity: "",
    unit: "",
    price: "",
    selling_price: "",
    discount_price: "",
    barcode_number: "",
    product_description: "",
    unit_measurement: "",
    images: [],
  });
  const {
    location: { state },
  } = history;
  useEffect(() => {
    if (!userData) {
      history.push("/adminPanel");
    }
  }, []);

  useEffect(() => {
    getMerchantList();
    // getOffers();
    // fetchCategoryList();
    // fetchSubcategoryList();
  }, []);

  // For Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getOffers = async () => {
    try {
      const { data } = await axios.get("/admin/get-agent/2");
      console.log("buyer", data);
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

  const handleOfferProfile = async (values) => {
    console.log(values);

    var fromData = {
      product_name: values.product_name,
      quantity: values.quantity,
      unit: values.unit,
      price: values.price,
      images: values.images,
      superMarket_id: get(userData, "_id", ""),
      category: values.category,
      subCategory: values.subCategory,
      product_description: values.product_description,
      barcode_number: values.barcode_number,
      unit_measurement: values.unit_measurement,
      selling_price: values.selling_price,
      discount_price: values.price - values.selling_price,
    };

    console.log(fromData);
    setIsLoading(true);
    // setDefaultState((prevState) => {
    //     return {
    //         ...prevState,
    //         isDishAdd: false,
    //     };
    // });

    try {
      if (values._id) {
        const { data } = await axios.post("/superMarket/update_product", {
          _id: values._id,
          product_name: values.product_name,
          quantity: values.quantity,
          unit: values.unit,
          price: values.price,
          images: values.images,
          superMarket_id: get(userData, "_id", ""),
          category: values.category,
          subCategory: values.subCategory,
          product_description: values.product_description,
          barcode_number: values.barcode_number,
          unit_measurement: values.unit_measurement,
          selling_price: values.selling_price,
          discount_price: values.price - values.selling_price,
        });
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
        getOffers();
      } else {
        const { data } = await axios.post("/superMarket/add_product", fromData);
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
        getOffers();
      }
      setMenuState({
        isOfferVoucher: true,
        isAddOffer: false,
      });
    } catch (error) {
      setIsLoading(false);
      setMenuState({
        isOfferVoucher: true,
        isAddOffer: false,
      });
      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (error.response.status === 401) {
        history.push("/");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
      }
    }
  };

  const handleDeleteOffers = async (id) => {
    if (window.confirm("Are you sure you want to delete this Product ?")) {
      try {
        const { data } = await axios.post("/superMarket/delete_product", {
          _id: id,
        });
        getOffers();
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        console.log(error);
        toast.error(`${error.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      getOffers();
    }
  };

  // const fetchSubcategoryList = async () => {
  //     try {
  //         let { data } = await axios.get("supermarket/get_subCategories");
  //         setSubcategoryList(
  //             data.data.map((item) => {
  //                 return { label: item.subcategory_name, value: item._id };
  //             })
  //         );
  //     } catch (error) {
  //         console.log(error);
  //         toast.error("Something went wrong.", {
  //             position: toast.POSITION.TOP_RIGHT,
  //         });
  //     }
  // };

  console.log("searchedData", searchedData);

  const requestSearch = (searchedVal) => {
    console.log("searchedVal", searchedVal);
    console.log("searchedVal", searchedData);
    const filteredRows = searchedData.filter((row) => {
      let name = row.firstName + " " + row.lastName;
      let mobileNumber = JSON.stringify(get(row, "mobileNumber", ""));
      let sequenceId = JSON.stringify(get(row, "sequenceId", ""));
      return (
        name.toLowerCase().includes(searchedVal.target.value.toLowerCase()) ||
        mobileNumber.toLowerCase().includes(searchedVal.target.value.toLowerCase()) ||
        sequenceId.toLowerCase().includes(searchedVal.target.value.toLowerCase())
      );
    });
    setTableData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    getOffers();
  };

  const recordsAfterPagingAndSorting = () => {
    return stableSort(tableData, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
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
    return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
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

  console.log("bui", subCategoryList);

  const userBlocked = async (e) => {
    // console.log(e);
    if (e.categoryBlocked === true) {
      if (window.confirm("Are you sure you want to unblock this user?")) {
        try {
          await axios.post("/admin/users-block-status", {
            user_id: e.categoryId,
            is_blocked: false,
          });
          getOffers();
          toast.success("User unblocked successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        // getCategory();
      }
    } else if (e.categoryBlocked === false) {
      if (window.confirm("Are you sure you want to block this user?")) {
        try {
          await axios.post("/admin/users-block-status", {
            user_id: e.categoryId,
            is_blocked: true,
          });
          getOffers();
          toast.success("User blocked successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        // getCategory();
      }
    } else {
      return "error";
    }
  };

  const dateOfJoining = (e) => {
    var date = new Date(e).toLocaleDateString();
    return date;
  };
  const getMerchantList = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/admin/listmerchants?approvalStatus=rejected`);
      setTableData(data.data);
      setSearchedData(data.data);
      // if (data.data.length === 0) {
      //   toast.error("No Data Found", {
      //     position: toast.POSITION.TOP_RIGHT,
      //   });
      // }
      console.log(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      if (err.response.status === 401 || err.response.status === 500) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
      }
    }
  };
  const approveMerchant = async (id) => {
    try {
      const { data } = await axios.post(`/admin/updatemerchant`, {
        _id: id,

        approvalStatus: "approved",
      });
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const csvData = tableData.map((item) => ({
    "Date of Joining": moment(item.createdAt).format("MM-DD-YYYY"),
    // new Date(item.createdAt).getDate() +
    // "/" +
    // new Date(item.createdAt).getMonth() +
    // "/" +
    // new Date(item.createdAt).getFullYear(),
    "Merchant Id": item?.sequenceId,
    "Merchant name": item?.firstName + " " + item?.lastName,
    "Email Id": !item?.email ? "N/A" : item?.email,
    Phone: item?.countryCode + " " + item?.mobileNumber,
    Status: item?.approvalStatus,
  }));
  const headers = [
    { label: "Date of Joining", key: "Date of Joining" },
    { label: "Merchant Id", key: "Merchant Id" },
    { label: "Merchant name", key: "Merchant name" },
    { label: "Email Id", key: "Email Id" },
    { label: "Phone", key: "Phone" },
    { label: "Status", key: "Status" },
  ];

  const csvLink = {
    filename: "Merchants.csv",
    headers: headers,
    data: csvData,
  };
  console.log(csvData);
  const getFilteredMerchantList = async () => {
    console.log("fire");
    try {
      const { data } = await axios.get(`/admin/listmerchants?approvalStatus=rejected&from=${startDate}&to=${endDate}`);
      setTableData(data.data);
      setSearchedData(data.data);
      // if (data.data.length === 0) {
      //   toast.error("No Data Found", {
      //     position: toast.POSITION.TOP_RIGHT,
      //   });
      // }
      console.log(data);
    } catch (err) {
      console.log(err);
      // if (err.response.status === 401 || err.response.status === 500) {
      //   localStorage.removeItem("accessToken");
      //   localStorage.removeItem("userData");
      // }
    }
  };
  return (
    <>
      <div>
        <DashboardContainer>
          <DashboardWrapper>
            <DashboardHeading>
              <MenuAndBack>
                <DashHeading>Disapproved Merchants List</DashHeading>
              </MenuAndBack>

              {/* </Button> */}
              <div style={{ display: "flex", gap: "1rem" }}>
                <SearchContainer>
                  <SearchBar>
                    <SearchIcon>
                      <FaSearch style={{ color: "#c4c4c4" }} />
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
                <CSVLink
                  ref={exportRef}
                  style={{
                    backgroundColor: "#0E3F37",
                    color: "#fff",
                    padding: "10px",
                    textTransform: "uppercase",
                    borderRadius: "5px",
                    fontSize: "13px",
                  }}
                  {...csvLink}
                  className="buttoncss"
                  hidden
                >
                  Export User Data
                </CSVLink>
                <Tooltip title={<span style={{ color: "white", fontSize: "16px" }}>Export Agent Data</span>} arrow>
                  <IconButton
                    className=""
                    style={{
                      background: "transparent linear-gradient(90deg, #bb2649 0%, #c44f6a 100%) 0% 0% no-repeat padding-box",
                      color: "#fff",
                    }}
                    onClick={() => {
                      exportRef.current.link.click();
                    }}
                  >
                    <TiExport />
                  </IconButton>
                </Tooltip>
                <div style={{ position: "relative" }}>
                  <Tooltip title={<span style={{ color: "white", fontSize: "16px" }}>Filter</span>} arrow>
                    <IconButton
                      className=""
                      style={{
                        background: "transparent linear-gradient(90deg, #bb2649 0%, #c44f6a 100%) 0% 0% no-repeat padding-box",
                        color: "#fff",
                        marginLeft: "5px",
                      }}
                      onClick={() => {
                        setShowFilter(!showFilter);
                      }}
                    >
                      <BsFilter />
                    </IconButton>
                  </Tooltip>
                  {showFilter ? (
                    <div
                      className="box arrow-top"
                      style={{
                        display: "flex",
                        position: "absolute",
                        backgroundColor: "whitesmoke",
                        zIndex: 5,
                        borderRadius: "10px",
                        marginLeft: "-120px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          padding: "5px",
                          margin: "20px",
                          // width: "250px",
                        }}
                      >
                        <span style={{ color: "black" }}>From:</span>
                        <DatePicker
                          value={startDate}
                          dateFormat="DD/MM/YYYY"
                          onChange={(date) => {
                            setStartDate(date);
                          }}
                        />
                        <span style={{ color: "black" }}>To:</span>
                        <DatePicker
                          onChange={(date) => {
                            setEndDate(date);
                          }}
                          minDate={startDate}
                          value={endDate}
                          dateFormat="DD/MM/YYYY"
                        />

                        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "15px" }}>
                          <span
                            style={{
                              background:
                                "transparent linear-gradient(90deg, #bb2649 0%, #c44f6a 100%) 0% 0% no-repeat padding-box",

                              color: "#fff",
                              cursor: "pointer",
                              borderRadius: "5px",
                              padding: "5px 10px",
                            }}
                            onClick={() => {
                              if (startDate === null && endDate === null) {
                                toast.info("Please Select Both Dates To Get Filtered Data", {
                                  position: toast.POSITION.TOP_RIGHT,
                                });
                              } else if (startDate === null || endDate === null) {
                                toast.info("Please Select Both Dates To Get Filtered Data", {
                                  position: toast.POSITION.TOP_RIGHT,
                                });
                              } else if (startDate !== null && endDate !== null) {
                                setShowFilter(false);
                                getFilteredMerchantList();
                              }
                            }}
                          >
                            {" "}
                            Apply
                          </span>
                          <span
                            style={{
                              background:
                                "transparent linear-gradient(90deg, #bb2649 0%, #c44f6a 100%) 0% 0% no-repeat padding-box",
                              color: "#fff",
                              cursor: "pointer",
                              borderRadius: "5px",
                              padding: "5px 10px",
                            }}
                            onClick={() => {
                              setStartDate(null);
                              setEndDate(null);
                              getMerchantList();
                            }}
                          >
                            {" "}
                            Reset
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    false
                  )}
                </div>
              </div>
            </DashboardHeading>

            <Paper className={classes.paperTableHeight} style={{ overflow: "hidden", height: "100%", marginBottom: "0.5rem" }}>
              <TableContainer className={classes.tableContainerHeight}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tablePadding}>S.&nbsp;No.</TableCell>
                      <TableCell className={classes.tablePadding}>
                        <TableSortLabel
                          active={true}
                          direction={orderBy === "createdAt" ? order : "asc"}
                          onClick={() => {
                            handleSortRequest("createdAt");
                          }}
                        >
                          Date Of Joining
                        </TableSortLabel>
                      </TableCell>
                      <TableCell className={classes.tablePadding}>Merchant Id</TableCell>
                      <TableCell className={classes.tablePadding}>Category Name</TableCell>
                      <TableCell className={classes.tablePadding}>
                        <TableSortLabel
                          active={true}
                          direction={orderBy === "firstName" ? order : "asc"}
                          onClick={() => {
                            handleSortRequest("firstName");
                          }}
                        >
                          Merchant Name
                        </TableSortLabel>
                      </TableCell>

                      <TableCell className={classes.tablePadding}>
                        <TableSortLabel
                          active={true}
                          direction={orderBy === "email" ? order : "asc"}
                          onClick={() => {
                            handleSortRequest("email");
                          }}
                        >
                          Email
                        </TableSortLabel>
                      </TableCell>
                      {/* <TableCell className={classes.tablePadding}>Quantity</TableCell> */}
                      <TableCell className={classes.tablePadding}>
                        <TableSortLabel
                          active={true}
                          direction={orderBy === "mobileNumber" ? order : "asc"}
                          onClick={() => {
                            handleSortRequest("mobileNumber");
                          }}
                        >
                          Phone
                        </TableSortLabel>
                      </TableCell>

                      <TableCell className={classes.tablePadding}>Status</TableCell>
                      <TableCell className={classes.tablePadding}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recordsAfterPagingAndSorting().map((category, index) => (
                      <TableRow key={category._id}>
                        <TableCell component="th" scope="row" className={classes.textMiddle}>
                          {index + 1 + page * rowsPerPage}
                        </TableCell>
                        <TableCell className={classes.textMiddle}>
                          <div>{dateOfJoining(category.createdAt)}</div>
                        </TableCell>
                        <TableCell className={classes.textMiddle}>
                          <div>{get(category, "sequenceId", "")}</div>
                        </TableCell>
                        <TableCell className={classes.textMiddle}>
                          <div>{get(category, "shop.category.name", "")}</div>
                        </TableCell>
                        <TableCell className={classes.textMiddle}>
                          <div>{get(category, "firstName", "") + " " + get(category, "lastName", "")}</div>
                        </TableCell>
                        <TableCell className={classes.textMiddle}>
                          <div>{!get(category, "email", "") ? "N/A" : get(category, "email", "")}</div>
                        </TableCell>
                        {/* <TableCell className={classes.textMiddle}>
                                                            <div>
                                                                {get(category, 'quantity', '')}
                                                            </div>
                                                        </TableCell> */}
                        <TableCell className={classes.textMiddle}>
                          <div>
                            {get(category, "countryCode", "")} {get(category, "mobileNumber", "")}
                          </div>
                        </TableCell>

                        <TableCell className={classes.textMiddle}>
                          {category?.approvalStatus === "approved" && <ApproveButton>Approved</ApproveButton>}

                          {category?.approvalStatus === "pending" && <PendingButton>Pending</PendingButton>}

                          {category?.approvalStatus === "rejected" && <DisapproveButton>Disapproved</DisapproveButton>}
                        </TableCell>
                        <TableCell className={classes.textMiddle}>
                          <div style={{ marginRight: "1rem" }}>
                            <Button
                              // variant="outlined"
                              aria-label="add"
                              className={classes.iconMargin}
                              onClick={() => {
                                history.push({
                                  pathname: `/adminPanel/merchant_details_disapproved/${category._id}`,
                                  state: [{ page: page, rowsPerPage: rowsPerPage }],
                                });
                              }}
                            >
                              <VisibilityIcon color="primary" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {tableData.length === 0 ? (
                <Nodata TextToDisplay="No Data Found." fontSize="24px"  />
              ) : (
                false
              )}
              <TablePagination
                className={classes.tablePaginationStyle}
                rowsPerPageOptions={[15, 25, 100]}
                component="div"
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OfferManagement));
