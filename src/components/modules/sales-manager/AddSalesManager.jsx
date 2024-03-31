import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../partials/Breadcrumb";
import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Constants from "../../../Constants";
import {Alert} from "react-bootstrap";
import Swal from "sweetalert2";
import CardHeader from "../../partials/CardHeader";

const AddShop = () => {

    const [input , setInput] = useState({status:1});
    const [photo , setPhoto] = useState('');
    const [nid_photo , setNIDPhoto] = useState('');
    const [errors , setErrors] = useState([]);
    const [success , setSuccess] = useState(null);
    const [isLoading , setIsloading] = useState(false);
    const navigate = useNavigate();

    const [shops , setShops] = useState([]);

    const [divisions , setDivisions] = useState([]);
    const [districts , setDistricts] = useState([]);
    const [areas , setAreas] = useState([]);


    const getDivision =()=>{
        axios.get(`${Constants.BASE_URL}/get-divisions`).then(res=> {
            setDivisions(res.data);
        });
    }

    const getDistrict =(division_id)=>{
        axios.get(`${Constants.BASE_URL}/get-districts/${division_id}`).then(res=> {
            setDistricts(res.data);
        });
    }
    const getArea =(district_id)=>{
        axios.get(`${Constants.BASE_URL}/get-areas/${district_id}`).then(res=> {
            setAreas(res.data);
        });
    }

    const getAllShop =()=>{
        axios.get(`${Constants.BASE_URL}/get-all-shops`).then(res=> {
            setShops(res.data);
        });
    }


    useEffect(()=>{
        getDivision();
        getAllShop();
    },[])

    const handleInput = (e)=>{
        if (e.target.name == 'division_id'){
            setDistricts([])
            setAreas([])
            let division_id  = parseInt(e.target.value);
            if (! isNaN(division_id)){
                getDistrict(e.target.value);
            }

        }else if (e.target.name == 'district_id'){
            setAreas([])
            let district_id  = parseInt(e.target.value);
            if (! isNaN(district_id)){
                getArea( e.target.value);
            } }
        setInput(prevState => ({...prevState,[e.target.name] : e.target.value }));
    }

    const handlePhoto =(e)=>{
        let file = e.target.files[0];
        setInput(prevState => ({...prevState,photo :file }));
        let reader = new FileReader();
        reader.onloadend =()=>{
            setPhoto(reader.result);
        }
        reader.readAsDataURL(file)
    }

    const handleNIDPhoto =(e)=>{
        let file = e.target.files[0];
        setInput(prevState => ({...prevState,nid_photo :file }));
        let reader = new FileReader();
        reader.onloadend =()=>{
            setNIDPhoto(reader.result);
        }
        reader.readAsDataURL(file)
    }
    // console.log('shop all input:',input);
    const  shopForm = async ()=>
    {
        const  formData = new FormData();
        formData.append('name',input.name);
        formData.append('email',input.email);
        formData.append('contact',input.contact);
        formData.append('password',input.password);
        formData.append('nid',input.nid);
        formData.append('bio',input.bio);
        formData.append('shop_id',input.shop_id);
        formData.append('status',input.status);
        formData.append('address',input.address);
        formData.append('division_id',input.division_id);
        formData.append('district_id',input.district_id);
        formData.append('area_id',input.area_id);
        formData.append('landmark',input.landmark);
        formData.append('photo',input.photo);
        formData.append('nid_photo',input.nid_photo);
        await axios.post(`${Constants.BASE_URL}/sales-manager`,formData, {
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
            navigate('/sales-manager');
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
            navigate('/sales-manager/create');
        });
    }
    const  handleShopCreate = async (e)=>{
        e.preventDefault();
        await shopForm();
    }
    return (
        <>
            <Breadcrumb title={"Add Sales Manager"} />
            <div className="row">
                <div className="col-md-12">
                    {success && <Alert className="col-sm-3 offset-3"  variant="danger">{success}</Alert>}
                    <div className="card">
                        <div className="card-header">
                            <CardHeader title={'Add Sales Manager'} link={'/sales-manager'} button_text={'Sales Manager List'} icon={'fa-list'} />
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleShopCreate}>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>Basic Information</h5>
                                            </div>
                                            <div className="card-body">
                                                <label className={'w-100'}>
                                                    <h6> Name</h6>
                                                    <input className={errors.name != undefined ? "form-control is-invalid" : "form-control"}
                                                           type="text" name={"name"} onChange={handleInput} value={input.name} placeholder={'Enter name'} required />
                                                    <p style={{color:"red"}}>{errors.name != undefined ? errors.name[0] : null}</p>
                                                </label>

                                                <label className={'w-100'}>
                                                    <h6>Email Address</h6>
                                                    <input className={errors.email != undefined ? "form-control is-invalid" : "form-control"}
                                                           type="email" name={"email"} onChange={handleInput} value={input.email} placeholder={'Enter  email'} required />
                                                    <p style={{color:"red"}}>{errors.email != undefined ? errors.email[0] : null}</p>
                                                </label>

                                                <label className={'w-100'}>
                                                    <h6>Contact</h6>
                                                    <input className={errors.contact != undefined ? "form-control is-invalid" : "form-control"}
                                                           type="text" name={"contact"} onChange={handleInput} value={input.contact} placeholder={'Enter contact number '} required />
                                                    <p style={{color:"red"}}>{errors.contact != undefined ? errors.contact[0] : null}</p>
                                                </label>

                                                <label className={'w-100'}>
                                                    <h6>Password</h6>
                                                    <input className={errors.password != undefined ? "form-control is-invalid" : "form-control"}
                                                           type="password" name={"password"} onChange={handleInput} value={input.password} placeholder={'Enter password '} required />
                                                    <p style={{color:"red"}}>{errors.password != undefined ? errors.password[0] : null}</p>
                                                </label>

                                                <label className={'w-100'}>
                                                    <h6>NID/Passport</h6>
                                                    <input className={errors.nid != undefined ? "form-control is-invalid" : "form-control"}
                                                           type="text" name={"nid"} onChange={handleInput} value={input.nid} placeholder={'Enter  NID/Passport '} required />
                                                    <p style={{color:"red"}}>{errors.nid != undefined ? errors.nid[0] : null}</p>
                                                </label>


                                                <label className={'w-100'}>
                                                    <h6>Select Shop</h6>
                                                    <select  className={errors.shop_id != undefined ? "form-select is-invalid selectpicker  " : "form-select selectpicker"} data-live-search="true"
                                                             name={"shop_id"}
                                                             value={input.shop_id}
                                                             onChange={handleInput} >
                                                        <option> Select One</option>
                                                        {
                                                            shops && shops.map((shop,index)=> (
                                                                <option key={index} value={shop.id} > {shop.name}</option>
                                                            ))
                                                        }

                                                    </select>
                                                    <p style={{color:"red"}}>{errors.shop_id != undefined ? errors.shop_id[0] : null}</p>
                                                </label>

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

                                                <label className={'w-100'}>
                                                    <h6>Bio</h6>
                                                    <textarea className={errors.bio != undefined ? "form-control is-invalid" : "form-control"}
                                                              name={"bio"} onChange={handleInput}   >  </textarea>
                                                    <p style={{color:"red"}}>{errors.bio != undefined ? errors.bio[0] : null}</p>
                                                </label>

                                                <label className={'w-100'}>
                                                    <h6>Photo</h6>
                                                    <input className={errors.photo != undefined ? "form-control is-invalid" : "form-control"}
                                                           type="file"  name={"photo"} onChange={handlePhoto}  />
                                                    <p style={{color:"red"}}>{errors.photo != undefined ? errors.photo[0] : null}</p>
                                                </label>
                                                { photo ?
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="photo-preview mt-3">
                                                                <img src={photo} alt={'photo-preview'} className={'img-thumbnail aspect-one'} />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    : null
                                                }
                                                <br/>

                                                <label className={'w-100'}>
                                                    <h6>NID/Passport Photo</h6>
                                                    <input className={errors.nid_photo != undefined ? "form-control is-invalid" : "form-control"}
                                                           type="file"  name={"nid_photo"} onChange={handleNIDPhoto}  />
                                                    <p style={{color:"red"}}>{errors.nid_photo != undefined ? errors.nid_photo[0] : null}</p>
                                                </label>
                                                { nid_photo ?
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="photo-preview mt-3">
                                                                <img src={nid_photo} alt={'photo-preview'} className={'img-thumbnail aspect-one'} />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    : null
                                                }


                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>Address Information </h5>
                                            </div>
                                            <div className="card-body">
                                                <label className={'w-100'}>
                                                    <h6>Address <small>(House/Road/Village)</small></h6>
                                                    <input className={errors.address != undefined ? "form-control is-invalid" : "form-control"}
                                                           type="text" name={"address"} onChange={handleInput} value={input.address} placeholder={'Enter Shop address'} required />
                                                    <p style={{color:"red"}}>{errors.address != undefined ? errors.address[0] : null}</p>
                                                </label>

                                                <label className={'w-100'}>
                                                    <h6>Select Division</h6>
                                                    <select  className={errors.division_id != undefined ? "form-select is-invalid selectpicker  " : "form-select selectpicker"} data-live-search="true"
                                                             name={"division_id"}
                                                             value={input.division_id}
                                                             onChange={handleInput} >
                                                        <option> Select One</option>
                                                        {
                                                            divisions && divisions.map((division,index)=> (
                                                                <option key={index} value={division.id} > {division.name}</option>
                                                            ))
                                                        }

                                                    </select>
                                                    <p style={{color:"red"}}>{errors.division_id != undefined ? errors.division_id[0] : null}</p>
                                                </label>

                                                <label className={'w-100'}>
                                                    <h6>Select City</h6>
                                                    <select className={errors.district_id != undefined ? "form-select is-invalid" : "form-select"}
                                                            name={"district_id"}
                                                            value={input.district_id}
                                                            onChange={handleInput}
                                                            disabled={Object.keys(districts).length < 1} >
                                                        <option> Select One</option>
                                                        {
                                                            districts && districts.map((district,index)=> (
                                                                <option key={index} value={district.id} > {district.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <p style={{color:"red"}}>{errors.district_id != undefined ? errors.district_id[0] : null}</p>
                                                </label>


                                                <label className={'w-100'}>
                                                    <h6>Select Area</h6>
                                                    <select className={errors.area_id != undefined ? "form-select is-invalid" : "form-select"}
                                                            name={"area_id"}
                                                            value={input.area_id}
                                                            onChange={handleInput}
                                                            disabled={Object.keys(areas).length < 1} >
                                                        <option> Select One</option>
                                                        {
                                                            areas && areas.map((area,index)=> (
                                                                <option key={index} value={area.id} > {area.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <p style={{color:"red"}}>{errors.area_id != undefined ? errors.area_id[0] : null}</p>
                                                </label>

                                                <label className={'w-100'}>
                                                    <h6>Landmark</h6>
                                                    <input className={errors.landmark != undefined ? "form-control is-invalid" : "form-control"}
                                                           type="text" name={"landmark"} onChange={handleInput} value={input.landmark} placeholder={'Enter landmark '} />
                                                    <p style={{color:"red"}}>{errors.landmark != undefined ? errors.landmark[0] : null}</p>
                                                </label>

                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-md-12 mt-3">
                                        <div className="row justify-content-center">
                                            <div className="col-md-4">
                                                <div className="d-grid">
                                                    <Button type="submit" className={'btn submit-button'} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Save'}}  />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default AddShop;