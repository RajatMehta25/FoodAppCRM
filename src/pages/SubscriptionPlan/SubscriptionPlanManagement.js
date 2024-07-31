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
} from "./SubscriptionPlanElements";
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
import BlockIcon from "@material-ui/icons/Block";
import { SearchContainer, SearchBar, SearchIcon, SearchInput } from "../../components/SearchBar/SearchElements";
import { DeleteOutline, Edit, EditAttributesOutlined } from "@material-ui/icons";
import moment from "moment";
import { CSVLink, CSVDownload } from "react-csv";
import { TiExport } from "react-icons/ti";
import AddIcon from "@material-ui/icons/Add";
import { Modal } from "../../components/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { SubscriptionDataValidator } from "../../utils/validators";
import SelectInput from "../../components/Select";
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
  const [openModal, setOpenModal] = useState(false);
  const [PlanDuration, setPlanDuration] = useState();

  const [SubscriptionPlanData, setSubscriptionPlanData] = useState({
    name: "",
    features: "",
    planType: "",
    price: "",
    _id: "",
  });
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
  const colourStyles = {
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: '#757d85',
        }
    }
}
  useEffect(() => {
    if (!userData) {
      history.push("/adminPanel");
    }
    console.log(userData);
  }, []);

  useEffect(() => {
    getPlanDuration();
    getsubscriptionPlanList();
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
    setIsLoading(true);
    try {
      const { data } = await axios.get("/admin/get-users/BUYER");
      console.log("buyer", data);
      setTableData(data.data);
      setSearchedData(data.data);
      setIsLoading(false);
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

  const requestSearch = (searchedVal) => {
    console.log("searchedVal", searchedVal);
    console.log("searchedVal", searchedData);
    const filteredRows = searchedData.filter((row) => {
      let name = row.planName;
      let features = row.features;
      let planType = row.planType;
      let price = JSON.stringify(get(row, "price", ""));
      // let unitId = JSON.stringify(get(row, "sequenceId", ""));
      return (
        name.toLowerCase().includes(searchedVal.target.value.toLowerCase()) ||
        price.toLowerCase().includes(searchedVal.target.value.toLowerCase()) ||
        features.toLowerCase().includes(searchedVal.target.value.toLowerCase()) ||
        planType.toLowerCase().includes(searchedVal.target.value.toLowerCase())
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

  const userBlocked = async (e) => {
    // console.log(e);
    if (e.categoryBlocked === true) {
      if (window.confirm("Are you sure you want to unblock this agent?")) {
        try {
          await axios.post("/admin/updateAgent", {
            _id: e.categoryId,
            isBlocked: false,
          });
          // getDeliverBoysList();
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
      if (window.confirm("Are you sure you want to block this agent?")) {
        try {
          await axios.post("/admin/updateAgent", {
            _id: e.categoryId,
            isBlocked: true,
          });
          // getDeliverBoysList();
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

  const getsubscriptionPlanList = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/admin/listSubscription`);
      setTableData(data.data);
      setSearchedData(data.data);
      console.log(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      console.log("errorrrr", err.response);
      if (err.response.status === 401 || err.response.status === 500) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
      }
    }
  };

  const DeleteSubscriptionPlan = async (id) => {
    if (window.confirm("Are you sure you want to delete this Subscription ?")) {
    try {
      const { data } = await axios.post(`/admin/deleteSubscription`, { _id: id });
      toast.success(`${data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      // getDeliverBoysList();
      getsubscriptionPlanList();
    } catch (err) {
      console.log(err);
    }}else{
      
    }
  };

  const csvData = tableData.map((item) => ({
    "Date of Joining": moment(item.createdAt).format("MM-DD-YYYY"),
    // new Date(item.createdAt).getDate() +
    // "/" +
    // new Date(item.createdAt).getMonth() +
    // "/" +
    // new Date(item.createdAt).getFullYear(),
    "Agent Id": item?.sequenceId,
    "Agent name": item?.fullName,
    "Mobile Number": item?.countryCode + " " + item?.mobileNumber,
    "Email Id": !item?.email ? "N/A" : item?.email,
  }));
  const headers = [
    { label: "Date of Joining", key: "Date of Joining" },
    { label: "User Id", key: "User Id" },
    { label: "User name", key: "User name" },
    { label: "Mobile Number", key: "Mobile Number" },
    { label: "Email Id", key: "Email Id" },
  ];

  const csvLink = {
    filename: "Users.csv",
    headers: headers,
    data: csvData,
  };
  console.log(csvData);

  const handleSubmit = async (values) => {
    console.log(values);
    if (!values._id) {
      //add profile

      let addUrl = `/admin/createSubscription`;
      let subscriptionData;

      subscriptionData = {
        planName: values.name,
        planType: values.planType.value,
        price: values.price,
        features: values.features,
      };

      try {
        const { data } = await axios.post(addUrl, subscriptionData);
        console.log(data);
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        getsubscriptionPlanList();
        setOpenModal(false);
      } catch (err) {
        if (err.response.status == "400") {
          toast.error(`${err.response.data.message}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        console.log(err.response);
      }
    } else {
      //update profile
    }
  };
  const getPlanDuration = async () => {
    const { data } = await axios.get(`/admin/planTypes`);
    let plans = data.data.map((ele) => ({ label: ele, value: ele }));
    setPlanDuration(plans);
  };
  const handleEditSubcription = async (values) => {
    let updateUrl = `/admin/updateSubscription`;
    let subscriptionData;

    subscriptionData = {
      _id: values._id,
      planName: values.name,
      planType: values.planType.value,
      price: values.price,
      features: values.features,
    };

    try {
      const { data } = await axios.post(updateUrl, subscriptionData);
      console.log(data);
      toast.success(`${data.code == 200 ? "Success" : data.code}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      getsubscriptionPlanList();
      setOpenModal(false);
    } catch (err) {
      if (err.response.status == "400") {
        toast.error(`${err.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      console.log(err.response);
    }
  };
  return (
    <>
      <div>
        <DashboardContainer>
          <DashboardWrapper>
            <DashboardHeading>
              <MenuAndBack>
                <DashHeading>Subscription Plans</DashHeading>
              </MenuAndBack>

              {/* <SearchBar
                                className={classes.searchDesign}
                                value={searched}
                                onChange={(searchVal) => requestSearch(searchVal)}
                                onCancelSearch={() => cancelSearch()}
                                placeholder="Search by Product Name"
                                 /> */}

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
                <Tooltip title={<span style={{ color: "white", fontSize: "16px" }}>Create Subscription Plan</span>} arrow>
                  <IconButton
                    className=""
                    style={{
                      background: "transparent linear-gradient(90deg, #bb2649 0%, #c44f6a 100%) 0% 0% no-repeat padding-box",
                      color: "#fff",
                    }}
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </DashboardHeading>

            <Paper className={classes.paperTableHeight} style={{ overflow: "hidden", height: "100%", marginBottom: "0.5rem" }}>
              <TableContainer className={classes.tableContainerHeight}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tablePadding} style={{ fontWeight: "800" }}>
                        S.&nbsp;No.
                      </TableCell>
                      <TableCell className={classes.tablePadding}>
                        <TableSortLabel
                          active={true}
                          direction={orderBy === "planName" ? order : "asc"}
                          onClick={() => {
                            handleSortRequest("planName");
                          }}
                        >
                          Plan Name
                        </TableSortLabel>
                      </TableCell>
                      {/* <TableCell className={classes.tablePadding}>Agent Id</TableCell> */}
                      <TableCell className={classes.tablePadding}>
                        <TableSortLabel
                          active={true}
                          direction={orderBy === "features" ? order : "asc"}
                          onClick={() => {
                            handleSortRequest("features");
                          }}
                        >
                          Features
                        </TableSortLabel>
                      </TableCell>
                      <TableCell className={classes.tablePadding}>
                        <TableSortLabel
                          active={true}
                          direction={orderBy === "price" ? order : "asc"}
                          onClick={() => {
                            handleSortRequest("price");
                          }}
                        >
                          Price
                        </TableSortLabel>
                      </TableCell>
                      <TableCell className={classes.tablePadding}>
                        <TableSortLabel
                          active={true}
                          direction={orderBy === "planType" ? order : "asc"}
                          onClick={() => {
                            handleSortRequest("planType");
                          }}
                        >
                          Time Period
                        </TableSortLabel>
                      </TableCell>

                      <TableCell className={classes.tablePadding}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recordsAfterPagingAndSorting().map((category, index) => (
                      <TableRow key={category._id}>
                        <TableCell component="th" scope="row" className={classes.textMiddle}>
                          {index + 1 + page * rowsPerPage}
                        </TableCell>
                        <TableCell className={classes.textMiddle}>
                          {/* <div>{dateOfJoining(category.createdAt)}</div> */}
                          <div>{get(category, "planName", "")}</div>
                        </TableCell>
                        <TableCell className={classes.textMiddle}>
                          <div>{get(category, "features", "")}</div>
                        </TableCell>
                        <TableCell className={classes.textMiddle} style={{ textTransform: "capitalize" }}>
                          <div>{get(category, "price", "")}</div>
                        </TableCell>
                        <TableCell className={classes.textMiddle}>
                          {/* <div>{!get(category, "email", "N/A") ? "N/A" : get(category, "email", "")}</div> */}
                          <div>{get(category, "planType", "")}</div>
                        </TableCell>
                        {/* <TableCell className={classes.textMiddle}>
                                                            <div>
                                                                {get(category, 'quantity', '')}
                                                            </div>
                                                        </TableCell> */}
                        {/* <TableCell className={classes.textMiddle}>
                          <div>
                            {get(category, "countryCode", "")} {get(category, "mobileNumber", "")}
                          </div>
                        </TableCell> */}

                        <TableCell className={classes.tableFlex}>
                          <div>
                            <Tooltip title="Edit" arrow>
                              <Button
                                // variant="outlined"
                                aria-label="add"
                                className={classes.iconMargin}
                                onClick={() => {
                                  setOpenModal(true);
                                  setSubscriptionPlanData({
                                    name: get(category, "planName", ""),
                                    features: get(category, "features", ""),
                                    planType: {
                                      label: get(category, "planType", ""),
                                      value: get(category, "planType", ""),
                                    },
                                    price: get(category, "price", ""),
                                    _id: get(category, "_id", ""),
                                  });
                                  // history.push({
                                  //   // pathname: `/adminPanel/user/${category.id}`,
                                  //   pathname: `/adminPanel/subscription/AddEditSubscriptionPlan/${category._id}`,
                                  // });
                                }}
                              >
                                <Edit color="primary" />
                              </Button>
                            </Tooltip>
                          </div>
                          <div>
                            <Tooltip title="Delete" arrow>
                              <Button
                                // variant="outlined"
                                aria-label="add"
                                className={classes.Marginbutton}
                                onClick={() => {
                                  DeleteSubscriptionPlan(category._id);
                                }}
                              >
                                <DeleteOutline />
                              </Button>
                            </Tooltip>
                          </div>
                          {/* <div>
                            <Tooltip title="Block" arrow>
                              <Button
                                variant="outlined"
                                aria-label="add"
                                className={classes.Marginbutton}
                                onClick={() => {
                                  userBlocked({ categoryId: category._id, categoryBlocked: category.isBlocked });
                                }}
                              >
                                <BlockIcon style={{ color: category.isBlocked === true ? "red" : "green" }} />
                              </Button>
                            </Tooltip>
                          </div> */}
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
      <Modal
        maxWidth="lg"
        width="540px"
        RoundedCorners={true}
        isOpen={openModal}
        onClose={(event, reason) => {
          setOpenModal(false);
          setSubscriptionPlanData({
            name: "",
            features: "",
            planType: "",
            price: "",
            _id: "",
          });
        }}
        backgroundModal={false}
        backgroundModalContent={false}
        title={
          <div>
            <div
              className="my-3"
              style={{ textAlign: "center", fontWeight: "bold", fontSize: "22px", fontFamily: "'DM Sans', sans-serif" }}
            >
              {!SubscriptionPlanData._id ? `Add Subscription` : `Edit Subscription`}
            </div>
            <div className="">
              <AiOutlineClose
                style={{
                  fontSize: "1.5rem",
                  position: "absolute",
                  top: 16,
                  right: 16,
                  color: "#fff",
                  borderRadius: "50%",
                  backgroundColor: "red",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setOpenModal(false);
                  setSubscriptionPlanData({
                    name: "",
                    features: "",
                    planType: "",
                    price: "",
                    _id: "",
                  });
                }}
              />
            </div>
          </div>
        }
        content={
          <>
            <Formik
              key={SubscriptionPlanData}
              enableReinitialize
              initialValues={
                SubscriptionPlanData
                // {
                // name: get(SubscriptionPlanData, "planName", ""),
                // features: get(SubscriptionPlanData, "features", ""),
                // planType: !SubscriptionPlanData
                //   ? ""
                //   : PlanDuration.filter((ele) => SubscriptionPlanData?.planType === ele.value)[0],
                // price: get(SubscriptionPlanData, "price", ""),
                // }
              }
              validate={SubscriptionDataValidator}
              validateOnChange
              onSubmit={(values) => {
                if (values._id) {
                  handleEditSubcription(values);
                } else {
                  handleSubmit(values);
                }
              }}
            >
              {(formikBag) => {
                return (
                  <Form style={{ margin: "0.5rem 1rem 0 1rem" }}>
                    <div className="signup-cont">
                      <div className="row">
                        {/* <div className="col-md-12"> */}
                        <div className="col-md-12">
                          <label className={classes.offerLabel}>Plan Name</label>
                          <Field name="name">
                            {({ field }) => (
                              <div className="pb-2 mt-1">
                                <Input
                                  {...field}
                                  type="text"
                                  variant="outlined"
                                  value={formikBag.values.name}
                                  onChange={(e) => {
                                    formikBag.setFieldValue("name", e.target.value);
                                  }}
                                  error={formikBag.touched.name && formikBag.errors.name ? formikBag.errors.name : null}
                                  className="form-control"
                                  placeholder="Plan Name"
                                />
                              </div>
                            )}
                          </Field>
                        </div>

                        <div className="col-md-12">
                          <label className={classes.offerLabel}>Features</label>
                          <Field name="features">
                            {({ field }) => (
                              <div className="pb-2 mt-1">
                                <TextArea
                                  {...field}
                                  value={formikBag.values.features}
                                  onChange={(e) => {
                                    formikBag.setFieldValue("features", e.target.value);
                                  }}
                                  error={
                                    formikBag.touched.features && formikBag.errors.features ? formikBag.errors.features : null
                                  }
                                  className="form-control"
                                  placeholder="Features"
                                />
                              </div>
                            )}
                          </Field>
                        </div>

                        <div className="col-md-12">
                          <label className={classes.offerLabel}>Plan Duration</label>
                          <Field name="planType">
                            {({ field }) => (
                              <div className="pb-2 mt-1 changeHeightOfSelect">
                                <SelectInput
                                  {...field}
                                  // type="select"
                                  // variant="outlined"
                                  value={formikBag.values.planType}
                                  options={PlanDuration}
                                  styles={colourStyles}
                                  
                                  onChange={(e) => {
                                    formikBag.setFieldValue("planType", e);
                                  }}
                                  error={
                                    formikBag.touched.planType && formikBag.errors.planType ? formikBag.errors.planType : null
                                  }
                                  // className="form-control"
                                  placeholder="Select Time Period"
                                />
                              </div>
                            )}
                          </Field>
                        </div>

                        <div className="col-md-12" style={{}}>
                          <label className={classes.offerLabel}>Price</label>
                          <Field name="price">
                            {({ field }) => (
                              <div className="pb-2 mt-1">
                                <Input
                                  {...field}
                                  type="text"
                                  variant="outlined"
                                  value={formikBag.values.price}
                                  onChange={(e) => {
                                    formikBag.setFieldValue("price", e.target.value);
                                  }}
                                  error={formikBag.touched.price && formikBag.errors.price ? formikBag.errors.price : null}
                                  className="form-control"
                                  placeholder="Price"
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-12" style={{ display: "flex", justifyContent: "center" }}>
                        <HeadingButton type="submit" style={{ padding: "0.5em 2em" }}>
                          Save
                        </HeadingButton>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </>
        }
      />
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
