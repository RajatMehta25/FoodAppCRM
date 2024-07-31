import React, { useState, useEffect, Fragment } from 'react'
import { toast } from 'react-toastify'
import FaqEditor from '../../components/FaqEditor'
// import { FlexWrapper } from './ContentElements'
import { withTheme } from 'styled-components'
import { EditorState, convertFromHTML, ContentState, convertToRaw } from 'draft-js'
// import { stateToHTML } from 'draft-js-export-html'
import draftToHtml from 'draftjs-to-html';
import { FlexWrapper } from '../ContentSection/ContentElements'

import axios from "../../axios";
import { isEmpty } from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Select from "../../components/Select";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import { withRouter } from 'react-router-dom';
import Input from "../../components/Input";

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


  useEffect(() => {
    getCategory();
  }, []);

  const [inputList, setInputList] = useState([]);
  // const [submitted, setSubmitted] = useState(false);
  const [addMore, setAddMore] = useState(false);
  const [chosenOption, setChosenOption] = useState({})
  const [editorState, setEditorState] = useState(null)
  const [editorMode, setEditorMode] = useState('editor')
  const [chosenLanguage, setChosenLanguage] = useState({})


   // ---------------FOR EDITOR--------------

   const toolbarConfig = {
    inline: { inDropdown: true },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    history: { inDropdown: true }
  }

  const getCategory = async () => {
    try {
      const { data } = await axios.get("admin/faq");
      setInputList(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (error.response.status === 401) {
        history.push('/')
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
      }
    }
  };

  
  const createEditorState = (data) => {
    if (typeof data == 'string') {
      const blocksFromHTML = convertFromHTML(data)
      let editorData
      editorData = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
      editorData = EditorState.createWithContent(editorData)
      return editorData
    }
    else {
      return data
    }
  }

  const convertHtml = (data) => {
    if (typeof data != 'string') {
      const rawContentState = convertToRaw(data.getCurrentContent());
      const body = draftToHtml(
        rawContentState,
      );
      return body
    }
    else {
      return data
    }
  }

  const saveCategory = async (e, i) => {
    const list = [...inputList];
    let data = list[i];
    console.log("datarr", data);
    console.log(convertHtml(data.answer))
    let dataForAdd = {
      question: data.question,
      answer: convertHtml(data.answer),
    }
    // console.log(dataForAdd);
    let url = "/admin/add-faq";
    if (data.id === undefined) {
      url = "/admin/add-faq";
    } else {
      url = "/admin/add-faq";
      dataForAdd.id = data.id;
    }

    try {
      const { data } = await axios.post(url, dataForAdd);
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (error.response.status === 401) {
        history.push('/')
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
      }
    }
  };
  // const newCategory = () => {
  //   setSubmitted(false);
  // };

  // handle input change
  const handleInputChange = (e, index, isAnswer = false) => {
    // console.log(e)
    const { name, value } = e.target;
    var list = [...inputList]
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = async index => {
    const list = [...inputList];
    let faqData = list[index];
    try {
      const { data } = await axios.delete(`/admin/faq/${faqData.id}`);
      history.push({
        pathname: "/adminPanel/faq",
      });
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (error.response.status === 401) {
        history.push('/')
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
      }
    }


    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    if (addMore === false) {
      setInputList([...inputList, { question: "", answer: "" }]);
    }
  };









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
          <DashHeading style={{marginBottom: '1rem'}}>Faq Management</DashHeading>
          </div>

          <div>
          <Paper>
                <div className="App">
                  {inputList.map((x, i) => {
                    return (
                      <div className="box" key={i}>
                        <div className={classNames("form-group", classes.questionPadding)}>
                          <label htmlFor="question">
                            Question
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            name="question"
                            placeholder="Enter Question"
                            value={x.question}
                            onChange={e => handleInputChange(e, i)}
                          />
                        </div>

                        <div className={classNames("form-group", classes.questionPadding)}>
                          <label htmlFor="answer">
                            Answer
                          </label>
                          <div className={classes.widthClass}>
                            <FaqEditor
                              editorState={createEditorState(x.answer)}
                              editorClassName="demo-editor"
                              onEditorStateChange={val => handleInputChange({
                                target: {
                                  name: "answer",
                                  value: val
                                }
                              }, i, true)}
                              toolbar={toolbarConfig}
                            />
                          </div>
                          {/* <Input
                                type="text"
                                className="form-control"
                                // className="ml10"
                                name="answer"
                                placeholder="Enter Answer"
                                value={x.answer}
                                onChange={e => handleInputChange(e, i)}
                            /> */}
                        </div>
                        <div className={classNames("btn-box", classes.questionPadding)}>
                          <div>
                            {inputList.length - 1 === i &&
                              <button
                                 style={{marginRight: '1rem'}}
                                className={classNames("btn btn-success", classes.buttonMargin)}
                                onClick={(e) => {
                                  saveCategory(e, i)
                                  setAddMore(false);
                                }}
                              >
                                Add
                              </button>}
                            {inputList.length - 1 !== i &&
                              <button
                              style={{marginRight : '1rem'}}
                                // className="mr10"
                                className={classNames("btn btn-success", classes.buttonMargin)}
                                onClick={(e) => saveCategory(e, i)}
                              >
                                Update
                              </button>}
                            {inputList.length !== 1 &&
                              <button
                                // className="mr10"
                                className={classNames("btn btn-success", classes.buttonMargin)}
                                onClick={() => handleRemoveClick(i)}
                              >
                                Remove
                              </button>}
                          </div>
                          <div className={classes.displayButton}>
                            {inputList.length - 1 === i &&
                              <button
                                className="btn btn-success"
                                onClick={() => {
                                  handleAddClick();
                                  setAddMore(true);
                                }
                                }
                              >
                                Add More
                              </button>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Paper>
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

