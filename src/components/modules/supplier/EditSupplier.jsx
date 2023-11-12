import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../partials/Breadcrumb";
import {Alert} from "react-bootstrap";
import CardHeader from "../../partials/CardHeader";
import Button from "react-bootstrap/Button";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Constants from "../../../Constants";
import Swal from "sweetalert2";

const EditSupplier = () => {
    const params = useParams();
    const [input , setInput] = useState([]);
    const [logo , setLogo] = useState('');
    const [img , setImg] = useState('');
    const [errors , setErrors] = useState([]);
    const [success , setSuccess] = useState(null);
    const [isLoading , setIsloading] = useState(false);
    const navigate = useNavigate();

    const getBrandData = ()=>{
        axios.get(`${Constants.BASE_URL}/brand/${params.id}`).then(res=> {
            setInput(res.data.data);
            setLogo(res.data.data.old_logo);
        })

    }

    useEffect(()=>{
        getBrandData();
    },[])
    const updateHandleInput = (e)=>{
        if (e.target.name == 'name'){
            let  slug = e.target.value;
            slug = slug.toLowerCase();
            slug = slug.replaceAll(' ','-');
            setInput(prevState => ({...prevState,slug : slug }));
        }
        setInput(prevState => ({...prevState,[e.target.name] : e.target.value }));
    }

    const handleLogo =(e)=>{
        let file = e.target.files[0];
        setImg(e.target.files[0]);
        let reader = new FileReader();
        reader.onloadend =()=>{
            setLogo(reader.result);
        }
        reader.readAsDataURL(file)
    }


    const  brandUpdateForm = async ()=>
    {

        const  formData = new FormData();
        formData.append('name',input.name);
        formData.append('slug',input.slug);
        formData.append('serial',input.serial);
        formData.append('status',input.status);
        formData.append('description',input.description);
        formData.append('old_logo',input.old_logo);
        formData.append('logo',img);
        formData.append('id',input.id);
        formData.append('_method','PUT');

        await axios.post(`${Constants.BASE_URL}/brand/${params.id}`,formData, {
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
            navigate('/brand');
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
            navigate('/brand');
        });
    }

    const  handleBrandUpdate = async (e)=>{
        e.preventDefault();
        await brandUpdateForm();
    }

    return (
        <>
            <Breadcrumb title={"Update Brand"} />
            <div className="row">
                <div className="col-md-12">
                    {success && <Alert className="col-sm-3 offset-3"  variant="danger">{success}</Alert>}
                    <div className="card">
                        <div className="card-header">
                            <CardHeader title={'Update Brand'} link={'/brand'} button_text={'Brand List'} icon={'fa-list'} />
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleBrandUpdate}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className={'w-100'}>
                                            <h6>Name</h6>
                                            <input className={errors.name != undefined ? "form-control is-invalid" : "form-control"}
                                                   type="text" name={"name"} onChange={updateHandleInput} value={input.name} placeholder={'Enter brand name'} required />
                                            <p style={{color:"red"}}>{errors.name != undefined ? errors.name[0] : null}</p>
                                        </label>
                                    </div>

                                    <div className="col-md-6">
                                        <label className={'w-100'}>
                                            <h6>Slug</h6>
                                            <input className={errors.slug != undefined ? "form-control is-invalid" : "form-control"}
                                                   type="text"  name={"slug"} onChange={updateHandleInput} value={input.slug}  placeholder={'Enter brand slug'} />
                                            <p style={{color:"red"}}>{errors.slug != undefined ? errors.slug[0] : null}</p>
                                        </label>
                                    </div>
                                    <div className="col-md-6">
                                        <label className={'w-100'}>
                                            <h6>Serial</h6>
                                            <input className={errors.serial != undefined ? "form-control is-invalid" : "form-control"}
                                                   type="number"  name={"serial"} onChange={updateHandleInput} value={input.serial}  placeholder={'Enter brand serial'} required />
                                            <p style={{color:"red"}}>{errors.serial != undefined ? errors.serial[0] : null}</p>
                                        </label>
                                    </div>

                                    <div className="col-md-6">
                                        <label className={'w-100'}>
                                            <h6>Status</h6>
                                            <select className={errors.status != undefined ? "form-select is-invalid" : "form-select"}
                                                    name={"status"}
                                                    value={input.status}
                                                    onChange={updateHandleInput}
                                                    placeholder={'Enter brand status'} >
                                                <option value={1} > Active</option>
                                                <option value={0} > Inactive</option>
                                            </select>
                                            <p style={{color:"red"}}>{errors.status != undefined ? errors.status[0] : null}</p>
                                        </label>
                                    </div>
                                    <div className="col-md-6">
                                        <label className={'w-100'}>
                                            <h6>Description</h6>
                                            <textarea className={errors.description != undefined ? "form-control is-invalid" : "form-control"}
                                                      name={"description"} onChange={updateHandleInput}   value={input.description}   >  </textarea>
                                            <p style={{color:"red"}}>{errors.description != undefined ? errors.description[0] : null}</p>
                                        </label>
                                    </div>

                                    <div className="col-md-6">
                                        <label className={'w-100'}>
                                            <h6>Logo</h6>
                                            <input className={errors.logo != undefined ? "form-control is-invalid" : "form-control"}
                                                   type="file"  name={"logo"} onChange={handleLogo}   placeholder={'Enter Brand logo'} />
                                            <p style={{color:"red"}}>{errors.logo != undefined ? errors.logo[0] : null}</p>
                                        </label>
                                        { logo ?
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="photo-preview mt-3">
                                                        <img src={logo} alt={'photo-preview'} className={'img-thumbnail aspect-one'} />
                                                    </div>
                                                </div>

                                            </div>
                                            : null
                                        }
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <div className="row justify-content-center">
                                            <div className="col-md-4">
                                                <div className="d-grid">
                                                    <Button type="submit"  className={'btn submit-button'}  dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Update'}}  />
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

export default EditSupplier;