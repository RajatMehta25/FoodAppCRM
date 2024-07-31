import React, { useState, useEffect } from 'react'
import { DashboardContainer, DashboardWrapper, DashboardHeading, DashHeading, SvgLogo, BackIcon, MenuAndBack, PreperationTime, LabelHeading, RetaurantDetailsForm, InputDivide, MiddleColumnProfile, InputPic, HeadingBlock, HeadingProfile, HeadingPara, MultipleButtons, TripleButton, MultipleButton, VoucherHeading, VoucherHeadingMain, FullWidthMobileInput, OfferRadioSection, OfferSectionLabel, MobileViewCalender, HeadingButton, LoginButton } from '../UserManagement/UserElements'
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
        getSubscriptions();
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


    const getSubscriptions = async () => {
        try {
            const { data } = await axios.get(`/admin/property-list/${params?.id}`);
            // const { data } = await axios.get(`/admin/property-list/634fcb7251dd23fa79e8c1a4`);
            console.log("buyer", data);
            setTableData(data.data)
            setSearchedData(data.data)
        } catch (error) {
            console.log(error);
                history.push('/adminPanel')
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userData");
        }
    };


    const handleSubscription = async (values) => {
        
        console.log(values);

        var fromData = {
            amount: values.amount,
            name: values.name,
            type: values.type,
            "features":[
                values.feature1, values.feature2, values.feature3  
            ],
            discount: values.discount,
            month: values.month
        };

        console.log(fromData);
        setIsLoading(true);

        // try {
        //     if (values.id) {
        //         const { data } = await axios.put("/admin/subscription-plan", {
        //             id: values.id,
        //             amount: values.amount,
        //             name: values.name,
        //             type: values.type,
        //             "features":[
        //                 values.feature1, values.feature2, values.feature3  
        //             ],
        //             discount: values.discount,
        //             month: values.month

        //         });
        //         toast.success(`${data.message}`, {
        //             position: toast.POSITION.TOP_RIGHT,
        //         });
        //         setIsLoading(false);
        //         getSubscriptions();
        //     } else {
        //         const { data } = await axios.post("/admin/subscription-plan", fromData);
        //         toast.success(`${data.message}`, {
        //             position: toast.POSITION.TOP_RIGHT,
        //         });
        //         setIsLoading(false);
        //         getSubscriptions();
        //     }
        //     setDefaultState({
        //         isAddBranch: false
        //     });

        // } catch (error) {
        //     setIsLoading(false);
        //     setMenuState({
        //         isOfferVoucher: true,
        //         isAddOffer: false
        //     });
        //     toast.error(`${error.response.data.message}`, {
        //         position: toast.POSITION.TOP_RIGHT,
        //     });
        //     if (error.response.status === 401) {
        //         history.push('/')
        //         localStorage.removeItem("accessToken");
        //         localStorage.removeItem("userData");

        //     }
        // }
    };

    const handleDeleteOffers = async (id) => {
        if (window.confirm('Are you sure you want to delete this Product ?')) {
            try {
                const { data } = await axios.post("/superMarket/delete_product", {
                    _id: id,
                });
                getSubscriptions();
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
            getSubscriptions();
        }
    };



    const requestSearch = (searchedVal) => {
        console.log("searchedVal", searchedData);
        const filteredRows = searchedData.filter((row) => {
            let mobileNumber = JSON.stringify(get(row, "phone_number", ""))
            let unitId = JSON.stringify(get(row, "unit_id", ""))
            return row.first_name.toLowerCase().includes(searchedVal.target.value.toLowerCase()) ||
            mobileNumber.toLowerCase().includes(searchedVal.target.value.toLowerCase()) ||
            unitId.toLowerCase().includes(searchedVal.target.value.toLowerCase());
        });
        setTableData(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        getSubscriptions();
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


    const userBlocked = async (e) => {
        // console.log(e);
        if(e.categoryBlocked === true) {
          if(window.confirm('Are you sure you want to unblock this user?')) {
            try {
              await axios.post("/admin/users-block-status", {
                user_id: e.categoryId,
                is_blocked: false
              });
              getSubscriptions();
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
          if(window.confirm('Are you sure you want to block this user?')) {
            try {
              await axios.post("/admin/users-block-status", {
                user_id: e.categoryId,
                is_blocked: true
              });
              getSubscriptions();
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
          return "error"
        }
        
      };

      const dateOfJoining = (e) => {
        var date = new Date(e).toLocaleDateString()
        return date;
      }



      const subscriptionType = (e) => {
        if (e === "1") {
            return "Yearly"
        } else if (e === "2") {
            return "Monthly"
        } else if (e === "3") {
            return "Quarterly"
        } else {
            return false
        } 
      }


      const showUnitOptions = [
        {
            label: "Yearly",
            value: "1"
        },
        {
            label: "Monthly",
            value: "2"
        },
        {
            label: "Quarterly",
            value: "3"
        }
    ]

    const subscriptionFun = (e) => {
        if (e === "1") {
            return "Yearly"
        } else if (e === "2") {
            return "Monthly"
        } else if (e === "3") {
            return "Quarterly"
        }
    }

    const handleDeleteItem = async (id) => {
        console.log("id", id);
        if (window.confirm('Are you sure you want to delete this Subscription Plan ?')) {
            try {
                const { data } = await axios.delete(`/admin/subscription-plan/${id}`);
                getSubscriptions();
                toast.error(`Offer is deleted sucessfully.`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } catch (error) {
                console.log(error);
                toast.error(`${error.response.data.message}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } else {
            getSubscriptions();
        }
    };

    const blockUnblockSubscription = async (id, is_active) => {
        try {
            const { data } = await axios.post("/admin/subscription-plan-status", {
                id: id,
                is_enabled: !is_active ? true : false,
            });

            getSubscriptions();
            toast.success(data.message, {
                position: toast.POSITION.TOP_RIGHT,
            });


        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }


    };



    return (
        <>
            <div>
                <DashboardContainer>
                    <DashboardWrapper>
                        <DashboardHeading>
                            <MenuAndBack>
                                <DashHeading>
                               View Properties List
                                </DashHeading>
                            </MenuAndBack>
                            {(menuState.isOfferVoucher) ? (
                                <>
                                    <>
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
                                    </>
                          
                                </>
                            ) : ""}

                            {/* <HeadingButton onClick={() => {
                                setBranchFormValues({
                                    type: "",
                                    amount: "",
                                    name: "",
                                })
                                setDefaultState({
                                    isAddBranch: true
                                });
                                setEditChange(false)
                            }}>
                                Add Subscription
                            </HeadingButton> */}

                            

                        </DashboardHeading>


                        <Paper className={classes.paperTableHeight} style={{ overflow: "hidden", height: "100%" }}>
                            {menuState.isOfferVoucher ? (
                                <>
                                    <TableContainer className={classes.tableContainerHeight}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className={classes.tablePadding} style={{ fontWeight : '800' }}>S.&nbsp;No.</TableCell>
                                                    <TableCell className={classes.tablePadding}>Property Name</TableCell>
                                                    <TableCell className={classes.tablePadding}>
                                                        <TableSortLabel>
                                                            Posting Date
                                                        </TableSortLabel>
                                                    </TableCell>
                                                    <TableCell className={classes.tablePadding}>Property Location</TableCell>
                                                    <TableCell className={classes.tablePadding}><TableSortLabel>
                                                           Price
                                                        </TableSortLabel>
                                                      </TableCell>
                                                    <TableCell className={classes.tablePadding}>Actions</TableCell>
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
                                                                {get(category, 'property_name', '') }
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className={classes.textMiddle}>
                                                            <div>
                                                            {dateOfJoining(category.createdAt)}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className={classes.textMiddle}>
                                                            <div>
                                                            {get(category, 'address.state', '')}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className={classes.textMiddle}>
                                                            <div>
                                                            $500
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className={classes.textMiddle}>
                                                        <div className={classes.tableFlex}>
                                                        <a href={ `/webPanel/property/${category._id}`} className="term-link" target="_blank">
                                                        <Button 
                                                            variant="outlined"
                                                                aria-label="add"
                                                                className={classes.iconMargin}                                   
                                                                >
                                                                <VisibilityIcon
                                                                color="primary" 
                                                                />
                                                        </Button>
                                                        </a>
                                                            {/* <SvgLogo
                                                                style={{ padding: "0rem 0.2rem" }}
                                                                className="logoImage"
                                                                src={DeleteIcon}
                                                                onClick={() => {
                                                                    handleDeleteOffers(category._id)
                                                                }
                                                                }
                                                            />  */}
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


                 {/* Menu add */}
                 <Modal
                isOpen={defaultState.isAddBranch}
                className="update_profile"
                onClose={() => {
                    setDefaultState({
                        isAddBranch: false
                    });
                }}
                maxWidth='sm'
                title={
                    <div className="modalsign">
                        <div
                            className="closeicon"
                            onClick={() => {
                                setDefaultState({
                                    isAddBranch: false
                                });
                            }}
                        >
                            <i className="fas fa-times"></i>
                        </div>

                        <>
                            <h3>
                            {editChange ? "Edit Subscription" : "Add Subscription"}
                            </h3>
                        </>
                    </div>
                }
                content={

                    <Formik
                        enableReinitialize
                        initialValues={updateBranchFormValues}
                        // validate={offerValidator}
                        validateOnChange
                        onSubmit={handleSubscription}
                    >
                        {(formikBag) => {
                            return (
                                <Form>
                                    <div className="signup-cont">

                                        <div className="row">
                                            {/* <div className="col-md-12"> */}
                                            <div className="col-md-6">
                                            <label className={classes.offerLabel}>Plan Name</label>
                                                <Field name="name">
                                                    {({ field }) => (
                                                        <div className="pb-2 mt-1">
                                                            <Input
                                                                {...field}
                                                                type="text"
                                                                variant="outlined"
                                                                value={formikBag.values.name}
                                                                onChange={(e) => {
                                                                    formikBag.setFieldValue(
                                                                        "name",
                                                                        e.target.value
                                                                    );
                                                                }}
                                                                error={
                                                                    formikBag.touched.name &&
                                                                        formikBag.errors.name
                                                                        ? formikBag.errors.name
                                                                        : null
                                                                }
                                                                className="form-control"
                                                                placeholder="Plan Name"
                                                            />
                                                        </div>
                                                    )}
                                                </Field>
                                            </div>

                                            <div className="col-md-6">
                                            <label className={classes.offerLabel}>Plan Type</label>
                                                <Field name="type">
                                                    {({ field }) => (
                                                        <div className="py-1">
                                                            <Select
                                                                defaultValue={!isEmpty(formikBag.values.type) ? { label: subscriptionFun(formikBag.values.type) , value: formikBag.values.type } : ""}
                                                                className="mt-1"
                                                                options={showUnitOptions}
                                                                isSearchable={false}
                                                                isClearable={false}
                                                                placeholder="Plan Type"
                                                                onChange={(option) => {
                                                                    formikBag.setFieldValue(
                                                                        "type",
                                                                        option.value
                                                                    );
                                                                }}
                                                                error={
                                                                    formikBag.touched.type &&
                                                                        formikBag.errors.type
                                                                        ? formikBag.errors.type
                                                                        : null
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                </Field>
                                            </div>

                                            <div className="col-md-6">
                                            <label className={classes.offerLabel}>Plan Amount</label>
                                                <Field name="amount">
                                                    {({ field }) => (
                                                        <div className="pb-2 mt-1">
                                                            <Input
                                                                {...field}
                                                                type="number"
                                                                variant="outlined"
                                                                value={formikBag.values.amount}
                                                                onChange={(e) => {
                                                                    formikBag.setFieldValue(
                                                                        "amount",
                                                                        e.target.value
                                                                    );
                                                                }}
                                                                error={
                                                                    formikBag.touched.amount &&
                                                                        formikBag.errors.amount
                                                                        ? formikBag.errors.amount
                                                                        : null
                                                                }
                                                                className="form-control"
                                                                placeholder="Plan Amount"
                                                            />
                                                        </div>
                                                    )}
                                                </Field>
                                            </div>

                                            <div className="col-md-6">
                                            <label className={classes.offerLabel}>Discount</label>
                                                <Field name="discount">
                                                    {({ field }) => (
                                                        <div className="pb-2 mt-1">
                                                            <Input
                                                                {...field}
                                                                type="number"
                                                                variant="outlined"
                                                                value={formikBag.values.discount}
                                                                onChange={(e) => {
                                                                    formikBag.setFieldValue(
                                                                        "discount",
                                                                        e.target.value
                                                                    );
                                                                }}
                                                                error={
                                                                    formikBag.touched.discount &&
                                                                        formikBag.errors.discount
                                                                        ? formikBag.errors.discount
                                                                        : null
                                                                }
                                                                className="form-control"
                                                                placeholder="Discount"
                                                            />
                                                        </div>
                                                    )}
                                                </Field>
                                            </div>

                                            <div className="col-md-6">
                                            <label className={classes.offerLabel}>Month</label>
                                                <Field name="month">
                                                    {({ field }) => (
                                                        <div className="pb-2 mt-1">
                                                            <Input
                                                                {...field}
                                                                type="number"
                                                                variant="outlined"
                                                                max={12}
                                                                value={formikBag.values.month}
                                                                onChange={(e) => {
                                                                    formikBag.setFieldValue(
                                                                        "month",
                                                                        e.target.value
                                                                    );
                                                                }}
                                                                error={
                                                                    formikBag.touched.month &&
                                                                        formikBag.errors.month
                                                                        ? formikBag.errors.month
                                                                        : null
                                                                }
                                                                className="form-control"
                                                                placeholder="Month"
                                                            />
                                                        </div>
                                                    )}
                                                </Field>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12">
                                                <label className={classes.offerLabel}>Features</label>
                                                    <Field name="feature1">
                                                        {({ field }) => (
                                                            <div className="pb-2 mt-1">
                                                                <Input
                                                                    {...field}
                                                                    type="test"
                                                                    variant="outlined"
                                                                    value={formikBag.values.feature1}
                                                                    onChange={(e) => {
                                                                        formikBag.setFieldValue(
                                                                            "feature1",
                                                                            e.target.value
                                                                        );
                                                                    }}
                                                                    error={
                                                                        formikBag.touched.feature1 &&
                                                                            formikBag.errors.feature1
                                                                            ? formikBag.errors.feature1
                                                                            : null
                                                                    }
                                                                    className="form-control"
                                                                    placeholder="Feature "
                                                                />
                                                            </div>
                                                        )}
                                                    </Field>

                                                    <Field name="feature2">
                                                        {({ field }) => (
                                                            <div className="pb-2 mt-1">
                                                                <Input
                                                                    {...field}
                                                                    type="test"
                                                                    variant="outlined"
                                                                    value={formikBag.values.feature2}
                                                                    onChange={(e) => {
                                                                        formikBag.setFieldValue(
                                                                            "feature2",
                                                                            e.target.value
                                                                        );
                                                                    }}
                                                                    error={
                                                                        formikBag.touched.feature2 &&
                                                                            formikBag.errors.feature2
                                                                            ? formikBag.errors.feature2
                                                                            : null
                                                                    }
                                                                    className="form-control"
                                                                    placeholder="Feature "
                                                                />
                                                            </div>
                                                        )}
                                                    </Field>

                                                    <Field name="feature3">
                                                        {({ field }) => (
                                                            <div className="pb-2 mt-1">
                                                                <Input
                                                                    {...field}
                                                                    type="test"
                                                                    variant="outlined"
                                                                    value={formikBag.values.feature3}
                                                                    onChange={(e) => {
                                                                        formikBag.setFieldValue(
                                                                            "feature3",
                                                                            e.target.value
                                                                        );
                                                                    }}
                                                                    error={
                                                                        formikBag.touched.feature3 &&
                                                                            formikBag.errors.feature3
                                                                            ? formikBag.errors.feature3
                                                                            : null
                                                                    }
                                                                    className="form-control"
                                                                    placeholder="Feature "
                                                                />
                                                            </div>
                                                        )}
                                                    </Field>

                                                </div>
                                            </div>


                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center' }}>
                                            <HeadingButton type="submit" style={{ padding: '0.6em 3.3em' }}>
                                                Save Subscription
                                            </HeadingButton>
                                        </div>

                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
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
