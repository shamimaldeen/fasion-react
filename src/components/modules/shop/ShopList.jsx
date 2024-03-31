import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../partials/Breadcrumb";
import {Alert} from "react-bootstrap";
import CardHeader from "../../partials/CardHeader";
import axios from "axios";
import Constants from "../../../Constants";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
import GlobalFunction from "../../../GlobalFunction";
import Loader from "../../partials/Loader";
import NoDataFound from "../../partials/NoDataFound";
import ViewShop from "./ViewShop";
const ShopList = () => {

    const [input , setInput] = useState({
        'per_page':'10',
        'search':'',
    });
    const [modalShow, setModalShow] = React.useState(false);
    const [shop, setShop] =useState([]);
    const [itemsCountPerPage,setItemsCountPerPage] = useState(0);
    const [totalItemsCount,setTotalItemsCount] = useState(1);
    const [startFrom,setStartFrom] = useState(1);
    const [activePage,setActivePage] = useState(1);
    const [shops , setShops] = useState([]);
    const [isLoading , setIsloading] = useState(false);
    const handleInput = (e)=>{
        setInput(prevState => ({...prevState,[e.target.name] : e.target.value }));
    }

    const handleViewShop = (shop)=>{
        setIsloading(true);
        setShop(shop)
        setModalShow(true);
        setIsloading(false);
    }

    const handleShopDelete = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Shop will be Delete !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${Constants.BASE_URL}/shop/${id}`)
                    .then(res=> {
                        Swal.fire({
                            position: 'top-end',
                            icon: res.data.cls,
                            title: res.data.msg,
                            showConfirmButton: false,
                            toast:true,
                            timer: 1500
                        })
                        getShopData();
                    }).catch(errors =>{
                    window.location.reload();
                });
            }
        })
    }

    useEffect(()=>{
        getShopData();
    },[])
    const getShopData =(pageNumber=1)=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/shop?page=${pageNumber}&search=${input.search}&per_page=${input.per_page}`)
            .then(res=> {
                setShops(res.data.data);
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
            <Breadcrumb title={"Shop List"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <CardHeader title={'Shop List'} link={'/shop/create'} button_text={'Add Shop'} icon={'fa-add'} />
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
                                            <Button type="submit" className={'btn btn-sm submit-button'} onClick={()=>getShopData(1)} > <i className="fa-solid fa-magnifying-glass "></i> Search</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive ">
                                <table className={'my-table table table-hover table-striped table-bordered'}>
                                    <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                        <th>Area</th>
                                        <th>Address</th>
                                        <th>Logo</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    {
                                        isLoading ? <Loader />
                                            :
                                            <tbody>
                                            {
                                                Object.keys(shops).length > 0 ?   shops && shops.map((shop, index) => (
                                                    <tr key={index}>
                                                        <td>{ startFrom + index }</td>
                                                        <td>{shop.name}</td>
                                                        <td>{shop.email}</td>
                                                        <td>{shop.contact}</td>
                                                        <td>{shop.address.area}</td>
                                                        <td>{shop.address.address}</td>
                                                        <td>  <img style={{ width:"40px"}} src={shop.logo} /> </td>
                                                        <td>{shop.status == 1 ? <strong style={{ color:"green" }}>Active</strong> : <strong style={{ color:"red" }}>Inactive </strong> }</td>
                                                        <td>
                                                            <button className={'btn btn-sm btn-info my-1'} onClick={() => handleViewShop(shop)} ><i className="fa-solid fa-eye "></i></button>
                                                            <Link to={`/shop/edit/${shop.id}`}> <button className={'btn btn-sm btn-warning my-1 mx-1'}><i className="fa-solid fa-pen-to-square"></i></button></Link>
                                                            <button className={'btn btn-sm btn-danger my-1'} onClick={() => handleShopDelete(shop.id)} ><i className="fa-solid fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                )) : <NoDataFound /> }
                                            </tbody>
                                    }
                                </table>
                            </div>
                            <ViewShop
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                size={''}
                                modal_title={" Show Shop"}
                                shop={shop}
                            />
                        </div>
                        <div className="card-footer">
                            <nav className="pagination-sm">
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountPerPage}
                                    totalItemsCount={totalItemsCount}
                                    pageRangeDisplayed={5}
                                    onChange={getShopData}
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

export default ShopList;