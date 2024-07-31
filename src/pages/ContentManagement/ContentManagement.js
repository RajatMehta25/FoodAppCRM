import React, { useState, useEffect, useRef} from "react";
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
} from "./ContentElements";
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
import RSelect from "react-select"
import JoditEditor from "jodit-react";
import './Content.css'


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
  let { merchant_id } = useParams();
  const [inputData, setInputData] = useState();
  const [panelName, setPanelName] = useState("user");
  const [heading, setHeading] = useState("privacyPolicy");
  const [openModal,setOpenModal]=useState(false)
  const [deliveryBoyData, setDeliveryBoydata] = useState({
    firstName: "",
    lastName: "",
  
    mobileNum: "",
    password: "",
    email: "",
    countryCode: "",
    _id:""
  });

 
  const [isLoading, setIsLoading] = useState(false);

     
  
  const panelOptions=[{label:"USER",value:"user"},{label:"MERCHANT",value:"merchant"},{label:"AGENT",value:"agent"}]
  const headingOptions=[{label:"PRIVACY POLICY",value:"privacyPolicy"},{label:"TERMS AND CONDITIONS",value:"termsAndConditions"},{label:"ABOUT US",value:"aboutUs"},{label:"HELP",value:"help"}]
  
   const initial_values={
     select1: "privacyPolicy",
     select2: "user",
   }



  useEffect(() => {
    if (!userData) {
      history.push("/adminPanel");
    }
    console.log(userData);
  }, []);

  useEffect(() => {
   getContent(initial_values)
    // getOffers();
    // fetchCategoryList();
    // fetchSubcategoryList();
  }, []);

  // For Pagination


 

 

 
  
 
 


  
  
  

 
  
  
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
        setOpenModal(false)
        setDeliveryBoydata({ firstName: "",
        lastName: "",
        mobile: "",
        mobileNum: "",
        password: "",
        email: "",
        countryCode: "",
        _id:""})
      } catch (err) {}
    } else {
      //update profile

     
    }
  };



  

  

  //get content
  const getContent = async (values) => {
    // setInputData("");
    console.log(values)
    if (values?.select1 !== "" && values?.select2 !== "") {
      try {
        const { data } = await axios.get(
          `/admin/readContent?createdFor=${values.select2}&contentHeading=${values.select1}`
        );
        console.log(data);
        setInputData(data);
        // setTableData(data.data)
        // setSearchedData(data.user)
        // setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    } else if (values.select2 === "") {
      toast.info("Please Select Panel", {
        position: "top-right",
      });
      setInputData("");
    } else if (values.select1 === "") {
      toast.info("Please Select Heading", {
        position: "top-right",
      });
      setInputData("");
    }
  };
  // creation and updation
  const Create_Update = async (values) => {
    if (
      inputData !== "" &&
      inputData !== "<p><br></p>" &&
      heading &&
      panelName
    ) {
      try {
        console.log(heading,panelName);

        const { data } = await axios.post(
          `/admin/createContent?contentHeading=${heading}`,
          {
            // contentId:,
            contentText: `${inputData}`,
            createdFor: panelName,
          }
        );
        console.log(data);
        toast.success("Content Saved Successfully");
        getContent();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Text and Selection fields cannot be blank");
    }
  };
  const SettingData = (newContent) => {
    // setInputData(JSON.stringify(newContent));
    setInputData(newContent);
    console.log(newContent);
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
                <DashHeading>Content Management</DashHeading>
              </MenuAndBack>

            
          
               <div>    <Formik
                    //   validationSchema={validationSchema}
                    initialValues={initial_values}
                    onSubmit={(values) => {
                      if (values.select1 === "" && values.select2 === "") {
                        toast.info("Please select Panel and Heading", {
                          position: toast.POSITION.TOP_RIGHT,
                        });
                      } else {
                        getContent(values);
                      }

                      console.log(values);
                    }}
                  >
                    {({ values, setFieldValue, handleSubmit }) => (
                      <Form style={{display:"flex",gap:"0.5em",color:"black"}}>
                        {/* <label className="" style={{ }}>
                                Name:
                              </label> */}
                        &emsp;
                        <div  style={{
                            width: "200px",
                           
                          }}><RSelect   
                        defaultValue={{label:"USER",value:"user"}}
                        
                           options={panelOptions}  
                            onChange={(e) => {
                            setFieldValue("select2", e.value);
                            setPanelName(e.value);
                            handleSubmit();
                          }} isSearchable={false}/></div>
                         <div  style={{
                            width: "200px",
                           
                          }}><RSelect 
                          defaultValue={{label:"PRIVACY POLICY",value:"privacyPolicy"}}
                        
                        options={headingOptions}
                         isSearchable={false}
                         onChange={(e) => {
                          setFieldValue("select1", e.value);
                          setHeading(e.value);
                          handleSubmit();
                        }}
                         /></div>
                       
                        {/* <Field
                          className=""
                          name="select2"
                          // variant="outlined"
                          as="select"
                          // inputProps={{name: "name"}}
                          onChange={(e) => {
                            setFieldValue("select2", e.target.value);
                            setPanelName(e.target.value);
                            handleSubmit();
                          }}
                         
                          style={{
                            width: 200,
                            height: 35,
                            borderRadius: 5,
                            borderColor: "#d3d3d3",
                            borderStyle: "solid",
                            borderWidth: 1,
                            paddingInlineStart: 10,
                          }}
                        >
                          <option value="">Select Panel</option>
                          <option value="USER">USER</option>
                          <option value="BRODCAST">BROADCAST</option>
                       
                        </Field> */}
                        {/* &emsp; */}
                        {/* <Field
                          className=""
                          name="select1"
                          // variant="outlined"
                          as="select"
                          // inputProps={{name: "name"}}
                          onChange={(e) => {
                            setFieldValue("select1", e.target.value);
                            setHeading(e.target.value);
                            handleSubmit();
                          }}
                         
                          style={{
                            width: 200,
                            height: 35,
                            borderRadius: 5,
                            borderColor: "#d3d3d3",
                            borderStyle: "solid",
                            borderWidth: 1,
                            paddingInlineStart: 10,
                          }}
                        >
                          <option value="">Select Heading</option>
                          <option value="privacyPolicy">PRIVACY POLICY</option>
                          <option value="termsAndConditions">
                            TERMS AND CONDITIONS
                          </option>
                          <option value="aboutUs">ABOUT US</option>
                          <option value="help">HELP</option>
                        
                        </Field> */}
                       
                        <br />
                      </Form>
                    )}
                  </Formik></div>
            
            </DashboardHeading>

            <Paper className={classes.paperTableHeight} style={{ overflow: "hidden", height: "100%", marginBottom: "0.5rem" ,backgroundColor:"transparent"}} elevation={0}>
            <div>
                  <div className="customHeight">
                    <JoditEditor
                      config={{
                        askBeforePasteFromWord: false,
                        askBeforePasteHTML: false,
                        defaultActionOnPaste: "insert_only_text",
                        readonly: false,
                      }}
                      value={inputData}
                      onBlur={(newContent) => {
                        SettingData(newContent);
                      }}

                      // value={category.data?.answer}
                      // config={config}
                      // ref={editor}
                      // value={content}
                      // config={config}
                      //tabIndex={1} // tabIndex of textarea
                      //onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    />
                  </div>
                  {/* <br /> */}
                  <div className="row my-2">
                        <div className="col-md-12" style={{ display: "flex", justifyContent: "center" }}>
                          <HeadingButton   onClick={() => {
                      Create_Update();
                    }} style={{ padding: "0.5em 2em" }}>
                            Save
                          </HeadingButton>
                        </div>
                      </div>
                  {/* <Button
                    variant="contained"
                    style={{ color: "white", backgroundColor: "#0e3f37" }}
                    onClick={() => {
                      Create_Update();
                    }}
                  >
                    Save
                  </Button>
                  <br />
                  <br /> */}
               </div>
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
            _id:""
          })
        }}
        backgroundModal={false}
        backgroundModalContent={false}
        title={
          <div>
            <div
              className="my-3"
              style={{ textAlign: "center", fontWeight: "bold", fontSize: "22px", fontFamily: "'DM Sans', sans-serif" }}
            >
              {!deliveryBoyData._id?`Add Agent`:`Edit Agent`}
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
                    _id:""
                  })
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
                  if(values._id) {
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
                                    value={formikBag.values.countryCode+formikBag.values.mobileNum}
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
                                <div className="pb-2 mt-1" >
                                  <Input
                               
                                    {...field}
                                    disabled={ formikBag.values._id  ? true : false}
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

                          <div className="col-md-1" style={{ pointerEvents:  formikBag.values._id  ? "none" : "" }}>
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
