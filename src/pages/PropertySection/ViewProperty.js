import React, { useState, useEffect } from 'react'
import { DashboardContainer, DashboardWrapper, DashboardHeading, DashHeading, SvgLogo, BackIcon, MenuAndBack, PreperationTime, LabelHeading, RetaurantDetailsForm, InputDivide, MiddleColumnProfile, InputPic, HeadingBlock, HeadingProfile, HeadingPara, MultipleButtons, TripleButton, MultipleButton, VoucherHeading, VoucherHeadingMain, FullWidthMobileInput, OfferRadioSection, OfferSectionLabel, MobileViewCalender, HeadingButton, LoginButton, ApproveButton, DisapproveButton, AgentApprove, PendingApprove } from '../UserManagement/UserElements'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel, Tooltip, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field, Form } from "formik";
import YearInput from '../../components/YearInput';
import { extractDate } from "../../utils/functions"
import axios from "../../axios";
import Overlay from '../../components/Overlay'
import { toast } from "react-toastify";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

import DummyImg from "../../images/dummy-img.png"

import * as IoIcons from 'react-icons/io';
import * as HiIcons from 'react-icons/hi';
import { get, isEmpty } from 'lodash';
import classNames from 'classnames';
import Select from "../../components/Select";
import VisibilityIcon from '@material-ui/icons/Visibility';

import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import { withRouter, useParams } from 'react-router-dom';
// import SearchBar from "material-ui-search-bar";
import {
    ProductValidator
} from "../../utils/validators";
import TextArea from "../../components/TextArea";
import { uploadImage } from "../../utils/functions";
import { FaSearch } from 'react-icons/fa';
import BlockIcon from '@material-ui/icons/Block';
import { SearchContainer, SearchBar, SearchIcon, SearchInput } from '../../components/SearchBar/SearchElements'
import { Modal } from '../../components/Modal/Modal'
import { AgentWrapper, PropertyContainer, PropertyViewLeft, PropertyViewRight, PropertyImage, PropertyImageView } from './PropertyElements'
import PropImg from "../../images/property-image.png"

const useStyles = makeStyles((theme) => ({

    textMiddle: {
        verticalAlign: 'middle !important',
        textAlign: "center"
    },
    tablePadding: {
        padding: "0.5rem",
        textAlign: "center",
        fontSize: "0.8rem"
    },
    paperTableHeight: {
        height: "650px",
        width: "95%",
        marginLeft: "2rem",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column"
    },
    "@media (max-width: 780px)": {
        paperTableHeight: {
            marginLeft: "0.75rem"
        }
    },
    "@media (max-width: 480px)": {
        paperTableHeight: {
            marginLeft: "0.75rem"
        }
    },
    tablePaginationStyle: {
        border: "1px solid #0000001a",
        borderRadius: "0rem 0rem 0.4rem 0.4rem",
        overflowY: "hidden"
    },
    tableFlex: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    searchDesign: {
        borderRadius: '20px',
        boxShadow: 'none',
        width: '21%'
    }
}));





const OfferManagement = ({ history, setUsers, userData, }) => {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);

    const [agentState, setAgentState] = useState({ isDissaproveAgent : ""});



    useEffect(() => {
        if (!userData) {
            history.push("/adminPanel")
        }
    }, []);

    useEffect(() => {
      getData();
    }, []);




    const getData = async () => {
        // try {
        //     const { data } = await axios.get(`/admin/users/${params?.id}`);
        //     setTableData(data.data);
        //     console.log("approve", data.data.agent_profile);
        // } catch (error) {
        //     console.log(error);
        //         history.push('/adminPanel')
        //         localStorage.removeItem("accessToken");
        //         localStorage.removeItem("userData");
        // }
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
                                                style={{ fontSize: "1.5rem", padding: "0.2em 0.2em", borderRadius: "32px", justifyContent: "center", marginBottom: "0.4em" }}
                                                onClick={() => {
                                                    history.push("/adminPanel/agent-approve")
                                                }}
                                            >
                                                <IoIcons.IoIosArrowRoundBack />
                                            </HeadingButton>
                                        </>
                                </BackIcon>
                                <DashHeading>
                                Property View
                                </DashHeading>
                            </MenuAndBack>
                        </DashboardHeading>


                        <Paper className={classes.paperTableHeight} style={{ overflow: "hidden", height: "100%" }}>
                       
                                <>
                                    <RetaurantDetailsForm>
                                    <AgentWrapper>
                                    {/* <PropertyMainText>
                                    2 BHK Flat for sale in 
                                    <PropertyLocation>
                                      110 Crowdad Ct, Garner, NC 27529
                                    </PropertyLocation>
                                    </PropertyMainText> */}
                                    <PropertyContainer>
                                     <PropertyViewLeft>
                                     <PropertyImageView>
                                     <PropertyImage src={PropImg} / >
                                     </PropertyImageView>
                                     </PropertyViewLeft>
                                     <PropertyViewRight>
                                     </PropertyViewRight>
                                    </PropertyContainer>
                                    </AgentWrapper>
                                    </RetaurantDetailsForm>
                                </>
                        </Paper>
                    </DashboardWrapper>
                </DashboardContainer>
            </div>
            

            {isLoading && <Overlay />}

        </>

    )
}



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
