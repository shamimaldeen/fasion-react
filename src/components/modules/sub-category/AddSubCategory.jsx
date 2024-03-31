import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../partials/Breadcrumb";
import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Constants from "../../../Constants";
import {Alert} from "react-bootstrap";
import Swal from "sweetalert2";
import CardHeader from "../../partials/CardHeader";

const AddSubCategory = () => {

    const [input , setInput] = useState({status:1});
    const [image , setImage] = useState('');
    const [errors , setErrors] = useState([]);
    const [success , setSuccess] = useState(null);
    const [isLoading , setIsloading] = useState(false);
    const [categories , setCategories] = useState([]);
    const navigate = useNavigate();

    const getAllCategory =()=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/get-all-category`)
            .then(res=> {
                setCategories(res.data);
                setIsloading(false);
            });
    }
    useEffect(()=>{
        getAllCategory();
    },[])
    const handleInputsubCatefory = (e)=>{
        if (e.target.name == 'name'){
            let  slug = e.target.value;
            slug = slug.toLowerCase();
            slug = slug.replaceAll(' ','-');
            setInput(prevState => ({...prevState,slug : slug }));
        }
        setInput(prevState => ({...prevState,[e.target.name] : e.target.value }));
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

    const  subCategoryForm = async ()=>
    {
        const  formData = new FormData();
        formData.append('name',input.name);
        formData.append('slug',input.slug);
        formData.append('serial',input.serial);
        formData.append('status',input.status);
        formData.append('description',input.description);
        formData.append('photo',input.photo);
        formData.append('category_id',input.category_id);
        await axios.post(`${Constants.BASE_URL}/subcategory`,formData, {
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
            navigate('/sub-category');
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
            navigate('/sub-category/create');
        });
    }

    const  handleSubCategoryCreate = async (e)=>{
        e.preventDefault();
        await subCategoryForm();
    }
    return (
        <>
            <Breadcrumb title={"Add Sub Category"} />
            <div className="row">
                <div className="col-md-12">
                    {success && <Alert className="col-sm-3 offset-3"  variant="danger">{success}</Alert>}
                    <div className="card">
                        <div className="card-header">
                            <CardHeader title={'Add Sub Category'} link={'/sub-category'} button_text={'Sub Category List'} icon={'fa-list'} />
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubCategoryCreate}>
                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className={'w-100'}>
                                                <h6>Select Category</h6>
                                                <select className={errors.category_id != undefined ? "form-select is-invalid" : "form-select"}
                                                        name={"category_id"}
                                                        value={input.category_id}
                                                        onChange={handleInputsubCatefory} >
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
                                                <h6>Name</h6>
                                                <input className={errors.name != undefined ? "form-control is-invalid" : "form-control"}
                                                       type="text" name={"name"} onChange={handleInputsubCatefory} value={input.name} placeholder={'Enter sub category name'} required />
                                                <p style={{color:"red"}}>{errors.name != undefined ? errors.name[0] : null}</p>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className={'w-100'}>
                                                <h6>Status</h6>
                                                <select className={errors.status != undefined ? "form-select is-invalid" : "form-select"}
                                                        name={"status"}
                                                        value={input.status}
                                                        onChange={handleInputsubCatefory}
                                                        placeholder={'Enter sub category status'} >
                                                    <option value={1} > Active</option>
                                                    <option value={0} > Inactive</option>
                                                </select>
                                                <p style={{color:"red"}}>{errors.status != undefined ? errors.status[0] : null}</p>
                                            </label>
                                        </div>

                                          <div className="form-group">
                                              <label className={'w-100'}>
                                                  <h6>Description</h6>
                                                  <textarea className={errors.description != undefined ? "form-control is-invalid" : "form-control"}
                                                            name={"description"} onChange={handleInputsubCatefory}   >  </textarea>
                                                  <p style={{color:"red"}}>{errors.description != undefined ? errors.description[0] : null}</p>
                                              </label>
                                          </div>

                                    </div>

                                    <div className="col-md-6">
                                       <div className="form-group">
                                           <label className={'w-100'}>
                                               <h6>Serial</h6>
                                               <input className={errors.serial != undefined ? "form-control is-invalid" : "form-control"}
                                                      type="number"  name={"serial"} onChange={handleInputsubCatefory} value={input.serial}  placeholder={'Enter sub category serial'} required />
                                               <p style={{color:"red"}}>{errors.serial != undefined ? errors.serial[0] : null}</p>
                                           </label>

                                       </div>

                                        <div className="form-group">
                                            <label className={'w-100'}>
                                                <h6>Slug</h6>
                                                <input className={errors.slug != undefined ? "form-control is-invalid" : "form-control"}
                                                       type="text"  name={"slug"} onChange={handleInputsubCatefory} value={input.slug}  placeholder={'Enter sub category slug'} />
                                                <p style={{color:"red"}}>{errors.slug != undefined ? errors.slug[0] : null}</p>
                                            </label>
                                        </div>

                                        <div className="form-group">
                                            <label className={'w-100'}>
                                                <h6>Photo</h6>
                                                <input className={errors.photo != undefined ? "form-control is-invalid" : "form-control"}
                                                       type="file"  name={"photo"} onChange={handlePhoto}   placeholder={'Enter sub category photo'} />
                                                <p style={{color:"red"}}>{errors.photo != undefined ? errors.photo[0] : null}</p>
                                            </label>
                                            { image ?
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="photo-preview mt-3">
                                                            <img src={image} alt={'photo-preview'} className={'img-thumbnail aspect-one'} />
                                                        </div>
                                                    </div>

                                                </div>
                                                : null
                                            }
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
export default AddSubCategory;