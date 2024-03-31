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

const ProductList = () => {

    const [input , setInput] = useState({
        'status' : 1,
        'direction':'desc',
        'per_page':'10',
        'search':'',
    });

    const [products , setProducts] = useState([]);
    const [itemsCountPerPage,setItemsCountPerPage] = useState(0);
    const [totalItemsCount,setTotalItemsCount] = useState(1);
    const [startFrom,setStartFrom] = useState(1);
    const [activePage,setActivePage] = useState(1);


    const [errors , setErrors] = useState([]);
    const [isLoading , setIsloading] = useState(false);

    const handleInput = (e)=>{
        setInput(prevState => ({...prevState,[e.target.name] : e.target.value }));
    }

    const handleProductDelete = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Product will be Delete !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${Constants.BASE_URL}/product/${id}`)
                    .then(res=> {
                        Swal.fire({
                            position: 'top-end',
                            icon: res.data.cls,
                            title: res.data.msg,
                            showConfirmButton: false,
                            toast:true,
                            timer: 1500
                        })
                        getProductData();
                    }).catch(errors =>{
                    window.location.reload();
                });
            }
        })
    }

    useEffect(()=>{
        getProductData();
    },[])
    const getProductData =(pageNumber=1)=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/product?page=${pageNumber}&search=${input.search}&status=${input.status}&direction=${input.direction}&per_page=${input.per_page}`)
            .then(res=> {
                setProducts(res.data.data);
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
            <Breadcrumb title={"Product List"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <CardHeader title={'Product List'} link={'/product/create'} button_text={'Add Product'} icon={'fa-add'} />
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
                                            <Button type="submit" className={'btn btn-sm submit-button'} onClick={()=>getProductData(1)} > <i className="fa-solid fa-magnifying-glass "></i> Search</Button>
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
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Photo</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    {
                                        isLoading ? <Loader />
                                            :
                                            <tbody>
                                            {
                                                Object.keys(products).length > 0 ?   products && products.map((product,index) => (
                                                    <tr key={index}>
                                                        <td>{ startFrom + index }</td>
                                                        <td>
                                                            {product.name} <br/>
                                                            <small><strong>Slug</strong>:{product.slug}</small><br/>
                                                            {product.attributes && Object.keys(product.attributes).length > 0 ?
                                                                product.attributes.map((attribute,index)=>(
                                                                    <small> <strong>{attribute.name} :</strong> {attribute.value} <br/></small>
                                                                )) : null
                                                            }
                                                        </td>

                                                        <td>
                                                            <p>
                                                                <small> <strong>Category</strong> : {product.category}</small><br/>
                                                                <small> <strong>BrandBrand</strong>:{product.brand}</small><br/>
                                                                <small> <strong>Origin</strong>:{product.country}</small><br/>
                                                                <small> <strong>Supplier</strong>:{product.supplier}</small><br/>
                                                            </p>
                                                        </td>

                                                        <td>
                                                            <p className={'text-bold'}>

                                                                <strong>Selling Price: {product.selling_price.price} {product.selling_price.symbol} | Discount :  {product.selling_price.discount} {product.selling_price.symbol}</strong>  <br/>
                                                                <strong>Price</strong> : {product.price} <br/>
                                                               <small className={'text-danger'}> <strong>Discount</strong>:{product.discount_percent} + {product.discount_fixed}</small><br/>
                                                                { product.discount_start != null && product.discount_end != null?
                                                                    <small className={'text-black'}> <strong>Discount Date</strong>:{product.discount_start} To {product.discount_end}  <br/></small> : null
                                                                }

                                                               <small className={'text-primary'}><strong>Cost</strong>:{product.cost}</small>
                                                            </p>
                                                        </td>
                                                        <td> <img style={{ width:"40px"}} src={product.photo} /></td>
                                                        <td>
                                                         <small> <strong> Status :</strong> {product.status == 1 ? <strong style={{ color:"green" }}>Active</strong> : <strong style={{ color:"red" }}>Inactive </strong> }</small>  <br/>
                                                         <small> <strong>Stock:</strong> {product.stock}</small>
                                                        </td>
                                                        <td>
                                                            <Link to={`/product/view/${product.id}`}> <button className={'btn btn-sm btn-info my-1'}><i className="fa-solid fa-eye"></i></button></Link>
                                                            <Link to='#'> <button className={'btn btn-sm btn-warning my-1 mx-1'}><i className="fa-solid fa-pen-to-square"></i></button></Link>
                                                            <button className={'btn btn-sm btn-danger my-1'} onClick={() => handleProductDelete(product.id)} ><i className="fa-solid fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                )) : <NoDataFound /> }
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
                                    onChange={getProductData}
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

export default ProductList;