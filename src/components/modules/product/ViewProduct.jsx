import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Constants from "../../../Constants";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Breadcrumb from "../../partials/Breadcrumb";
import {Alert} from "react-bootstrap";
import CardHeader from "../../partials/CardHeader";

const ViewProduct = () => {

    const params = useParams();
    const [product , setProduct] = useState([]);
    const [isLoading , setIsloading] = useState(false);

    const getProductData = ()=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/product/${params.id}`).then(res=> {
            setProduct(res.data.data);
            setIsloading(false);
        })

    }
    useEffect(()=>{
        getProductData();
    },[])

    return (

    <>
        <Breadcrumb title={"Product Details"} />
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <CardHeader title={'View Product'} link={'/product'} button_text={'Product List'} icon={'fa-list'} />
                    </div>
                    <div className="card-body">
                        <div className={'row'}>
                            <div className="col-md-6">
                                <table className={'table table-hover table-striped table-bordered'}>
                                    <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>{product.name}</td>
                                    </tr>

                                    <tr>
                                        <th>Category</th>
                                        <td>{product.category}</td>
                                    </tr>
                                    <tr>
                                        <th>Brand</th>
                                        <td>{product.brand}</td>
                                    </tr>

                                    <tr>
                                        <th>Supplier</th>
                                        <td>{product.supplier}</td>
                                    </tr>

                                    <tr>
                                        <th>Cost</th>
                                        <td>{product.cost}</td>
                                    </tr>
                                    <tr>
                                        <th>Discount Fixed</th>
                                        <td>{product.discount_fixed}</td>
                                    </tr>
                                    <tr>
                                        <th>Discount Start</th>
                                        <td>{product.discount_start}</td>
                                    </tr>

                                    <tr>
                                        <th>Stock</th>
                                        <td>{product.stock}</td>
                                    </tr>
                                    <tr>
                                        <th>Sku</th>
                                        <td>{product.sku}</td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>

                            <div className="col-md-6">
                                <table className={'table table-hover table-striped table-bordered'}>
                                    <tbody>
                                    <tr>
                                        <th>Slug</th>
                                        <td>{product.slug}</td>
                                    </tr>

                                    <tr>
                                        <th>Sub Category</th>
                                        <td>{product.sub_category}</td>
                                    </tr>
                                    <tr>
                                        <th>Origin</th>
                                        <td>{product.country}</td>
                                    </tr>
                                    <tr>
                                        <th>Created By</th>
                                        <td>{product.created_by}</td>
                                    </tr>

                                    <tr>
                                        <th>Price</th>
                                        <td>{product.price}</td>
                                    </tr>
                                    <tr>
                                        <th>Discount Percent</th>
                                        <td>{product.discount_percent}</td>
                                    </tr>

                                    <tr>
                                        <th>Discount End</th>
                                        <td>{product.discount_end}</td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td>{product.status == 1 ? <strong style={{ color:"green" }}>Active</strong> : <strong style={{ color:"red" }}>Inactive </strong> }</td>
                                    </tr>

                                    <tr>
                                        <th>Description</th>
                                        <td>{product.description}</td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                  <div className="card">
                            <div className="card-header">
                              <h4> Product Image</h4>
                            </div>
                            <div className="card-body">
                            <div className="row">
                                {product.photos && Object.keys(product.photos).length > 0 ?
                                    product.photos.map((image,index)=>(
                                        image.is_primary ==1 ?
                                        <div className="col-md-3">
                                            <img style={{ width:"90px"}} src={image.photo} /><br/>
                                            <label className={'text-end'}> primary</label>
                                        </div> :  <div className="col-md-3">
                                                <img style={{ width:"90px"}} src={image.photo} /><br/>
                                            </div>

                                    )) : null
                                }
                            </div>
                        </div>
                      </div>

                <div className="card">
                    <div className="card-header">
                        <h4> Product Attribute</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {product.attributes && Object.keys(product.attributes).length > 0 ?
                                product.attributes.map((attribute,index)=>(
                                    <div className="col-md-3">
                                        <small> <strong>{attribute.name} :</strong> {attribute.value} <br/></small>
                                    </div>

                                )) : null
                            }
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h4> Product Specifications</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {product.specifications && Object.keys(product.specifications).length > 0 ?
                                product.specifications.map((specification,index)=>(
                                    <div className="col-md-3">
                                        <small> <strong>{specification.name} :</strong> {specification.value} <br/></small>
                                    </div>

                                )) : null
                            }
                        </div>
                    </div>
                </div>



                    </div>
                    </div>

    </>
    );
};

export default ViewProduct;