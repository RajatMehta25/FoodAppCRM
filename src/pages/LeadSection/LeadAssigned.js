import React, { useState, useEffect } from 'react'
import { DashboardContainer, DashboardWrapper, DashboardHeading, DashHeading, SvgLogo, BackIcon, MenuAndBack, PreperationTime, LabelHeading, RetaurantDetailsForm, InputDivide, MiddleColumnProfile, InputPic, HeadingBlock, HeadingProfile, HeadingPara, VoucherHeading, VoucherHeadingMain, FullWidthMobileInput, OfferRadioSection, OfferSectionLabel, MobileViewCalender, HeadingButton, LoginButton} from '../UserManagement/UserElements'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel, Tooltip, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field, Form, FieldArray } from "formik";
import Input from "../../components/Input";
import YearInput from '../../components/YearInput';
import { extractDate } from "../../utils/functions"
import axios from "../../axios";
import Overlay from '../../components/Overlay'
import { toast } from "react-toastify";
import EditIcon from "../../images/edit_profile_button_table.png"
import DeleteIcon from "../../images/delete_profile_button_table.png"
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Modal } from '../../components/Modal/Modal'

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
import FileInput from "../../components/FileInput";
import { uploadImage } from "../../utils/functions";
import { FaSearch } from 'react-icons/fa';
import BlockIcon from '@material-ui/icons/Block';
import { SearchContainer, SearchBar, SearchIcon, SearchInput } from '../../components/SearchBar/SearchElements'
// import { AgentInformation, AgentInput, AgentInputLabel, AgentInputText, PropertyButton } from './PropertyElements'

const useStyles = makeStyles((theme) => ({

    textMiddle: {
        verticalAlign: 'middle !important',
        textAlign: "center"
    },
    tablePadding: {
        padding: "0.5rem",
        textAlign: "center",
        fontSize: "0.8rem",
        fontWeight: "800"
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
    const params = useParams();


    const [defaultState, setDefaultState] = useState({ isAddMenu: "", isRestaurantDetails: "" })
    const [menuState, setMenuState] = useState({ isOfferVoucher: true, isAddOffer: false })
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [editChange, setEditChange] = useState(false);
    const [searched, setSearched] = useState("");
    const [searchedData, setSearchedData] = useState([]);
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();
    const [pendingPopup, setPendingPopup] = useState({ isPendingService: "", isPendingAmount: "" })
    const [pendingServiceTab, setPendingServiceTab] = useState({ PendingServiceArea: true, PendingServiceAmount : false })
    const [serviceAreaList, setServiceAreaList] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [serviceTotal, setServiceTotal] = useState('');
    const [agentPopup, setAgentPopup] = useState(false);
    const [agentList, setAgentList] = useState([]);


    useEffect(() => {
        if (!userData) {
            history.push("/adminPanel")
        }
    }, []);


    useEffect(() => {
      getPropertyList();
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


    const getPropertyList = async () => {
        try {
            const { data } = await axios.get(`/admin/get-leads-detail/${params?.id}`);
            console.log("data", data);
            setTableData(data.data)
            setSearchedData(data.data)
        } catch (error) {
            console.log(error);
                setUsers("");
                history.push('/adminPanel')
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userData");
        }
    };



    const requestSearch = (searchedVal) => {
        console.log("searchedVal", searchedData);
        const filteredRows = searchedData.filter((row) => {
            let name = row?.agent?.first_name + " "+ row?.agent?.last_name ;
            let loc = row?.service_area?.zip_code;
            return name.toLowerCase().includes(searchedVal.target.value.toLowerCase()) ||
            loc.toLowerCase().includes(searchedVal.target.value.toLowerCase());
        });
        setTableData(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        getPropertyList();
    };

    const recordsAfterPagingAndSorting = () => {
        return stableSort(tableData, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }


    const handleSortRequest = cellId => {
        const isAsc = orderBy === cellId && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(cellId)
    }
    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
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

    const dateOfJoining = (e) => {
      var date = new Date(e).toLocaleDateString()
      return date;
    }


    const dataForAproved = (e) => {
        if(+e === 1) {
          return "Active";
        } else if (+e === 2) {
            return "Withdrawal"
        } else if (+e === 3) {
          return "Expired"
        } else if (+e === 4) {
            return "Pending"
        } else if (+e === 5) {
            return "Sold"
        } else if (+e === 6) {
            return "Incomplete"
        }
      }

      console.log(agentList);



    






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
                                                   history.push("/adminPanel/lead")
                                                }}
                                            >
                                                <IoIcons.IoIosArrowRoundBack />
                                            </HeadingButton>
                                        </>
                                </BackIcon>
                                <DashHeading>
                               Assigned Agent Details
                                </DashHeading>
                            </MenuAndBack>
                            <SearchContainer>
                                            <SearchBar>
                                                <SearchIcon>
                                                    <FaSearch style={{ color: "#666666" }} />
                                                    {/*<SearchIconn color="#000000" style={{fontWeight:"200"}}/>*/}
                                                    {/*<IconSearch/>*/}
                                                </SearchIcon>
                                                <SearchInput type="text"
                                                    onChange={(searchVal) => requestSearch(searchVal)}
                                                    //   value={searched}
                                                    placeholder="Search">
                                                </SearchInput>
                                            </SearchBar>
                            </SearchContainer>
                        </DashboardHeading>
                        


                        <Paper className={classes.paperTableHeight} style={{ overflow: "hidden", height: "100%" }}>
                        <>
                        <TableContainer className={classes.tableContainerHeight}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.tablePadding} style={{ fontWeight : '800' }}>S.&nbsp;No.</TableCell>
                                        <TableCell className={classes.tablePadding}>
                                        <TableSortLabel
                                          active={true}
                                                direction={orderBy === "property_name" ? order : "asc"}
                                                onClick={() => {
                                                    handleSortRequest("property_name");
                                                }}
                                        >
                                              Agent Name
                                        </TableSortLabel>
                                          </TableCell>
                                        <TableCell className={classes.tablePadding}>
                                        <TableSortLabel
                                               active={true}
                                                direction={orderBy === "createdAt" ? order : "asc"}
                                                onClick={() => {
                                                    handleSortRequest("createdAt");
                                                }}
                                            >
                                                Zip Code
                                        </TableSortLabel>
                                       </TableCell>
                                       <TableCell className={classes.tablePadding}>
                                        <TableSortLabel
                                          active={true}
                                                direction={orderBy === "property_name" ? order : "asc"}
                                                onClick={() => {
                                                    handleSortRequest("property_name");
                                                }}
                                        >
                                              Area Percent
                                        </TableSortLabel>
                                        </TableCell>
                                        <TableCell className={classes.tablePadding}>
                                        <TableSortLabel
                                          active={true}
                                                direction={orderBy === "property_name" ? order : "asc"}
                                                onClick={() => {
                                                    handleSortRequest("property_name");
                                                }}
                                        >
                                              Next Billing Date
                                        </TableSortLabel>
                                        </TableCell>
                                            <TableCell className={classes.tablePadding}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {recordsAfterPagingAndSorting().map((category, index) => (
                                        <TableRow key={category._id}>
                                            <TableCell component="th" scope="row" className={classes.textMiddle}>
                                                {index + 1 + (page) * rowsPerPage}
                                            </TableCell>
                                            <TableCell className={classes.textMiddle}>
                                                <div>
                                                {category?.agent?.first_name}  {category?.agent?.last_name} 
                                                </div>
                                            </TableCell>
                                            <TableCell className={classes.textMiddle}>
                                                <div>
                                                {category?.service_area?.zip_code}
                                                </div>
                                            </TableCell>
                                            <TableCell className={classes.textMiddle}>
                                                <div style={{marginRight : '1rem'}}>
                                                {category?.service_area?.area_percent} %
                                                </div>
                                            </TableCell>
                                            <TableCell className={classes.textMiddle}>
                                                <div>
                                                {dateOfJoining(category?.service_area?.next_billing_date)}
                                                </div>
                                            </TableCell>
                                            <TableCell className={classes.textMiddle}>
                                            <div>
                                            <a href={ `/adminPanel/agent-approve/${category.agent._id}`} className="term-link" target="_blank">
                                                    <Button 
                                                    style={{background: "#EB7D35", color: 'white'}}
                                                variant="outlined"
                                                    aria-label="add"
                                                    className={classes.iconMargin}                             
                                                >
                                                Agent Details
                                                    </Button>
                                            </a>
                                           </div>
                                            </TableCell>
                            </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            className={classes.tablePaginationStyle}
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={tableData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                       </>
                        </Paper>
                    </DashboardWrapper>
                </DashboardContainer>
            </div>

            <Modal
                isOpen={agentPopup}
                className="update_profile"
                onClose={() => {
                    setAgentPopup(false);
                }}
                maxWidth='sm'
                title={
                    <div className="modalsign">
                        <div
                            className="closeicon"
                            onClick={() => {
                                setAgentPopup(false);
                            }}
                        >
                            <i className="fas fa-times"></i>
                        </div>

                        <>
                            <h4>
                            Assigned Agent
                            </h4>
                        </>
                    </div>
                }
                content={
                  <>
                  <ul class="list-group">

                  {agentList?.map((datasvc, index ) => (
                    <li class="list-group-item d-flex justify-content-between ">
                    <div>{datasvc?.first_name + " " + datasvc?.last_name}</div>
                    <Button 
                        variant="outlined"
                            aria-label="add"
                            className={classes.iconMargin}
                            onClick={() => {
                            history.push(`/adminPanel/agent-approve/${datasvc?._id}`)
                        }}  
                                                                
                        >
                            <VisibilityIcon
                            color="primary" 
                            />
                   </Button>
                    </li>
                  ))}
                  </ul>
                  </>
                }
                />


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
