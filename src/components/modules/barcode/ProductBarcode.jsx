import React, {useEffect, useRef, useState} from 'react';
import Swal from "sweetalert2";
import axios from "axios";
import Constants from "../../../Constants";
import Breadcrumb from "../../partials/Breadcrumb";
import CardHeader from "../../partials/CardHeader";
import Button from "react-bootstrap/Button";
import Barcode from 'react-barcode';
import BarCodePage from "./BarCodePage";
import {useReactToPrint} from "react-to-print";

const ProductBarcode = () => {

    const componentRef = useRef();

    const [input , setInput] = useState({
        'name' : '',
        'category_id':'',
        'sub_category_id':''
    });
    const [isLoading , setIsloading] = useState(false);
    const [categories , setCategories] = useState([]);
    const [subCategories , setSubCategories] = useState([]);
    const [products , setProducts] = useState([]);
    const [paperSize , setPaperSize] = useState({
          a4:{
              width:595,
              height:842
          }
        });

    const handlePrint = useReactToPrint({
        content:()=>componentRef.current,
    });


    const handleInput = (e)=>{
        if (e.target.name =='category_id'){
            let category_id = parseInt(e.target.value);
            if (! Number.isNaN(category_id)){
                getAllSubCategory(e.target.value);
            }
        }
        setInput(prevState => ({...prevState,[e.target.name] : e.target.value }));
    }

    const getAllCategory =()=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/get-all-category`)
            .then(res=> {
                setCategories(res.data);
                setIsloading(false);
            });
    }
    const getAllSubCategory =(category_id)=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/get-all-sub-category/${category_id}`)
            .then(res=> {
                setSubCategories(res.data);
                setIsloading(false);
            });
    }

    const handleProductSearch =()=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/get-barcode-product-search?name=${input.name}&category_id=${input.category_id}&sub_category_id=${input.sub_category_id}`)
            .then(res=> {
                setProducts(res.data.data);
                setIsloading(false);
            }).catch(errors =>{
            setIsloading(false);
        });
    }

    useEffect(()=>{
        getAllCategory();
    },[])


    return (
        <>
            <Breadcrumb title={"Generate ProductBarcode"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <CardHeader title={'Generate ProductBarcode'}link={''} button_text={''} icon={''} hide={true} />
                        </div>
                        <div className="card-body">
                            <div className="search-area mb-3">
                                <div className="row align-items-baseline">
                                    <div className="col-md-3">
                                        <label className={'w-100'}>
                                            <h6>Category</h6>
                                            <select className={"form-select"}
                                                    name={"category_id"}
                                                    value={input.category_id}
                                                    onChange={handleInput} >
                                                <option value={""} > Select One</option>
                                                {
                                                    categories && categories.map((category,index)=> (
                                                        <option key={index} value={category.id} > {category.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <label className={'w-100'}>
                                            <h6>Sub Category</h6>
                                            <select className={"form-select"}
                                                    name={"sub_category_id"}
                                                    value={input.sub_category_id}
                                                    onChange={handleInput}
                                                    disabled={input.category_id == undefined}
                                            >
                                                <option> Select One</option>
                                                {
                                                    subCategories && subCategories.map((subcategory,index)=> (
                                                        <option key={index} value={subcategory.id} > {subcategory.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </label>
                                    </div>
                                      <div className="col-md-4">
                                              <label className={'w-100'}>
                                                  <h6>Product Name</h6>
                                                  <input className={"form-control"}
                                                         type="search" name={"name"} onChange={handleInput} value={input.name} placeholder={'Search name'}/>
                                              </label>
                                      </div>

                                    <div className="col-md-2">
                                        <div className="d-grid my-4">
                                            <Button type="submit" className={'btn btn-sm submit-button'} onClick={handleProductSearch} > <i className="fa-solid fa-magnifying-glass "></i> Search</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="barcode-printshow" style={{display:Object.keys(products).length > 0 ? 'block':'none'}} >
                                <div className="barcode-wrapper">
                                    <button className={'float-end mt-2'} onClick={handlePrint}>Print</button>
                                    <BarCodePage
                                        products = {products}
                                        paperSize = {paperSize}
                                        ref={componentRef} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductBarcode;