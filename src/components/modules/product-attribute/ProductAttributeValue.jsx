import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../partials/Breadcrumb";
import CardHeader from "../../partials/CardHeader";
import {Link, useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Constants from "../../../Constants";
import Swal from "sweetalert2";
import Loader from "../../partials/Loader";
import NoDataFound from "../../partials/NoDataFound";
import Pagination from "react-js-pagination";

const ProductAttributeValue = () => {
    const [modalShow, setModalShow] = useState(false);
    const [input , setInput] = useState({status:1});
    const [errors , setErrors] = useState([]);
    const [isLoading , setIsloading] = useState(false);
    const [attributes , setAttributes] = useState([]);
    const [attributeValues , setAttributeValues] = useState([]);
    const [modalTitle , setModalTitle] = useState("Add");
    const [isEditMode , setIsEditMode] = useState(false);

    const navigate = useNavigate();


    useEffect(()=>{
        getAttributeData();
        getAttributeValuesData();
    },[])
    const getAttributeData =()=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/attribute`)
            .then(res=> {
                setAttributes(res.data.data);
                setIsloading(false);
            }).catch(errors =>{
            setIsloading(false);
        });
    }

    const getAttributeValuesData =()=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/attribute-value`)
            .then(res=> {
                setAttributeValues(res.data.data);
                setIsloading(false);
            }).catch(errors =>{
            setIsloading(false);
        });
    }



    const handleInput = (e)=>{
        setInput(prevState => ({...prevState,[e.target.name] : e.target.value }));
    }

    const handleCreateModal = (attributeValue = null)=>{
        if (attributeValue != null){
            setModalTitle("Update");
            setIsEditMode(true);
            setInput( {name:attributeValue.name,attribute_id: attributeValue.attribute_id,id:attributeValue.id });
        }else{
            setInput({status:1});
            setModalTitle("Add")
            setIsEditMode(false);
        }
        setErrors([]);
        setModalShow(true);
    }

    const  productAttributeValueForm = async ()=>
    {
        const  formData = new FormData();
        formData.append('name',input.name);
        formData.append('attribute_id',input.attribute_id);
        await axios.post(`${Constants.BASE_URL}/attribute-value`,formData, {
            headers: {'Content-Type': 'multipart/form-data' },
        }).then(response=> {
            setIsloading(false);
            Swal.fire({
                position: 'top-end',
                icon: response.data.cls,
                title: response.data.msg,
                showConfirmButton: false,
                toast:true,
                timer: 1500
            })
            setErrors([]);
            setInput({status:1})
            setModalShow(false);
            getAttributeValuesData();
            navigate('/product/attribute/value');
        }).catch(errors =>{
            setIsloading(false);
            Swal.fire({
                position: 'top-end',
                icon: "error",
                title: "Oops ! Something went really wrong!",
                showConfirmButton: false,
                toast:true,
                timer: 1500
            })
            setErrors(errors.response.data.errors);
            setModalShow(false);
            navigate('/product/attribute/value');
        });
    }

    const  handleAttributeValueCreate = async (e)=>{
        e.preventDefault();
        await productAttributeValueForm();
    }

    const  handleAttributeValueUpdate = async (e)=>{
        e.preventDefault();
        await handleAttributeValueUpdateForm();
    }


    const  handleAttributeValueUpdateForm = async ()=>
    {

        const  formData = new FormData();
        formData.append('name',input.name);
        formData.append('attribute_id',input.attribute_id);
        formData.append('_method','PUT');
        await axios.post(`${Constants.BASE_URL}/attribute-value/${input.id}`,formData, {
            headers: {'Content-Type': 'multipart/form-data' },
        }).then(response=> {
            setIsloading(false);
            Swal.fire({
                position: 'top-end',
                icon: response.data.cls,
                title: response.data.msg,
                showConfirmButton: false,
                toast:true,
                timer: 1500
            })
            setErrors([]);
            setInput({status:1})
            setModalShow(false);
            getAttributeValuesData();
            navigate('/product/attribute/value');
        }).catch(errors =>{
            setIsloading(false);
            Swal.fire({
                position: 'top-end',
                icon: "error",
                title: "Oops ! Something went really wrong!",
                showConfirmButton: false,
                toast:true,
                timer: 1500
            })
            setErrors(errors.response.data.errors);
            setModalShow(false);
            navigate('/product/attribute/value');
        });
    }





    const handleAttributeValueDelete = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Attribute Value will be Delete !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${Constants.BASE_URL}/attribute-value/${id}`)
                    .then(res=> {
                        Swal.fire({
                            position: 'top-end',
                            icon: res.data.cls,
                            title: res.data.msg,
                            showConfirmButton: false,
                            toast:true,
                            timer: 1500
                        })
                        getAttributeValuesData();
                    }).catch(errors =>{
                    window.location.reload();
                });
            }
        })
    }


    return (
        <>
            <Breadcrumb title={"Attributes Value"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center ">
                                <h4>Attributes Value</h4>
                                <Button className={'btn theme-button'} onClick={() => handleCreateModal()} >
                                    <i className={`fa-solid fa-add`}></i> Add</Button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="search-area mb-3">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-responsive">
                                            <table className={'my-table table table-hover table-striped table-bordered'}>
                                                <thead>
                                                <tr>
                                                    <th>SL</th>
                                                    <th>Attribute Name</th>
                                                    <th>Value</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                {
                                                    isLoading ? <Loader />
                                                        :
                                                        <tbody>
                                                        {
                                                            Object.keys(attributeValues).length > 0 ?   attributeValues && attributeValues.map((attributeValue,index) => (
                                                                <tr key={index}>
                                                                    <td>{ index +1 }</td>
                                                                    <td>{attributeValue.attribute_name}</td>
                                                                    <td>{attributeValue.name}</td>
                                                                    <td>
                                                                        <button className={'btn btn-sm btn-warning my-1 mx-1'} onClick={() => handleCreateModal(attributeValue)} ><i className="fa-solid fa-pen-to-square"></i></button>
                                                                        <button className={'btn btn-sm btn-danger my-1'} onClick={() => handleAttributeValueDelete(attributeValue.id)} ><i className="fa-solid fa-trash"></i></button>
                                                                    </td>
                                                                </tr>
                                                            )) : <NoDataFound /> }
                                                        </tbody>
                                                }
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="category-details-modal">
                        <h4> {modalTitle} Attribute Value</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={ isEditMode ? handleAttributeValueUpdate :handleAttributeValueCreate}>

                        <div className="form-group">
                            <label className={'w-100'}>
                                <h6>Select Attribute</h6>
                                <select className={errors.attribute_id != undefined ? "form-select is-invalid" : "form-select"}
                                        name={"attribute_id"}
                                        value={input.attribute_id}
                                        onChange={handleInput} >
                                    <option value={""} > Select One</option>
                                    {
                                        attributes && attributes.map((attribute,index)=> (
                                            <option key={index} value={attribute.id} > {attribute.name}</option>
                                        ))
                                    }

                                </select>
                                <p style={{color:"red"}}>{errors.attribute_id != undefined ? errors.attribute_id[0] : null}</p>
                            </label>
                        </div>

                        <div className="col-md-12">
                            <label className={'w-100'}>
                                <h6>Name</h6>
                                <input className={errors.name != undefined ? "form-control is-invalid" : "form-control"}
                                       type="text" name={"name"} onChange={handleInput} value={input.name} placeholder={'Enter attribute name'} required />
                                <p style={{color:"red"}}>{errors.name != undefined ? errors.name[0] : null}</p>
                            </label>
                        </div>

                        <div className="col-md-12">
                            <div className="d-grid">
                                <Button type="submit" className={'btn submit-button'} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : `${modalTitle}`}}  />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </>
    );
};

export default ProductAttributeValue;