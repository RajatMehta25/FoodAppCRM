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
} from "./CategoryElements";
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
  Switch,
  styled,
} from "@material-ui/core";
import {handleImageUpload} from "../../utils/functions"

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
const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
  ({ theme }) => ({
    width: 42,
    height: 24,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.mode === "dark" ? "#32cd32" : "#32cd32",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#f70f07",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  })
);
const OfferManagement = ({ history, setUsers, userData }) => {
  const classes = useStyles();
  const exportRef = useRef(null);
  const [openModal,setOpenModal]=useState(false)
  const [CategoryData, setCategoryData] = useState({
    name: "",
    //  icon: get(CategoryData, "icon", ""),
    // icon:"",
    //  editIcon: "",
    
    file:[],
    _id:""
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


  useEffect(() => {
    if (!userData) {
      history.push("/adminPanel");
    }
    console.log(userData);
  }, []);

  useEffect(() => {
    getCategoryList();
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
      let name = row.name;
      // let mobileNumber = JSON.stringify(get(row, "mobileNumber", ""));
      // let unitId = JSON.stringify(get(row, "sequenceId", ""));
      return name.toLowerCase().includes(searchedVal.target.value.toLowerCase());
      // mobileNumber.toLowerCase().includes(searchedVal.target.value.toLowerCase()) ||
      // unitId.toLowerCase().includes(searchedVal.target.value.toLowerCase())
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

  const getCategoryList = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/admin/listCategories`);
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

  const DeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
    try {
      const { data } = await axios.post(`/admin/deleteCategory`, { _id: id });
      toast.success(`${data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      // getDeliverBoysList();
      getCategoryList();
    } catch (err) {
      console.log(err);
    }
  }else{
    toast.error(`Error`, {
      position: toast.POSITION.TOP_RIGHT,
    });
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
  const statusSwitch = async (e, category) => {
    // console.log("category",category)
    // if (window.confirm("Are you sure you want to change the status?")) {
    try {
      const { data } = await axios.post(`/admin/updateCategory`, {
        _id: category._id,
        isActive: e.target.checked ? true : false,
      });

      console.log(data);
      // console.log(e.target.checked);
      toast.success(data.data.isActive == 1 ? "Activated" : "Deactivated", {
        position: toast.POSITION.TOP_RIGHT,
      });
      getCategoryList();
    } catch (error) {
      console.log(error);
    }
    // } else {
    // toast.error("Please add fare first", {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
    // }
  };
  const handleSubmit = async (values) => {
    console.log(values);
    // if (!id) {
    //   //add profile

      let addUrl = `/admin/addCategory`;
      let categoryData;

      categoryData = {
        name: values.name,
        icon: values.file[0],
      };

      try {
        const { data } = await axios.post(addUrl, categoryData);
        console.log(data);
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setOpenModal(false)
        getCategoryList();
        setCategoryData({
          name: "",
          
                 file:[],
       _id:""})
      } catch (err) {
        if (err.response.status == "400") {
          toast.error(`${err.response.data.message}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
   
      }
    // } else {
  
    // }
  };
  const handleEditCategory=async(values)=>{
  //   //update profile

      let updateUrl = `/admin/updateCategory`;
      let categoryData;

      categoryData = {
        _id: values._id,
        name: values.name,
        icon: values.file[0],
      };

      try {
        const { data } = await axios.post(updateUrl, categoryData);
        console.log(data);
        toast.success(`${data.code == 200 ? "Success" : data.code}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setOpenModal(false)
        getCategoryList();
        setCategoryData({
          name: "",
            
                 file:[],
       _id:""})
      } catch (err) {
        if (err.response.status == "400") {
          toast.error(`${err.response.data.message}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        console.log(err.response);
      }
  }
  return (
    <>
      <div>
        <DashboardContainer>
          <DashboardWrapper>
            <DashboardHeading>
              <MenuAndBack>
                <DashHeading>Category Management</DashHeading>
              </MenuAndBack>

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
                <Tooltip title={<span style={{ color: "white", fontSize: "16px" }}>Create Category </span>} arrow>
                  <IconButton
                    className=""
                    style={{
                      background: "transparent linear-gradient(90deg, #bb2649 0%, #c44f6a 100%) 0% 0% no-repeat padding-box",
                      color: "#fff",
                    }}
                    onClick={() => {
                      // history.push({
                      //   pathname: `/adminPanel/category/AddEditCategory`,
                      // });
                      setOpenModal(true)
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </DashboardHeading>

            <Paper className={classes.paperTableHeight} style={{ overflow: "hidden", height: "100%", marginBottom: "0.5rem" }}>
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
                        direction={orderBy === "planName" ? order : "asc"}
                        onClick={() => {
                          handleSortRequest("planName");
                        }}
                        > */}
                          Category Icon
                        {/* </TableSortLabel> */}
                      </TableCell>
                      {/* <TableCell className={classes.tablePadding}>Agent Id</TableCell> */}
                      <TableCell className={classes.tablePadding}>
                        <TableSortLabel
                          active={true}
                          direction={orderBy === "name" ? order : "asc"}
                          onClick={() => {
                            handleSortRequest("name");
                          }}
                        >
                          Category Name
                        </TableSortLabel>
                      </TableCell>
                      <TableCell className={classes.tablePadding}>Status</TableCell>
                      {/* <TableCell className={classes.tablePadding}>
                        <TableSortLabel
                          active={true}
                          direction={orderBy === "price" ? order : "asc"}
                          onClick={() => {
                            handleSortRequest("price");
                          }}
                        >
                          Price
                        </TableSortLabel>
                      </TableCell> */}
                      {/* <TableCell className={classes.tablePadding}>
                        <TableSortLabel
                          active={true}
                          direction={orderBy === "planType" ? order : "asc"}
                          onClick={() => {
                            handleSortRequest("planType");
                          }}
                        >
                          Time Period
                        </TableSortLabel>
                      </TableCell> */}

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
                          <img src={get(category, "icon", "")} alt="icon" style={{ width: "30px", height: "30px" }} />
                        </TableCell>
                        <TableCell className={classes.textMiddle}>
                          <div>{get(category, "name", "")}</div>
                        </TableCell>
                        <TableCell className={classes.textMiddle} style={{ textAlign: "center" }}>
                          <Tooltip
                            title={
                              <span className="TooltipCustomSize">{`${
                                category?.isActive == true ? "Active" : "Inactive"
                              }`}</span>
                            }
                            arrow
                          >
                            <div>
                              <input
                                onChange={(e) => {
                                  statusSwitch(e, category);
                                }}
                                checked={category.isActive}
                                style={{ display: "none" }}
                                className="switchbox"
                                type="checkbox"
                                id={"item" + category._id}
                              />
                              <label className="switchCheck" htmlFor={"item" + category._id}></label>
                            </div>
                            {/* <>
                                    <Switch
                                      // onChange={(e, checked) => {
                                      //   console.log(checked)
                                      //   statusSwitch(checked, category);
                                      // }}
                                      // checked={category.isActive == true ? true : false}
                                    />
                                  </> */}
                          </Tooltip>
                        </TableCell>
                        {/* <TableCell className={classes.textMiddle} style={{ textTransform: "capitalize" }}>
                          <div>{get(category, "price", "")}</div>
                        </TableCell> */}

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
                                  // history.push({
                                  //   // pathname: `/adminPanel/user/${category.id}`,
                                  //   pathname: `/adminPanel/category/AddEditCategory/${category._id}`,
                                  // });
                                  setCategoryData({
                                    name: get(category, "name", ""),
                                  
                                    // icon:"",
                                    //  editIcon: get(category, "icon", ""),
                                    
                                    file: [category?.icon],
                                    _id:get(category,"_id","")
                                  })
                                  setOpenModal(true)
                                }}
                               
                              >
                                <Edit color="primary" />
                              </Button>
                            </Tooltip>
                          </div>
                          {/* <div>
                            <Tooltip title="Delete" arrow>
                              <Button
                                // variant="outlined"
                                aria-label="add"
                                className={classes.Marginbutton}
                                onClick={() => {
                                  DeleteCategory(category._id);
                                }}
                              >
                                <DeleteOutline />
                              </Button>
                            </Tooltip>
                          </div> */}
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
        width="440px"
        RoundedCorners={true}
        isOpen={openModal}
        // RoundedCorners={true}
        onClose={(event, reason) => {
          setOpenModal(false);
          setCategoryData({
             name: "",
                  //  icon:"",
          //  editIcon: "",
                    file:[],
          _id:""})
          // if (reason && (reason === "backdropClick" || "escapeKeyDown")) {
          //   console.log(reason);
          //   setOpenModal(true);
          // } else {
          //   setOpenModal(false);
        
          }
       
        }
        backgroundModal={false}
        backgroundModalContent={false}
        title={
          <div>
            <div
              className="my-3"
              style={{ textAlign: "center", fontWeight: "bold", fontSize: "22px", fontFamily: "'DM Sans', sans-serif" }}
            >
              {!CategoryData._id?`Add Category`:`Edit Category`}
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
                  // setSelectedPetCategoryData(null);
                }}
              />
            </div>
          </div>
        }
        content={
          <>
            <Formik
                 key={CategoryData}
                enableReinitialize
                initialValues={CategoryData}
                // validate={SubscriptionDataValidator}
                validateOnChange
                // onSubmit={handleSubmit}
                onSubmit={(values) => {
                  if(values._id) {
                   handleEditCategory(values);
                  } else {
                    handleSubmit(values);
                  }

                }}
              >
                {(formikBag) => {
                  return (
                    <Form style={{ margin: "1rem 1rem 0 1rem" }}>
                      <div className="signup-cont">
                        <div className="row">
                          {/* <div className="col-md-12"> */}
                          <div className="col-md-12">
                            <label className={classes.offerLabel}>Category Name</label>
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
                                    placeholder="Category Name"
                                  />
                                </div>
                              )}
                            </Field>
                          </div>
                          <div className="col-md-12">
                              <label>Category Image</label>
                              <Field name="file">
                                  {({ field }) => (
                                      <div className="py-2">

                                          <FileInput
                                              id="facility_images"
                                              limit="1"
                                              dictionary="dictionary"
                                              images={formikBag.values.file}
                                              onDelete={(image) => {
                                                  var images = [...formikBag.values.file];
                                                  images.splice(images.indexOf(image), 1);
                                                  formikBag.setFieldValue('file', images)

                                              }}
                                              type="text"
                                              label="upload_products_facility_photos"
                                              info="eg_img"
                                              onChange={async (e) => {
                                                  const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
                                                  if (fileSize > 2) {
                                                      alert("ex_2mb");
                                                      // $(file).val(''); //for clearing with Jquery
                                                  } else {
                                                      // setIsLoading(true);
                                                      var image = await handleImageUpload(e.target.files[0]);
                                                      var images = [...formikBag.values.file];
                                                      console.log("images..........",images.path)
                                                      images.push(image);
                                                      formikBag.setFieldValue('file', images)

                                                      // setIsLoading(false);
                                                  }
                                              }}
                                              error={
                                                  formikBag.touched.file &&
                                                      formikBag.errors.file
                                                      ? formikBag.errors.file
                                                      : null
                                              }
                                          />
                                      </div>
                                  )}
                              </Field>
                          </div>

                     

                          {/* <div className="row">
                            <div className="col-md-12">
                              <label className={classes.offerLabel}>Features</label>
                              <Field name="feature1">
                                {({ field }) => (
                                  <div className="pb-2 mt-1">
                                    <Input
                                      {...field}
                                      type="test"
                                      variant="outlined"
                                      value={formikBag.values.feature1}
                                      onChange={(e) => {
                                        formikBag.setFieldValue("feature1", e.target.value);
                                      }}
                                      error={
                                        formikBag.touched.feature1 && formikBag.errors.feature1
                                          ? formikBag.errors.feature1
                                          : null
                                      }
                                      className="form-control"
                                      placeholder="First Feature"
                                    />
                                  </div>
                                )}
                              </Field>

                              <Field name="feature2">
                                {({ field }) => (
                                  <div className="pb-2 mt-1">
                                    <Input
                                      {...field}
                                      type="test"
                                      variant="outlined"
                                      value={formikBag.values.feature2}
                                      onChange={(e) => {
                                        formikBag.setFieldValue("feature2", e.target.value);
                                      }}
                                      error={
                                        formikBag.touched.feature2 && formikBag.errors.feature2
                                          ? formikBag.errors.feature2
                                          : null
                                      }
                                      className="form-control"
                                      placeholder="Second Feature"
                                    />
                                  </div>
                                )}
                              </Field>

                              <Field name="feature3">
                                {({ field }) => (
                                  <div className="pb-2 mt-1">
                                    <Input
                                      {...field}
                                      type="test"
                                      variant="outlined"
                                      value={formikBag.values.feature3}
                                      onChange={(e) => {
                                        formikBag.setFieldValue("feature3", e.target.value);
                                      }}
                                      error={
                                        formikBag.touched.feature3 && formikBag.errors.feature3
                                          ? formikBag.errors.feature3
                                          : null
                                      }
                                      className="form-control"
                                      placeholder="Third Feature "
                                    />
                                  </div>
                                )}
                              </Field>
                            </div>
                          </div> */}
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
