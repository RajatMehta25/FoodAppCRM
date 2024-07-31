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
import { withRouter } from 'react-router-dom';
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
import { MultipleButtons, TripleButton, MultipleButton, ServiceTable, ServiceTableRow, ServiceTableHeading, ServiceTableRowHeader, ServiceTableColumn,  ServiceTableWrapper, TotalTableRow, TotalTableColumn, AddAmountWrap } from './ServiceAreaElements';

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


    const [defaultState, setDefaultState] = useState({ isAddMenu: "", isRestaurantDetails: "" })
    const [menuState, setMenuState] = useState({ isOfferVoucher: true, isAddOffer: false })
    const [isLoading, setIsLoading] = useState(false);
    const [offersData, setOffersData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [editChange, setEditChange] = useState(false);
    const [offerRadio, setOfferRadio] = useState([
        {
            label: "spend more earn more",
            isActive: false
        },
        {
            label: "free/heavy discount",
            isActive: false
        },
    ]);
    const [categoryList, setCategoryList] = useState([]);
    const [searched, setSearched] = useState("");
    const [searchedData, setSearchedData] = useState([]);
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [buyerData, setBuyerData] = useState([]);
    const [pendingPopup, setPendingPopup] = useState({ isPendingService: "", isPendingAmount: "" })
    const [pendingServiceTab, setPendingServiceTab] = useState({ PendingServiceArea: true, PendingServiceAmount : false })
    const [serviceAreaList, setServiceAreaList] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [serviceTotal, setServiceTotal] = useState('');

    const [updateBranchFormValues, setBranchFormValues] = useState({
        id: "",
        type: "",
        amount: "",
        name: "",
        feature1: "",
        feature2: "",
        feature3: "",
        discount: "",
        month: ""
    });

    useEffect(() => {
        if (!userData) {
            history.push("/adminPanel")
        }
    }, []);


    useEffect(() => {
        getServiceArea();
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


    const getServiceArea = async () => {
        try {
            const { data } = await axios.get("/admin/pending-service-area");
            console.log("buyer", data);
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

    const getServiceAreaAmount = async () => {
        try {
            const { data } = await axios.get("/admin/pending-service-area-amount");
            setTableData(data.data)
            setSearchedData(data.data)
        } catch (error) {
            console.log(error);
                history.push('/adminPanel')
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userData");
        }
    };


    const handleDeleteOffers = async (id) => {
        if (window.confirm('Are you sure you want to delete this Product ?')) {
            try {
                const { data } = await axios.post("/superMarket/delete_product", {
                    _id: id,
                });
                getServiceArea();
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
          getServiceArea();
        }
    };



    const requestSearch = (searchedVal) => {
        console.log("searchedVal", searchedData);
        const filteredRows = searchedData.filter((row) => {
            let name = row?.agent?.first_name +" "+ row?.agent?.last_name ;
            let mobileNumber = JSON.stringify(get(row.agent.phone_number, "phone_number", ""))
            return name.toLowerCase().includes(searchedVal.target.value.toLowerCase()) ||
            mobileNumber.toLowerCase().includes(searchedVal.target.value.toLowerCase()) ||
            row?.agent?.email.toLowerCase().includes(searchedVal.target.value.toLowerCase());
        });
        setTableData(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        getServiceArea();
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





    const [message, setMessage] = useState('');

    const [updated, setUpdated] = useState(message);
  
    const handleChange = (value, svcId ) => {

        console.log("svcId", svcId);
        const newState = serviceData.map(obj => {
            if (obj.service_area_id === svcId) {
              return {...obj, amount: value};
            }
            return obj;
          });
          
          setServiceData(newState);

          let sum = newState.reduce(function(prev, current) {
            return prev + +current.amount
          }, 0);

          setServiceTotal(sum);

    //   setMessage(event.target.value);
    };


    console.log("serviceData", serviceData);
  
    const handleClick = () => {
      setUpdated(message);
    };


    const handleService = async (values) => {

        if(serviceTotal <= 0) {
             alert("Amount must be greater than 0");
             return false
        } else {
                setIsLoading(true);
    
                var serviceValue = {
                    id: serviceAreaList._id,
                    service_area: serviceData,
                    total : serviceTotal
                };
        
                try {
                    const { data } = await axios.post("/admin/edit-service-area-amount", serviceValue);
                    toast.success(`${data.message}`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                        setIsLoading(false);
                        getServiceArea();
                        setPendingPopup({
                            isPendingService: false
                          });
        
                          setServiceTotal("");
        
                          setIsLoading(false);
        
                } catch (error) {
                    setIsLoading(false);
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
    };


    function duration(daysPassed) {
        if(daysPassed>365) {
            return `${Math.round(daysPassed/365)} year`;
          } else if(daysPassed<365 && daysPassed>28) {
            return `${Math.round(daysPassed/28)} month`;
          } else if(daysPassed<28 && daysPassed>10) {
            return `${daysPassed} days`;
          } else if(daysPassed<10 && daysPassed>1) {
            return `${daysPassed} days`;
          }
    }



    






    return (
        <>
            <div>
                <DashboardContainer>
                    <DashboardWrapper>
                        <DashboardHeading>
                            <MenuAndBack>
                                <DashHeading>
                               Manage Service Area
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

                        <MultipleButtons className={classes.backColor}>
                          <TripleButton>
                              <MultipleButton
                                  selected={pendingServiceTab.PendingServiceArea}
                                  onClick={() => {
                                    setPendingServiceTab({
                                    PendingServiceArea: true,
                                    PendingServiceAmount: false,
                                  });
                                  getServiceArea();
                                  }}
                              >
                              Request Pending Service Area
                              </MultipleButton>
                              <MultipleButton
                                  selected={pendingServiceTab.PendingServiceAmount}
                                  onClick={() => {
                                    setPendingServiceTab({
                                    PendingServiceArea: false,
                                    PendingServiceAmount: true,
                                  });
                                  getServiceAreaAmount();

                                  }}
                                >
                                  Request Pending Amount
                              </MultipleButton>
                          </TripleButton>
                        </MultipleButtons>

                        


                        <Paper className={classes.paperTableHeight} style={{ overflow: "hidden", height: "100%" }}>


                            {pendingServiceTab.PendingServiceArea ? (
                                <>
                                    <TableContainer className={classes.tableContainerHeight}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className={classes.tablePadding} style={{ fontWeight : '800' }}>S.&nbsp;No.</TableCell>
                                                    <TableCell className={classes.tablePadding}>
                                                        <TableSortLabel>
                                                            Agent Name
                                                        </TableSortLabel>
                                                    </TableCell>
                                                    <TableCell className={classes.tablePadding}>Email Id</TableCell>
                                                    <TableCell className={classes.tablePadding}><TableSortLabel>
                                                           Mobile Number
                                                        </TableSortLabel>
                                                      </TableCell>
                                                        <TableCell className={classes.tablePadding}>View All Service Area</TableCell>
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
                                                            {category?.agent?.first_name} {category?.agent?.last_name}
                                                                {/* {get(category, 'agent.agent_profile.', '') } */}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className={classes.textMiddle}>
                                                            <div>
                                                            {category?.agent?.email}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className={classes.textMiddle}>
                                                            <div>
                                                            {category?.agent?.country_code} {category?.agent?.phone_number}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className={classes.textMiddle}>
                                                        <div>
                                                                <Button 
                                                            variant="outlined"
                                                                aria-label="add"
                                                                className={classes.iconMargin}
                                                                onClick={() => {
                                                                    setPendingPopup({
                                                                        isPendingService: true
                                                                     });
                                                                     setServiceAreaList(category)
                                                                     setServiceData(Object?.keys(category?.service_area).map((v) => (
                                                                              {
                                                                                    service_area_id : category?.service_area[v]._id,
                                                                                    amount: "",
                                                                               })))
                                                            }}                                      
                                                            >
                                                                <VisibilityIcon
                                                                color="primary" 
                                                                />
                                                                </Button>
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
                            ) : ""}


                            {pendingServiceTab.PendingServiceAmount ? (
                                <>
                                    <TableContainer className={classes.tableContainerHeight}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className={classes.tablePadding} style={{ fontWeight : '800' }}>S.&nbsp;No.</TableCell>
                                                    <TableCell className={classes.tablePadding}>
                                                        <TableSortLabel>
                                                            Agent Name
                                                        </TableSortLabel>
                                                    </TableCell>
                                                    <TableCell className={classes.tablePadding}>Email Id</TableCell>
                                                    <TableCell className={classes.tablePadding}><TableSortLabel>
                                                           Mobile Number
                                                        </TableSortLabel>
                                                      </TableCell>
                                                        <TableCell className={classes.tablePadding}>View All Service Area</TableCell>
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
                                                            {category?.agent?.first_name} {category?.agent?.last_name}
                                                                {/* {get(category, 'agent.agent_profile.', '') } */}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className={classes.textMiddle}>
                                                            <div>
                                                            {category?.agent?.email}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className={classes.textMiddle}>
                                                            <div>
                                                            {category?.agent?.country_code} {category?.agent?.phone_number}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className={classes.textMiddle}>
                                                        <div>
                                                                <Button 
                                                            variant="outlined"
                                                                aria-label="add"
                                                                className={classes.iconMargin}
                                                                onClick={() => {
                                                                    setPendingPopup({
                                                                        isPendingAmount: true
                                                                     });
                                                                     setServiceAreaList(category)
                                                                     setServiceData(Object?.keys(category?.service_area).map((v) => (
                                                                              {
                                                                                    service_area_id : category?.service_area[v]._id,
                                                                                    amount: "",
                                                                               })))
                                                            }}                                      
                                                            >
                                                                <VisibilityIcon
                                                                color="primary" 
                                                                />
                                                                </Button>
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
                            ) : ""}


                        </Paper>
                    </DashboardWrapper>
                </DashboardContainer>
            </div>


                 {/* Pending Service */}
                 <Modal
                isOpen={pendingPopup.isPendingService}
                className="update_profile"
                onClose={() => {
                  setPendingPopup({
                    isPendingService: false
                    });
                    setServiceTotal("");
                }}
                maxWidth='md'
                title={
                    <div className="modalsign">
                        <div
                            className="closeicon"
                            onClick={() => {
                              setPendingPopup({
                              isPendingService: false
                              });
                              setServiceTotal("");
                            }}
                        >
                            <i className="fas fa-times"></i>
                        </div>

                        <>
                            <h4>
                            {editChange ? "Edit Subscription" : "Manage Service Area Amount"}
                            </h4>
                        </>
                    </div>
                }
                content={
                  <>
                  <ServiceTable>
                    <ServiceTableRowHeader>
                      <ServiceTableHeading>Pincode</ServiceTableHeading>
                      <ServiceTableHeading>Area %</ServiceTableHeading>
                      <ServiceTableHeading>Months</ServiceTableHeading>
                      <ServiceTableHeading>Add Amount</ServiceTableHeading>
                    </ServiceTableRowHeader>

                    {serviceAreaList?.service_area?.map((svc, index ) => (
                        <ServiceTableRow>
                      <ServiceTableColumn>
                      {svc?.zip_code}
                      </ServiceTableColumn>
                      <ServiceTableColumn>
                      {svc?.area_percent}
                      </ServiceTableColumn>
                      <ServiceTableColumn>
                      {svc?.no_of_days === 0 ? `0 days`: duration(svc?.no_of_days)}
                      </ServiceTableColumn>
                      <ServiceTableColumn>

                      <AddAmountWrap>
                      <input
                            type="number"
                            id={svc?._id}
                            name="message"
                            placeholder="Add Amount"
                            onChange={(e) => {
                                       handleChange(e.target.value, svc?._id )
                            }}
                            // value={message}
                            style= {{width: '120px', padding: '0.5rem'}}
                       />

                          {/* <SvgLogo
                            style={{ padding: "0rem 1.2rem" }}
                            className="logoImage"
                            src={EditIcon}
                            /> */}
                      </AddAmountWrap>
                      </ServiceTableColumn>
                </ServiceTableRow>
                    ))}
                <TotalTableRow>
                      <TotalTableColumn>
                     Total Amount
                      </TotalTableColumn>
                      <TotalTableColumn>
                      </TotalTableColumn>
                      <TotalTableColumn>
                      </TotalTableColumn>
                      <TotalTableColumn>
                      {serviceTotal}
                      </TotalTableColumn>
                </TotalTableRow>
                </ServiceTable>

                <div className="row mt-3">
                    <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center' }}>
                        <HeadingButton
                            onClick={() => {
                                handleService();
                            }}
                         style={{ padding: '0.6em 2em' }}>
                            Save
                        </HeadingButton>
                    </div>
               </div>
              </>
                }
                />

                  {/* Pending Service Amount */}

                  <Modal
                isOpen={pendingPopup.isPendingAmount}
                className="update_profile"
                onClose={() => {
                  setPendingPopup({
                    isPendingService: false
                    });
                }}
                maxWidth='md'
                title={
                    <div className="modalsign">
                        <div
                            className="closeicon"
                            onClick={() => {
                              setPendingPopup({
                              isPendingService: false
                              });
                            }}
                        >
                            <i className="fas fa-times"></i>
                        </div>

                        <>
                            <h4>
                            {editChange ? "Edit Subscription" : "Manage Service Area Amount"}
                            </h4>
                        </>
                    </div>
                }
                content={
                  <>
                  <ServiceTable>
                    <ServiceTableRowHeader>
                      <ServiceTableHeading>Pincode</ServiceTableHeading>
                      <ServiceTableHeading>Area %</ServiceTableHeading>
                      <ServiceTableHeading>Months</ServiceTableHeading>
                      <ServiceTableHeading>Add Amount</ServiceTableHeading>
                    </ServiceTableRowHeader>

                    {serviceAreaList?.service_area?.map((svc, index ) => (
                        <ServiceTableRow>
                      <ServiceTableColumn>
                      {svc?.zip_code}
                      </ServiceTableColumn>
                      <ServiceTableColumn>
                      {svc?.area_percent}
                      </ServiceTableColumn>
                      <ServiceTableColumn>
                      {2}
                      </ServiceTableColumn>
                      <ServiceTableColumn>

                      <AddAmountWrap>
                      <input
                            type="number"
                            id={svc?._id}
                            name="message"
                            // onChange={(e) => {
                            //            handleChange(e.target.value, svc?._id )
                            // }}
                            value={svc?.amount}
                            disabled
                            style= {{width: '120px', padding: '0.5rem'}}
                       />
                      </AddAmountWrap>
                      </ServiceTableColumn>
                </ServiceTableRow>
                    ))}
                <TotalTableRow>
                      <TotalTableColumn>
                     Total Amount
                      </TotalTableColumn>
                      <TotalTableColumn>
                      </TotalTableColumn>
                      <TotalTableColumn>
                      </TotalTableColumn>
                      <TotalTableColumn>
                      {serviceAreaList?.total_amount}
                      </TotalTableColumn>
                </TotalTableRow>
                </ServiceTable>
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
