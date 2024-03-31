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

const CustomerList = () => {
    const [modalShow, setModalShow] = useState(false);
    const [input , setInput] = useState({status:1});
    const [errors , setErrors] = useState([]);
    const [isLoading , setIsloading] = useState(false);
    const [attributes , setAttributes] = useState([]);
    const [customers , setCustomers] = useState([]);
    const [modalTitle , setModalTitle] = useState("Add");
    const [isEditMode , setIsEditMode] = useState(false);
    const navigate = useNavigate();
    const handleInput = (e)=>{
        setInput(prevState => ({...prevState,[e.target.name] : e.target.value }));
    }

    const handleCreateModal = (customer = null)=>{
        if (customer != null){
            setModalTitle("Update");
            setIsEditMode(true);
            setInput( {name:customer.name,email:customer.email,phone:customer.phone,address:customer.address,status: customer.status,id:customer.id });
        }else{
            setInput( {status: 1});
            setModalTitle("Add")
            setIsEditMode(false);
        }
        setErrors([]);
        setModalShow(true);
    }

    const  customerForm = async ()=>
    {
        const  formData = new FormData();
        formData.append('name',input.name);
        formData.append('email',input.email);
        formData.append('phone',input.phone);
        formData.append('address',input.address);
        formData.append('status',input.status);
        await axios.post(`${Constants.BASE_URL}/customer`,formData, {
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
            getCustomerData();
            navigate('/customer');
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
            navigate('/customer');
        });
    }

    const  handleCustomerCreate = async (e)=>{
        e.preventDefault();
        await customerForm();
    }

    const  handleCustomerUpdate = async (e)=>{
        e.preventDefault();
        await handleCustomerUpdateForm();
    }


    const  handleCustomerUpdateForm = async ()=>
    {

        const  formData = new FormData();
        formData.append('name',input.name);
        formData.append('email',input.email);
        formData.append('phone',input.phone);
        formData.append('address',input.address);
        formData.append('status',input.status);
        formData.append('_method','PUT');

        await axios.post(`${Constants.BASE_URL}/customer/${input.id}`,formData, {
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
            getCustomerData();
            navigate('/customer');
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
            navigate('/customer');
        });
    }


    useEffect(()=>{
        getCustomerData();
    },[])
    const getCustomerData =()=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/customer`)
            .then(res=> {
                setCustomers(res.data.data);
                setIsloading(false);
            }).catch(errors =>{
            setIsloading(false);
        });
    }

    const handleCustomerDelete = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Customer will be Delete !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${Constants.BASE_URL}/customer/${id}`)
                    .then(res=> {
                        Swal.fire({
                            position: 'top-end',
                            icon: res.data.cls,
                            title: res.data.msg,
                            showConfirmButton: false,
                            toast:true,
                            timer: 1500
                        })
                        getCustomerData();
                    }).catch(errors =>{
                    window.location.reload();
                });
            }
        })
    }


    return (
        <>
            <Breadcrumb title={"Customer List"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center ">
                                <h4>Customer List </h4>
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
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Address</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                {
                                                    isLoading ? <Loader />
                                                        :
                                                        <tbody>
                                                        {
                                                            Object.keys(customers).length > 0 ?   customers && customers.map((customer,index) => (
                                                                <tr key={index}>
                                                                    <td>{ index +1 }</td>
                                                                    <td>{customer.name}</td>
                                                                    <td>{customer.email}</td>
                                                                    <td>{customer.phone}</td>
                                                                    <td>{customer.address}</td>
                                                                    <td>{customer.status == 1 ? <strong style={{ color:"green" }}>Active</strong> : <strong style={{ color:"red" }}>Inactive </strong> }</td>
                                                                    <td>
                                                                        <button className={'btn btn-sm btn-warning my-1 mx-1'} onClick={() => handleCreateModal(customer)} ><i className="fa-solid fa-pen-to-square"></i></button>
                                                                        <button className={'btn btn-sm btn-danger my-1'} onClick={() => handleCustomerDelete(customer.id)} ><i className="fa-solid fa-trash"></i></button>
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
                        <h4> {modalTitle} Customer</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={ isEditMode ? handleCustomerUpdate :handleCustomerCreate}>
                        <div className="col-md-12">
                            <label className={'w-100'}>
                                <h6>Name</h6>
                                <input className={errors.name != undefined ? "form-control is-invalid" : "form-control"}
                                       type="text" name={"name"} onChange={handleInput} value={input.name} placeholder={'Enter Customer name'} required />
                                <p style={{color:"red"}}>{errors.name != undefined ? errors.name[0] : null}</p>
                            </label>
                        </div>

                        <div className="col-md-12">
                            <label className={'w-100'}>
                                <h6>Email</h6>
                                <input className={errors.email != undefined ? "form-control is-invalid" : "form-control"}
                                       type="text" name={"email"} onChange={handleInput} value={input.email} placeholder={'Enter email'} required />
                                <p style={{color:"red"}}>{errors.email != undefined ? errors.email[0] : null}</p>
                            </label>
                        </div>

                        <div className="col-md-12">
                            <label className={'w-100'}>
                                <h6>Phone</h6>
                                <input className={errors.phone != undefined ? "form-control is-invalid" : "form-control"}
                                       type="text" name={"phone"} onChange={handleInput} value={input.phone} placeholder={'Enter phone'} required />
                                <p style={{color:"red"}}>{errors.phone != undefined ? errors.phone[0] : null}</p>
                            </label>
                        </div>

                        <div className="col-md-12">
                            <label className={'w-100'}>
                                <h6>Address</h6>
                                <textarea
                                    className={errors.address != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                    name={'address'}
                                    value={input.address}
                                    onChange={handleInput}
                                    placeholder={'Enter address'}
                                />
                                <p className={'login-error-msg'}>
                                    <small>{errors.address != undefined ? errors.address[0] : null}</small>
                                </p>
                            </label>
                        </div>

                        <div className="col-md-12">
                            <label className={'w-100'}>
                                <h6>Status</h6>
                                <select className={errors.status != undefined ? "form-select is-invalid" : "form-select"}
                                        name={"status"}
                                        value={input.status}
                                        onChange={handleInput}
                                        placeholder={'Enter brand status'} >
                                    <option value={1} > Active</option>
                                    <option value={0} > Inactive</option>
                                </select>
                                <p style={{color:"red"}}>{errors.status != undefined ? errors.status[0] : null}</p>
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

export default CustomerList;