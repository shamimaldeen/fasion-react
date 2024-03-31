import React, {useEffect, useState} from 'react';
import Swal from "sweetalert2";
import axios from "axios";
import Constants from "../../../Constants";
import Breadcrumb from "../../partials/Breadcrumb";
import CardHeader from "../../partials/CardHeader";
import Button from "react-bootstrap/Button";
import Loader from "../../partials/Loader";
import {Link} from "react-router-dom";
import NoDataFound from "../../partials/NoDataFound";
import Pagination from "react-js-pagination";

const OrderList = () => {

    const [input , setInput] = useState({
        'per_page':'10',
        'search':'',
    });

    const [order, setOrder] =useState([]);
    const [itemsCountPerPage,setItemsCountPerPage] = useState(0);
    const [totalItemsCount,setTotalItemsCount] = useState(1);
    const [startFrom,setStartFrom] = useState(1);
    const [activePage,setActivePage] = useState(1);
    const [orders , setOrders] = useState([]);
    const [isLoading , setIsloading] = useState(false);
    const handleInput = (e)=>{
        setInput(prevState => ({...prevState,[e.target.name] : e.target.value }));
    }

    useEffect(()=>{
        getOrderData();
    },[])
    const getOrderData =(pageNumber=1)=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/order?page=${pageNumber}&search=${input.search}&per_page=${input.per_page}`)
            .then(res=> {
                setOrders(res.data.data);
                setItemsCountPerPage(res.data.meta.per_page);
                setTotalItemsCount(res.data.meta.total);
                setStartFrom(res.data.meta.from);
                setActivePage(res.data.meta.current_page);
                setIsloading(false);
            }).catch(errors =>{
            setIsloading(false);
        });
    }

    return (
        <>
            <Breadcrumb title={"Order List"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <CardHeader title={'Order List'} link={'/order/create'} button_text={'Add Order'} icon={'fa-add'} />
                        </div>
                        <div className="card-body">
                            <div className="search-area mb-3">
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className={'w-100'}>
                                            <h6>Search</h6>
                                            <input className="form-control form-control-sm"
                                                   type="text" name={"search"} onChange={handleInput} value={input.search} placeholder="Name , email , phone" />
                                        </label>
                                    </div>

                                    <div className="col-md-4">
                                        <label className={'w-100'}>
                                            <h6>Per Page</h6>
                                            <select className= "form-select  form-select-sm" name={"per_page"}value={input.per_page} onChange={handleInput} >
                                                <option value="10" > 10</option>
                                                <option value="25" > 25</option>
                                                <option value="50" > 50</option>
                                                <option value="100" > 100</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="col-md-2" >
                                        <div className="d-grid my-4">
                                            <Button type="submit" className={'btn btn-sm submit-button'} onClick={()=>getOrderData(1)} > <i className="fa-solid fa-magnifying-glass "></i> Search</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive ">
                                <table className={'my-table table table-hover table-striped table-bordered'}>
                                    <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Order</th>
                                        <th>Customer</th>
                                        <th>Shop</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    {
                                        isLoading ? <Loader />
                                            :
                                            <tbody>
                                            {
                                                 orders && orders.map((order, index) => (
                                                    <tr key={index}>
                                                        <td>{ startFrom + index }</td>
                                                         <td>
                                                             <p>
                                                               <span><strong>Order No:</strong> {order.order_number}</span><br/>
                                                                <span> <strong>Order Status:</strong> {order.order_status_show}</span><br/>
                                                                 <span><strong>Payment Status:</strong> {order.payment_status_show}</span>
                                                             </p>
                                                         </td>
                                                         <td>
                                                             <p>
                                                                 <span><strong> Name:</strong> {order.customer_name}</span><br/>
                                                                 <span> <strong> Phone:</strong> {order.customer_phone}</span><br/>
                                                             </p>
                                                         </td>
                                                        <td>
                                                            <p>
                                                                <span><strong> Shop:</strong> {order.shop}</span><br/>
                                                                <span> <strong>Sales Manager:</strong> {order.sales_manager}</span><br/>
                                                            </p>

                                                        </td>
                                                         <td>
                                                             <p>
                                                                 <span><strong> Sub Total:</strong> {order.sub_total}</span><br/>
                                                                 <span> <strong>Quantity:</strong> {order.quantity}</span><br/>
                                                                 <span><strong> Discount:</strong> {order.discount}</span><br/>
                                                                 <span><strong> Total:</strong> {order.total}</span><br/>
                                                                 <span><strong> Paid Amount:</strong> {order.paid_amount}</span><br/>
                                                                 <span><strong> Due Amount:</strong> {order.due_amount}</span>
                                                             </p>
                                                         </td>

                                                         <td>{order.created_at} </td>
                                                        <td>
                                                            <Link to={`/order/details/${order.id}`}> <button className={'btn btn-sm btn-info my-1'}><i className="fa-solid fa-eye "></i></button></Link>
                                                        </td>
                                                    </tr>
                                                )) }
                                            </tbody>
                                    }
                                </table>
                            </div>
                        </div>
                        <div className="card-footer">
                            <nav className="pagination-sm">
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountPerPage}
                                    totalItemsCount={totalItemsCount}
                                    pageRangeDisplayed={5}
                                    onChange={getOrderData}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    nextPageText="Next"
                                    prevPageText="Previous"
                                    firstPageText="First"
                                    lastPageText="Last"
                                />
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderList;