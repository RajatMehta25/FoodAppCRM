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
  PendingApprove,
} from "../UserElements";
import {
  DashWrapper,
  AgentWrapper,
  AgentDetailsBox,
  AgentDetailsBoxTwo,
  AgentInformation,
  AgentInput,
  AgentInputLabel,
  AgentInputText,
  ProfileImageBox,
  ImageBox,
  AgentDataBox,
  AgentDataInput,
} from "./AgentElements";
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
import Input from "../../../components/Input";
import YearInput from "../../../components/YearInput";
import { extractDate } from "../../../utils/functions";
import axios from "../../../axios";
import Overlay from "../../../components/Overlay";
import { toast } from "react-toastify";
import EditIcon from "../../../images/edit_profile_button_table.png";
import DeleteIcon from "../../../images/delete_profile_button_table.png";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

import DummyImg from "../../../images/dummy-img.png";

import * as IoIcons from "react-icons/io";
import * as HiIcons from "react-icons/hi";
import { get, isEmpty } from "lodash";
import classNames from "classnames";
import Select from "../../../components/Select";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions";
import { withRouter, useParams } from "react-router-dom";
// import SearchBar from "material-ui-search-bar";
import { ProductValidator } from "../../../utils/validators";
import TextArea from "../../../components/TextArea";
import FileInput from "../../../components/FileInput";
import { uploadImage } from "../../../utils/functions";
import { FaSearch } from "react-icons/fa";
import BlockIcon from "@material-ui/icons/Block";
import { SearchContainer, SearchBar, SearchIcon, SearchInput } from "../../../components/SearchBar/SearchElements";
import { Modal } from "../../../components/Modal/Modal";

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
  const [agentState, setAgentState] = useState({ isDissaproveAgent: "" });

  useEffect(() => {
    if (!userData) {
      history.push("/adminPanel");
    }
  }, []);

  useEffect(() => {
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
      const { data } = await axios.get(`/admin/users/${params?.id}`);
      setTableData(data.data);
      console.log("approve", data.data.agent_profile);
    } catch (error) {
      console.log(error);
      setUsers("");
      history.push("/adminPanel");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
    }
  };

  const [offerValues, setOfferValues] = useState({
    user_name: get(tableData, "first_name", ""),
    gender: get(tableData, "gender", ""),
    email: get(tableData, "email", ""),
    phone: get(tableData, "phone_number", ""),
    unit_id: get(tableData, "unit_id", ""),
  });

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
    const filteredRows = searchedData.filter((row) => {
      return row.product_name.toLowerCase().includes(searchedVal.target.value.toLowerCase());
    });
    setOffersData(filteredRows);
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

  console.log("bui", subCategoryList);

  const params = useParams();

  const agentApproved = async (e) => {
    // console.log(e);
    if (e.categoryBlocked === true) {
      if (window.confirm("Are you sure you want to approve this agent?")) {
        try {
          await axios.post("/admin/agent-status", {
            agent_id: e.categoryId,
            is_approve: "1",
          });
          toast.success("Agent approved successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        // getCategory();
      }
    } else if (e.categoryBlocked === false) {
      if (window.confirm("Are you sure you want to disapprove this agent?")) {
        try {
          await axios.post("/admin/agent-status", {
            agent_id: e.categoryId,
            is_approve: "3",
            disapproved_reasons: {
              bio: {
                error: true,
                error_message: "bio invalid",
                value: "xyz1",
              },
              address: {
                error: true,
                error_message: "address invalid",
                value: "xyz1",
              },
              license_number: {
                error: true,
                error_message: "license_number invalid",
                value: "xyz1",
              },
              website: {
                error: true,
                error_message: "website invalid",
                value: "xyz1",
              },
            },
          });
          toast.success("Agent disapproved successfully", {
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

  return (
    <>
      <div>
        <DashboardContainer>
          <DashboardWrapper>
            <DashboardHeading>
              <MenuAndBack>
                <BackIcon>
                  <>
                    <HeadingButton
                      style={{
                        fontSize: "1.5rem",
                        padding: "0.2em 0.2em",
                        borderRadius: "32px",
                        justifyContent: "center",
                        marginBottom: "0.4em",
                      }}
                      onClick={() => {
                        history.push("/adminPanel/agent-approve");
                      }}
                    >
                      <IoIcons.IoIosArrowRoundBack />
                    </HeadingButton>
                  </>
                </BackIcon>
                <DashHeading>Agent Details</DashHeading>
              </MenuAndBack>
            </DashboardHeading>

            <Paper className={classes.paperTableHeight} style={{ overflow: "hidden", height: "100%" }}>
              <>
                <RetaurantDetailsForm>
                  <AgentWrapper>
                    <AgentDetailsBox>
                      <ProfileImageBox>
                        <ImageBox src={DummyImg} />
                      </ProfileImageBox>

                      <AgentInformation>
                        <AgentInput>
                          <AgentInputLabel>Agent Name</AgentInputLabel>
                          <AgentInputText>{tableData?.first_name + " " + tableData?.last_name}</AgentInputText>
                        </AgentInput>
                        <AgentInput>
                          <AgentInputLabel>Email ID</AgentInputLabel>
                          <AgentInputText>{tableData?.email}</AgentInputText>
                        </AgentInput>
                        <AgentInput>
                          <AgentInputLabel>Agent Number</AgentInputLabel>
                          <AgentInputText>{tableData?.country_code + " " + tableData?.phone_number}</AgentInputText>
                        </AgentInput>
                        <AgentInput>
                          <AgentInputLabel>Member Since</AgentInputLabel>
                          <AgentInputText> {dateOfJoining(tableData?.createdAt)}</AgentInputText>
                        </AgentInput>
                      </AgentInformation>
                    </AgentDetailsBox>
                    <AgentDetailsBoxTwo>
                      <AgentDataBox>
                        <AgentDataInput>
                          <AgentInputLabel>Address</AgentInputLabel>
                          <AgentInputText>{tableData?.agent_profile?.address ?? "N/A"}</AgentInputText>
                        </AgentDataInput>
                        <AgentDataInput>
                          <AgentInputLabel>Language Fluency</AgentInputLabel>
                          <AgentInputText>
                            {tableData?.agent_profile?.language_fluency?.map((item, index) => `${index ? "," : ""} ${item}`) ??
                              "N/A"}
                          </AgentInputText>
                        </AgentDataInput>
                      </AgentDataBox>

                      <AgentDataBox>
                        <AgentDataInput>
                          <AgentInputLabel>License Number</AgentInputLabel>
                          <AgentInputText>{tableData?.agent_profile?.license_number ?? "N/A"}</AgentInputText>
                        </AgentDataInput>
                        <AgentDataInput>
                          <AgentInputLabel>Blog</AgentInputLabel>
                          <AgentInputText>{tableData?.agent_profile?.blog ?? "N/A"}</AgentInputText>
                        </AgentDataInput>
                      </AgentDataBox>

                      <AgentDataBox>
                        <AgentDataInput>
                          <AgentInputLabel>Website</AgentInputLabel>
                          <AgentInputText>{tableData?.agent_profile?.website ?? "N/A"}</AgentInputText>
                        </AgentDataInput>
                        <AgentDataInput>
                          <AgentInputLabel>Facebook</AgentInputLabel>
                          <AgentInputText>{tableData?.agent_profile?.facebook ?? "N/A"}</AgentInputText>
                        </AgentDataInput>
                      </AgentDataBox>

                      <AgentDataBox>
                        <AgentDataInput>
                          <AgentInputLabel>Buissness Since</AgentInputLabel>
                          <AgentInputText>{tableData?.agent_profile?.business_since ?? "N/A"}</AgentInputText>
                        </AgentDataInput>
                        <AgentDataInput>
                          <AgentInputLabel>Linkedin</AgentInputLabel>
                          <AgentInputText>{tableData?.agent_profile?.linkedin ?? "N/A"}</AgentInputText>
                        </AgentDataInput>
                      </AgentDataBox>

                      <AgentDataBox>
                        <AgentDataInput>
                          <AgentInputLabel>Bio</AgentInputLabel>
                          <AgentInputText>{tableData?.agent_profile?.bio ?? "N/A"}</AgentInputText>
                        </AgentDataInput>
                      </AgentDataBox>
                    </AgentDetailsBoxTwo>
                  </AgentWrapper>
                </RetaurantDetailsForm>
              </>
            </Paper>
          </DashboardWrapper>
        </DashboardContainer>
      </div>

      <Modal
        isOpen={agentState.isDissaproveAgent}
        className="update_profile"
        onClose={() => {
          setAgentState({
            isDissaproveAgent: false,
          });
        }}
        maxWidth="sm"
        title={
          <div className="modalsign">
            <div
              className="closeicon"
              onClick={() => {
                setAgentState({
                  isDissaproveAgent: false,
                });
              }}
            >
              <i className="fas fa-times"></i>
            </div>

            <>
              <h2>Disapprove List</h2>
            </>
          </div>
        }
        content={<></>}
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
