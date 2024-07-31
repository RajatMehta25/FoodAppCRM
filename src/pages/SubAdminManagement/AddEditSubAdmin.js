import React, { useState, useEffect ,useRef} from "react";
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
} from "./SubAdminElements";
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
import { useParams, withRouter } from "react-router-dom";
// import SearchBar from "material-ui-search-bar";
import { ProductValidator } from "../../utils/validators";
import TextArea from "../../components/TextArea";
import FileInput from "../../components/FileInput";
import { uploadImage } from "../../utils/functions";
import { FaSearch } from "react-icons/fa";
import BlockIcon from "@material-ui/icons/Block";
import { SearchContainer, SearchBar, SearchIcon, SearchInput } from "../../components/SearchBar/SearchElements";
import PhoneInput from "../../components/PhoneInput";
import { deliveryBoyDataValidator } from "../../utils/validators";
import { RiLockPasswordFill } from "react-icons/ri";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Checkbox } from "@material-ui/core";
import { handleImageUpload } from "../../utils/functions";
import Cookies from "js-cookie";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";


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
    minHeight: "650px",
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
  const { subAdmin_id } = useParams();

  const [deliveryBoyData, setDeliveryBoydata] = useState();
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

  useEffect(() => {
    if (!userData) {
      history.push("/adminPanel");
    }
    console.log(userData);
  }, []);

  useEffect(() => {
    // id && getDeliverBoysList();
    // getOffers();
    // fetchCategoryList();
    // fetchSubcategoryList();
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
      let name = row.first_name + " " + row.last_name;
      let mobileNumber = JSON.stringify(get(row, "phone_number", ""));
      let unitId = JSON.stringify(get(row, "unit_id", ""));
      return (
        name.toLowerCase().includes(searchedVal.target.value.toLowerCase()) ||
        mobileNumber.toLowerCase().includes(searchedVal.target.value.toLowerCase()) ||
        unitId.toLowerCase().includes(searchedVal.target.value.toLowerCase())
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
  const {
    location: { state },
  } = history;
  const [showpassword, setShowPassword] = useState(false);
  const [dialCode, setdialCode] = useState(!state ? "" : state.countryCode.replace(`+`, ""));

  const fileRef = useRef(null);
  const fileRef1 = useRef(null);
  const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];
  const Panes = [
    { panelName: "Dashboard" },
    { panelName: "User Management" },

    { panelName: "Agent Management" },

    { panelName: "Merchant Management" },
    { panelName: "Subscription Plans" },
    { panelName: "Category Management" },
    { panelName: "Order Management" },
    { panelName: "Content Management" },
    { panelName: "SubAdmin Management" },
    { panelName: "Notification Management" },
    {panelName:"Contact Us"}
  ];
  const [panesData, setPanesData] = useState(Panes);
  const [PanesDataFinal, setPanesDataFinal] = useState([]);
  var FinalData;
  const [profileImagepath, setProfileImagepath] = useState("");
  const [documentPath1, setDocumentpath1] = useState("");
  const token = Cookies.get("admin_access_token");
  const handleCheckboxClick = (e) => {
    console.log(e.target);
    const { name, checked } = e.target;
    // console.log(id);

    console.log(name);

    if (name === "ALL") {
      let tempuser = panesData.map((user) => {
        return { ...user, isChecked: checked };
      });
      console.log(tempuser);
      setPanesData(tempuser);
      let SubAdminPanesData = tempuser.filter((user) => user?.isChecked === true);
      FinalData = SubAdminPanesData.map((user) => user?.panelName);
      let filteredvalues = [];
      FinalData.map((user) => {
        if (user === "Dashboard") {
          filteredvalues.push("dashboard");
        }
        if (user === "User Management") {
          filteredvalues.push("user-mgmt");
        }
        if (user === "Agent Management") {
          filteredvalues.push("agent-mgmt");
        }
        if (user === "Merchant Management") {
          filteredvalues.push("merchant-mgmt");
        }
        if (user === "Subscription Plans") {
          filteredvalues.push("subscription-mgmt");
        }
        if (user === "Notification Management") {
          filteredvalues.push("notification-mgmt");
        }
        if (user === "Category Management") {
          filteredvalues.push("category-mgmt");
        }
        if (user === "Order Management") {
          filteredvalues.push("order-mgmt");
        }
        if (user === "Content Management") {
          filteredvalues.push("content-mgmt");
        }
        if (user === "SubAdmin Management") {
          filteredvalues.push("subadmin-mgmt"); 
        }
        if (user === "Contact Us") {
          filteredvalues.push("support-mgmt"); 
        }
       
      });
      // console.log("12554", filteredvalues);
      setPanesDataFinal(filteredvalues);
      //   var SubAdminPanesDataID=SubAdminPanesData.map(user=>user._id);
    } else {
      let tempuser = panesData.map((user) => (user.panelName === name ? { ...user, isChecked: checked } : user));

      setPanesData(tempuser);
      let SubAdminPanesData = tempuser.filter((user) => user?.isChecked === true);
      FinalData = SubAdminPanesData.map((user) => user?.panelName);
      let filteredvalues = [];
      FinalData.map((user) => {
        if (user === "User Management") {
          filteredvalues.push("user-mgmt");
        }
        if (user === "Dashboard") {
          filteredvalues.push("dashboard");
        }
        if (user === "Agent Management") {
          filteredvalues.push("agent-mgmt");
        }
        if (user === "Merchant Management") {
          filteredvalues.push("merchant-mgmt");
        }
        if (user === "Subcription Plans") {
          filteredvalues.push("subscription-mgmt");
        }
        if (user === "Notification Management") {
          filteredvalues.push("notification-mgmt");
        }
        if (user === "Category Management") {
          filteredvalues.push("category-mgmt");
        }
        if (user === "Order Management") {
          filteredvalues.push("order-mgmt");
        }
        if (user === "Content Management") {
          filteredvalues.push("content-mgmt");
        }
        if (user === "SubAdmin Management") {
          filteredvalues.push("subadmin-mgmt");
        }
        if (user === "Contact Us") {
          filteredvalues.push("support-mgmt");
        }
       
      });
      setPanesDataFinal(filteredvalues);

      console.log(FinalData);
      console.log(SubAdminPanesData);
    }
  };
  let stateAccessModule = [];

  useEffect(() => {
    state &&
      state.moduleAccess.map((user) => {
        if (user === "dashboard") {
          stateAccessModule.push("Dashboard");
        }
        if (user === "user-mgmt") {
          stateAccessModule.push("User Management");
        }
        if (user === "agent-mgmt") {
          stateAccessModule.push("Agent Management");
        }
        if (user === "merchant-mgmt") {
          stateAccessModule.push("Merchant Management");
        }
        if (user === "subscription-mgmt") {
          stateAccessModule.push("Subscription Plans");
        }
        if (user === "notification-mgmt") {
          stateAccessModule.push("Notification Management");
        }
        if (user === "category-mgmt") {
          stateAccessModule.push("Category Management");
        }
        if (user === "order-mgmt") {
          stateAccessModule.push("Order Management");
        }
        if (user === "content-mgmt") {
          stateAccessModule.push("Content Management");
        }
        if (user === "subadmin-mgmt") {
          stateAccessModule.push("SubAdmin Management");
        }
        if (user === "support-mgmt") {
          stateAccessModule.push("Contact Us");
        }
      
      });
    state && getcheckboxdata();
  }, []);

  const getcheckboxdata = () => {
    let checkbox0 = [];
    state.moduleAccess.map((user) => {
      if (user === "dashboard") {
        checkbox0.push({ panelName: "Dashboard", isChecked: true });
      }
      if (user === "user-mgmt") {
        checkbox0.push({ panelName: "User Management", isChecked: true });
      }
      if (user === "agent-mgmt") {
        checkbox0.push({ panelName: "Agent Management", isChecked: true });
      }
      if (user === "merchant-mgmt") {
        checkbox0.push({ panelName: "Merchant Management", isChecked: true });
      }
      if (user === "subscription-mgmt") {
        checkbox0.push({ panelName: "Subscription Plans", isChecked: true });
      }
      if (user === "notification-mgmt") {
        checkbox0.push({ panelName: "Notification Management", isChecked: true });
      }
      if (user === "category-mgmt") {
        checkbox0.push({ panelName: "Category Management", isChecked: true });
      }
      if (user === "order-mgmt") {
        checkbox0.push({ panelName: "Order Management", isChecked: true });
      }
      if (user === "content-mgmt") {
        checkbox0.push({ panelName: "Content Management", isChecked: true });
      }
      if (user === "subadmin-mgmt") {
        checkbox0.push({ panelName: "SubAdmin Management", isChecked: true });
      }
      if (user === "support-mgmt") {
        checkbox0.push({ panelName: "Contact Us", isChecked: true });
      }

      return checkbox0;
    });

    let merged = [
      ...checkbox0,
      ...Panes.filter(
        (user) => !stateAccessModule.includes(user.panelName)
        // && !checkbox0.some((c) => c.panelName === user.panelName)
      ),
    ];
    // setPanesDataFinal(stateAccessModule);
    setPanesDataFinal(state.moduleAccess);

    // let checkbox1=checkbox0.concat(Panes)
    // console.log(checkbox1);

    console.log(merged);
    setPanesData(merged);
  };

   
  
  
  const handleSateCheckboxClick = (e) => {
    console.log(e.target);
    const { name, checked, value } = e.target;
    // console.log(id);
    console.log(value);
    console.log(checked);
    console.log(name);

    if (name === "ALL") {
      let tempuser = panesData.map((user) => {
        return { ...user, isChecked: checked };
      });
      console.log(tempuser);
      setPanesData(tempuser);
      let SubAdminPanesData = tempuser.filter((user) => user?.isChecked === true);
      FinalData = SubAdminPanesData.map((user) => user?.panelName);
      let filteredvalues = [];
      FinalData.map((user) => {
        if (user === "User Management") {
          filteredvalues.push("user-mgmt");
        }
        if (user === "Dashboard") {
          filteredvalues.push("dashboard");
        }
        if (user === "Category Management") {
          filteredvalues.push("category-mgmt");
        }
        if (user === "Order Management") {
          filteredvalues.push("order-mgmt");
        }
        if (user === "Subscription Plans") {
          filteredvalues.push("subscription-mgmt");
        }
        if (user === "Notification Management") {
          filteredvalues.push("notification-mgmt");
        }
        if (user === "Merchant Management") {
          filteredvalues.push("merchant-mgmt");
        }
        if (user === "Content Management") {
          filteredvalues.push("content-mgmt");
        }
        if (user === "Agent Management") {
          filteredvalues.push("agent-mgmt");
        }
        if (user === "SubAdmin Management") {
          filteredvalues.push("subadmin-mgmt");
        }
        if (user === "Contact Us") {
          filteredvalues.push("support-mgmt");
        }
       
      });
      setPanesDataFinal(filteredvalues);
    } else {
      let tempuser = panesData.map((user) => (user.panelName === name ? { ...user, isChecked: checked } : user));

      setPanesData(tempuser);
      let SubAdminPanesData = tempuser.filter((user) => user?.isChecked === true);
      console.log(SubAdminPanesData);
      FinalData = SubAdminPanesData.map((user) => user?.panelName);
      let filteredvalues = [];
      FinalData.map((user) => {
        if (user === "User Management") {
          filteredvalues.push("user-mgmt");
        }
        if (user === "Dashboard") {
          filteredvalues.push("dashboard");
        }
        if (user === "Agent Management") {
          filteredvalues.push("agent-mgmt");
        }
        if (user === "Subscription Plans") {
          filteredvalues.push("subscription-mgmt");
        }
        if (user === "Merchant Management") {
          filteredvalues.push("merchant-mgmt");
        }
        if (user === "Notification Management") {
          filteredvalues.push("notification-mgmt");
        }
        if (user === "Order Management") {
          filteredvalues.push("order-mgmt");
        }
        if (user === "Category Management") {
          filteredvalues.push("category-mgmt");
        }
        if (user === "Content Management") {
          filteredvalues.push("content-mgmt");
        }
        if (user === "SubAdmin Management") {
          filteredvalues.push("subadmin-mgmt");
        }
        if (user === "Contact Us") {
          filteredvalues.push("support-mgmt");
        }
       
      });
      console.log(FinalData);
      setPanesDataFinal(filteredvalues);

      console.log();
      console.log(SubAdminPanesData);
    }
  };

  const addNewSubAdmin = async (values) => {
    try {
      let profileimageurl = profileImagepath;
      let documentimageurl = documentPath1;
      console.log(profileimageurl);
      console.log(documentimageurl);

      console.log(values);

      console.log(PanesDataFinal);
      const { data } = await axios.post("/admin/createSubAdmin", {
        fullName: values.name,
        email: values.email,
        mobileNumber: values.phone,
        password: values.password,
        // subAdmin_id: values.sub_admin_id,
        profilePhoto: profileimageurl,
        countryCode: `+${dialCode}`,

        moduleAccess: PanesDataFinal,
      });
      history.push({
        pathname: "/adminPanel/subAdmin",
      });
      toast.success("SubAdmin created successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const EditSubAdmin = async (values) => {
    try {
      let profileimageurl = values.file1;
      let documentimageurl = values.file2;
      console.log(profileimageurl);
      console.log(documentimageurl);

      console.log(values);

      console.log(PanesDataFinal);
      const { data } = await axios.post("/admin/updateSubAdmin", {
        _id: state._id,
        fullName: values.name || state.fullName,
        email: values.email || state.email,
        mobileNumber: values.phone || state.mobileNumber,
        // subAdmin_id: values.sub_admin_id || state.subAdmin_id,
        // password: values.password || state.password,
        profilePhoto: profileimageurl || state.profilePhoto,
        countryCode: state.country_code || `+${dialCode}`,
        // sub_admin_document: documentimageurl,
        moduleAccess: PanesDataFinal,
      });
      history.push({
        pathname: "/adminPanel/subAdmin",
      });
      toast.success("Updated", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
console.log("stateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",state)
  return (
    <>
      <div>
        <DashboardContainer>
          <DashboardWrapper>
            <DashboardHeading>
              <MenuAndBack>
              <ArrowBackIosIcon
                  style={{ color: "black", margin: "0rem 1rem", cursor: "pointer" }}
                  onClick={() => history.push({ pathname: "/adminPanel/subAdmin", state: state })}
                />
                <DashHeading>{subAdmin_id ? `Edit SubAdmin` : `Add SubAdmin`}</DashHeading>
              </MenuAndBack>

              {/* <SearchBar
                                className={classes.searchDesign}
                                value={searched}
                                onChange={(searchVal) => requestSearch(searchVal)}
                                onCancelSearch={() => cancelSearch()}
                                placeholder="Search by Product Name"
                                 /> */}
            </DashboardHeading>

            <Paper
            className={classes.paperTableHeight}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    <Formik
                      // validationSchema={validationSchema}
                      initialValues={{
                        name: get(state, "fullName", ""),
                        email: get(state, "email", ""),
                        password: get(state, "password", ""),
                        phone: get(state, "mobileNumber", ""),
                        // sub_admin_id: get(state, "subAdmin_id", ""),
                        file1: get(state, "profilePhoto", ""),
                        // file2: get(state, "sub_admin_document", ""),
                        //  all: get(state, "access", ""),
                      }}
                      onSubmit={(values) => {
                        console.log(values);
                        if (state && state !== "") {
                          if (PanesDataFinal.length < 1) {
                            alert("Please Select atleast one Panel");
                          } else {
                            EditSubAdmin(values);
                          }
                        } else if (PanesDataFinal.length < 1) {
                          alert("Please Select atleast one Panel");
                        } else {
                          addNewSubAdmin(values);
                        }
                      }}
                    >
                      {({ values, setFieldValue }) => (
                        <Form>
                          <Paper elevation={0} className="px-5">
                            <br />
                            <br />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                                gap: "1.5%",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-evenly",
                                  gap: "0.5%",
                                  alignItems: "baseline",
                                }}
                              >
                                <label className="" style={{}}>
                                  Name:
                                </label>
                                <Field
                                  className=""
                                  name="name"
                                  // variant="outlined"
                                  type="text"
                                  // inputProps={{name: "name"}}

                                  style={{
                                    width: 300,
                                    height: 35,
                                    borderRadius: 5,
                                    borderColor: "#d3d3d3",
                                    borderStyle: "solid",
                                    borderWidth: 1,
                                    paddingInlineStart: 10,
                                  }}
                                />

                                {/* <KErrorMessage name="name" /> */}
                                <br />
                                {/* <br /> */}
                                <label className="" style={{}}>
                                  Email:
                                </label>

                                <Field
                                  className=""
                                  name="email"
                                  type="email"
                                  autoComplete="off"
                                  style={{
                                    width: 300,
                                    height: 35,
                                    borderRadius: 5,
                                    borderColor: "#d3d3d3",
                                    borderStyle: "solid",
                                    borderWidth: 1,
                                    paddingInlineStart: 10,
                                  }}
                                  disabled={!state ? false : true}
                                />

                                {/* <KErrorMessage name="email" /> */}
                                <br />
                                {/* <br /> */}
                                {!state ? (
                                  <>
                                    <label>Upload Profile Image:</label>
                                    <input
                                      ref={fileRef}
                                      name="file1"
                                      hidden
                                      type="file"
                                      accept="image/png, image/jpeg , image/jpg"
                                      onChange={async (e) => {
                                        let data = await handleImageUpload(e.target.files[0]);
                                        // let data2 = await useNewHook(
                                        //   e.target.files[0]
                                        // );
                                        // console.log(data2);
                                        // setDataFile(e.target.files[0]);
                                        setFieldValue("file1", data);
                                        setProfileImagepath(data);
                                      }}
                                    />
                                    <div style={{ display: "flex", gap: "20px",alignItems:"center" }}>
                                      {" "}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          fileRef.current.click();
                                        }}
                                        style={{
                                          borderRadius: "5px",
                                          backgroundColor: "#bb2649",
                                          color: "white",
                                          border: "none",
                                          padding: "5px",
                                          maxHeight: "32px",
                                        }}
                                      >
                                        Upload
                                      </button>
                                      {
                                        // values.file && typeof values.file === "object" ? (
                                        //   <PreviewImage file={values.file} />
                                        // ) : (
                                        !state && profileImagepath !== "" && (
                                          <img src={profileImagepath} alt="..." style={{ width: "50px", height: "50px" }} />
                                        )
                                      }
                                      {state && values.file1 !== "" && (
                                        <img src={values.file1} alt="..." style={{ width: "50px", height: "50px" }} />
                                      )}
                                    </div>
                                    {/* <KErrorMessage name="file1" /> */}
                                  </>
                                ) : (
                                  ""
                                )}
                                <br />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  // justifyContent: "space-evenly",
                                  // gap: "0.5%",
                                  alignItems: "baseline",
                                }}
                              >
                                {!state ? (
                                  <>
                                    <label style={{}}>Password:</label>
                                    <div className="d-flex flex-row align-items-center">
                                      <Field
                                        name="password"
                                        type={showpassword ? "text" : "password"}
                                        autoComplete="off"
                                        style={{
                                          width: 300,
                                          height: 35,
                                          borderRadius: 5,
                                          borderColor: "#d3d3d3",
                                          borderStyle: "solid",
                                          borderWidth: 1,
                                          paddingInlineStart: 10,
                                        }}
                                      />
                                      {showpassword ? (
                                        <Visibility onClick={() => setShowPassword(false)} style={{ cursor: "pointer" }} />
                                      ) : (
                                        <VisibilityOffIcon
                                          onClick={() => setShowPassword(true)}
                                          style={{ cursor: "pointer" }}
                                        />
                                      )}
                                    </div>
                                    {/* <KErrorMessage name="password" /> */}
                                  </>
                                ) : (
                                  ""
                                )}
                                {!state ? <br /> : ""}
                                {/* <br /> */}
                                <label
                                // style={!state ? {} : { marginTop: "-1.4rem" }}
                                >
                                  Phone:
                                </label>
                                <PhoneInput
                                  country={"us"}
                                  containerStyle={{}}
                                  inputProps={{
                                    //  name: 'phone',
                                    required: true,

                                    // autoFocus: true
                                  }}
                                  value={values.phone}
                                  onChange={(e, c) => {
                                    setFieldValue("phone", e);
                                    setdialCode(c.dialCode);
                                  }}
                                  name="phone"
                                  required
                                />
                                {/* <Field name="phone" type="number" /> */}
                                {/* <KErrorMessage name="phone" /> */}
                                <br />
                                {!state ? (
                                  ""
                                ) : (
                                  <>
                                    <label>Upload Profile Image:</label>
                                    <input
                                      ref={fileRef}
                                      name="file1"
                                      hidden
                                      type="file"
                                      accept="image/png, image/jpeg , image/jpg"
                                      onChange={async (e) => {
                                        let data = await handleImageUpload(e.target.files[0]);
                                        // let data2 = await useNewHook(
                                        //   e.target.files[0]
                                        // );
                                        // console.log(data2);
                                        // setDataFile(e.target.files[0]);
                                        setFieldValue("file1", data);
                                        setProfileImagepath(data);
                                      }}
                                    />
                                    <div style={{ display: "flex", gap: "20px",alignItems:"center" }}>
                                      {" "}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          fileRef.current.click();
                                        }}
                                        style={{
                                          borderRadius: "5px",
                                          backgroundColor: "#bb2649",
                                          color: "white",
                                          border: "none",
                                          padding: "5px",
                                          maxHeight: "32px",
                                        }}
                                      >
                                        Upload
                                      </button>
                                      {
                                        // values.file && typeof values.file === "object" ? (
                                        //   <PreviewImage file={values.file} />
                                        // ) : (
                                        !state && profileImagepath !== "" && (
                                          <img src={profileImagepath} alt="..." style={{ width: "50px", height: "50px" }} />
                                        )
                                      }
                                      {state && values.file1 !== "" && (
                                        <img src={values.file1} alt="..." style={{ width: "50px", height: "50px" }} />
                                      )}
                                    </div>
                                    {/* <KErrorMessage name="file1" /> */}
                                  </>
                                )}
                              </div>
                            </div>
                            {/* <div style={{textAlign:"center"}}>
                            <label style={{ fontSize: "20px",display:"block"}}>
                              Sub-Admin Id :
                            </label>
                            <Field name="sub_admin_id" type="text" style={{width: 300, height: 35,borderRadius:5,borderColor:"#d3d3d3",borderStyle:"solid",borderWidth:1}} />
                            <KErrorMessage name="sub_admin_id" />
                            <br/>
                          </div> */}
                            {/* <br />
                            <br /> */}
                            {/* <br /> */}
                            {/* <div
                              style={{
                                display: !state ? "none" : "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                gap: "1.5%",
                                alignItems: "center",
                                
                              }}
                            >
                              <label style={{}}>Upload Profile Image :</label>
                              <input
                                ref={fileRef}
                                name="file1"
                                hidden
                                type="file"
                                accept="image/png, image/jpeg , image/jpg"
                                onChange={async (e) => {
                                  let data = await handleImageUpload(e.target.files[0]);
                                 
                                  setFieldValue("file1", data);
                                  setProfileImagepath(data);
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  fileRef.current.click();
                                }}
                                style={{
                                  borderRadius: "5px",
                                  backgroundColor: "#0e3f37",
                                  color: "white",
                                  border: "none",
                                  padding: "5px",
                                }}
                              >
                                Upload
                              </button>
                              <KErrorMessage name="file1" />
                             {
                                !state && profileImagepath !== "" && (
                                  <img src={profileImagepath} alt="..." style={{ width: "50px", height: "50px" }} />
                                )
                              }
                              {state && values.file1 !== "" && (
                                <img src={values.file1} alt="..." style={{ width: "50px", height: "50px" }} />
                              )}

                              <br />
                              <br />
                            </div> */}
                            {/* <br /> */}
                            {/* <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              gap: "1.5%",
                              alignItems: "baseline",
                            }}
                          >
                            <label style={{ fontSize: "20px" }}>
                              Upload Document :
                            </label>
                            <input
                              ref={fileRef1}
                              name="file2"
                              hidden
                              type="file"
                              onChange={async(e) => {
                                let data1 = await handleImageUpload(e.target.files[0]);
                                setFieldValue("file2", data1);
                                setDocumentpath1(data1);
                              }}
                            />
                            <button
                            type="button"
                              onClick={() => {
                                fileRef1.current.click();
                              }}
                              style={{
                                borderRadius: "5px",
                                backgroundColor: "navy",
                                color: "white",
                                border:"none",
                                padding: "5px",
                              }}
                            >
                              Upload
                            </button>
                            <KErrorMessage name="file2" />
                            {
                            documentPath1!=="" &&  (
                             <a href={documentPath1} target="_blank" rel="noopener noreferrer" > <Tooltip title="Click to View" arrow><Description  style={{ width: "50px", height: "50px" }}/></Tooltip></a>
                            )}
                             { state&&values.file2!=="" &&  (
                             <a href={values.file2} target="_blank" rel="noopener noreferrer" ><Tooltip title="Click to View" arrow><Description  style={{ width: "50px", height: "50px" }}/></Tooltip></a>
                            )}
                           
                            <br />
                            <br />
                          </div> */}
                            {/* <br />
                            <br /> */}
                            {/* <br /> */}
                          </Paper>
                          {/* <br />
                          <br /> */}
                          <Paper elevation={0} >
                            <br />
                            <br />
                            <label
                              style={{
                                fontSize: "20px",
                                display: "block",
                                textAlign: "center",
                              }}
                            >
                              Access for Panels :
                            </label>
                            <br />
                            <div
                            className="checkboxColor"
                              style={{
                                // display:"flex",flexWrap:"wrap",justifyContent:"space-between",gap:"10%",margin:"5px 20px 5px 20px"
                                display: "grid",
                                gridTemplateColumns: "auto auto auto",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  marginRight: 20,
                                  marginLeft: 20,
                                  alignItems: "center",
                                }}
                              >
                                <Checkbox
                                  // className="checkedcolor"

                                  color="primary"
                                  name="ALL"
                                  checked={panesData.filter((user) => user?.isChecked !== true).length < 1}
                                  onChange={handleCheckboxClick}
                                />

                                <label style={{}}>Select All</label>
                              </div>
                              {!state
                                ? panesData.map((pane, index) => (
                                    <>
                                      <div
                                        style={{
                                          display: "flex",
                                          marginRight: 20,
                                          marginLeft: 20,
                                          alignItems: "center",
                                        }}
                                      >
                                        <Checkbox
                                          key={index}
                                          // className="checkedcolor"
                                          color="primary"
                                          name={pane.panelName}
                                          checked={pane?.isChecked || false}
                                          onChange={handleCheckboxClick}
                                        />
                                        <label style={{ display: "block" }} key={index + 1}>
                                          {pane.panelName}
                                        </label>
                                      </div>
                                    </>
                                  ))
                                : panesData.map((pane, index) => (
                                    <>
                                      <div
                                        style={{
                                          display: "flex",
                                          marginRight: 20,
                                          marginLeft: 20,
                                          alignItems: "center",
                                        }}
                                      >
                                        <Checkbox
                                          key={index}
                                          color="primary"
                                          name={pane.panelName}
                                          checked={pane?.isChecked || false}
                                          onChange={handleSateCheckboxClick}
                                          value={pane.panelName}
                                        />
                                        <label style={{ display: "block" }} key={index + 1}>
                                          {pane.panelName}
                                        </label>
                                      </div>
                                    </>
                                  ))}
                            </div>
                          <br/>
                          </Paper>
                          {/* <KErrorMessage  /> */}
                       
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              padding:"1rem 0rem"
                            }}
                          >
                            <button
                              type="submit"
                              className="buttoncss"
                              style={{
                                borderRadius: "0.5rem",
                                border: "none",
                                fontSize: "1rem",
                                width: "15vw",
                                height: "5vh",
                                backgroundColor: "#bb2649",
                                color: "#fff",
                              }}
                            >
                              SAVE
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
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
