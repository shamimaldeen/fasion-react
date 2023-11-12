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
import ViewSupplier from "./ViewSupplier";

const SupplierList = () => {

    const [input , setInput] = useState({
        'status' : 1,
        'direction':'asc',
        'per_page':'10',
        'search':'',
    });
    const [modalShow, setModalShow] = React.useState(false);
    const [supplier, setSupplier] =useState([]);
    const [itemsCountPerPage,setItemsCountPerPage] = useState(0);
    const [totalItemsCount,setTotalItemsCount] = useState(1);
    const [startFrom,setStartFrom] = useState(1);
    const [activePage,setActivePage] = useState(1);
    const [suppliers , setSuppliers] = useState([]);
    const [isLoading , setIsloading] = useState(false);

    const handleInput = (e)=>{
        setInput(prevState => ({...prevState,[e.target.name] : e.target.value }));
    }

    const handleViewSupplier = (supplier)=>{
        setSupplier(supplier)
        setModalShow(true);
    }

    const handleSupplierDelete = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Supplier will be Delete !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${Constants.BASE_URL}/supplier/${id}`)
                    .then(res=> {
                        Swal.fire({
                            position: 'top-end',
                            icon: res.data.cls,
                            title: res.data.msg,
                            showConfirmButton: false,
                            toast:true,
                            timer: 1500
                        })
                        getSupplierData();
                    }).catch(errors =>{
                    window.location.reload();
                });
            }
        })
    }

    useEffect(()=>{
        getSupplierData();
    },[])
    const getSupplierData =(pageNumber=1)=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/supplier?page=${pageNumber}&search=${input.search}&status=${input.status}&direction=${input.direction}&per_page=${input.per_page}`)
            .then(res=> {
                setSuppliers(res.data.data);
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
            <Breadcrumb title={"Supplier List"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <CardHeader title={'Supplier List'} link={'/supplier/create'} button_text={'Add Supplier'} icon={'fa-add'} />
                        </div>
                        <div className="card-body">
                            <div className="search-area mb-3">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label className={'w-100'}>
                                            <h6>Name</h6>
                                            <input className="form-control form-control-sm"
                                                   type="text" name={"search"} onChange={handleInput} value={input.search} />
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <label className={'w-100'}>
                                            <h6>Status</h6>
                                            <select className= "form-select form-select-sm"name={"status"}value={input.status} onChange={handleInput} >
                                                <option value={1}> Active</option>
                                                <option value={0}> Inactive</option>

                                            </select>
                                        </label>
                                    </div>
                                    <div className="col-md-2">
                                        <label className={'w-100'}>
                                            <h6>Order Direction</h6>
                                            <select className= "form-select  form-select-sm"name={"direction"}value={input.direction} onChange={handleInput} >
                                                <option value="asc" > ASC</option>
                                                <option value="desc" > DESC</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="col-md-2">
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
                                            <Button type="submit" className={'btn btn-sm submit-button'} onClick={()=>getSupplierData(1)} > <i className="fa-solid fa-magnifying-glass "></i> Search</Button>
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
                                                Object.keys(suppliers).length > 0 ?   suppliers && suppliers.map((supplier, index) => (
                                                    <tr key={index}>
                                                        <td>{ startFrom + index }</td>
                                                        <td>{supplier.name}</td>
                                                        <td>  <img style={{ width:"40px"}} src={supplier.logo} /> </td>
                                                        <td>{supplier.status == 1 ? <strong style={{ color:"green" }}>Active</strong> : <strong style={{ color:"red" }}>Inactive </strong> }</td>
                                                        <td>
                                                            <button className={'btn btn-sm btn-info my-1'} onClick={() => handleViewSupplier(supplier)} ><i className="fa-solid fa-eye "></i></button>
                                                            <Link to={`/supplier/edit/${supplier.id}`}> <button className={'btn btn-sm btn-warning my-1 mx-1'}><i className="fa-solid fa-pen-to-square"></i></button></Link>
                                                            <button className={'btn btn-sm btn-danger my-1'} onClick={() => handleSupplierDelete(supplier.id)} ><i className="fa-solid fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                )) : <NoDataFound /> }
                                            </tbody>
                                    }
                                </table>
                            </div>
                            {/*<ViewSupplier*/}
                            {/*    show={modalShow}*/}
                            {/*    onHide={() => setModalShow(false)}*/}
                            {/*    size={''}*/}
                            {/*    modal_title={" Show Supplier"}*/}
                            {/*    supplier={supplier}*/}
                            {/*/>*/}
                        </div>
                        <div className="card-footer">
                            <nav className="pagination-sm">
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountPerPage}
                                    totalItemsCount={totalItemsCount}
                                    pageRangeDisplayed={5}
                                    onChange={getSupplierData}
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

export default SupplierList;