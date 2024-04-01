import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../partials/Breadcrumb";
import CardHeader from "../../partials/CardHeader";
import {useParams} from "react-router-dom";
import axios from "axios";
import Constants from "../../../Constants";

const OrderDetails = () => {

    const [order, setOrder] =useState([]);
    const params =useParams();
    const [isLoading , setIsloading] = useState(false);

    const getOrderDetails =()=>{
        axios.get(`${Constants.BASE_URL}/order/${params.id}`).then(res=> {
            setOrder(res.data.data);
            setIsloading(false);
        });
    }

    useEffect(()=>{
        getOrderDetails();
    },[])


    return (
        <>
            <Breadcrumb title={"Order Details"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <CardHeader title={'Order Details'} link={'/order'} button_text={'Order List'} icon={'fa-list'} />
                        </div>
                        <div className="card-body">
                            <div className="row">
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Customer Details</h5>
                                    </div>
                                    <div className="card-body">
                                        <table className={'table table-striped table-bordered table-hover'} >
                                            <tbody>
                                               <tr>
                                                   <th>Name</th>
                                                   <td>{order.customer?.name}</td>
                                               </tr>
                                               <tr>
                                                   <th>Phone</th>
                                                   <td>{order.customer?.phone}</td>
                                               </tr>

                                               <tr>
                                                   <th>Email</th>
                                                   <td>{order.customer?.email}</td>
                                               </tr>
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Shop Details</h5>
                                    </div>
                                    <div className="card-body">
                                        <table className={'table table-striped table-bordered table-hover'} >
                                            <tbody>
                                               <tr>
                                                   <th>Shop Name</th>
                                                   <td>{order.shop?.name}</td>
                                               </tr>
                                               <tr>
                                                   <th>Sales Manager</th>
                                                   <td>{order.sales_manager?.name} - {order.sales_manager?.contact}</td>
                                               </tr>
                                               <tr>
                                                   <th>Shop Address</th>
                                                   <td>{order.shop?.address.address}</td>
                                               </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-md-12 mt-4">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Order Summary</h5>
                                    </div>
                                    <div className="card-body">
                                        <table className={'table table-hover table-bordered table-striped'}>
                                            <tbody>
                                            <tr>
                                                <th className={'align-middle'}>Order Number</th>
                                                <td className={'align-middle'}>{order.order_number}</td>
                                                <th className={'align-middle'}>Order Items</th>
                                                <td className={'align-middle'}>{order.quantity}</td>
                                            </tr>
                                            <tr>
                                                <th className={'align-middle'}>Order Status</th>
                                                <td className={'align-middle'}>{order.order_status_show}</td>
                                                <th className={'align-middle'}>Payment Status</th>
                                                <td className={'align-middle'}>{order.payment_status}</td>
                                            </tr>
                                            <tr>
                                                <th className={'align-middle'}>Payment Method</th>
                                                <td className={'align-middle'}>{order.payment_method?.name}</td>
                                                <th className={'align-middle'}>Account Number</th>
                                                <td className={'align-middle'}>{order.payment_method?.account_number}</td>
                                            </tr>

                                            <tr>
                                                <th className={'align-middle'}>Sub Total</th>
                                                <td className={'align-middle'}>{order.sub_total}৳</td>
                                                <th className={'align-middle'}>Discount</th>
                                                <td className={'align-middle'}>{order.discount}৳</td>
                                            </tr>

                                            <tr>
                                                <th className={'align-middle'}>Quantity</th>
                                                <td className={'align-middle'}>{order.quantity}</td>
                                                <th className={'align-middle'}>Total</th>
                                                <td className={'align-middle'}><strong className={'text-primary'}>{order.total}৳</strong></td>
                                            </tr>

                                            <tr>
                                                <th className={'align-middle'}>Paid Amount</th>
                                                <td className={'align-middle'}><strong className={'text-success'}>{order.paid_amount}৳</strong></td>
                                                <th className={'align-middle'}>Due Amount</th>
                                                <td className={'align-middle'}><strong className={'text-danger'}>{order.due_amount}৳</strong></td>
                                            </tr>

                                            <tr>
                                                <th className={'align-middle'}>Order Placed</th>
                                                <td className={'align-middle'}>{order.created_at}</td>
                                                <th className={'align-middle'}>Order Updated</th>
                                                <td className={'align-middle'}>{order.updated_at}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-12 mt-4">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Order Items Details</h5>
                                    </div>
                                    <div className="card-body">
                                        <table className={'table table-hover table-bordered table-striped'}>
                                            <thead>
                                              <tr>
                                                  <th>Sl</th>
                                                  <th>Name</th>
                                                  <th>Info</th>
                                                  <th>Photo</th>
                                                  <th>Amount</th>
                                                  <th>Quantity</th>
                                                  <th>Sub Total</th>
                                              </tr>
                                            </thead>

                                             <tbody>
                                             {
                                                 order?.order_details && order?.order_details.map((product,index)=>(
                                                     <tr>
                                                         <td className={'align-middle'}> { ++index}</td>
                                                         <td className={'align-middle'}>
                                                             <p>
                                                                 <span>{product.name}</span> <br/>
                                                                 <span>SKU:{product.sku}</span><br/>
                                                                 <span>Supplier:{product.supplier}</span>
                                                             </p>
                                                         </td>
                                                         <td className={'align-middle'}>
                                                             <p>
                                                                 <span>Brand:{product.brand}</span> <br/>
                                                                 <span>Category:{product.category}</span><br/>
                                                                 <span>Sub Category:{product.sub_category}</span>
                                                             </p>
                                                         </td>
                                                         <td className={'align-middle'}> <img style={{ width:"40px"}} src={product.photo} /></td>
                                                         <td className={'align-middle'}>
                                                             <p>
                                                                 <span>Original Price:{product.price}</span> <br/>
                                                                 <span>Discount:{product?.selling_price.discount} {product?.selling_price.symbol}</span><br/>
                                                                 <span>Sale Price:{product?.selling_price.price} {product?.selling_price.symbol} </span>
                                                             </p>
                                                         </td>
                                                         <td className={'align-middle'}>{product.quantity}</td>
                                                         <td className={'align-middle'}>{product?.selling_price.price * product.quantity} {product?.selling_price.symbol}</td>

                                                     </tr>
                                                 )) }

                                            </tbody>

                                        </table>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-12 mt-4">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Transactions Details</h5>
                                    </div>
                                    <div className="card-body">
                                        <table className={'table table-hover table-bordered table-striped'}>
                                            <thead>
                                            <tr>
                                                <th>Sl</th>
                                                <th>Trans Id</th>
                                                <th>Amount</th>
                                                <th>Customer</th>
                                                <th>Payment Method</th>
                                                <th>Status</th>
                                                <th>Date</th>
                                                <th>Transaction By</th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            {
                                                order?.transactions && order?.transactions.map((transaction,index)=>(
                                                    <tr>
                                                        <td className={'align-middle'}> { ++index}</td>
                                                        <td className={'align-middle'}> {transaction.trans_id}</td>
                                                        <td className={'align-middle'}> {transaction.amount} ৳</td>
                                                        <td className={'align-middle'}>
                                                            <p>
                                                                <span>Name : {transaction.customer_name}</span> <br/>
                                                                <span>Phone : {transaction.customer_phone}</span>
                                                            </p>
                                                        </td>
                                                        <td className={'align-middle'}>
                                                            <p>
                                                                <span>Payment Method : {transaction.payment_method}</span> <br/>
                                                                <span>Account No : {transaction.account_number}</span> <br/>
                                                            </p>
                                                        </td>
                                                        <td className={'align-middle'}>{transaction.status}</td>
                                                        <td className={'align-middle'}>{transaction.created_at}</td>
                                                        <td className={'align-middle'}>{transaction.transaction_by}</td>
                                                    </tr>
                                                )) }

                                            </tbody>

                                        </table>
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

export default OrderDetails;