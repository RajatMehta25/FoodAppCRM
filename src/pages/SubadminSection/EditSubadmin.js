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
  AdminModuleWrap,
  ModuleText,
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
import { withRouter, useParams, useHistory } from "react-router-dom";
// import SearchBar from "material-ui-search-bar";
import { ProductValidator } from "../../utils/validators";
import TextArea from "../../components/TextArea";
import FileInput from "../../components/FileInput";
import { uploadImage } from "../../utils/functions";
import { FaSearch } from "react-icons/fa";
import BlockIcon from "@material-ui/icons/Block";
import { prescripValidator } from "../../utils/validators";
import PhoneInput from "react-phone-input-2";
import {
  SearchContainer,
  SearchBar,
  SearchIcon,
  SearchInput,
} from "../../components/SearchBar/SearchElements";
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

  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [peopleInfo, setPeopleInfo] = useState([
    {
      id: "",
      first: "",
    },
  ]);

  const [updateBranchFormValues, setBranchFormValues] = useState({
    first_name: get(tableData, "first_name", ""),
    last_name: "",
    email: "",
    password: "",
    access_module: "",
    whole_number: "",
    country_code: "",
    mobile_number: "",
  });

  const params = useParams();

  useEffect(() => {
    if (!userData) {
      history.push("/adminPanel");
    }
  }, []);

  useEffect(() => {
    geSubadmin();
  }, []);

  const geSubadmin = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/admin/users/${params?.id}`);
      console.log("buyer", data);
      setTableData(data.data);
      setBranchFormValues({
        first_name: get(data.data, "first_name", ""),
        last_name: get(data.data, "last_name", ""),
        email: get(data.data, "email", ""),
        password: get(data.data, "password", ""),
        access_module: get(data.data, "access_module", ""),
        whole_number: get(data.data, "phone_number", ""),
        country_code: get(data.data, "whole_number", ""),
        mobile_number: get(data.data, "phone_number", ""),
      });
      setPeopleInfo(
        data?.data?.access_module.map((item) => {
          return {
            id: item,
            first: item,
          };
        })
      );
      // setSearchedData(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setUsers("");
      history.push("/adminPanel");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
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

  const matchBox = (e) => {
    if (e === peopleInfo[0].id) {
      // console.log("success");
      return true;
    } else if (e === peopleInfo[1]?.id) {
      // console.log("success");
      return true;
    } else if (e === peopleInfo[2]?.id) {
      // console.log("success");
      return true;
    } else if (e === peopleInfo[3]?.id) {
      // console.log("success");
      return true;
    } else if (e === peopleInfo[4]?.id) {
      // console.log("success");
      return true;
    } else if (e === peopleInfo[5]?.id) {
      // console.log("success");
      return true;
    } else if (e === peopleInfo[6]?.id) {
      // console.log("success");
      return true;
    } else if (e === peopleInfo[7]?.id) {
      // console.log("success");
      return true;
    } else if (e === peopleInfo[7]?.id) {
      // console.log("success");
      return true;
    } else if (e === peopleInfo[8]?.id) {
      // console.log("success");
      return true;
    }
  };

  console.log("tableData", tableData.first_name);
  console.log("updateBranchFormValues", updateBranchFormValues);

  const handleSubadmin = async (values) => {
    console.log(values);

    var fromData = {
      first_name: values.first_name,
      last_name: values.last_name,
      country_code: values.country_code,
      phone_number: values.mobile_number,
      email: values.email,
      password: values.password,
      access_module: peopleInfo.map((val) => val.id).slice(1),
    };

    setIsLoading(true);

    try {
      if (values.id) {
        const { data } = await axios.put("/admin/subscription-plan", {
          id: values.id,
          amount: values.amount,
          name: values.name,
          type: values.type,
          features: [values.feature1, values.feature2, values.feature3],
          discount: values.discount,
          month: values.month,
        });
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      } else {
        const { data } = await axios.post("/admin/create-subadmin", fromData);
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
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

  console.log("peopleInfo", peopleInfo);

  console.log("ma", matchBox("4"));

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
                        history.push("/adminPanel/user");
                      }}
                    >
                      <IoIcons.IoIosArrowRoundBack />
                    </HeadingButton>
                  </>
                </BackIcon>
                <DashHeading>Add Sub Admin</DashHeading>
              </MenuAndBack>
            </DashboardHeading>

            <Paper
              className={classes.paperTableHeight}
              style={{ overflow: "hidden", height: "100%" }}
            >
              <>
                <RetaurantDetailsForm>
                  <Formik
                    enableReinitialize
                    initialValues={updateBranchFormValues}
                    key={updateBranchFormValues}
                    // validate={prescripValidator}
                    validateOnChange
                    onSubmit={handleSubadmin}
                  >
                    {(formikBag) => {
                      return (
                        <Form>
                          <div className="signup-cont">
                            <div className="row">
                              {/* <div className="col-md-12"> */}
                              <div className="col-md-6">
                                <label className={classes.offerLabel}>
                                  First Name
                                </label>
                                <Field name="first_name">
                                  {({ field }) => (
                                    <div className="pb-2 mt-1">
                                      <Input
                                        {...field}
                                        type="text"
                                        variant="outlined"
                                        value={formikBag.values.first_name}
                                        onChange={(e) => {
                                          formikBag.setFieldValue(
                                            "first_name",
                                            e.target.value
                                          );
                                        }}
                                        error={
                                          formikBag.touched.first_name &&
                                          formikBag.errors.first_name
                                            ? formikBag.errors.first_name
                                            : null
                                        }
                                        className="form-control"
                                        placeholder="First Name"
                                      />
                                    </div>
                                  )}
                                </Field>
                              </div>

                              <div className="col-md-6">
                                <label className={classes.offerLabel}>
                                  Last Name
                                </label>
                                <Field name="last_name">
                                  {({ field }) => (
                                    <div className="pb-2 mt-1">
                                      <Input
                                        {...field}
                                        type="text"
                                        variant="outlined"
                                        value={formikBag.values.last_name}
                                        onChange={(e) => {
                                          formikBag.setFieldValue(
                                            "last_name",
                                            e.target.value
                                          );
                                        }}
                                        error={
                                          formikBag.touched.last_name &&
                                          formikBag.errors.last_name
                                            ? formikBag.errors.last_name
                                            : null
                                        }
                                        className="form-control"
                                        placeholder="Last Name"
                                      />
                                    </div>
                                  )}
                                </Field>
                              </div>

                              <div className="col-md-6 mt-2">
                                <label className={classes.offerLabel}>
                                  Email
                                </label>
                                <Field name="email">
                                  {({ field }) => (
                                    <div className="pb-2 mt-1">
                                      <Input
                                        {...field}
                                        type="email"
                                        variant="outlined"
                                        value={formikBag.values.email}
                                        onChange={(e) => {
                                          formikBag.setFieldValue(
                                            "email",
                                            e.target.value
                                          );
                                        }}
                                        error={
                                          formikBag.touched.email &&
                                          formikBag.errors.email
                                            ? formikBag.errors.email
                                            : null
                                        }
                                        className="form-control"
                                        placeholder="Email"
                                      />
                                    </div>
                                  )}
                                </Field>
                              </div>

                              <div className="col-md-6 mt-2">
                                <label className={classes.offerLabel}>
                                  Password
                                </label>
                                <Field name="password">
                                  {({ field }) => (
                                    <div className="pb-2 mt-1">
                                      <Input
                                        {...field}
                                        type="password"
                                        variant="outlined"
                                        value={formikBag.values.password}
                                        onChange={(e) => {
                                          formikBag.setFieldValue(
                                            "password",
                                            e.target.value
                                          );
                                        }}
                                        error={
                                          formikBag.touched.password &&
                                          formikBag.errors.password
                                            ? formikBag.errors.password
                                            : null
                                        }
                                        className="form-control"
                                        placeholder="Password"
                                      />
                                    </div>
                                  )}
                                </Field>
                              </div>

                              <div className="col-md-6 mt-2">
                                <label className={classes.offerLabel}>
                                  Mobile Number
                                </label>
                                <Field name="phone">
                                  {({ field }) => (
                                    <div className="py-2">
                                      <PhoneInput
                                        {...field}
                                        country="tr"
                                        type="phone"
                                        value={formikBag.values.whole_number}
                                        countryCodeEditable={false}
                                        onChange={(phone, data) => {
                                          formikBag.setFieldValue(
                                            "country_code",
                                            data.format.slice(0, 1) +
                                              data.dialCode
                                          );
                                          formikBag.setFieldValue(
                                            "mobile_number",
                                            phone.slice(data.dialCode.length)
                                          );
                                        }}
                                        error={
                                          formikBag.touched.mobile_number &&
                                          formikBag.errors.mobile_number
                                            ? formikBag.errors.mobile_number
                                            : null
                                        }
                                        className="form-control"
                                        placeholder="Mobile Number"
                                      />
                                      {formikBag.touched.mobile_number &&
                                        formikBag.errors.mobile_number && (
                                          <p
                                            style={{
                                              paddingTop: 5,
                                              fontSize: 13,
                                              color: "red",
                                            }}
                                          >
                                            {formikBag.errors.mobile_number}
                                          </p>
                                        )}
                                    </div>
                                  )}
                                </Field>
                              </div>
                            </div>
                          </div>

                          <ModuleText>Give Module Access of</ModuleText>

                          <AdminModuleWrap>
                            {todos.map((item) => {
                              return (
                                <div
                                  key={item.id}
                                  className="d-flex align-items-center checkBox"
                                >
                                  {" "}
                                  <input
                                    onChange={(e) => {
                                      // add to list
                                      if (e.target.checked) {
                                        setPeopleInfo([
                                          ...peopleInfo,
                                          {
                                            id: item.id,
                                            first: item.name,
                                          },
                                        ]);
                                      } else {
                                        // remove from list
                                        setPeopleInfo(
                                          peopleInfo.filter(
                                            (people) => people.id !== item.id
                                          )
                                        );
                                      }
                                    }}
                                    value={peopleInfo}
                                    // checked={peopleInfo}
                                    defaultChecked={matchBox(item.id)}
                                    // style={{ margin: '20px' }}
                                    type="checkbox"
                                  />{" "}
                                  <label style={{ margin: "20px" }}>
                                    {item.name}
                                  </label>{" "}
                                </div>
                              );
                            })}
                          </AdminModuleWrap>

                          <div className="row mt-3">
                            <div
                              className="col-md-12"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <HeadingButton
                                type="submit"
                                style={{ padding: "1em 3.3em" }}
                              >
                                Save
                              </HeadingButton>
                            </div>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </RetaurantDetailsForm>
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
