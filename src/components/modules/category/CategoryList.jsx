import React, {useState} from 'react';
import Breadcrumb from "../../partials/Breadcrumb";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Constants from "../../../Constants";

const AddCategory = () => {

    const [name , setName] = useState('');
    const [slug , setSlug] = useState('');
    const [serial , setSerial] = useState('');
    const [status , setStatus] = useState('');
    const [description , setDescription] = useState('');
    const [photo , setPhoto] = useState('');


    const handleSlug=(e)=>{
        setName(e.target.value);
        let slug = name;
        slug =  slug.toLowerCase();
        slug =  slug.replaceAll(' ','-');
        setSlug(slug)
    }

    const  productForm = async ()=>
    {
        const  formData = new FormData();
        formData.append('name',name);
        formData.append('slug',slug);
        formData.append('serial',serial);
        formData.append('status',status);
        formData.append('description',description);
        formData.append('photo',photo);

        const response = await axios.post('http://127.0.0.1:8000/api/category',formData, {
            headers: {'Content-Type': 'multipart/form-data' },
        });
        if (response){
            console.log(response);
        }
    }

    const  handleCategoryCreate = async (e)=>{
        e.preventDefault();
        await productForm();
    }


    return (
        <>
            <Breadcrumb title={"Add Category"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center ">
                                <h4>Add Category</h4>
                                <Button className={'btn theme-button'} ><Link to=""><i
                                    className="fa-solid fa-list"></i> Category List</Link> </Button>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleCategoryCreate}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className={'w-100'}>
                                            <h6>Name</h6>
                                            <input className="form-control"
                                                   type="text" name={"name"} onChange={handleSlug} value={name} placeholder={'Enter category name'} />
                                        </label>
                                    </div>

                                    <div className="col-md-6">
                                        <label className={'w-100'}>
                                            <h6>Slug</h6>
                                            <input className="form-control"
                                                   type="text"  name={"slug"} onChange={(e)=>setSlug(e.target.value)} value={slug}  placeholder={'Enter category slug'} />

                                        </label>
                                    </div>
                                    <div className="col-md-6">
                                        <label className={'w-100'}>
                                            <h6>Serial</h6>
                                            <input className="form-control"
                                                   type="number"  name={"serial"} onChange={(e)=>setSerial(e.target.value)} value={serial}  placeholder={'Enter category serial'} />
                                        </label>
                                    </div>

                                    <div className="col-md-6">
                                        <label className={'w-100'}>
                                            <h6>Status</h6>
                                            <select  className="form-control"
                                                     name={"status"}
                                                     value={status}
                                                     onChange={(e)=>setStatus(e.target.value)}
                                                     placeholder={'Enter category status'} >
                                                <option value={1} > Active</option>
                                                <option value={0} > Inactive</option>
                                            </select>

                                        </label>
                                    </div>
                                    <div className="col-md-6">
                                        <label className={'w-100'}>
                                            <h6>Description</h6>
                                            <textarea   className="form-control"
                                                        name={"description"} onChange={(e)=>setDescription(e.target.value) } value={description}>  </textarea>
                                        </label>
                                    </div>

                                    <div className="col-md-6">
                                        <label className={'w-100'}>
                                            <h6>Photo</h6>
                                            <input className="form-control" type="file"   name={"photo"} onChange={(e)=>setPhoto(e.target.files[0])}  />
                                        </label>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <div className="row justify-content-center">
                                            <div className="col-md-4">
                                                <div className="d-grid">
                                                    <Button type="submit" className={'btn submit-button'}> Save</Button>
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

export default AddCategory;