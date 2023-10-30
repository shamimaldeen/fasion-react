import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../partials/Breadcrumb";
import {Alert} from "react-bootstrap";
import CardHeader from "../../partials/CardHeader";
import axios from "axios";
import Constants from "../../../Constants";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Pagination from "react-js-pagination";
import ViewCategory from "./ViewCategory";
import Swal from "sweetalert2";
import GlobalFunction from "../../../GlobalFunction";
import Loader from "../../partials/Loader";
import NoDataFound from "../../partials/NoDataFound";

const CategoryList = () => {

    const [input , setInput] = useState({
        'status' : 1,
        'direction':'asc',
        'per_page':'10',
        'search':'',
    });

    const [modalShow, setModalShow] = React.useState(false);
    const [category, setCategory] =useState([]);

    const [itemsCountPerPage,setItemsCountPerPage] = useState(0);
    const [totalItemsCount,setTotalItemsCount] = useState(1);
    const [startFrom,setStartFrom] = useState(1);
    const [activePage,setActivePage] = useState(1);

    const [categories , setCategories] = useState([]);
    const [errors , setErrors] = useState([]);
    const [isLoading , setIsloading] = useState(false);

    const handleInput = (e)=>{
        setInput(prevState => ({...prevState,[e.target.name] : e.target.value }));
    }

    const handleViewCategory = (category)=>{
        setCategory(category)
        setModalShow(true);
    }

    const handleCategoryDelete = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Category will be Delete !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${Constants.BASE_URL}/category/${id}`)
                    .then(res=> {
                        Swal.fire({
                            position: 'top-end',
                            icon: res.data.cls,
                            title: res.data.msg,
                            showConfirmButton: false,
                            toast:true,
                            timer: 1500
                        })
                        getCategoriesData();
                    }).catch(errors =>{
                    window.location.reload();
                });
            }
        })
    }

    useEffect(()=>{
        getCategoriesData();
    },[])
    const getCategoriesData =(pageNumber=1)=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/category?page=${pageNumber}&search=${input.search}&status=${input.status}&direction=${input.direction}&per_page=${input.per_page}`)
            .then(res=> {
                setCategories(res.data.data);
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
            <Breadcrumb title={"Category List"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <CardHeader title={'Category List'} link={'/category/create'} button_text={'Add Category'} icon={'fa-add'} />
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
                                            <Button type="submit" className={'btn btn-sm submit-button'} onClick={()=>getCategoriesData(1)} > <i className="fa-solid fa-magnifying-glass "></i> Search</Button>
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
                                    <th>Image</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                    {
                                        isLoading ? <Loader />
                                            :
                                            <tbody>
                                            {
                                              Object.keys(categories).length > 0 ?   categories && categories.map((category,index) => (
                                                    <tr key={index}>
                                                        <td>{ startFrom + index }</td>
                                                        <td>{category.name}</td>
                                                        <td>{category.slug}</td>
                                                        <td>{category.serial}</td>
                                                        <td>  <img style={{ width:"40px"}} src={category.photo} /> </td>
                                                        <td>{category.status == 1 ? <strong style={{ color:"green" }}>Active</strong> : <strong style={{ color:"red" }}>Inactive </strong> }</td>
                                                        <td>
                                                            <button className={'btn btn-sm btn-info my-1'} onClick={() => handleViewCategory(category)} ><i className="fa-solid fa-eye "></i></button>
                                                            <Link to={`/category/edit/${category.id}`}> <button className={'btn btn-sm btn-warning my-1 mx-1'}><i className="fa-solid fa-pen-to-square"></i></button></Link>
                                                            <button className={'btn btn-sm btn-danger my-1'} onClick={() => handleCategoryDelete(category.id)} ><i className="fa-solid fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                )) : <NoDataFound /> }
                                            </tbody>
                                    }
                                </table>
                            </div>
                            <ViewCategory
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                size={''}
                                modal_title={" Show Category"}
                                category={category}
                            />
                        </div>
                        <div className="card-footer">
                            <nav className="pagination-sm">
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountPerPage}
                                    totalItemsCount={totalItemsCount}
                                    pageRangeDisplayed={5}
                                    onChange={getCategoriesData}
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

export default CategoryList;