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
import ViewBrand from "./ViewBrand";

const BrandList = () => {

    const [input , setInput] = useState({
        'status' : 1,
        'direction':'asc',
        'per_page':'10',
        'search':'',
    });

    const [modalShow, setModalShow] = React.useState(false);
    const [brand, setBrand] =useState([]);

    const [itemsCountPerPage,setItemsCountPerPage] = useState(0);
    const [totalItemsCount,setTotalItemsCount] = useState(1);
    const [startFrom,setStartFrom] = useState(1);
    const [activePage,setActivePage] = useState(1);

    const [brands , setBrands] = useState([]);
    const [errors , setErrors] = useState([]);
    const [isLoading , setIsloading] = useState(false);

    const handleInput = (e)=>{
        setInput(prevState => ({...prevState,[e.target.name] : e.target.value }));
    }

    const handleViewBrand = (brand)=>{
        setBrand(brand)
        setModalShow(true);
    }

    const handleBrandDelete = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Brand will be Delete !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${Constants.BASE_URL}/brand/${id}`)
                    .then(res=> {
                        Swal.fire({
                            position: 'top-end',
                            icon: res.data.cls,
                            title: res.data.msg,
                            showConfirmButton: false,
                            toast:true,
                            timer: 1500
                        })
                        getBrandData();
                    }).catch(errors =>{
                    window.location.reload();
                });
            }
        })
    }

    useEffect(()=>{
        getBrandData();
    },[])
    const getBrandData =(pageNumber=1)=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/brand?page=${pageNumber}&search=${input.search}&status=${input.status}&direction=${input.direction}&per_page=${input.per_page}`)
            .then(res=> {
                setBrands(res.data.data);
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
            <Breadcrumb title={"Brand List"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <CardHeader title={'Brand List'} link={'/brand/create'} button_text={'Add Brand'} icon={'fa-add'} />
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
                                            <Button type="submit" className={'btn btn-sm submit-button'} onClick={()=>getBrandData(1)} > <i className="fa-solid fa-magnifying-glass "></i> Search</Button>
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
                                        <th>Slug</th>
                                        <th>Serial</th>
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
                                                Object.keys(brands).length > 0 ?   brands && brands.map((brand,index) => (
                                                    <tr key={index}>
                                                        <td>{ startFrom + index }</td>
                                                        <td>{brand.name}</td>
                                                        <td>{brand.slug}</td>
                                                        <td>{brand.serial}</td>
                                                        <td>  <img style={{ width:"40px"}} src={brand.logo} /> </td>
                                                        <td>{brand.status == 1 ? <strong style={{ color:"green" }}>Active</strong> : <strong style={{ color:"red" }}>Inactive </strong> }</td>
                                                        <td>
                                                            <button className={'btn btn-sm btn-info my-1'} onClick={() => handleViewBrand(brand)} ><i className="fa-solid fa-eye "></i></button>
                                                            <Link to={`/brand/edit/${brand.id}`}> <button className={'btn btn-sm btn-warning my-1 mx-1'}><i className="fa-solid fa-pen-to-square"></i></button></Link>
                                                            <button className={'btn btn-sm btn-danger my-1'} onClick={() => handleBrandDelete(brand.id)} ><i className="fa-solid fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                )) : <NoDataFound /> }
                                            </tbody>
                                    }
                                </table>
                            </div>
                            <ViewBrand
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                size={''}
                                modal_title={" Show Brand"}
                                brand={brand}
                            />
                        </div>
                        <div className="card-footer">
                            <nav className="pagination-sm">
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountPerPage}
                                    totalItemsCount={totalItemsCount}
                                    pageRangeDisplayed={5}
                                    onChange={getBrandData}
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

export default BrandList;