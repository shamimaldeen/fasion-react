import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../partials/Breadcrumb";
import CardHeader from "../../partials/CardHeader";
import axios from "axios";
import Constants from "../../../Constants";

const Report = () => {

    const [report , setReport] = useState([]);

    const getReport =()=>{
        axios.get(`${Constants.BASE_URL}/get-report`).then(res=> {
            setReport(res.data);

        });
    }

    useEffect(()=>{
        getReport();
    },[])
    return (
        <>
            <Breadcrumb title={"Report"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <CardHeader title={'Report'}link={''} button_text={''} icon={''} hide={true} />
                        </div>
                        <div className="card-body">

                            <div className="card">
                            <div className="card-header">
                                <h5>Sales(Branch)</h5>
                            </div>
                            <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="card report-card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fa-solid fa-cart-shopping fa-beat fa-2x"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Total Sales</h6>
                                                    <h5>{report.total_sale}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card report-card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fa-solid fa-cart-shopping fa-beat fa-2x"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Today's Sales</h6>
                                                    <h5>{report.total_sale_today}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<div className="col-md-3">*/}
                                {/*    <div className="card report-card">*/}
                                {/*        <div className="card-body">*/}
                                {/*            <div className="d-flex align-items-center">*/}
                                {/*                <div className="flex-shrink-0">*/}
                                {/*                    <i className="fa-solid fa-person-walking-arrow-loop-left fa-beat-fade fa-2x"></i>*/}
                                {/*                </div>*/}
                                {/*                <div className="flex-grow-1 ms-3">*/}
                                {/*                    <h6>Total Sales Return</h6>*/}
                                {/*                    <h5>16000 Tk</h5>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className="col-md-3">
                                    <div className="card report-card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fa-solid fa-cart-plus fa-beat-fade fa-2x"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Total Purchase</h6>
                                                    <h5>{report.total_purchase}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card report-card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fa-solid fa-cart-plus fa-beat-fade fa-2x"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Today's Purchase</h6>
                                                    <h5>{report.total_purchase_today}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<div className="col-md-3">*/}
                                {/*    <div className="card report-card">*/}
                                {/*        <div className="card-body">*/}
                                {/*            <div className="d-flex align-items-center">*/}
                                {/*                <div className="flex-shrink-0">*/}
                                {/*                    <i className="fa-solid fa-arrow-rotate-left fa-beat-fade fa-2x"></i>*/}
                                {/*                </div>*/}
                                {/*                <div className="flex-grow-1 ms-3">*/}
                                {/*                    <h6>Total Purchase Return</h6>*/}
                                {/*                    <h5>18000 Tk</h5>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                            <div className="row">

                                {/*<div className="col-md-3">*/}
                                {/*    <div className="card report-card">*/}
                                {/*        <div className="card-body">*/}
                                {/*            <div className="d-flex align-items-center">*/}
                                {/*                <div className="flex-shrink-0">*/}
                                {/*                    <i className="fa-solid fa-arrow-right-arrow-left fa-beat-fade fa-2x"></i>*/}
                                {/*                </div>*/}
                                {/*                <div className="flex-grow-1 ms-3">*/}
                                {/*                    <h6>Today's Sales Return</h6>*/}
                                {/*                    <h5>16000 Tk</h5>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/*<div className="col-md-3">*/}
                                {/*    <div className="card report-card">*/}
                                {/*        <div className="card-body">*/}
                                {/*            <div className="d-flex align-items-center">*/}
                                {/*                <div className="flex-shrink-0">*/}
                                {/*                    <i className="fa-solid fa-arrow-right-arrow-left fa-beat-fade fa-2x"></i>*/}
                                {/*                </div>*/}
                                {/*                <div className="flex-grow-1 ms-3">*/}
                                {/*                    <h6>Today's Purchase Return</h6>*/}
                                {/*                    <h5>18000 Tk</h5>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                            </div>
                            </div>
                            <div className="card">
                            <div className="card-header">
                                <h5>Stock</h5>
                            </div>
                            <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="card report-card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fa-solid fa-box-open fa-beat fa-2x"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Total Product</h6>
                                                    <h5>{report.total_product}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card report-card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fa-solid fa-box fa-beat-fade fa-2x"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Total Stock</h6>
                                                    <h5>{report.total_stock}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card report-card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fa-solid fa-battery-quarter fa-beat-fade fa-2x"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Total Low Stock</h6>
                                                    <h5>{report.low_stock}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card report-card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fa-solid fa-dollar-sign fa-beat-fade fa-2x"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Total Stock Value(Cost)</h6>
                                                    <h5>{report.total_buying_price}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card report-card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fa-solid fa-dollar-sign fa-beat-fade fa-2x"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Total Stock Value(Sale WOD)</h6>
                                                    <h5>{report.total_selling_price}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="card report-card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fa-solid fa-dollar-sign fa-beat-fade fa-2x"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Possible Profit</h6>
                                                    <h5>{report.total_possible_profit}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            </div>
                            <div className="card">
                            <div className="card-header">
                                <h5>Expense(Branch)</h5>
                            </div>
                            <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="card report-card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fa-solid fa-hand-holding-dollar fa-beat fa-2x"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Total Expense</h6>
                                                    <h5>15600 Tk</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card report-card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fa-solid fa-sack-dollar fa-beat-fade fa-2x"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Today's Expense</h6>
                                                    <h5>16000 Tk</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            </div>
                            <div className="card">
                            <div className="card-header">
                                <h5>Withdrawals(Branch)</h5>
                            </div>
                            <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="card report-card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fa-solid fa-right-from-bracket fa-beat fa-2x"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Total Withdrawals</h6>
                                                    <h5>15600 Tk</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card report-card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fa-solid fa-outdent fa-beat-fade fa-2x"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Today's Withdrawals</h6>
                                                    <h5>16000 Tk</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            </div>
                            <div className="card">
                            <div className="card-header">
                                <h5>Profit</h5>
                            </div>
                            <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="card report-card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fa-solid fa-chart-line fa-beat fa-2x"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Total Profit</h6>
                                                    <h5>15600 Tk</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card report-card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fa-solid fa-chart-column fa-beat-fade fa-2x"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Today's Profit</h6>
                                                    <h5>16000 Tk</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Report;