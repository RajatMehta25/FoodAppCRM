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
  OrderDetailsContainer,
  OrderDetailsContainerLeft,
  OrderDetailsContainerRight,
  OrderDetailsContainerRight_Box,
  OrderDetailsContainerRight_Box_Heading,
  OrderDetailsContainerRight_Box_Component,
  OrderDetailsContainerRight_Box_Component_div1,
  OrderDetailsContainerRight_Box_Component_div2,
  OrderSummaryCustom,
  OrderBanner,
  OrderBannerButton,
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
import "./Order.css";
// import moment from "moment";


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
  let { order_id } = useParams();
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
  const [ItemTableData, setItemTableData] = useState([]);
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

  useEffect(() => {
    if (!userData) {
      history.push("/adminPanel");
    }
    console.log(userData);
  }, []);

  useEffect(() => {
    order_id && getOngoingOrderListing();
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
      let categoryName = row.category.name;
      let subcategoryName = row.subcategory.name;
      let productName = row.item;
      // let mobileNumber = JSON.stringify(get(row, "mobileNumber", ""));
      // let unitId = JSON.stringify(get(row, "sequenceId", ""));
      return (
        categoryName.toLowerCase().includes(searchedVal.target.value.toLowerCase()) ||
        subcategoryName.toLowerCase().includes(searchedVal.target.value.toLowerCase()) ||
        productName.toLowerCase().includes(searchedVal.target.value.toLowerCase())
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
  const recordsAfterPagingAndSortingItemTable = () => {
    return stableSort(ItemTableData, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
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

  

  const dateOfJoining = (e) => {
    var date = new Date(e).toLocaleDateString();
    return date;
  };
  const TimeOfJoining = (e) => {
    var time = new Date(e).toLocaleTimeString();
    return time;
  };


  const getMerchantProductList = async () => {
    setIsLoading(true);
    try {
      //   const { data } = await axios.get(`/admin/itemsListing?user=${merchant_id}`);
      //   setTableData(data.data);
      //   setSearchedData(data.data);
      // if (data.data.length === 0) {
      //   toast.error("No Data Found", {
      //     position: toast.POSITION.TOP_RIGHT,
      //   });
      // }
      //   console.log(data);
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

  const DeleteDeliveryBoy = async (id) => {
    try {
      const { data } = await axios.post(`/admin/deleteAgent`, { _id: id });
      toast.success(`${data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      // getDeliverBoysList();
    } catch (err) {
      console.log(err);
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
    "Agent name": item?.firstName + " " + item?.lastName,
    "Email Id": !item?.email ? "N/A" : item?.email,
    Phone: item?.countryCode + " " + item?.mobileNumber,
  }));
  const headers = [
    { label: "Date of Joining", key: "Date of Joining" },
    { label: "Agent Id", key: "Agent Id" },
    { label: "Agent name", key: "Agent name" },
    { label: "Email Id", key: "Email Id" },
    { label: "Phone", key: "Phone" },
  ];

  const csvLink = {
    filename: "Agents.csv",
    headers: headers,
    data: csvData,
  };
  console.log(csvData);
  const getFilteredMerchantProductList = async () => {
    // setIsLoading(true);
    console.log("fire");
    try {
      //   const { data } = await axios.get(`/admin/itemsListing?user=${merchant_id}&from=${startDate}&to=${endDate}`);
      //   setTableData(data.data);
      //   setSearchedData(data.data);
      // if (data.data.length === 0) {
      //   toast.error("No Data Found", {
      //     position: toast.POSITION.TOP_RIGHT,
      //   });
      // }
      //   console.log(data);
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

  
  const getOngoingOrderListing=async(id)=>{
    setIsLoading(true)
    try {
      const {data}= await axios.get(`/admin/orderListing?orderStatus=ongoing&id=${order_id}`)

      setTableData(data.data)
      setItemTableData(data.data[0].itemOrderd)
      setSearchedData(data.data)
      setIsLoading(false)
   
      console.log(data)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }
  return (
    <>
      <div>
        <DashboardContainer>
          <DashboardWrapper>
            <DashboardHeading>
              <MenuAndBack>
                <ArrowBackIosIcon
                  style={{ color: "black", margin: "0rem 1rem", cursor: "pointer" }}
                  onClick={() => history.push({ pathname: state[0].location, state: state })}
                />
                <DashHeading>Order Id</DashHeading>
              </MenuAndBack>
            </DashboardHeading>

            <Paper className={classes.paperTableHeight} style={{ overflow: "scroll", height: "100%", marginBottom: "0.5rem" }}>
              <OrderDetailsContainer>
                <OrderDetailsContainerLeft>
                  {" "}
                  <div>
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
                              Item Summary
                              {/* </TableSortLabel> */}
                            </TableCell>
                            {/* <TableCell className={classes.tablePadding}>Agent Id</TableCell> */}
                            <TableCell className={classes.tablePadding}>
                              {/* <TableSortLabel
                          active={true}
                          direction={orderBy === "firstName" ? order : "asc"}
                          onClick={() => {
                            handleSortRequest("firstName");
                          }}
                        > */}
                              Quantity
                              {/* </TableSortLabel> */}
                            </TableCell>
                            <TableCell className={classes.tablePadding}>
                              {/* <TableSortLabel
                          active={true}
                          direction={orderBy === "email" ? order : "asc"}
                          onClick={() => {
                            handleSortRequest("email");
                          }}
                        > */}
                              Price(&#8377;)
                              {/* </TableSortLabel> */}
                            </TableCell>
                            <TableCell className={classes.tablePadding}>
                              <TableSortLabel
                                active={true}
                                direction={orderBy === "item" ? order : "asc"}
                                onClick={() => {
                                  handleSortRequest("item");
                                }}
                              >
                                Total Price(&#8377;)
                              </TableSortLabel>
                            </TableCell>

                            {/* <TableCell className={classes.tablePadding}>Actions</TableCell> */}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {recordsAfterPagingAndSortingItemTable().map((category, index) => (
                            <TableRow key={category._id}>
                              <TableCell component="th" scope="row" className={classes.textMiddle}>
                                {index + 1 + page * rowsPerPage}
                              </TableCell>
                              <TableCell className={classes.textMiddle}>
                                <div>{get(category, "itemData.item", "N/A")}</div>
                              </TableCell>
                              <TableCell className={classes.textMiddle}>
                                <div>{get(category, "selectedQuantity", "N/A")}</div>
                              </TableCell>
                              <TableCell className={classes.textMiddle} style={{ textTransform: "capitalize" }}>
                                <div>{get(category, "unitPrice", "N/A")}</div>
                              </TableCell>
                              <TableCell className={classes.textMiddle}>
                                <div>{get(category, "itemTotalPrice", "N/A")}</div>
                              </TableCell>

                           
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {tableData.length === 0 ? <Nodata TextToDisplay="No Data Found." fontSize="24px" /> : false}
                    {/* <TablePagination
                      className={classes.tablePaginationStyle}
                      rowsPerPageOptions={[15, 25, 100]}
                      component="div"
                      count={tableData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}
                  </div>
                  <div>
                    <TableContainer className={classes.tableContainerHeight}>
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell colSpan={2} className={classes.tablePadding} style={{ fontWeight: "800" }}>
                              Customer and Order Details
                            </TableCell>

                            {/* <TableCell className={classes.tablePadding}>Actions</TableCell> */}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {recordsAfterPagingAndSorting().map((category, index) => (
                            <>
                            <TableRow key={category._id}>
                              <TableCell component="th" scope="row" className={classes.textMiddle} style={{fontWeight:"bold"}}>
                                {/* {index + 1 + page * rowsPerPage}fvf */}
                                User Name
                              </TableCell>
                              <TableCell className={classes.textMiddle}>
                                <div>{get(tableData[0], "user.firstName", "N/A")}&nbsp;{get(tableData[0], "user.lastName", "N/A")}</div>
                              </TableCell>
                             

                             
                            </TableRow>
                             <TableRow key={category._id}>
                             <TableCell component="th" scope="row" className={classes.textMiddle} style={{fontWeight:"bold"}}>
                               {/* {index + 1 + page * rowsPerPage}fvf */}
                               Phone Number
                             </TableCell>
                             <TableCell className={classes.textMiddle}>
                               <div>{get(tableData[0], "user.mobileNumber", "N/A")}</div>
                             </TableCell>
                            

                            
                           </TableRow>
                           <TableRow key={category._id}>
                             <TableCell component="th" scope="row" className={classes.textMiddle} style={{fontWeight:"bold"}}>
                               {/* {index + 1 + page * rowsPerPage}fvf */}
                               Type
                             </TableCell>
                             <TableCell className={classes.textMiddle}>
                               <div>{get(tableData[0], "deliveryType", "N/A")}</div>
                             </TableCell>
                            

                            
                           </TableRow>
                           {/* <TableRow key={category._id}>
                             <TableCell component="th" scope="row" className={classes.textMiddle} style={{fontWeight:"bold"}}>
                              
                               Note
                             </TableCell>
                             <TableCell className={classes.textMiddle}>
                               <div>{get(tableData[0], "user.mobileNumber", "N/A")}</div>
                             </TableCell>
                            

                            
                           </TableRow> */}
                           </>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {tableData.length === 0 ? <Nodata TextToDisplay="No Data Found." fontSize="24px" /> : false}
                    {/* <TablePagination
                      className={classes.tablePaginationStyle}
                      rowsPerPageOptions={[15, 25, 100]}
                      component="div"
                      count={tableData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}
                  </div>
                </OrderDetailsContainerLeft>
                <OrderDetailsContainerRight>
                  <OrderDetailsContainerRight_Box>
                    <OrderDetailsContainerRight_Box_Heading>Agent Details</OrderDetailsContainerRight_Box_Heading>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Agent Name</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>{get(tableData[0], "agent.firstName", "N/A")}&nbsp;{get(tableData[0], "agent.lastName", "N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Agent ID</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>{get(tableData[0], "agent.sequenceId", "N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Mobile Number</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>{get(tableData[0], "agent.mobileNumber", "N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                  </OrderDetailsContainerRight_Box>
                  <OrderDetailsContainerRight_Box>
                    <OrderDetailsContainerRight_Box_Heading>Merchant Details</OrderDetailsContainerRight_Box_Heading>{" "}
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Merchant ID</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>{get(tableData[0], "merchant.sequenceId", "N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Business Name</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>{get(tableData[0], "merchant.shop.name", "N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Mobile Number</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>{get(tableData[0], "merchant.shop.mobileNumber", "N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Address</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>{get(tableData[0], "merchant.shop.address", "N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Pincode</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>{get(tableData[0], "merchant.shop.postcode", "N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                  </OrderDetailsContainerRight_Box>
                  <OrderDetailsContainerRight_Box>
                    <OrderSummaryCustom>
                      <OrderDetailsContainerRight_Box_Heading>Order Summary</OrderDetailsContainerRight_Box_Heading>
                      <OrderBanner>
                        <OrderBannerButton textcolor="#fff" bgcolor="#d53e33">
                          {get(tableData[0],"orderStatus","Cancelled")}
                        </OrderBannerButton>
                      </OrderBanner>
                    </OrderSummaryCustom>

                    
                    
                    
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Order Id</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2> {get(tableData[0],"orderId","N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Order Created</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2> {dateOfJoining(tableData[0]?.createdAt)}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Order Time</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>{TimeOfJoining(tableData[0]?.createdAt)}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Payment Method</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>{get(tableData[0],"paymentMethod","N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Sub Total</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>&#8377;{get(tableData[0],"itemsAmount","N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Delivery Fee</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>&#8377;{get(tableData[0],"deliveryFee","N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Tax Amount</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>&#8377;{get(tableData[0],"taxAmount","N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Discount Amount</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>&#8377;{get(tableData[0],"discountAmount","N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                  
                  </OrderDetailsContainerRight_Box>
                  <OrderDetailsContainerRight_Box>
                  <OrderDetailsContainerRight_Box_Component>
                      
                      <OrderDetailsContainerRight_Box_Component_div1>Total</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>&#8377;{get(tableData[0],"orderAmount","N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                       </OrderDetailsContainerRight_Box>
                  <OrderDetailsContainerRight_Box>
                    <OrderDetailsContainerRight_Box_Heading>Delivery Address</OrderDetailsContainerRight_Box_Heading>{" "}
                  
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Address Line 1</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>{get(tableData[0],"addressData.addressLine1","N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Address Line 2</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>{get(tableData[0],"addressData.addressLine2","N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>State</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>{get(tableData[0],"addressData.state","N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>District</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>{get(tableData[0],"addressData.district","N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Landmark</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>{get(tableData[0],"addressData.landmark","N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Pincode</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>{get(tableData[0],"addressData.pincode","N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                    <OrderDetailsContainerRight_Box_Component>
                      <OrderDetailsContainerRight_Box_Component_div1>Alternate Contact</OrderDetailsContainerRight_Box_Component_div1>
                      <OrderDetailsContainerRight_Box_Component_div2>{get(tableData[0],"addressData.alternatePhone","N/A")}</OrderDetailsContainerRight_Box_Component_div2>
                    </OrderDetailsContainerRight_Box_Component>
                  </OrderDetailsContainerRight_Box>
                </OrderDetailsContainerRight>
              </OrderDetailsContainer>
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
          setDeliveryBoydata({
            firstName: "",
            lastName: "",
            mobileNum: "",
            password: "",
            email: "",
            countryCode: "",
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
              {!deliveryBoyData._id ? `Add Agent` : `Edit Agent`}
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
                  setDeliveryBoydata({
                    firstName: "",
                    lastName: "",
                    mobileNum: "",
                    password: "",
                    email: "",
                    countryCode: "",
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
              key={deliveryBoyData}
              enableReinitialize
              initialValues={deliveryBoyData}
              validate={deliveryBoyDataValidator}
              validateOnChange
              onSubmit={(values) => {
                if (values._id) {
                  //  handleEditDeliveryBoy(values);
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
                          <label className={classes.offerLabel}>First Name</label>
                          <Field name="firstName">
                            {({ field }) => (
                              <div className="pb-2 mt-1">
                                <Input
                                  {...field}
                                  type="text"
                                  variant="outlined"
                                  value={formikBag.values.firstName}
                                  onChange={(e) => {
                                    formikBag.setFieldValue("firstName", e.target.value);
                                  }}
                                  error={
                                    formikBag.touched.firstName && formikBag.errors.firstName
                                      ? formikBag.errors.firstName
                                      : null
                                  }
                                  className="form-control"
                                  placeholder="First Name"
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                        <div className="col-md-12">
                          <label className={classes.offerLabel}>Last Name</label>
                          <Field name="lastName">
                            {({ field }) => (
                              <div className="pb-2 mt-1">
                                <Input
                                  {...field}
                                  type="text"
                                  variant="outlined"
                                  value={formikBag.values.lastName}
                                  onChange={(e) => {
                                    formikBag.setFieldValue("lastName", e.target.value);
                                  }}
                                  error={
                                    formikBag.touched.lastName && formikBag.errors.lastName ? formikBag.errors.lastName : null
                                  }
                                  className="form-control"
                                  placeholder="Last Name"
                                />
                              </div>
                            )}
                          </Field>
                        </div>

                        <div className="col-md-12">
                          <label className={classes.offerLabel}>Email ID (Optional)</label>
                          <Field name="email">
                            {({ field }) => (
                              <div className="pb-2 mt-1">
                                <Input
                                  {...field}
                                  type="email"
                                  variant="outlined"
                                  value={formikBag.values.email}
                                  onChange={(e) => {
                                    formikBag.setFieldValue("email", e.target.value);
                                  }}
                                  error={formikBag.touched.email && formikBag.errors.email ? formikBag.errors.email : null}
                                  className="form-control"
                                  placeholder="Email ID"
                                />
                              </div>
                            )}
                          </Field>
                          {/* <Field name="email">
                              {({ field }) => (
                                <div className="py-1">
                                  <Select
                                    // defaultValue={
                                    //   !isEmpty(formikBag.values.type)
                                    //     ? { label: subscriptionFun(formikBag.values.type), value: formikBag.values.type }
                                    //     : ""
                                    // }
                                    // className="mt-1"
                                    className="select-padding"
                                    style={{ padding: "0.3rem" }}
                                    // options={showUnitOptions}
                                    isSearchable={false}
                                    isClearable={false}
                                    placeholder="Email ID"
                                    onChange={(option) => {
                                      formikBag.setFieldValue("email", option.value);
                                    }}
                                    error={formikBag.touched.type && formikBag.errors.type ? formikBag.errors.type : null}
                                  />
                                </div>
                              )}
                            </Field> */}
                        </div>

                        <div className="col-md-12">
                          <label className={classes.offerLabel}>Mobile Number</label>
                          <Field name="mobile">
                            {({ field }) => (
                              <div className="pb-2 mt-1">
                                {/* <Input
                                    {...field}
                                    type="tel"
                                    variant="outlined"
                                    value={formikBag.values.mobile}
                                    onChange={(e) => {
                                      formikBag.setFieldValue("mobile", e.target.value);
                                    }}
                                    error={formikBag.touched.mobile && formikBag.errors.mobile ? formikBag.errors.mobile : null}
                                    className="form-control"
                                    placeholder="Mobile Number"
                                  /> */}
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
                        </div>

                        <div className="col-md-10" style={{ pointerEvents: formikBag.values._id ? "none" : "" }}>
                          <label className={classes.offerLabel}>Password</label>
                          <Field name="password">
                            {({ field }) => (
                              <div className="pb-2 mt-1">
                                <Input
                                  {...field}
                                  disabled={formikBag.values._id ? true : false}
                                  type="password"
                                  variant="outlined"
                                  value={formikBag.values.password}
                                  onChange={(e) => {
                                    formikBag.setFieldValue("password", e.target.value);
                                  }}
                                  error={
                                    formikBag.touched.password && formikBag.errors.password ? formikBag.errors.password : null
                                  }
                                  className="form-control"
                                  placeholder="Password"
                                />
                              </div>
                            )}
                          </Field>
                        </div>

                        <div className="col-md-1" style={{ pointerEvents: formikBag.values._id ? "none" : "" }}>
                          <label className={classes.offerLabel}></label>
                          <Field name="">
                            {({ field }) => (
                              <div className="d-flex justify-content-center align-items-center pt-2">
                                {/* <Input {...field} type="button" className="form-control" value="Button" /> */}

                                <Tooltip title={<span style={{ fontSize: "18px" }}>Auto Generate Password</span>} arrow>
                                  <Button
                                  // onClick={() => {
                                  //   formikBag.setFieldValue("password", generateP());
                                  // }}
                                  >
                                    <RiLockPasswordFill style={{ fontSize: "22px" }} />
                                  </Button>
                                </Tooltip>
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
