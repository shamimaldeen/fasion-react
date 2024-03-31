import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../partials/Breadcrumb";
import {Alert} from "react-bootstrap";
import CardHeader from "../../partials/CardHeader";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Constants from "../../../Constants";
import Swal from "sweetalert2";

const AddProduct = () => {

    const [input , setInput] = useState({status:1});
    const [attribute_input, setAttribute_input] = useState({})
    const [specification_input, setSpecification_input] = useState({})
    const [image , setImage] = useState('');
    const [errors , setErrors] = useState([]);
    const [success , setSuccess] = useState(null);
    const [isLoading , setIsloading] = useState(false);
    const [categories , setCategories] = useState([]);
    const [subCategories , setSubCategories] = useState([]);
    const [brands , setBrands] = useState([]);
    const [countries , setCountries] = useState([]);
    const [suppliers , setSuppliers] = useState([]);
    const [attributes , setAttributes] = useState([]);
    const [attributeFiled, setAttributeField] = useState([])
    const [attributeFieldId, setAttributeFieldId] = useState(1)
    const [specificationFiled, setSpecificationFiled] = useState([])
    const [specificationFiledId, setSpecificationFiledId] = useState(1)
    const navigate = useNavigate();
    const getAllCategory =()=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/get-all-category`)
            .then(res=> {
                setCategories(res.data);
                setIsloading(false);
            });
    }

    const getAllBrand =()=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/get-all-brand`)
            .then(res=> {
                setBrands(res.data);
                setIsloading(false);
            });
    }

    const getAllCountry =()=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/get-all-country`)
            .then(res=> {
                setCountries(res.data);
                setIsloading(false);
            });
    }

    const getAllSuppliers =()=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/get-all-suppliers`)
            .then(res=> {
                setSuppliers(res.data);
                setIsloading(false);
            });
    }

    const getAllAttributes =()=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/get-all-attributes`)
            .then(res=> {
                setAttributes(res.data);
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

    useEffect(()=>{
        getAllCategory();
        getAllBrand();
        getAllCountry();
        getAllSuppliers();
        getAllAttributes();
    },[])

    useEffect(()=>{
        setInput(prevState => ({...prevState, attributes: attribute_input}))
    }, [attribute_input])

    useEffect(()=>{
        setInput(prevState => ({...prevState, specifications: specification_input}))
    }, [specification_input])
    const handleInput = (e)=>{
        if (e.target.name == 'name'){
            let  slug = e.target.value;
            slug = slug.toLowerCase();
            slug = slug.replaceAll(' ','-');
            setInput(prevState => ({...prevState,slug : slug }));
        }else if(e.target.name =='category_id'){
            let category_id = parseInt(e.target.value);
            if (! Number.isNaN(category_id)){
                getAllSubCategory(e.target.value);
            }
        }
        setInput(prevState => ({...prevState,[e.target.name] : e.target.value }));
    }

    const handleSpecificationFieldRemove = (id) => {
        setSpecificationFiled(oldValues => {
            return oldValues.filter(specificationFiled => specificationFiled !== id)
        })
        setSpecification_input(current => {
            const copy = {...current};
            delete copy[id];
            return copy;
        })
        setSpecificationFiledId(specificationFiledId-1)
    }
    const handleSpecificationFields = (id) => {
        setSpecificationFiledId(specificationFiledId+1)
        setSpecificationFiled(prevState => [...prevState, specificationFiledId])
    }

    const handleSpecificationInput = (e, id) => {
        setSpecification_input(prevState => ({
            ...prevState,
            [id]:{
                ...prevState[id], [e.target.name]: e.target.value
            }
        }))
    }

    const handleAttributeFieldsRemove = (id) => {
        setAttributeField(oldValues => {
            return oldValues.filter(attributeFiled => attributeFiled !== id)
        })
        setAttribute_input(current => {
            const copy = {...current};
            delete copy[id];
            return copy;
        })
        setAttributeFieldId(attributeFieldId-1)
    }
    const handleAttributeFields = (id) => {
        if (attributes.length >= attributeFieldId){
            setAttributeFieldId(attributeFieldId+1)
            setAttributeField(prevState => [...prevState, attributeFieldId])
        }
    }

    const handleAttributeInput = (e, id) => {
        setAttribute_input(prevState => ({
            ...prevState,
            [id]:{
                ...prevState[id], [e.target.name]: e.target.value
            }
        }))
    }
    const handlePhoto =(e)=>{
        let file = e.target.files[0];
        setInput(prevState => ({...prevState,photo :file }));
        let reader = new FileReader();
        reader.onloadend =()=>{
            setImage(reader.result);
        }
        reader.readAsDataURL(file)
    }

    const handleProductCreate= () => {
        setIsloading(true)
        axios.post(`${Constants.BASE_URL}/product`, input).then(res => {
            setIsloading(false)
            Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
            })
            if (res.data.product_id != undefined){
                navigate('/product/photo/'+res.data.product_id)
            }
        }).catch(errors => {
            setIsloading(false)
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
            }
        })
    }

    return (
        <>
            <Breadcrumb title={"Add Product"} />
            <div className="row">
                <div className="col-md-12">
                    {success && <Alert className="col-sm-3 offset-3"  variant="danger">{success}</Alert>}
                    <div className="card">
                        <div className="card-header">
                            <CardHeader title={'Add Product'} link={'/product'} button_text={'Product List'} icon={'fa-list'} />
                        </div>
                        <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className={'w-100'}>
                                                <h6>Name</h6>
                                                <input className={errors.name != undefined ? "form-control is-invalid" : "form-control"}
                                                       type="text" name={"name"} onChange={handleInput} value={input.name} placeholder={'Enter Product name'} required />
                                                <p style={{color:"red"}}>{errors.name != undefined ? errors.name[0] : null}</p>
                                            </label>
                                        </div>

                                        <div className="form-group">
                                            <label className={'w-100'}>
                                                <h6>Category</h6>
                                                <select className={errors.category_id != undefined ? "form-select is-invalid" : "form-select"}
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
                                                <p style={{color:"red"}}>{errors.category_id != undefined ? errors.category_id[0] : null}</p>
                                            </label>
                                        </div>

                                        <div className="form-group">
                                            <label className={'w-100'}>
                                                <h6>Brand</h6>
                                                <select className={errors.brand_id != undefined ? "form-select is-invalid" : "form-select"}
                                                        name={"brand_id"}
                                                        value={input.brand_id}
                                                        onChange={handleInput} >
                                                    <option value={""} > Select One</option>
                                                    {
                                                        brands && brands.map((brand,index)=> (
                                                            <option key={index} value={brand.id} > {brand.name}</option>
                                                        ))
                                                    }
                                                </select>
                                                <p style={{color:"red"}}>{errors.brand_id != undefined ? errors.brand_id[0] : null}</p>
                                            </label>
                                        </div>


                                        <div className="form-group">
                                            <label className={'w-100'}>
                                                <h6>Supplier</h6>
                                                <select className={errors.supplier_id != undefined ? "form-select is-invalid" : "form-select"}
                                                        name={"supplier_id"}
                                                        value={input.supplier_id}
                                                        onChange={handleInput} >
                                                    <option value={""} > Select One</option>
                                                    {
                                                        suppliers && suppliers.map((supplier,index)=> (
                                                            <option key={index} value={supplier.id} > {supplier.name} - {supplier.contact}</option>
                                                        ))
                                                    }
                                                </select>
                                                <p style={{color:"red"}}>{errors.supplier_id != undefined ? errors.supplier_id[0] : null}</p>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-6">

                                        <div className="form-group">
                                            <label className={'w-100'}>
                                                <h6>Slug</h6>
                                                <input className={errors.slug != undefined ? "form-control is-invalid" : "form-control"}
                                                       type="text"  name={"slug"} onChange={handleInput} value={input.slug}  placeholder={'Enter Product slug'} />
                                                <p style={{color:"red"}}>{errors.slug != undefined ? errors.slug[0] : null}</p>
                                            </label>
                                        </div>

                                        <div className="form-group">
                                            <label className={'w-100'}>
                                                <h6>Sub Category</h6>
                                                <select className={errors.sub_category_id != undefined ? "form-select is-invalid" : "form-select"}
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
                                                <p style={{color:"red"}}>{errors.sub_category_id != undefined ? errors.sub_category_id[0] : null}</p>
                                            </label>
                                        </div>

                                        <div className="form-group">
                                            <label className={'w-100'}>
                                                <h6>Product Origin (Country)</h6>
                                                <select className={errors.country_id != undefined ? "form-select is-invalid" : "form-select"}
                                                        name={"country_id"}
                                                        value={input.country_id}
                                                        onChange={handleInput} >
                                                    <option value={""} > Select One</option>
                                                    {
                                                        countries && countries.map((country,index)=> (
                                                            <option key={index} value={country.id} > {country.name}</option>
                                                        ))
                                                    }
                                                </select>
                                                <p style={{color:"red"}}>{errors.country_id != undefined ? errors.country_id[0] : null}</p>
                                            </label>
                                        </div>

                                        <div className="form-group">
                                            <label className={'w-100'}>
                                                <h6>Status</h6>
                                                <select className={errors.status != undefined ? "form-select is-invalid" : "form-select"}
                                                        name={"status"}
                                                        value={input.status}
                                                        onChange={handleInput}
                                                        placeholder={'Enter sub category status'} >
                                                    <option value={1} > Active</option>
                                                    <option value={0} > Inactive</option>
                                                </select>
                                                <p style={{color:"red"}}>{errors.status != undefined ? errors.status[0] : null}</p>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="card my-2">
                                            <div className="card-header">
                                                <h5>Product Attribute</h5>
                                            </div>
                                            <div className="card-body">
                                                {attributeFiled.map((id, ind)=>(
                                                    <div key={ind} className="row my-2 align-items-baseline">
                                                        <div className="col-md-5">
                                                            <label className={'w-100 mt-4'}>
                                                                <p>Select Attribute</p>
                                                                <select
                                                                    className='form-select mt-2'
                                                                    name={'attribute_id'}
                                                                    value={attribute_input[id] != undefined ? attribute_input[id].attribute_id : null}
                                                                    onChange={(e)=>handleAttributeInput(e, id)}
                                                                    placeholder={'Select product attribute'}
                                                                >
                                                                    <option>Select Attribute</option>
                                                                    {attributes.map((value, index)=>(
                                                                        <option value={value.id}>{value.name}</option>
                                                                    ))}
                                                                </select>
                                                                <p className={'login-error-msg'}>
                                                                    <small>{errors.attribute_id != undefined ? errors.attribute_id[0] : null}</small></p>
                                                            </label>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <label className={'w-100 mt-4'}>
                                                                <p>Select Attribute Value</p>
                                                                <select
                                                                    className={'form-select mt-2'}
                                                                    name={'value_id'}
                                                                    value={attribute_input[id] != undefined ? attribute_input[id].value_id : null}
                                                                    onChange={(e)=>handleAttributeInput(e, id)}
                                                                    placeholder={'Select product attribute value'}
                                                                >
                                                                    <option>Select Attribute Value</option>
                                                                    {attributes.map((value, index)=>(
                                                                        <>
                                                                            {attribute_input[id] != undefined && value.id == attribute_input[id].attribute_id ? value.value.map((atr_value, value_ind)=>(
                                                                                <option value={atr_value.id}>{atr_value.name}</option>
                                                                            )):null}
                                                                        </>
                                                                    ))}
                                                                </select>
                                                                <p className={'login-error-msg'}>
                                                                    <small>{errors.attribute_id != undefined ? errors.attribute_id[0] : null}</small></p>
                                                            </label>
                                                        </div>
                                                        <div className="col-md-2">
                                                            {attributeFiled.length -1 == ind ?
                                                                <button className={'btn btn-danger'} onClick={()=>handleAttributeFieldsRemove(id)}>
                                                                    <i className="fa-solid fa-minus"/>
                                                                </button>:null
                                                            }
                                                        </div>
                                                    </div>
                                                ))}

                                                <div className="row">
                                                    <div className="col-md-12 text-center">
                                                        <button className={'btn btn-success'} onClick={handleAttributeFields}>
                                                            <i className="fa-solid fa-plus"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="card my-2">
                                            <div className="card-header">
                                                <h5>Product Specifications</h5>
                                            </div>
                                            <div className="card-body">
                                                {specificationFiled.map((id, ind)=>(
                                                    <div key={ind} className="row my-2 align-items-baseline">
                                                        <div className="col-md-5">
                                                            <label className={'w-100 mt-4'}>
                                                                <p>Specification Name</p>
                                                                <input
                                                                    className={'form-control mt-2'}
                                                                    type={'text'}
                                                                    name={'name'}
                                                                    value={specification_input[id] != undefined ? specification_input[id].name : null}
                                                                    onChange={(e)=>handleSpecificationInput(e, id)}
                                                                    placeholder={'Enter Product Specification Name'}
                                                                />
                                                                <p className={'login-error-msg'}>
                                                                    <small>{errors.name != undefined ? errors.name[0] : null}</small></p>
                                                            </label>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <label className={'w-100 mt-4'}>
                                                                <p>Specification Value</p>
                                                                <input
                                                                    className='form-control mt-2'
                                                                    type={'text'}
                                                                    name={'value'}
                                                                    value={specification_input[id] != undefined ? specification_input[id].value : null}
                                                                    onChange={(e)=>handleSpecificationInput(e, id)}
                                                                    placeholder={'Enter Product Specification Name'}
                                                                />
                                                                <p className={'login-error-msg'}>
                                                                    <small>{errors.name != undefined ? errors.name[0] : null}</small></p>
                                                            </label>
                                                        </div>
                                                        <div className="col-md-2">
                                                            {specificationFiled.length -1 == ind ?
                                                                <button className={'btn btn-danger'} onClick={()=>handleSpecificationFieldRemove(id)}>
                                                                    <i className="fa-solid fa-minus"/>
                                                                </button> : null
                                                            }

                                                        </div>
                                                    </div>
                                                ))}

                                                <div className="row">
                                                    <div className="col-md-12 text-center">
                                                        <button className={'btn btn-success'} onClick={handleSpecificationFields}>
                                                            <i className="fa-solid fa-plus"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-4">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>Product Price and Stock</h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className={'w-100 mt-4'}>
                                                            <p>Product Cost</p>
                                                            <input
                                                                className={errors.cost != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                                type={'number'}
                                                                name={'cost'}
                                                                value={input.cost}
                                                                onChange={handleInput}
                                                                placeholder={'Enter Product Cost'}
                                                            />
                                                            <p className={'login-error-msg'}>
                                                                <small>{errors.cost != undefined ? errors.cost[0] : null}</small></p>
                                                        </label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className={'w-100 mt-4'}>
                                                            <p>Product Sale Price</p>
                                                            <input
                                                                className={errors.price != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                                type={'number'}
                                                                name={'price'}
                                                                value={input.price}
                                                                onChange={handleInput}
                                                                placeholder={'Enter Product Price'}
                                                            />
                                                            <p className={'login-error-msg'}>
                                                                <small>{errors.price != undefined ? errors.price[0] : null}</small></p>
                                                        </label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className={'w-100 mt-4'}>
                                                            <p>Discount %</p>
                                                            <input
                                                                className={errors.discount_percent != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                                type={'number'}
                                                                name={'discount_percent'}
                                                                value={input.discount_percent}
                                                                onChange={handleInput}
                                                                placeholder={'Enter Product Discount (%)'}
                                                            />
                                                            <p className={'login-error-msg'}>
                                                                <small>{errors.discount_percent != undefined ? errors.discount_percent[0] : null}</small></p>
                                                        </label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className={'w-100 mt-4'}>
                                                            <p>Discount Fixed Amount</p>
                                                            <input
                                                                className={errors.discount_fixed != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                                type={'number'}
                                                                name={'discount_fixed'}
                                                                value={input.discount_fixed}
                                                                onChange={handleInput}
                                                                placeholder={'Enter Product Discount Fixed'}
                                                            />
                                                            <p className={'login-error-msg'}>
                                                                <small>{errors.discount_fixed != undefined ? errors.discount_fixed[0] : null}</small></p>
                                                        </label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className={'w-100 mt-4'}>
                                                            <p>Discount Start Date</p>
                                                            <input
                                                                className={errors.discount_start != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                                type={'datetime-local'}
                                                                name={'discount_start'}
                                                                value={input.discount_start}
                                                                onChange={handleInput}
                                                                placeholder={'Enter Discount Start Date'}
                                                            />
                                                            <p className={'login-error-msg'}>
                                                                <small>{errors.discount_start != undefined ? errors.discount_start[0] : null}</small></p>
                                                        </label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className={'w-100 mt-4'}>
                                                            <p>Discount End Date</p>
                                                            <input
                                                                className={errors.discount_end != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                                type={'datetime-local'}
                                                                name={'discount_end'}
                                                                value={input.discount_end}
                                                                onChange={handleInput}
                                                                placeholder={'Enter Discount End Date'}
                                                            />
                                                            <p className={'login-error-msg'}>
                                                                <small>{errors.discount_end != undefined ? errors.discount_end[0] : null}</small></p>
                                                        </label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className={'w-100 mt-4'}>
                                                            <p>Prouct Stock</p>
                                                            <input
                                                                className={errors.stock != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                                type={'number'}
                                                                name={'stock'}
                                                                value={input.stock}
                                                                onChange={handleInput}
                                                                placeholder={'Enter Product Stock'}
                                                            />
                                                            <p className={'login-error-msg'}>
                                                                <small>{errors.stock != undefined ? errors.stock[0] : null}</small></p>
                                                        </label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className={'w-100 mt-4'}>
                                                            <p>Prouct SKU</p>
                                                            <input
                                                                className={errors.sku != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                                type={'text'}
                                                                name={'sku'}
                                                                value={input.sku}
                                                                onChange={handleInput}
                                                                placeholder={'Enter Product SKU'}
                                                            />
                                                            <p className={'login-error-msg'}>
                                                                <small>{errors.sku != undefined ? errors.sku[0] : null}</small></p>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <label className={'w-100 mt-4'}>
                                            <p>Description</p>
                                            <textarea
                                                className={errors.description != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                name={'description'}
                                                value={input.description}
                                                onChange={handleInput}
                                                placeholder={'Enter product description'}
                                            />
                                            <p className={'login-error-msg'}>
                                                <small>{errors.description != undefined ? errors.description[0] : null}</small>
                                            </p>
                                        </label>
                                    </div>

                                    <div className="col-md-12 mt-3">
                                        <div className="row justify-content-center">
                                            <div className="col-md-4">
                                                <div className="d-grid">
                                                    <Button  onClick={handleProductCreate} className={'btn submit-button'} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Next'}}  />
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

export default AddProduct;