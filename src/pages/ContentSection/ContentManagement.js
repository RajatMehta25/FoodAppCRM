import React, { useState, useEffect, Fragment } from 'react'
import { toast } from 'react-toastify'
import TextEditor from '../../components/TextEditor'
import { FlexWrapper } from './ContentElements'
import { withTheme } from 'styled-components'
import { EditorState, convertFromHTML, ContentState, convertToRaw } from 'draft-js'
// import { stateToHTML } from 'draft-js-export-html'
import draftToHtml from 'draftjs-to-html';

import axios from "../../axios";
import { isEmpty } from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Select from "../../components/Select";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import { withRouter } from 'react-router-dom';

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
} from "@material-ui/core";

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
  AgentApprove,
  NotificationButton,
} from "../UserManagement/UserElements";



const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    marginTop: "5rem",
    // verticalAlign: 'scroll'
  },
  tablePad: {
    padding: "20px 30px",
    lineHeight: "50px",
    width: "100%",
  },
  textS: {
    fontSize: "1.2rem",
    color: "#525f7f",
    marginBottom: "-0.2rem",
  },
  textA: {
    display: "flex",
    flexDirection: "column",
    marginTop: "0.5rem",
  },
  btnSize: {
    fontSize: "1.1rem",
  },
  topM: {
    marginTop: "8rem",
    marginBottom: "2rem",
  },
  paperTableHeight: {
    height: "auto",
    width: "100%",
    padding: "10px 30px",
  },
  container: {
    marginTop: "2rem",
  },
  textMiddle: {
    margin: "auto",
    textAlign: "center",
  },
  iconMargin: {
    marginTop: '4.5rem',
  },
  widthClass: {
    width: "100%",
    height: "66%",
  },
  zIndex: {
    zIndex: "5"
  },
  buttonColor: {
    color: "white",
    backgroundColor: "#1cbb8c !important",
    marginTop: "0.5rem !important"
  },
  editorColor: {
    margin: "0.3rem !important",
    padding: "0.3rem 1rem !important",
    borderRadius: "0.3rem !important"
  },
  // searchHeight: {
  //     // width: '50%',
  //     margin: 'auto'
  // },
  searchBox: {
    display: "flex",
    // backgroundColor: 'pink',
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 20px",
  },
  textSizes: {
    textAlign: "center",
    fontSize: "1rem",
  },
  //   checkSize: {
  //       height: '10px',
  //       width: '10px'
  //   }
}));



const OfferManagement = ({ history, userData }) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false)
  const [editorState, setEditorState] = useState(null)
  const [editorMode, setEditorMode] = useState('editor')
  const [chosenOption, setChosenOption] = useState({})
  const [chosenLanguage, setChosenLanguage] = useState({})
  const [selectBusinessCategory, setSelectBusinessCategory] = useState([]);

  const toolbarConfig = {
    inline: { inDropdown: true },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    history: { inDropdown: true }
  }
  const options = [
    {
      label: 'Terms & Condition',
      key: "TERMS_CONDITIONS",
      value: 1
    },
    {
      label: 'About Us',
      key: "ABOUT_US",
      value: 2
    }, {
      label: 'Privacy Policy',
      key: "PRIVACY_POLICY",
      value: 3
    },
  ]

  async function getCms(val, lang) {
    console.log("val", val);
    try {
      setIsLoading(true)
        const { data } = await axios.get(`/admin/content/${val.value}`)
        console.log("datra", data);
        const blocksFromHTML = convertFromHTML(data.data.content)
        let editorData
        editorData = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
        editorData = EditorState.createWithContent(editorData)
        setEditorState(editorData)
        // console.log('editorData',editorData)
        setIsLoading(false)
    } catch (error) { }
  };

  useEffect(
    () => {
      if (!isEmpty(chosenOption)) getCms();
      // dataForBusinessCategory();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // get data from api's and render them in dropdown
  // const dataForBusinessCategory = async () => {
  //   try {
  //     let { data } = await axios.get("/privacyPolicy");
  //     setSelectBusinessCategory(data.data);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(`${error.response.data.message}`, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //     if (error.response.status === 401) {
  //       props.history.push('/')
  //       localStorage.removeItem("accessToken");
  //       localStorage.removeItem("userData");
  //     }
  //   }
  // };


  async function submit(params) {
    console.log("chosenOption", chosenOption);
    try {
      setIsLoading(true)
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const body = draftToHtml(
        rawContentState,
      );

      console.log("body", body);

      const { data } = await axios.post('admin/content', {
        title: "Test Title",
        content : body,
        type: chosenOption.value
      })
      setIsLoading(false)
      toast.info(`${data.message}`, {
        position: toast.POSITION.TOP_RIGHT
      })

      // if (chosenOption.key === "privacyPolicy") {
      //   const { data } = await axios.post('/addUpdateContent?contentHeading=privacyPolicy&contentLanguage=ar', {
      //     contentText: body,
      //   })
      //   setIsLoading(false)
      //   toast.info(`${data.message}`, {
      //     position: toast.POSITION.TOP_RIGHT
      //   })
      // } else if (chosenOption.key === "termsAndConditions") {
      //   const { data } = await axios.post('/addUpdateContent?contentHeading=termsAndConditions&contentLanguage=ar', {
      //     contentText: body,
      //   })
      //   setIsLoading(false)
      //   toast.info(`${data.message}`, {
      //     position: toast.POSITION.TOP_RIGHT
      //   })

      // } else if (chosenOption.key === "ourServices") {
      //   const { data } = await axios.post('/addUpdateContent?contentHeading=ourServices&contentLanguage=ar', {
      //     contentText: body,
      //   })
      //   setIsLoading(false)
      //   toast.info(`${data.message}`, {
      //     position: toast.POSITION.TOP_RIGHT
      //   })
      // }
      // else if (chosenOption.key === "aboutUs") {
      //   const { data } = await axios.post('/addUpdateContent?contentHeading=aboutUs&contentLanguage=ar', {
      //     contentText: body,
      //   })
      //   setIsLoading(false)
      //   toast.info(`${data.message}`, {
      //     position: toast.POSITION.TOP_RIGHT
      //   })
      // }




    } catch (error) {
      setIsLoading(false)
      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (error.response.status === 401) {
        history.push('/')
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
      }
    }
  }


  return (
    <>
    <DashboardContainer>
      <>
        <Paper
          className={classes.paperTableHeight}
          style={{ overflow: "hidden", height: "100%" }}
        >
          <div className={classes.tablePad}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <DashHeading style={{marginBottom: '1rem'}}>Content Management</DashHeading>
          <div style={{marginBottom: '1rem', lineHeight: '35px'}}>
          <Select className={classes.zIndex} placeholder="Choose Content" options={options}
                        onChange={val => {
                          // console.log(val);

                          setChosenOption(val)
                          getCms(val, chosenLanguage)
                        }}
                      />
          </div>
          </div>

          <div>
          <FlexWrapper
      direction="row"
      alignItems="center"
      css={`
        > div {
          padding: 14px;
          border: 1px solid #ddd;
          border-bottom: none;
          cursor: pointer;
          :hover {
            background: #ddd;
          }
        }
      `}>
      <FlexWrapper
        className={classNames(classes.editorColor)}
        onClick={() => setEditorMode('editor')}
        width="auto"
        background={editorMode === 'editor' && '#ddd'}>
        Editor
      </FlexWrapper>
      <FlexWrapper
        className={classNames(classes.editorColor)}
        onClick={() => setEditorMode('preview')}
        width="auto"
        background={editorMode === 'preview' && '#ddd'}>
        Preview
      </FlexWrapper>
    </FlexWrapper>
    {editorMode === 'editor' && (
      <div className={classes.widthClass}>
        <TextEditor
          editorState={editorState}
          editorClassName="demo-editor"
          onEditorStateChange={val => setEditorState(val)}
          toolbar={toolbarConfig}
        />
      </div>
    )}
    {editorMode === 'preview' && (
      <div className={classes.widthClass}>
        <TextEditor toolbar={toolbarConfig} editorState={editorState} toolbarClassName="hide-toolbar" readOnly />
      </div>
    )}
    <NotificationButton onClick={submit} style={{padding : '0 2rem'}}>Submit</NotificationButton>
    {/* <Button
      label="Submit"
      css={`
        margin-block-start: 30px;
        margin: auto;
      `}
      className={classes.buttonColor}
      isLoading={isLoading}
      onClick={submit}
      disabled={isEmpty(chosenOption)}
    /> */}
          </div>
          </div>
        </Paper>
      </>
    </DashboardContainer>
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

