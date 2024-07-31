import React, { useState, useContext, useEffect } from "react";

// import { Button } from '../ButtonElements'
import {
  InfoContainer,
  InfoWrapper,
  InfoRow,
  Column1,
  Column2,
  TextWrapper,
  ImgWrap,
  Img,
  LoginBox,
  LoginHeading,
  LoginPara,
  InputBox,
  LoginButtons,
  LoginButton,
  LabelHeading,
  LabelPara,
  SelectServiceBox,
  LanguageLogout,
  LanguageIcon,
  LogoutIcon,
  SearchIcon,
  LoginButtonLink,
  LoginBtnWrapper,
  LogoMenzil,
} from "./LoginElements";
import { BackIcon, HeadingButton } from "../Profile/ProfileElements";
import { Formik, Field, Form } from "formik";
import Input from "../Input";
// import { IconUser, IconEmail } from '../SvgElements'
import PassIcon from "../../images/password.png";
import NameIcon from "../../images/name.png";
import EmailIcon from "../../images/email.png";
import RestaurantIcon from "../../images/restaurant.png";
import languageIcon from "../../images/languageBlack.png";
import logoutIcon from "../../images/logout.png";
import { withRouter, NavLink, Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import Overlay from "../Overlay";
import axios from "../../axios";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import { get } from "lodash";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ProfileTime, ProfileDayTime } from "./LoginElements";
import Radio from "@mui/material/Radio";
import TimeInput from "../TimeInput";
import FileInput from "../FileInput";
import { uploadImage } from "../../utils/functions";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import Select from "../Select";
import * as IoIcons from "react-icons/io";
import { makeStyles } from "@material-ui/core/styles";
// import savypackLogoWhite from "../../images/savypackLogoWhite.png";
import savypackLogoBlack from "../../images/savypackLogoBlack.png";
import savypackLogoRed from "../../images/savypackLogoRed.png";
import nameHolder from "../../images/name.png";

import {
  signUpValidator,
  loginValidator,
  forgetValidator,
  otpValidator,
  resetOutValidator,
  completeProfileValidator,
  bankDetailsValidator,
} from "../../utils/validators";

import {
  loginObjOne,
  signUpObjOne,
  forgotObjOne,
  resetObjOne,
  restaurantDetailsObjOne,
  bankDetailsObjOne,
  verifyOtpObjOne,
  pendingApprovalObjOne,
} from "./Data";

import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from "react-places-autocomplete";
import "./locationdropdown.css";

const useStyles = makeStyles((theme) => ({
  formStyle: {
    width: "100%",
    padding: "2rem",
    // height: "80vh",
    overflow: "scroll",
  },
  "@media (max-width: 780px)": {
    formStyle: {
      padding: "1.8rem",
    },
    formStyleOnly: {
      padding: "1.8rem",
    },
  },
  "@media (max-width: 480px)": {
    formStyle: {
      padding: "1.3rem",
    },
    formStyleOnly: {
      padding: "1.3rem",
    },
  },

  formStyleOnly: {
    width: "100%",
    padding: "2rem",
    // height: "80vh",
    // overflow: "scroll",
  },
}));

const InfoSection = ({
  lightBg,
  imgStart,
  img,
  pageHeading,
  pagePara,
  form,
  history,
  setUsers,
  userData,
  defaultState,
  setDefaultState,
}) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [OTPSend, setOtpSend] = useState(false);
  const [otpPhone, setOtpPhone] = useState("");
  const [isForgetiing, setIsForgetting] = useState(false);
  const [modalData, setModalData] = useState({
    isOpen: false,
    header: "success_message",
    message: "Your add will post Shortly",
  });

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (values, isSocial = false) => {
    setLoginValues(values);
    setIsLoading(true);
    var url = "/admin/login";
    var formvalues = {
      email: values.email,
      password: values.password,
    };

    try {
      const { data } = await axios.post(url, formvalues);
      console.log(data);

      // if (data?.data?.isVerified)
      //  {
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("userData", JSON.stringify(data.data));
      localStorage.setItem("role", data.data.role);
      setUsers(data.data);
      history.push("/adminPanel/dashboard");
      // }
      setIsLoading(false);
    } catch (error) {
      console.log("er", error);
      setIsLoading(false);

      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (error.response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
        //window.location.pathname = "/";
      }
    }
  };

  return (
    <div>
      <InfoContainer lightBg={lightBg}>
        <InfoWrapper>
          <InfoRow imgStart={imgStart}>
            <Column2>
              <ImgWrap>
                <div>
                  <img style={{ width: "20rem" }} src={savypackLogoBlack}></img>
                </div>
              </ImgWrap>
            </Column2>
            <Column1>
              <TextWrapper contentAlign={defaultState.form == "pendingApproval" ? true : false}>
                <LoginBox>
                  <LogoMenzil>
                    <img style={{ width: "11rem" }} src={savypackLogoRed}></img>
                  </LogoMenzil>

                  <LoginHeading>
                    {/* <BackIcon>
                                            {(updateProfileValues.is_profile_completed === "2" && (defaultState.form == "restaurantDetailsForm" || defaultState.form == "bankDetailsForm")) ? (
                                                <>
                                                    <HeadingButton
                                                        style={{ fontSize: "1.5rem", padding: "0.2em 0.2em", borderRadius: "32px", justifyContent: "center", marginBottom: "0.4em" }}
                                                        onClick={() => {
                                                            setDefaultState(pendingApprovalObjOne)
                                                        }}
                                                    >
                                                        <IoIcons.IoIosArrowRoundBack />
                                                    </HeadingButton>
                                                </>
                                            ) : ""}
                                        </BackIcon> */}
                    Welcome Back !
                  </LoginHeading>
                  <LoginPara>Sign in to continue to Webapp.</LoginPara>
                </LoginBox>
                <InputBox>
                  <Formik
                    enableReinitialize
                    initialValues={loginValues}
                    validate={loginValidator}
                    validateOnChange
                    onSubmit={(values) => handleLogin(values, false)}
                  >
                    {(formikBag) => {
                      return (
                        <Form className={classes.formStyleOnly}>
                          <Field name="email">
                            {({ field }) => (
                              <div className="py-2">
                                <Input
                                  {...field}
                                  type="email"
                                  icon={nameHolder}
                                  //   value={formikBag.values.password}
                                  onChange={(e) => {
                                    formikBag.setFieldValue("email", e.target.value);
                                  }}
                                  error={formikBag.touched.email && formikBag.errors.email ? formikBag.errors.email : null}
                                  className="form-control"
                                  placeholder="Email"
                                />
                              </div>
                            )}
                          </Field>
                          <Field name="password">
                            {({ field }) => (
                              <div className="py-2">
                                <Input
                                  {...field}
                                  type="password"
                                  icon={PassIcon}
                                  //   value={formikBag.values.password}
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

                          {/* <div className="row" style={{ padding: "1rem" }}>
                                                            <div className="col-md-12">
                                                                <Field name="terms">
                                                                    {({ field }) => (
                                                                        <div className="py-2" style={{ display: "flex", alignItems: "center" }}>
                                                                            <Input
                                                                                {...field}
                                                                                type="checkbox"
                                                                                // value={formikBag.values.terms}
                                                                                onChange={(e) => {
                                                                                    formikBag.setFieldValue(
                                                                                        "terms",
                                                                                        !formikBag.values.terms
                                                                                    );
                                                                                }}
                                                                                noBorderBottom={true}
                                                                            />
                                                                            <label style={{ paddingLeft: "1rem" }}>
                                                                                Remember me
                                                                            </label>
                                                                        </div>
                                                                    )}
                                                                </Field>
                                                            </div>
                                                        </div> */}

                          <LoginBtnWrapper>
                            <LoginButton
                            // type="submit"
                            >
                              Log In
                            </LoginButton>
                          </LoginBtnWrapper>
                          <p className="text-center" style={{ padding: "0.3rem", marginBottom: "1.5rem", color: "#74788d" }}>
                            © 2023-{new Date().getFullYear()} Rajat Mehta.
                          </p>
                        </Form>
                      );
                    }}
                  </Formik>
                </InputBox>
                {/*<LoginButtons>

                                </LoginButtons>*/}
              </TextWrapper>
            </Column1>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
      {isLoading && <Overlay />}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InfoSection));
