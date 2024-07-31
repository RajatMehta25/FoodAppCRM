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
import { withRouter, useParams } from "react-router-dom";
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
import { Checkbox } from "@material-ui/core";
import {
  Card1,
  Card1_row1,
  Card1_row2,
  Card1_row3,
  Card1_row3_component,
  Card2,
  Card2_row1,
  Card2_row1s,
  Card2_row2,
  Card2_row2_Component,
  Card2_row2_Component_div1,
  Card2_row2_Component_div2,
  CardContainer,
  CardDescription,
  CardDescriptionData,
  CardDivision,
  CardImages,
  CardImages_ImageDiv,
  CardLeft,
  CardNormal,
  CardRight,
  CardRight_row1,
  CardRight_row2,
  CardRight_row2_Component,
  CardRight_row2_Component_div1,
  CardRight_row2_Component_div2,
  CardShopTimingComponent,
  CardShopTimingData,
  CardShopTimingHeaders,
  CartOneImage,
  InnerCardDivision,
  ShopTitle,
} from "./MerchantElements";
import ShopPlaceholder from "../../images/shopPlaceholder.jpg";
import { AiOutlineClose } from "react-icons/ai";
import { Modal } from "../../components/Modal";
import { disapproveValidator } from "../../utils/validators";
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
  let { merchant_id } = useParams();
  const [openModalImageZoom,setOpenModalImageZoom]=useState(false);
  const [imageZoomed,setImageZoomed]=useState("")
  const [openModal, setOpenModal] = useState(false);
  const [address, setAddresses] = useState();
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
  console.log("history", history);
  console.log("state", state);
  useEffect(() => {
    if (!userData) {
      history.push("/adminPanel");
    }
  }, []);

  useEffect(() => {
    merchant_id && getMerchantList();
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
      if (window.confirm("Are you sure you want to unblock this merchant?")) {
        try {
          await axios.post("/admin/updatemerchant", {
            _id: e.categoryId,
            isBlocked: false,
          });
          getMerchantList();
          toast.success("Merchant unblocked successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        // getCategory();
      }
    } else if (e.categoryBlocked === false) {
      if (window.confirm("Are you sure you want to block this merchant?")) {
        try {
          await axios.post("/admin/updatemerchant", {
            _id: e.categoryId,
            isBlocked: true,
          });
          getMerchantList();
          toast.success("Merchant blocked successfully", {
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
    try {
      const { data } = await axios.get(`/admin/listmerchants?id=${merchant_id}&approvalStatus=approved`);
      setTableData(data.data[0]);
      setSearchedData(data.data[0]);
      //   Gen_Add(data.data[0].shop.lat, data.data[0].shop.long);
      if (data.data.length === 0) {
        toast.error("No Data Found", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      if (err.response.status === 401 || err.response.status === 500) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
      }
    }
  };
  function Gen_Add(lat, lng) {
    console.log(lat);
    // setIsLoading(true);
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        lat +
        "," +
        lng +
        "&key=" +
        "AIzaSyAzWEYgzHRBWRwOJktxPWSJr4zTTZyxBdw&libraries"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        //   setIsLoading(false);
        console.log("address", responseJson);
        // console.log("ADDRESS GEOCODE is BACK!! => " + JSON.stringify(responseJson.results[0].formatted_address).slice(1, -1));
        setAddresses(JSON.stringify(responseJson?.results[0]?.formatted_address).slice(1, -1));
      });
  }
  const approveMerchant = async (id) => {
    try {
      const { data } = await axios.post(`/admin/updatemerchant`, {
        _id: id,

        approvalStatus: "approved",
      });
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      // getMerchantList();
    } catch (error) {
      console.log(error);
    }
  };
  // const disapproveMerchant = async (id) => {
  //   try {
  //     const { data } = await axios.post(`/admin/updatemerchant`, {
  //       _id: id,

  //       approvalStatus: "rejected",
  //     });
  //     toast.success(data.message, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //     getMerchantList();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Disapprove
  const handleDisapprove = async (values) => {
    console.log("hi");
    console.log(values);
    let RejectionReasons = [
      // values.firstNameCheck === true
      //   ? {
      //       key: "firstName",
      //       // color: "optional",
      //       // value: "Aditya112",
      //       reason: values.firstName,
      //     }
      //   : undefined,
      // values.lastNameCheck === true
      //   ? {
      //       key: "lastName",
      //       // color: "optional",
      //       // value: "Aditya112",
      //       reason: values.lastName,
      //     }
      //   : undefined,
      values.businessNameCheck === true
        ? {
            key: "shop.name",
            // color: "optional",
            // value: "Aditya112",
            reason: values.businessName,
          }
        : undefined,
      // values.mobileNumberCheck === true
      //   ? {
      //       key: "mobileNumber",
      //       // color: "optional",
      //       // value: "Aditya112",
      //       reason: values.mobileNumber,
      //     }
      //   : undefined,
      values.businessNumberCheck === true
        ? {
            key: "shop.mobileNumber",
            // color: "optional",
            // value: "Aditya112",
            reason: values.businessNumber,
          }
        : undefined,
      // values.emailCheck === true
      //   ? {
      //       key: "email",
      //       // color: "optional",
      //       // value: "Aditya112",
      //       reason: values.email,
      //     }
      //   : undefined,
      values.bannerImageCheck === true
        ? {
            key: "shop.bannerImage",
            // color: "optional",
            // value: "Aditya112",
            reason: values.bannerImage,
          }
        : undefined,
      values.websiteCheck === true
        ? {
            key: "shop.website",
            // color: "optional",
            // value: "Aditya112",
            reason: values.website,
          }
        : undefined,
      values.addressCheck === true
        ? {
            key: "shop.address",
            // color: "optional",
            // value: "Aditya112",
            reason: values.address,
          }
        : undefined,
      values.postcodeCheck === true
        ? {
            key: "shop.postcode",
            // color: "optional",
            // value: "Aditya112",
            reason: values.postcode,
          }
        : undefined,
      values.shopInformationCheck === true
        ? {
            key: "shop.description",
            // color: "optional",
            // value: "Aditya112",
            reason: values.shopInformation,
          }
        : undefined,
      values.Image1Check === true
        ? {
            key: "shop.images[0]",
            // color: "optional",
            // value: "Aditya112",
            reason: values.Image1,
          }
        : undefined,
      values.Image2Check === true
        ? {
            key: "shop.images[1]",
            // color: "optional",
            // value: "Aditya112",
            reason: values.Image2,
          }
        : undefined,
      values.Image3Check === true
        ? {
            key: "shop.images[2]",
            // color: "optional",
            // value: "Aditya112",
            reason: values.Image3,
          }
        : undefined,
      values.Image4Check === true
        ? {
            key: "shop.images[3]",
            // color: "optional",
            // value: "Aditya112",
            reason: values.Image4,
          }
        : undefined,
      values.Image5Check === true
        ? {
            key: "shop.images[4]",
            // color: "optional",
            // value: "Aditya112",
            reason: values.Image5,
          }
        : undefined,
      values.Image6Check === true
        ? {
            key: "shop.images[5]",
            // color: "optional",
            // value: "Aditya112",
            reason: values.Image6,
          }
        : undefined,
      values.Image7Check === true
        ? {
            key: "shop.images[6]",
            // color: "optional",
            // value: "Aditya112",
            reason: values.Image7,
          }
        : undefined,
      values.Image8Check === true
        ? {
            key: "shop.images[7]",
            // color: "optional",
            // value: "Aditya112",
            reason: values.Image8,
          }
        : undefined,
      // {
      //   key: "shop.images[1]",
      //   color: "optional",
      //   value: "http://paytm.com/",
      //   reason: "invalid image",
      // },
      // {
      //   key: "dateOfBirth",
      //   color: "optional",
      //   value: "66/66/66",
      //   reason: "invalid date",
      // },
      // {
      //   key: "shop.images[1]",
      //   color: "optional",
      //   value: "http://paytm.com/",
      //   reason: "blur image",
      // },
      // {
      //   key: "shop.timing.openingTime",
      //   value: "usbkjsbk",
      //   color: "optional",
      //   reason: "invalid time",
      // },
      // {
      //   key: "shop.timing.days",
      //   value: "usbkjsbk",
      //   color: "optional",
      //   reason: "invalid time",
      // },
    ];
    let submitData = RejectionReasons.filter(Boolean);
    const submitValues = {
      _id: tableData._id,
      isBlocked: false,
      approvalStatus: "rejected",
      rejectedReason: submitData,
    };

    console.log("formValues", submitValues);
    if (
      // !values.firstNameCheck &&
      // !values.lastNameCheck &&
      !values.businessNameCheck &&
      // !values.emailCheck &&
      // !values.mobileNumberCheck &&
      !values.businessNumberCheck &&
      // !values.emailCheck &&
      !values.bannerImageCheck &&
      !values.websiteCheck &&
      !values.postcodeCheck &&
      !values.shopInformationCheck &&
      !values.addressCheck &&
      !values.Image1Check &&
      !values.Image2Check &&
      !values.Image3Check &&
      !values.Image4Check &&
      !values.Image5Check &&
      !values.Image6Check &&
      !values.Image7Check &&
      !values.Image8Check
    ) {
      return alert("Please select at least one checkbox");
    } else {
      try {
        const { data } = await axios.post("/admin/updatemerchant", submitValues);
        console.log(data);
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setOpenModal(false);
        // props.history.push({
        //   pathname: "/account-managment-new",
        //   state7: state.userType._id,
        // });
      } catch (error) {
        console.log(error);
      }
    }
  };
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
                <DashHeading>Merchants Details</DashHeading>
              </MenuAndBack>
            </DashboardHeading>

            <Paper className={classes.paperTableHeight} style={{ overflow: "scroll", height: "100%" }}>
            <CardContainer>
                <ShopTitle>
                  Shop Name: <i style={{ color: "black" }}>{get(tableData, "shop.name", "N/A")}</i>
                </ShopTitle>
                <CardDivision>
                  <InnerCardDivision>
                    <CardLeft>
                      <Card1>
                        <Card1_row1>
                          <CartOneImage
                            src={get(tableData, "shop.bannerImage", ShopPlaceholder)}
                            alt="banner"
                            // style={{ width: "200px", height: "200px" }}
                          />
                        </Card1_row1>
                        {/* <Card1_row2>{get(tableData, "shop.name", "N/A")}</Card1_row2> */}
                        <Card1_row3>
                          <Card1_row3_component>
                            <div>4</div>
                            <div>Total</div>
                          </Card1_row3_component>
                          <Card1_row3_component>
                            <div>4</div>
                            <div>Completed</div>
                          </Card1_row3_component>
                          <Card1_row3_component>
                            <div>4</div>
                            <div>Cancelled</div>
                          </Card1_row3_component>
                        </Card1_row3>
                      
                      </Card1>
                      <Card2>
                        <Card2_row1>About Me</Card2_row1>
                        <Card2_row2>
                          <Card2_row2_Component>
                            <Card2_row2_Component_div1>Merchant ID</Card2_row2_Component_div1>
                            <Card2_row2_Component_div2>{get(tableData, "sequenceId", "N/A")}</Card2_row2_Component_div2>
                          </Card2_row2_Component>
                          <Card2_row2_Component>
                            <Card2_row2_Component_div1>Joining Date</Card2_row2_Component_div1>
                            <Card2_row2_Component_div2>
                              {moment(tableData?.createdAt).format("MM-DD-YYYY")}
                            </Card2_row2_Component_div2>
                          </Card2_row2_Component>
                          <Card2_row2_Component>
                            <Card2_row2_Component_div1>Merchant Name</Card2_row2_Component_div1>
                            <Card2_row2_Component_div2>
                              {get(tableData, "firstName", "")}
                              {get(tableData, "lastName ", "N/A")}
                            </Card2_row2_Component_div2>
                          </Card2_row2_Component>
                          <Card2_row2_Component>
                            <Card2_row2_Component_div1>Mobile Number</Card2_row2_Component_div1>
                            <Card2_row2_Component_div2>
                              {get(tableData, "countryCode", "")}
                              {get(tableData, "mobileNumber", "N/A")}
                            </Card2_row2_Component_div2>
                          </Card2_row2_Component>
                          <Card2_row2_Component>
                            <Card2_row2_Component_div1>Email ID</Card2_row2_Component_div1>
                            <Card2_row2_Component_div2>{!get(tableData, "email", "N/A")?"N/A":get(tableData, "email", "N/A")}</Card2_row2_Component_div2>
                          </Card2_row2_Component>
                          <Card2_row2_Component>
                            <Card2_row2_Component_div1>Plan Name</Card2_row2_Component_div1>
                            <Card2_row2_Component_div2>
                              {get(tableData, "subscription.activePlan.planName", "N/A")}
                            </Card2_row2_Component_div2>
                          </Card2_row2_Component>
                        </Card2_row2>
                      </Card2>
                    </CardLeft>
                    <CardRight>
                      <CardRight_row1>
                        <Card2_row1s>Address</Card2_row1s>
                        <p>{get(tableData, "shop.address", "N/A")}</p>
                      </CardRight_row1>
                      <CardRight_row2>
                        <CardRight_row2_Component>
                          <CardRight_row2_Component_div1>Mobile Number</CardRight_row2_Component_div1>
                          <CardRight_row2_Component_div2>
                            {get(tableData, "countryCode", "")}
                            {get(tableData, "mobileNumber", "N/A")}
                          </CardRight_row2_Component_div2>
                        </CardRight_row2_Component>

                        <CardRight_row2_Component>
                          <CardRight_row2_Component_div1>Website</CardRight_row2_Component_div1>
                          <CardRight_row2_Component_div2>{get(tableData, "shop.website", "N/A")}</CardRight_row2_Component_div2>
                        </CardRight_row2_Component>
                        <CardRight_row2_Component>
                          <CardRight_row2_Component_div1>Postcode</CardRight_row2_Component_div1>
                          <CardRight_row2_Component_div2>
                            {get(tableData, "shop.postcode", "N/A")}
                          </CardRight_row2_Component_div2>
                        </CardRight_row2_Component>
                        <CardRight_row2_Component>
                          <CardRight_row2_Component_div1>Category</CardRight_row2_Component_div1>
                          <CardRight_row2_Component_div2>
                            <div style={{textTransform:"capitalize"}}>
                            {get(tableData, "shop.category.name", "N/A")}
                            </div>
                          </CardRight_row2_Component_div2>
                        </CardRight_row2_Component>
                        <CardShopTimingComponent>
                           <Card2_row1s>Shop Timings</Card2_row1s>
                           <CardRight_row2_Component>
                                <CardShopTimingHeaders>Days</CardShopTimingHeaders>
                                <CardShopTimingHeaders>
                             {`Open - Close`}
                                </CardShopTimingHeaders>
                              </CardRight_row2_Component>
                           </CardShopTimingComponent>
                        {tableData?.shop?.timing[0]?.days == "all"
                          ? 
                          <CardRight_row2_Component>
                          <CardShopTimingData><div style={{textTransform:"capitalize"}}>All</div></CardShopTimingData>
                          <CardShopTimingData>
                          {tableData?.shop.timing[0].openingTime}-{tableData?.shop.timing[0].closingTime}
                            {/* <div style={{ display: "flex", gap: "0.5rem" }}>
                              <div style={{ textAlign: "center" }}>{ele.openingTime}</div>
                              <div style={{ textAlign: "center" }}>{ele.closingTime}</div>
                            </div> */}
                          </CardShopTimingData>
                        </CardRight_row2_Component>
                          
                         
                          : <>    
                           {/* <CardShopTimingComponent>
                           <Card2_row1s>Shop Timings</Card2_row1s>
                           <CardRight_row2_Component>
                                <CardShopTimingHeaders>Days</CardShopTimingHeaders>
                                <CardShopTimingHeaders>
                             {`Open - Close`}
                                </CardShopTimingHeaders>
                              </CardRight_row2_Component>
                           </CardShopTimingComponent> */}
                           {tableData?.shop?.timing.map((ele) => (
                            
                        
                              <CardRight_row2_Component>
                                <CardShopTimingData><div style={{textTransform:"capitalize"}}>{ele.days}</div></CardShopTimingData>
                                <CardShopTimingData>
                                {ele.openingTime}-{ele.closingTime}
                                  {/* <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <div style={{ textAlign: "center" }}>{ele.openingTime}</div>
                                    <div style={{ textAlign: "center" }}>{ele.closingTime}</div>
                                  </div> */}
                                </CardShopTimingData>
                              </CardRight_row2_Component>
                              
                            ))}</>}
                      </CardRight_row2>
                    </CardRight>
                  </InnerCardDivision>
                </CardDivision>
                <CardDescription  >
                        <Card2_row1s>Shop Description</Card2_row1s>
                     
                      <CardDescriptionData>{get(tableData, "shop.description", "N/A")}</CardDescriptionData>
                      </CardDescription>
                <CardImages>
                <Card2_row1s>Shop Images</Card2_row1s>
                 <CardImages_ImageDiv> {tableData?.shop?.images.length > 0
                    ? tableData?.shop?.images.map((ele) => (
                      <img src={ele} alt="image" style={{ width: "100px", height: "100px",cursor:"pointer",borderRadius:"5px" }} onClick={()=>{setImageZoomed(ele);setOpenModalImageZoom(true)}} />
                      ))
                    : "N/A"}</CardImages_ImageDiv>
                </CardImages>
              </CardContainer>
            </Paper>
          </DashboardWrapper>
        </DashboardContainer>
      </div>
      <Modal
        maxWidth="lg"
        width="440px"
        isOpen={openModal}
        onClose={(event, reason) => {
          if (reason && (reason === "backdropClick" || "escapeKeyDown")) {
            console.log(reason);
            setOpenModal(true);
          } else {
            setOpenModal(false);
            // setSelectedPetCategoryData(null);
          }
          // setModalState({
          //   isAddEditTaxiSingle: false,
          // });
          // setSelectedTaxiDataAddEdit(null);
        }}
        backgroundModal={false}
        backgroundModalContent={false}
        title={
          <div>
            <div
              className="my-3"
              style={{ textAlign: "center", fontWeight: "bold", fontSize: "22px", fontFamily: "'DM Sans', sans-serif" }}
            >
              Disapprove
            </div>
            <div className="">
              <AiOutlineClose
                style={{
                  fontSize: "1.5rem",
                  position: "absolute",
                  top: 5,
                  right: 2,
                  color: "#fff",
                  borderRadius: "50%",
                  backgroundColor: "red",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setOpenModal(false);
                  // setSelectedPetCategoryData(null);
                }}
              />
            </div>
          </div>
        }
        content={
          <>
            <Formik
              enableReinitialize
              key={tableData}
              // validationSchema={validationSchema}
              initialValues={{
                // firstNameCheck: false,
                // lastNameCheck: false,
                // mobileNumberCheck: false,
                // emailCheck: false,
                bannerImageCheck: false,
                businessNameCheck: false,
                businessNumberCheck: false,
                websiteCheck: false,
                addressCheck: false,
                postcodeCheck: false,
                shopInformationCheck: false,
                Image1Check: false,
                Image2Check: false,
                Image3Check: false,
                Image4Check: false,
                Image5Check: false,
                Image6Check: false,
                Image7Check: false,
                Image8Check: false,
                // firstName: "",
                // lastName: "",
                // mobileNumber: "",
                // email: "",
                bannerImage: "",
                businessName: "",
                businessNumber: "",
                website: "",
                address: "",
                postcode: "",
                shopInformation: "",
                Image1: "",
                Image2: "",
                Image3: "",
                Image4: "",
                Image5: "",
                Image6: "",
                Image7: "",
                Image8: "",
              }}
              validate={(values) => disapproveValidator(values)}
              onSubmit={(values) => {
                handleDisapprove(values);
                console.log(values);
                // if (selectedPetCategoryData !== null) {
                // EditPetCategoryImage(values);
                // updateLanguageData(values);
                // EditBannerImage(values);
                // EditTaxiSingle(values);
                // } else {
                // addNewPetCategoryImage(values);
                // addNewBanner(values);
                // addNewTaxiSingle(values);
                console.log("gadbad");
                // }
              }}
            >
              {(formikBag) => (
                <Form style={{ width: "100%" }}>
                  <div className="container">
                    {/* <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {" "}
                        <Field name="firstNameCheck">
                          {({ field }) => (
                            <div style={{ display: "flex" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("firstNameCheck", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.firstNameCheck && formikBag.errors.firstNameCheck
                                    ? formikBag.errors.firstNameCheck
                                    : null
                                }
                                className="form-control"
                              />
                              <label>First name</label>
                            </div>
                          )}
                        </Field>
                        <Field name="firstName">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="text"
                              onChange={(e) => {
                                formikBag.setFieldValue("firstName", e.target.value);
                              }}
                              error={
                                formikBag.touched.firstName && formikBag.errors.firstName ? formikBag.errors.firstName : null
                              }
                              placeholder={"Reason"}
                              className="form-control"
                            />
                          )}
                        </Field>
                      </div>
                    </div> */}
                    {/* <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {" "}
                        <Field name="lastNameCheck">
                          {({ field }) => (
                            <div style={{ display: "flex" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("lastNameCheck", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.firstNameCheck && formikBag.errors.firstNameCheck
                                    ? formikBag.errors.firstNameCheck
                                    : null
                                }
                                className="form-control"
                              />
                              <label>Last name</label>
                            </div>
                          )}
                        </Field>
                        <Field name="lastName">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="text"
                              onChange={(e) => {
                                formikBag.setFieldValue("lastName", e.target.value);
                              }}
                              error={formikBag.touched.lastName && formikBag.errors.lastName ? formikBag.errors.lastName : null}
                              placeholder={"Reason"}
                              className="form-control"
                            />
                          )}
                        </Field>
                      </div>
                    </div> */}
                    <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {" "}
                        <Field name="businessNameCheck">
                          {({ field }) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("businessNameCheck", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.businessNameCheck && formikBag.errors.businessNameCheck
                                    ? formikBag.errors.businessNameCheck
                                    : null
                                }
                                className="form-control"
                              />
                              <label>Shop Name</label>
                            </div>
                          )}
                        </Field>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          {" "}
                          <Field name="businessName">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                onChange={(e) => {
                                  formikBag.setFieldValue("businessName", e.target.value);
                                }}
                                error={
                                  formikBag.touched.businessName && formikBag.errors.businessName
                                    ? formikBag.errors.businessName
                                    : null
                                }
                                placeholder={"Reason"}
                                className="form-control"
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {" "}
                        <Field name="mobileNumberCheck">
                          {({ field }) => (
                            <div style={{ display: "flex" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("mobileNumberCheck", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.mobileNumberCheck && formikBag.errors.mobileNumberCheck
                                    ? formikBag.errors.mobileNumberCheck
                                    : null
                                }
                                className="form-control"
                              />
                              <label>Mobile Number</label>
                            </div>
                          )}
                        </Field>
                        <Field name="mobileNumber">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="text"
                              onChange={(e) => {
                                formikBag.setFieldValue("mobileNumber", e.target.value);
                              }}
                              error={
                                formikBag.touched.mobileNumber && formikBag.errors.mobileNumber
                                  ? formikBag.errors.mobileNumber
                                  : null
                              }
                              placeholder={"Reason"}
                              className="form-control"
                            />
                          )}
                        </Field>
                      </div>
                    </div> */}
                    <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {" "}
                        <Field name="businessNumberCheck">
                          {({ field }) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("businessNumberCheck", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.businessNumberCheck && formikBag.errors.businessNumberCheck
                                    ? formikBag.errors.businessNumberCheck
                                    : null
                                }
                                className="form-control"
                              />
                              <label>Shop Number</label>
                            </div>
                          )}
                        </Field>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <Field name="businessNumber">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                onChange={(e) => {
                                  formikBag.setFieldValue("businessNumber", e.target.value);
                                }}
                                error={
                                  formikBag.touched.businessNumber && formikBag.errors.businessNumber
                                    ? formikBag.errors.businessNumber
                                    : null
                                }
                                placeholder={"Reason"}
                                className="form-control"
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {" "}
                        <Field name="emailCheck">
                          {({ field }) => (
                            <div style={{ display: "flex" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("emailCheck", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.emailCheck && formikBag.errors.emailCheck
                                    ? formikBag.errors.emailCheck
                                    : null
                                }
                                className="form-control"
                              />
                              <label>Email ID</label>
                            </div>
                          )}
                        </Field>
                        <Field name="email">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="text"
                              onChange={(e) => {
                                formikBag.setFieldValue("email", e.target.value);
                              }}
                              error={formikBag.touched.email && formikBag.errors.email ? formikBag.errors.email : null}
                              placeholder={"Reason"}
                              className="form-control"
                            />
                          )}
                        </Field>
                      </div>
                    </div> */}
                    <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {" "}
                        <Field name="bannerImageCheck">
                          {({ field }) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("bannerImageCheck", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.bannerImageCheck && formikBag.errors.bannerImageCheck
                                    ? formikBag.errors.bannerImageCheck
                                    : null
                                }
                                className="form-control"
                              />
                              <label>Banner Image</label>
                            </div>
                          )}
                        </Field>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <Field name="bannerImage">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                onChange={(e) => {
                                  formikBag.setFieldValue("bannerImage", e.target.value);
                                }}
                                error={
                                  formikBag.touched.bannerImage && formikBag.errors.bannerImage
                                    ? formikBag.errors.bannerImage
                                    : null
                                }
                                placeholder={"Reason"}
                                className="form-control"
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {" "}
                        <Field name="websiteCheck">
                          {({ field }) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("websiteCheck", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.websiteCheck && formikBag.errors.websiteCheck
                                    ? formikBag.errors.websiteCheck
                                    : null
                                }
                                className="form-control"
                              />
                              <label>Website</label>
                            </div>
                          )}
                        </Field>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <Field name="website">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                onChange={(e) => {
                                  formikBag.setFieldValue("website", e.target.value);
                                }}
                                error={
                                  formikBag.touched.bannerImage && formikBag.errors.bannerImage
                                    ? formikBag.errors.bannerImage
                                    : null
                                }
                                placeholder={"Reason"}
                                className="form-control"
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {" "}
                        <Field name="addressCheck">
                          {({ field }) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("addressCheck", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.addressCheck && formikBag.errors.addressCheck
                                    ? formikBag.errors.addressCheck
                                    : null
                                }
                                className="form-control"
                              />
                              <label>Address</label>
                            </div>
                          )}
                        </Field>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <Field name="address">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                onChange={(e) => {
                                  formikBag.setFieldValue("address", e.target.value);
                                }}
                                error={formikBag.touched.address && formikBag.errors.address ? formikBag.errors.address : null}
                                placeholder={"Reason"}
                                className="form-control"
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {" "}
                        <Field name="postcodeCheck">
                          {({ field }) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("postcodeCheck", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.postcodeCheck && formikBag.errors.postcodeCheck
                                    ? formikBag.errors.postcodeCheck
                                    : null
                                }
                                className="form-control"
                              />
                              <label>Postcode</label>
                            </div>
                          )}
                        </Field>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <Field name="postcode">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                onChange={(e) => {
                                  formikBag.setFieldValue("postcode", e.target.value);
                                }}
                                error={
                                  formikBag.touched.postcode && formikBag.errors.postcode ? formikBag.errors.postcode : null
                                }
                                placeholder={"Reason"}
                                className="form-control"
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {" "}
                        <Field name="shopInformationCheck">
                          {({ field }) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("shopInformationCheck", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.shopInformationCheck && formikBag.errors.shopInformationCheck
                                    ? formikBag.errors.shopInformationCheck
                                    : null
                                }
                                className="form-control"
                              />
                              <label>Shop Information</label>
                            </div>
                          )}
                        </Field>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <Field name="shopInformation">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                onChange={(e) => {
                                  formikBag.setFieldValue("shopInformation", e.target.value);
                                }}
                                error={
                                  formikBag.touched.shopInformation && formikBag.errors.shopInformation
                                    ? formikBag.errors.shopInformation
                                    : null
                                }
                                placeholder={"Reason"}
                                className="form-control"
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {" "}
                        <Field name="Image1Check">
                          {({ field }) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("Image1Check", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.Image1Check && formikBag.errors.Image1Check
                                    ? formikBag.errors.Image1Check
                                    : null
                                }
                                className="form-control"
                              />
                              <label>Image 1</label>
                            </div>
                          )}
                        </Field>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <Field name="Image1">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                onChange={(e) => {
                                  formikBag.setFieldValue("Image1", e.target.value);
                                }}
                                error={formikBag.touched.Image1 && formikBag.errors.Image1 ? formikBag.errors.Image1 : null}
                                placeholder={"Reason"}
                                className="form-control"
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {" "}
                        <Field name="Image2Check">
                          {({ field }) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("Image2Check", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.Image2Check && formikBag.errors.Image2Check
                                    ? formikBag.errors.Image2Check
                                    : null
                                }
                                className="form-control"
                              />
                              <label>Image 2</label>
                            </div>
                          )}
                        </Field>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <Field name="Image2">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                onChange={(e) => {
                                  formikBag.setFieldValue("Image2", e.target.value);
                                }}
                                error={formikBag.touched.Image2 && formikBag.errors.Image2 ? formikBag.errors.Image2 : null}
                                placeholder={"Reason"}
                                className="form-control"
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {" "}
                        <Field name="Image3Check">
                          {({ field }) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("Image3Check", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.Image3Check && formikBag.errors.Image3Check
                                    ? formikBag.errors.Image3Check
                                    : null
                                }
                                className="form-control"
                              />
                              <label>Image 3</label>
                            </div>
                          )}
                        </Field>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <Field name="Image3">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                onChange={(e) => {
                                  formikBag.setFieldValue("Image3", e.target.value);
                                }}
                                error={formikBag.touched.Image3 && formikBag.errors.Image3 ? formikBag.errors.Image3 : null}
                                placeholder={"Reason"}
                                className="form-control"
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {" "}
                        <Field name="Image4Check">
                          {({ field }) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("Image4Check", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.Image4Check && formikBag.errors.Image4Check
                                    ? formikBag.errors.Image4Check
                                    : null
                                }
                                className="form-control"
                              />
                              <label>Image 4</label>
                            </div>
                          )}
                        </Field>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <Field name="Image4">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                onChange={(e) => {
                                  formikBag.setFieldValue("Image4", e.target.value);
                                }}
                                error={formikBag.touched.Image4 && formikBag.errors.Image4 ? formikBag.errors.Image4 : null}
                                placeholder={"Reason"}
                                className="form-control"
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {" "}
                        <Field name="Image5Check">
                          {({ field }) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("Image5Check", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.Image5Check && formikBag.errors.Image5Check
                                    ? formikBag.errors.Image5Check
                                    : null
                                }
                                className="form-control"
                              />
                              <label>Image 5</label>
                            </div>
                          )}
                        </Field>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <Field name="Image5">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                onChange={(e) => {
                                  formikBag.setFieldValue("Image5", e.target.value);
                                }}
                                error={formikBag.touched.Image5 && formikBag.errors.Image5 ? formikBag.errors.Image5 : null}
                                placeholder={"Reason"}
                                className="form-control"
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {" "}
                        <Field name="Image6Check">
                          {({ field }) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("Image6Check", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.Image6Check && formikBag.errors.Image6Check
                                    ? formikBag.errors.Image6Check
                                    : null
                                }
                                className="form-control"
                              />
                              <label>Image 6</label>
                            </div>
                          )}
                        </Field>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <Field name="Image6">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                onChange={(e) => {
                                  formikBag.setFieldValue("Image6", e.target.value);
                                }}
                                error={formikBag.touched.Image6 && formikBag.errors.Image6 ? formikBag.errors.Image6 : null}
                                placeholder={"Reason"}
                                className="form-control"
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {" "}
                        <Field name="Image7Check">
                          {({ field }) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("Image7Check", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.Image7Check && formikBag.errors.Image7Check
                                    ? formikBag.errors.Image7Check
                                    : null
                                }
                                className="form-control"
                              />
                              <label>Image 7</label>
                            </div>
                          )}
                        </Field>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <Field name="Image7">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                onChange={(e) => {
                                  formikBag.setFieldValue("Image7", e.target.value);
                                }}
                                error={formikBag.touched.Image7 && formikBag.errors.Image7 ? formikBag.errors.Image7 : null}
                                placeholder={"Reason"}
                                className="form-control"
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row my-3">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {" "}
                        <Field name="Image8Check">
                          {({ field }) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Input
                                {...field}
                                type="checkbox"
                                onChange={(e) => {
                                  formikBag.setFieldValue("Image8Check", e.target.checked);
                                }}
                                error={
                                  formikBag.touched.Image8Check && formikBag.errors.Image8Check
                                    ? formikBag.errors.Image8Check
                                    : null
                                }
                                className="form-control"
                              />
                              <label>Image 8</label>
                            </div>
                          )}
                        </Field>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <Field name="Image8">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                onChange={(e) => {
                                  formikBag.setFieldValue("Image8", e.target.value);
                                }}
                                error={formikBag.touched.Image8 && formikBag.errors.Image8 ? formikBag.errors.Image8 : null}
                                placeholder={"Reason"}
                                className="form-control"
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row my-3">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label>Pet Name :</label>
                          <Field name="name">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                onChange={(e) => {
                                  formikBag.setFieldValue("name", e.target.value);
                                }}
                                error={formikBag.touched.name && formikBag.errors.name ? formikBag.errors.name : null}
                                className="form-control"
                                placeholder={"Enter Pet Name"}
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-6 mt-3 d-flex justify-content-center align-items-center">
                    

                        <Field name="ImageLink">
                          {({ field }) => (
                            <>
                              <img
                                {...field}
                                alt="pet image"
                                src={formikBag.values.ImageLink}
                                style={{
                                  width: 240,
                                  height: 140,
                                }}
                                // error={
                                //   formikBag.touched.description && formikBag.errors.description
                                //     ? formikBag.errors.description
                                //     : null
                                // }
                                className="form-control"
                                // placeholder={"Enter Description"}
                              />
                            </>
                          )}
                        </Field>
                      </div>
                    </div> */}

                    {/* <div className="row my-3">
                      <div className="col-md-6">
                     
                      </div>
                    </div> */}
                  </div>

                  {/* <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button type="submit" className="SaveButton buttoncss">
                      SAVE
                    </button>
                    {console.log(formikBag.errors)}
                  </div> */}
                  <div className="row mt-3">
                    <div className="col-md-12" style={{ display: "flex", justifyContent: "center" }}>
                      <HeadingButton type="submit" style={{ padding: "1em 3.3em" }}>
                        Save
                      </HeadingButton>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        }
      />
        <Modal
        maxWidth="lg"
        width="540px"
        isOpen={openModalImageZoom}
        RoundedCorners={true}
        onClose={(event, reason) => {
          if (reason && (reason === "backdropClick" || "escapeKeyDown")) {
            console.log(reason);
            setOpenModalImageZoom(true);
          } else {
            setOpenModalImageZoom(false);
            // setSelectedPetCategoryData(null);
          }
          // setModalState({
          //   isAddEditTaxiSingle: false,
          // });
          // setSelectedTaxiDataAddEdit(null);
        }}
        backgroundModal={false}
        backgroundModalContent={false}
        title={
          <div>
            <div
              className="my-3"
              style={{ textAlign: "center", fontWeight: "bold", fontSize: "22px", fontFamily: "'DM Sans', sans-serif" }}
            >
              Image
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
                  setOpenModalImageZoom(false);
                  // setSelectedPetCategoryData(null);
                }}
              />
            </div>
          </div>
        }
        content={
          <>
           <img src={imageZoomed} alt="Image" style={{width:"100%"}} />
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
