import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
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
  LeftRight,
  RightLeft,
  CloseLabel,
  CloseContainer,
} from "./OrderElements";
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
import { AiOutlineClose } from "react-icons/ai";

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
import DatePicker from "react-date-picker";
import { BsFilter } from "react-icons/bs";
import { Modal } from "../../components/Modal";
import PhoneInput from "../../components/PhoneInput";
import { deliveryBoyDataValidator } from "../../utils/validators";
import { RiLockPasswordFill } from "react-icons/ri";
import Nodata from "../../components/Nodata";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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
  const {
    location: { state },
  } = history;
  const classes = useStyles();
  const exportRef = useRef(null);
  const [descriptionText, setDescriptionText] = useState(null);
  let { merchant_id } = useParams();
const [openModalAddress,setOpenModalAddress]=useState(false)
const [addressDisplayData,setAddressDisplayData]=useState({ addressLine1: "",
addressLine2: "N/A",
state: "N/A",
district: "N/A",
landmark: "N/A",
pincode:"N/A",
alternatePhone: "N/A",
_id: "",})
  const [orderStatusonPageNavigate,setOrderStatusonPageNavigate]=useState("ongoing")
  const [openModal, setOpenModal] = useState(false);
  const [deliveryBoyData, setDeliveryBoydata] = useState({
    firstName: "",
    lastName: "",

    mobileNum: "",
    password: "",
    email: "",
    countryCode: "",
    _id: "",
  });
  const [edit, setEdit] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [defaultState, setDefaultState] = useState({ isAddMenu: "", isRestaurantDetails: "" });
  const [menuState, setMenuState] = useState({ isOfferVoucher: true, isAddOffer: false });
  const [isLoading, setIsLoading] = useState(false);
  const [offersData, setOffersData] = useState([]);
  const [tableData, setTableData] = useState([]);
 
  const [categoryList, setCategoryList] = useState([]);
  const [searched, setSearched] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [buyerData, setBuyerData] = useState([]);

  

  useEffect(() => {
    if (!userData) {
      history.push("/adminPanel");
    }
    console.log(userData);
  }, []);

  useEffect(() => {
    if(state && state!==undefined){
  getContactUsListing(state.orderStatus)}else{
    getContactUsListing()
  }
    // getOffers();
    // fetchCategoryList();
    // fetchSubcategoryList();
  }, [state]);

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

  const requestSearch = (searchedVal) => {
    console.log("searchedVal", searchedVal);
    console.log("searchedVal", searchedData);
    const filteredRows = searchedData.filter((row) => {
      
      let userName = row.firstName+" "+row.lastName;
      let email = row.email;
      let phone = row.countryCode+" "+row.mobileNumber
      // let productName = row.item;
      // let mobileNumber = JSON.stringify(get(row, "mobileNumber", ""));
      // let unitId = JSON.stringify(get(row, "sequenceId", ""));
      return (
       
        userName.toLowerCase().includes(searchedVal.target.value.toLowerCase()) ||
        email.toLowerCase().includes(searchedVal.target.value.toLowerCase())||
        phone.toLowerCase().includes(searchedVal.target.value.toLowerCase())
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

  // const userBlocked = async (e) => {
  //   // console.log(e);
  //   if (e.categoryBlocked === true) {
  //     if (window.confirm("Are you sure you want to unblock this agent?")) {
  //       try {
  //         await axios.post("/admin/updateAgent", {
  //           _id: e.categoryId,
  //           isBlocked: false,
  //         });
  //         // getDeliverBoysList();
  //         toast.success("Agent unblocked successfully", {
  //           position: toast.POSITION.TOP_RIGHT,
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } else {
  //       // getCategory();
  //     }
  //   } else if (e.categoryBlocked === false) {
  //     if (window.confirm("Are you sure you want to block this agent?")) {
  //       try {
  //         await axios.post("/admin/updateAgent", {
  //           _id: e.categoryId,
  //           isBlocked: true,
  //         });
  //         // getDeliverBoysList();
  //         toast.success("Agent blocked successfully", {
  //           position: toast.POSITION.TOP_RIGHT,
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } else {
  //       // getCategory();
  //     }
  //   } else {
  //     return "error";
  //   }
  // };

  const dateOfJoining = (e) => {
    var date = new Date(e).toLocaleDateString();
    return date;
  };

  const getMerchantProductList = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/admin/itemsListing?user=${merchant_id}`);
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
      setIsLoading(false);
      console.log("errorrrr", err.response);
      if (err.response.status === 401 || err.response.status === 500) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
      }
    }
  };

  
  
  
  const handleSubmit = async (values) => {
    console.log(values);
    if (!values._id) {
      //add profile

      let addUrl = `/admin/createAgent`;
      let agentData;
      if (!values.email) {
        agentData = {
          firstName: values.firstName,
          lastName: values.lastName,

          password: values.password,
          countryCode: values.countryCode,
          mobileNumber: values.mobileNum,
        };
      } else {
        agentData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          countryCode: values.countryCode,
          mobileNumber: values.mobileNum,
        };
      }

      try {
        const { data } = await axios.post(addUrl, agentData);
        console.log(data);
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        // history.push({
        //   pathname: "/adminPanel/agent",
        // });
        // getDeliverBoysList()
        setOpenModal(false);
        setDeliveryBoydata({
          firstName: "",
          lastName: "",
          mobile: "",
          mobileNum: "",
          password: "",
          email: "",
          countryCode: "",
          _id: "",
        });
      } catch (err) {}
    } else {
      //update profile
    }
  };

  // function generateP() {
  //   var pass = "";
  //   var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

  //   for (let i = 1; i <= 8; i++) {
  //     var char = Math.floor(Math.random() * str.length + 1);

  //     pass += str.charAt(char);
  //   }

  //   return pass;
  // }

  // const handleEditDeliveryBoy=async(values)=>{
  //   let updateUrl = `/admin/updateAgent`;
  //   let agentData;
  //   if (!values.email) {
  //     agentData = {
  //       _id: values._id,
  //       firstName: values.firstName,
  //       lastName: values.lastName,

  //       //  password: values.password,
  //       countryCode: values.countryCode,
  //       mobileNumber: values.mobileNum,
  //     };
  //   } else {
  //     agentData = {
  //       _id: values._id,
  //       firstName: values.firstName,
  //       lastName: values.lastName,
  //       email: values.email,
  //       //  password: values.password,
  //       countryCode: values.countryCode,
  //       mobileNumber: values.mobileNum,
  //     };
  //   }

  //   try {
  //     const { data } = await axios.post(updateUrl, agentData);
  //     console.log(data);
  //     toast.success(`${data.code == 200 ? "Success" : data.code}`, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //     // history.push({
  //     //   pathname: "/adminPanel/agent",
  //     // });
  //     // getDeliverBoysList();
  //     setOpenModal(false)
  //     setDeliveryBoydata({
  //       firstName: "",
  //       lastName: "",
  //       mobileNum: "",
  //       password: "",
  //       email: "",
  //       countryCode: "",
  //       _id:""
  //     })
  //   } catch (err) {}

  // };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getContactUsListing=async(UserStatus="user")=>{
    setIsLoading(true)
    try {
      const {data}= await axios.get(`/admin/viewSupports?contactBy=${UserStatus}`)

      setTableData(data.data)
      setSearchedData(data.data)
      setIsLoading(false)
      // setOrderStatusonPageNavigate(orderStatus)
      console.log(data)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }
  const getFilteredOrderListing = async () => {
    console.log("fire");
    // setIsLoading(true);
    try {
      const { data } = await axios.get(`/admin/orderListing?orderStatus=${orderStatusonPageNavigate}&from=${startDate}&to=${endDate}`);
      setTableData(data.data);
      setSearchedData(data.data);
      // if (data.data.length === 0) {
      //   toast.error("No Data Found", {
      //     position: toast.POSITION.TOP_RIGHT,
      //   });
      // }
      console.log(data);
      // setIsLoading(false);
    } catch (err) {
      console.log(err);
      // setIsLoading(false);
      // if (err.response.status === 401 || err.response.status === 500) {
      //   localStorage.removeItem("accessToken");
      //   localStorage.removeItem("userData");
      // }
    }
  };
  const csvData = tableData.map((item) => ({
    "Date of Joining": dateOfJoining(item?.createdAt)+","+ moment(item?.createdAt).format("hh:mm a"),
    // new Date(item.createdAt).getDate() +
    // "/" +
    // new Date(item.createdAt).getMonth() +
    // "/" +
    // new Date(item.createdAt).getFullYear(),
    "Order Id": item?.orderId,
    "User Id & Name": item?.user?.sequenceId+","+ item?.user?.firstName + " " + item?.user?.lastName,
    "Merchat Id & Shop Name": item?.merchant?.sequenceId+","+ item?.merchant?.shop?.name,
    "Agent Id & Name": item?.agent?.sequenceId+","+ item?.agent?.firstName + " " + item?.agent?.lastName,
    "Delivery Address": item?.addressData?.addressLine1+" "+ item?.addressData?.addressLine2+" "+item?.addressData?.district+" "+item?.addressData?.state+" "+item?.addressData?.pincode,
    "Order Amount":item?.orderAmount,
    "Status":orderStatusonPageNavigate
    
  }));
  const headers = [
    { label: "Date of Joining", key: "Date of Joining" },
    { label: "Order Id", key: "Order Id" },
    { label: "User Id & Name", key: "User Id & Name" },
    { label: "Merchat Id & Shop Name", key: "Merchat Id & Shop Name" },
    { label: "Agent Id & Name", key: "Agent Id & Name" },
    { label: "Delivery Address", key: "Delivery Address" },
    { label: "Order Amount", key: "Order Amount" },
    { label: "Status", key: "Status" },
  ];

  const csvLink = {
    filename: "Orders.csv",
    headers: headers,
    data: csvData,
  };
  return (
    <>
      <div>
        <DashboardContainer>
          <DashboardWrapper>
            <DashboardHeading>
              <MenuAndBack>
                {/* <ArrowBackIosIcon
                  style={{ color: "black", margin: "0rem 1rem", cursor: "pointer" }}
                  onClick={() => history.push({ pathname: state[0].location, state: state })}
                /> */}
                <DashHeading>Contact Us</DashHeading>
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
                {/* <Tooltip title={<span style={{ color: "white", fontSize: "16px" }}>Create Agent</span>} arrow>
                  <IconButton
                    className=""
                    style={{
                      background: "transparent linear-gradient(90deg, #bb2649 0%, #c44f6a 100%) 0% 0% no-repeat padding-box",
                      color: "#fff",
                    }}
                    onClick={() => {
                      // history.push({
                      //   pathname: `/adminPanel/agent/AddEditAgent`,
                      // });
                      setOpenModal(true)
                  
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip> */}
                {/* <CSVLink
                  ref={exportRef}
                  style={{
                    background: "transparent linear-gradient(90deg, #bb2649 0%, #c44f6a 100%) 0% 0% no-repeat padding-box",
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
                </CSVLink> */}
                {/* </Button> */}
                {/* <Tooltip title={<span style={{ color: "white", fontSize: "16px" }}>Export Order Data</span>} arrow>
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
                </Tooltip> */}
                {/* <div style={{ position: "relative" }}>
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
                                getFilteredOrderListing()
                                // getFilteredMerchantProductList();
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
                              getContactUsListing(orderStatusonPageNavigate);
                              // getDeliverBoysList();
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
                </div> */}
              </div>
            </DashboardHeading>

            <Paper className={classes.paperTableHeight} style={{ overflow: "hidden", height: "100%", marginBottom: "0.5rem" }}>
              <div>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  className="TabCustomColor"
                  // TabIndicatorProps={{
                  //   style: {
                  //     backgroundColor: "#bb2649",
                  //   },
                  // }}
                  // indicatorColor="#bb2649"
                  textColor="primary"
                  centered
                >
                  <Tab label="User" onClick={()=>getContactUsListing("user")} />
                  <Tab label="Agent" onClick={()=>getContactUsListing("agent")}/>
                  <Tab label="Merchant" onClick={()=>getContactUsListing("merchant")}/>
                </Tabs>
                <TableContainer className={classes.tableContainerHeight}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tablePadding} style={{ fontWeight: "800" }}>
                          S.&nbsp;No.
                        </TableCell>
                        <TableCell className={classes.tablePadding}>
                          {/* <TableSortLabel
                          active={true}
                          direction={orderBy === "createdAt" ? order : "asc"}
                          onClick={() => {
                            handleSortRequest("createdAt");
                          }}
                        > */}
                          Date 
                          {/* </TableSortLabel> */}
                        </TableCell>
                        {/* <TableCell className={classes.tablePadding}>Agent Id</TableCell> */}
                      
                        <TableCell className={classes.tablePadding}>
                          {/* <TableSortLabel
                          active={true}
                          direction={orderBy === "email" ? order : "asc"}
                          onClick={() => {
                            handleSortRequest("email");
                          }}
                        > */}
                          User Name
                          {/* </TableSortLabel> */}
                        </TableCell>
                      
                      
                        <TableCell className={classes.tablePadding}>
                          {/* <TableSortLabel
                          active={true}
                          direction={orderBy === "mobileNumber" ? order : "asc"}
                          onClick={() => {
                            handleSortRequest("mobileNumber");
                          }}
                        > */}
                         Email
                          {/* </TableSortLabel> */}
                        </TableCell>
                        
                        <TableCell className={classes.tablePadding}>
                          {/* <TableSortLabel
                          active={true}
                          direction={orderBy === "mobileNumber" ? order : "asc"}
                          onClick={() => {
                            handleSortRequest("mobileNumber");
                          }}
                        > */}
                         Mobile Number
                          {/* </TableSortLabel> */}
                        </TableCell>
                        <TableCell className={classes.tablePadding}>
                          {/* <TableSortLabel
                          active={true}
                          direction={orderBy === "mobileNumber" ? order : "asc"}
                          onClick={() => {
                            handleSortRequest("mobileNumber");
                          }}
                        > */}
                         Description
                          {/* </TableSortLabel> */}
                        </TableCell>
                      

                        {/* <TableCell className={classes.tablePadding}>Actions</TableCell> */}
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
                       
                          <TableCell className={classes.textMiddle} style={{ textTransform: "capitalize" }}>
                            <div>{get(category, "firstName", "N/A")}&nbsp;{get(category, "lastName", "N/A")}</div>
                          </TableCell>
                        
                          <TableCell className={classes.textMiddle} >
                            <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap",padding:"2px"}}>
                            <div>{get(category, "email", "N/A")}</div>
                        
                              </div>
                          </TableCell>
                          <TableCell className={classes.textMiddle} style={{ textTransform: "capitalize" }}>
                            <div>{get(category, "countryCode", "N/A")}&nbsp;{get(category, "mobileNumber", "N/A")}</div>
                          </TableCell>
                          <Tooltip title={descriptionText === category._id ? "Click to Hide" : "Click to View"} arrow>
                                  <TableCell
                                    onClick={() => setDescriptionText(descriptionText === category._id ? null : category._id)}
                                    style={{
                                       textAlign: "center",
                                      whiteSpace: descriptionText === category._id ? "" : "nowrap",
                                      maxWidth: "150px",
                                      overflow: descriptionText === category._id ? "" : "hidden",
                                      textOverflow: descriptionText === category._id ? "" : "ellipsis",
                                      cursor: "pointer",
                                    }}
                                    className={classes.textMiddle}
                                  >
                                    {get(category, "description", "N/A")}
                                    {/* <CroppedText text={`${get(category, "location", "N/A")}`} bool={locationText} /> */}
                                  </TableCell>
                                </Tooltip>
                         
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              {tableData.length === 0 ? <Nodata TextToDisplay="No Data Found." fontSize="24px" /> : false}
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
        isOpen={openModalAddress}
        onClose={(event, reason) => {
          setOpenModalAddress(false);
          setAddressDisplayData({
            addressLine1: "",
            addressLine2: "",
            state: "",
            district: "",
            landmark: "",
            pincode:"",
            alternatePhone: "",
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
              {!deliveryBoyData._id ? `Address Details` : `Address Details`}
            </div>
            <div className="">
              {/* <div style={{position:"absolute",top: 20,
                  right: 20,}}>
            <CloseContainer >
  <LeftRight className="leftright" ></LeftRight>
  <RightLeft className="rightleft"></RightLeft>
  <CloseLabel className="label">close</CloseLabel>
</CloseContainer>
</div> */}
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
                  setOpenModalAddress(false);
                  setAddressDisplayData({
                    addressLine1: "",
                    addressLine2: "",
                    state: "",
                    district: "",
                    landmark: "",
                    pincode:"",
                    alternatePhone: "",
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
              key={addressDisplayData}
              enableReinitialize
              initialValues={addressDisplayData}
              // validate={deliveryBoyDataValidator}
              // validateOnChange
             
            >
              {(formikBag) => {
                return (
                  <Form style={{ margin: "0.5rem 1rem 0 1rem" }}>
                    <div className="signup-cont">
                      <div className="row">
                        {/* <div className="col-md-12"> */}
                        <div className="col-md-12">
                          <label className={classes.offerLabel}>Address Line 1</label>
                          <Field name="addressLine1">
                            {({ field }) => (
                              <div className="pb-2 mt-1">
                                <Input
                                  {...field}
                                  type="text"
                                  variant="outlined"
                                  value={formikBag.values.addressLine1}
                                 
                                  className="form-control"
                                  placeholder="Address Line 1"
                                  readOnly
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                        <div className="col-md-12">
                          <label className={classes.offerLabel}>Address Line 2</label>
                          <Field name="addressLine2">
                            {({ field }) => (
                              <div className="pb-2 mt-1">
                                <Input
                                  {...field}
                                  type="text"
                                  variant="outlined"
                                  value={formikBag.values.addressLine2}
                                  
                                  className="form-control"
                                  placeholder="Address Line 2"
                                  readOnly
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                        <div className="col-md-12">
                          <label className={classes.offerLabel}>State</label>
                          <Field name="state">
                            {({ field }) => (
                              <div className="pb-2 mt-1">
                                <Input
                                  {...field}
                                  type="text"
                                  variant="outlined"
                                  value={formikBag.values.state}
                                 
                                  className="form-control"
                                  placeholder="State"
                                  readOnly
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                        <div className="col-md-12">
                          <label className={classes.offerLabel}>District</label>
                          <Field name="district">
                            {({ field }) => (
                              <div className="pb-2 mt-1">
                                <Input
                                  {...field}
                                  type="text"
                                  variant="outlined"
                                  value={formikBag.values.district}
                                
                                  className="form-control"
                                  placeholder="District"
                                  readOnly
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                        <div className="col-md-12">
                          <label className={classes.offerLabel}>Landmark</label>
                          <Field name="landmark">
                            {({ field }) => (
                              <div className="pb-2 mt-1">
                                <Input
                                  {...field}
                                  type="text"
                                  variant="outlined"
                                  value={formikBag.values.landmark}
                                 
                                  className="form-control"
                                  placeholder="Landmark"
                                  readOnly
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                        <div className="col-md-12">
                          <label className={classes.offerLabel}>Pincode</label>
                          <Field name="pincode">
                            {({ field }) => (
                              <div className="pb-2 mt-1">
                                <Input
                                  {...field}
                                  type="text"
                                  variant="outlined"
                                  value={formikBag.values.pincode}
                                 
                                  className="form-control"
                                  placeholder="Pincode"
                                  readOnly
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                        <div className="col-md-12">
                          <label className={classes.offerLabel}>Alternate Contact</label>
                          <Field name="alternatePhone">
                            {({ field }) => (
                              <div className="pb-2 mt-1">
                                <Input
                                  {...field}
                                  type="text"
                                  variant="outlined"
                                  value={formikBag.values.alternatePhone}
                                 
                                 
                                  className="form-control"
                                  placeholder="Alternate Contact"
                                  readOnly
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                  

                        {/* <div className="col-md-12">
                          <label className={classes.offerLabel}>Mobile Number</label>
                          <Field name="mobile">
                            {({ field }) => (
                              <div className="pb-2 mt-1">
                               
                                <PhoneInput
                                  {...field}
                                  country="in"
                                  type="mobile"
                                  countryCodeEditable={false}
                                  value={formikBag.values.countryCode + formikBag.values.mobileNum}
                                  onChange={(phone, data) => {
                                    formikBag.setFieldValue("countryCode", data.format.slice(0, 1) + data.dialCode);
                                    formikBag.setFieldValue("mobileNum", phone.slice(data.dialCode.length));
                                  }}
                                  error={formikBag.touched.mobile && formikBag.errors.mobile ? formikBag.errors.mobile : null}
                                  className="form-control"
                                  placeholder="Mobile Number"
                                />
                              </div>
                            )}
                          </Field>
                        </div> */}

                      
                     
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
