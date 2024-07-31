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
  DisapproveInput,
  DisapproveCheck,
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
import { agentDisapproveValidator } from "../../../utils/validators";
import TextArea from "../../../components/TextArea";
import FileInput from "../../../components/FileInput";
import { uploadImage } from "../../../utils/functions";
import { FaSearch } from "react-icons/fa";
import BlockIcon from "@material-ui/icons/Block";
import { SearchContainer, SearchBar, SearchIcon, SearchInput } from "../../../components/SearchBar/SearchElements";
import { Modal } from "../../../components/Modal/Modal";
import DummyImg from "../../../images/dummy-img.png";

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
  const [dispproveId, setDisapproveId] = useState("");
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

  const [disapproveValues, setDisapproveValues] = useState({
    bio_error: false,
    bio_message: "",
    bio_value: "",
    address_error: false,
    address_message: "",
    address_value: "",
    license_error: false,
    license_message: "",
    license_value: "",
    website_error: false,
    website_message: "",
    website_value: "",
    business_since_error: false,
    business_since_message: "",
    business_since_value: "",
    language_fluency_error: false,
    language_fluency_message: "",
    language_fluency_value: "",
    blog_error: false,
    blog_message: "",
    blog_value: "",
    facebook_error: false,
    facebook_message: "",
    facebook_value: "",
    linkedin_error: false,
    linkedin_message: "",
    linkedin_value: "",
  });

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
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/admin/users/${params?.id}`);
      console.log("buyer", data);
      setTableData(data.data);
      setIsLoading(false);
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
            is_agent_profile: "0",
          });
          toast.success("Agent approved successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          history.push("/adminPanel/agent-approve");
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
            is_agent_profile: "0",
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

  const handleDisapprove = async (values) => {
    console.log(values);

    if (
      (values.address_error && values.address_message) ||
      (values.bio_error && values.bio_message) ||
      (values.blog_error && values.blog_message) ||
      (values.business_since_error && values.business_since_message) ||
      (values.facebook_error && values.facebook_message) ||
      (values.language_fluency_error && values.language_fluency_message) ||
      (values.license_error && values.license_message) ||
      (values.linkedin_error && values.linkedin_message) ||
      (values.website_error && values.website_message)
    ) {
      try {
        await axios.post("/admin/agent-status", {
          agent_id: params?.id,
          is_approve: "3",
          is_agent_profile: "0",
          disapproved_reasons: {
            bio: values.bio_error
              ? {
                  error: values.bio_error,
                  error_message: values.bio_message,
                  value: tableData?.agent_profile?.bio,
                }
              : undefined,
            address: values.address_error
              ? {
                  error: values.address_error,
                  error_message: values.address_message,
                  value: tableData?.agent_profile?.address,
                }
              : undefined,
            license_number: values.license_error
              ? {
                  error: values.license_error,
                  error_message: values.license_message,
                  value: tableData?.agent_profile?.license_number,
                }
              : undefined,
            website: values.website_error
              ? {
                  error: values.website_error,
                  error_message: values.website_message,
                  value: tableData?.agent_profile?.website,
                }
              : undefined,
            business_since: values.business_since_error
              ? {
                  error: values.business_since_error,
                  error_message: values.business_since_message,
                  value: tableData?.agent_profile?.business_since,
                }
              : undefined,
            language_fluency: values.language_fluency_error
              ? {
                  error: values.language_fluency_error,
                  error_message: values.language_fluency_message,
                  value: tableData?.agent_profile?.language_fluency[0],
                }
              : undefined,
            blog: values.blog_error
              ? {
                  error: values.blog_error,
                  error_message: values.blog_message,
                  value: tableData?.agent_profile?.blog,
                }
              : undefined,
            facebook: values.facebook_error
              ? {
                  error: values.facebook_error,
                  error_message: values.facebook_message,
                  value: tableData?.agent_profile?.facebook,
                }
              : undefined,
            linkedin: values.linkedin_error
              ? {
                  error: values.linkedin_error,
                  error_message: values.linkedin_message,
                  value: tableData?.agent_profile?.linkedin,
                }
              : undefined,
          },
        });
        toast.success("Agent disapproved successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setAgentState({
          isDissaproveAgent: false,
        });

        history.push("/adminPanel/agent-disapprove");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please mention the reason for disapprovals");
    }
  };

  const capitalize = (s) => {
    if (s) {
      return s[0]?.toUpperCase() + s?.slice(1);
    } else {
      return "";
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
                        history.push("/adminPanel/agent-pending");
                      }}
                    >
                      <IoIcons.IoIosArrowRoundBack />
                    </HeadingButton>
                  </>
                </BackIcon>
                <DashHeading>Agent Details</DashHeading>
              </MenuAndBack>
              {/* <AgentApprove>
                            <PendingApprove
                            style={{marginRight : '1rem'}}
                              onClick={() => {
                                agentApproved({categoryId:params?.id,categoryBlocked: true});
                            }}                                      
                            >Approve</PendingApprove>
                            <PendingApprove
                            style={{backgroundColor : 'red'}}
                                 onClick={() => {
                                    setAgentState({
                                        isDissaproveAgent: true
                                    });
                            }}               
                            >Disapprove</PendingApprove>
                            </AgentApprove> */}
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
                        <AgentApprove>
                          <PendingApprove
                            style={{ marginRight: "1rem" }}
                            onClick={() => {
                              agentApproved({ categoryId: params?.id, categoryBlocked: true });
                            }}
                          >
                            Approve
                          </PendingApprove>
                          <PendingApprove
                            style={{ backgroundColor: "red" }}
                            onClick={() => {
                              setAgentState({
                                isDissaproveAgent: true,
                              });
                              // agentApproved({categoryId:params?.id,categoryBlocked: false});
                            }}
                          >
                            Disapprove
                          </PendingApprove>
                        </AgentApprove>
                      </AgentInformation>
                    </AgentDetailsBox>
                    <AgentDetailsBoxTwo style={{ padding: "2rem" }}>
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
        content={
          <>
            <Formik
              enableReinitialize
              initialValues={disapproveValues}
              validate={agentDisapproveValidator}
              validateOnChange
              onSubmit={handleDisapprove}
            >
              {(formikBag) => {
                return (
                  <Form>
                    <div className="col-md-12">
                      <DisapproveInput>
                        <DisapproveCheck>
                          <Field name="bio_error">
                            {({ field }) => (
                              <div>
                                <Input
                                  {...field}
                                  type="checkbox"
                                  // value={formikBag.values.terms_check}
                                  onChange={(e) => {
                                    formikBag.setFieldValue("bio_error", !formikBag.values.bio_error);
                                  }}
                                  noBorderBottom={true}
                                  style={{ marginRight: "10px" }}
                                />
                              </div>
                            )}
                          </Field>
                          <label>Bio</label>
                        </DisapproveCheck>
                        <Field name="bio_message">
                          {({ field }) => (
                            <div className="py-2">
                              <Input
                                {...field}
                                type="text"
                                value={capitalize(formikBag.values.bio_message)}
                                onChange={(e) => {
                                  formikBag.setFieldValue("bio_message", e.target.value);
                                }}
                                error={
                                  formikBag.touched.bio_message && formikBag.errors.bio_message
                                    ? formikBag.errors.bio_message
                                    : null
                                }
                                className="form-control"
                                placeholder="Remarks"
                              />
                            </div>
                          )}
                        </Field>
                      </DisapproveInput>
                    </div>
                    <div className="col-md-12">
                      <DisapproveInput>
                        <DisapproveCheck>
                          <Field name="address_error">
                            {({ field }) => (
                              <div>
                                <Input
                                  {...field}
                                  type="checkbox"
                                  // value={formikBag.values.terms_check}
                                  onChange={(e) => {
                                    formikBag.setFieldValue("address_error", !formikBag.values.address_error);
                                  }}
                                  noBorderBottom={true}
                                  style={{ marginRight: "10px" }}
                                />
                              </div>
                            )}
                          </Field>
                          <label>Address</label>
                        </DisapproveCheck>
                        <Field name="address_message">
                          {({ field }) => (
                            <div className="py-2">
                              <Input
                                {...field}
                                type="text"
                                value={capitalize(formikBag.values.address_message)}
                                onChange={(e) => {
                                  formikBag.setFieldValue("address_message", e.target.value);
                                }}
                                error={
                                  formikBag.touched.address_message && formikBag.errors.address_message
                                    ? formikBag.errors.address_message
                                    : null
                                }
                                className="form-control"
                                placeholder="Remarks"
                              />
                            </div>
                          )}
                        </Field>
                      </DisapproveInput>
                    </div>
                    <div className="col-md-12">
                      <DisapproveInput>
                        <DisapproveCheck>
                          <Field name="license_error">
                            {({ field }) => (
                              <div>
                                <Input
                                  {...field}
                                  type="checkbox"
                                  // value={formikBag.values.terms_check}
                                  onChange={(e) => {
                                    formikBag.setFieldValue("license_error", !formikBag.values.license_error);
                                  }}
                                  noBorderBottom={true}
                                  style={{ marginRight: "10px" }}
                                />
                              </div>
                            )}
                          </Field>
                          <label>License Number</label>
                        </DisapproveCheck>
                        <Field name="license_message">
                          {({ field }) => (
                            <div className="py-2">
                              <Input
                                {...field}
                                type="text"
                                value={capitalize(formikBag.values.license_message)}
                                onChange={(e) => {
                                  formikBag.setFieldValue("license_message", e.target.value);
                                }}
                                error={
                                  formikBag.touched.license_message && formikBag.errors.license_message
                                    ? formikBag.errors.license_message
                                    : null
                                }
                                className="form-control"
                                placeholder="Remarks"
                              />
                            </div>
                          )}
                        </Field>
                      </DisapproveInput>
                    </div>
                    <div className="col-md-12">
                      <DisapproveInput>
                        <DisapproveCheck>
                          <Field name="website_error">
                            {({ field }) => (
                              <div>
                                <Input
                                  {...field}
                                  type="checkbox"
                                  // value={formikBag.values.terms_check}
                                  onChange={(e) => {
                                    formikBag.setFieldValue("website_error", !formikBag.values.website_error);
                                  }}
                                  noBorderBottom={true}
                                  style={{ marginRight: "10px" }}
                                />
                              </div>
                            )}
                          </Field>
                          <label>Website</label>
                        </DisapproveCheck>
                        <Field name="website_message">
                          {({ field }) => (
                            <div className="py-2">
                              <Input
                                {...field}
                                type="text"
                                value={capitalize(formikBag.values.website_message)}
                                onChange={(e) => {
                                  formikBag.setFieldValue("website_message", e.target.value);
                                }}
                                error={
                                  formikBag.touched.website_message && formikBag.errors.website_message
                                    ? formikBag.errors.website_message
                                    : null
                                }
                                className="form-control"
                                placeholder="Remarks"
                              />
                            </div>
                          )}
                        </Field>
                      </DisapproveInput>
                    </div>
                    <div className="col-md-12">
                      <DisapproveInput>
                        <DisapproveCheck>
                          <Field name="business_since_error">
                            {({ field }) => (
                              <div>
                                <Input
                                  {...field}
                                  type="checkbox"
                                  // value={formikBag.values.terms_check}
                                  onChange={(e) => {
                                    formikBag.setFieldValue("business_since_error", !formikBag.values.business_since_error);
                                  }}
                                  noBorderBottom={true}
                                  style={{ marginRight: "10px" }}
                                />
                              </div>
                            )}
                          </Field>
                          <label>Business Since</label>
                        </DisapproveCheck>
                        <Field name="business_since_message">
                          {({ field }) => (
                            <div className="py-2">
                              <Input
                                {...field}
                                type="text"
                                value={capitalize(formikBag.values.business_since_message)}
                                onChange={(e) => {
                                  formikBag.setFieldValue("business_since_message", e.target.value);
                                }}
                                error={
                                  formikBag.touched.business_since_message && formikBag.errors.business_since_message
                                    ? formikBag.errors.business_since_message
                                    : null
                                }
                                className="form-control"
                                placeholder="Remarks"
                              />
                            </div>
                          )}
                        </Field>
                      </DisapproveInput>
                    </div>
                    <div className="col-md-12">
                      <DisapproveInput>
                        <DisapproveCheck>
                          <Field name="language_fluency_error">
                            {({ field }) => (
                              <div>
                                <Input
                                  {...field}
                                  type="checkbox"
                                  // value={formikBag.values.terms_check}
                                  onChange={(e) => {
                                    formikBag.setFieldValue("language_fluency_error", !formikBag.values.language_fluency_error);
                                  }}
                                  noBorderBottom={true}
                                  style={{ marginRight: "10px" }}
                                />
                              </div>
                            )}
                          </Field>
                          <label>Language Fluency</label>
                        </DisapproveCheck>
                        <Field name="language_fluency_message">
                          {({ field }) => (
                            <div className="py-2">
                              <Input
                                {...field}
                                type="text"
                                value={capitalize(formikBag.values.language_fluency_message)}
                                onChange={(e) => {
                                  formikBag.setFieldValue("language_fluency_message", e.target.value);
                                }}
                                error={
                                  formikBag.touched.language_fluency_message && formikBag.errors.language_fluency_message
                                    ? formikBag.errors.language_fluency_message
                                    : null
                                }
                                className="form-control"
                                placeholder="Remarks"
                              />
                            </div>
                          )}
                        </Field>
                      </DisapproveInput>
                    </div>
                    <div className="col-md-12">
                      <DisapproveInput>
                        <DisapproveCheck>
                          <Field name="blog_error">
                            {({ field }) => (
                              <div>
                                <Input
                                  {...field}
                                  type="checkbox"
                                  // value={formikBag.values.terms_check}
                                  onChange={(e) => {
                                    formikBag.setFieldValue("blog_error", !formikBag.values.blog_error);
                                  }}
                                  noBorderBottom={true}
                                  style={{ marginRight: "10px" }}
                                />
                              </div>
                            )}
                          </Field>
                          <label>Blog</label>
                        </DisapproveCheck>
                        <Field name="blog_message">
                          {({ field }) => (
                            <div className="py-2">
                              <Input
                                {...field}
                                type="text"
                                value={capitalize(formikBag.values.blog_message)}
                                onChange={(e) => {
                                  formikBag.setFieldValue("blog_message", e.target.value);
                                }}
                                error={
                                  formikBag.touched.blog_message && formikBag.errors.blog_message
                                    ? formikBag.errors.blog_message
                                    : null
                                }
                                className="form-control"
                                placeholder="Remarks"
                              />
                            </div>
                          )}
                        </Field>
                      </DisapproveInput>
                    </div>
                    <div className="col-md-12">
                      <DisapproveInput>
                        <DisapproveCheck>
                          <Field name="facebook_error">
                            {({ field }) => (
                              <div>
                                <Input
                                  {...field}
                                  type="checkbox"
                                  // value={formikBag.values.terms_check}
                                  onChange={(e) => {
                                    formikBag.setFieldValue("facebook_error", !formikBag.values.facebook_error);
                                  }}
                                  noBorderBottom={true}
                                  style={{ marginRight: "10px" }}
                                />
                              </div>
                            )}
                          </Field>
                          <label>Facebook</label>
                        </DisapproveCheck>
                        <Field name="facebook_message">
                          {({ field }) => (
                            <div className="py-2">
                              <Input
                                {...field}
                                type="text"
                                value={capitalize(formikBag.values.facebook_message)}
                                onChange={(e) => {
                                  formikBag.setFieldValue("facebook_message", e.target.value);
                                }}
                                error={
                                  formikBag.touched.facebook_message && formikBag.errors.facebook_message
                                    ? formikBag.errors.facebook_message
                                    : null
                                }
                                className="form-control"
                                placeholder="Remarks"
                              />
                            </div>
                          )}
                        </Field>
                      </DisapproveInput>
                    </div>
                    <div className="col-md-12">
                      <DisapproveInput>
                        <DisapproveCheck>
                          <Field name="linkedin_error">
                            {({ field }) => (
                              <div>
                                <Input
                                  {...field}
                                  type="checkbox"
                                  // value={formikBag.values.terms_check}
                                  onChange={(e) => {
                                    formikBag.setFieldValue("linkedin_error", !formikBag.values.linkedin_error);
                                  }}
                                  noBorderBottom={true}
                                  style={{ marginRight: "10px" }}
                                />
                              </div>
                            )}
                          </Field>
                          <label>Linkedin</label>
                        </DisapproveCheck>
                        <Field name="linkedin_message">
                          {({ field }) => (
                            <div className="py-2">
                              <Input
                                {...field}
                                type="text"
                                value={capitalize(formikBag.values.linkedin_message)}
                                onChange={(e) => {
                                  formikBag.setFieldValue("linkedin_message", e.target.value);
                                }}
                                error={
                                  formikBag.touched.linkedin_message && formikBag.errors.linkedin_message
                                    ? formikBag.errors.linkedin_message
                                    : null
                                }
                                className="form-control"
                                placeholder="Remarks"
                              />
                            </div>
                          )}
                        </Field>
                      </DisapproveInput>
                    </div>

                    <div className="text-center appbtn_center">
                      <LoginButton type="submit">Submit</LoginButton>
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
