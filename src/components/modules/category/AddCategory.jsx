import React, {useState} from 'react';
import Breadcrumb from "../../partials/Breadcrumb";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Constants from "../../../Constants";

const AddCategory = () => {

    const [input , setInput] = useState({status:1});
    const [errors , setErrors] = useState([]);
    const [isLoading , setIsloading] = useState(false);

    const handleInput = (e)=>{
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
        let reader = new FileReader();
        reader.onloadend =()=>{
            setInput(prevState => ({...prevState,photo :reader.result }));
        }
        reader.readAsDataURL(file)
    }


    const handleCategoryCreate=()=>{

        setIsloading(true);
        axios.post(`${Constants.BASE_URL}/category`,input)
            .then(res=> {
                setIsloading(false);
                console.log(res.data)
            }).catch(errors =>{
               setIsloading(false);

                setErrors(errors.response.data.errors);

        });
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
                                 <div className="row">

                                   <div className="col-md-6">
                                       <label className={'w-100'}>
                                           <h6>Name</h6>
                                           <input className={errors.name != undefined ? "form-control is-invalid" : "form-control"}
                                              type="text" name={"name"} onChange={handleInput} value={input.name} placeholder={'Enter category name'} />
                                           <p style={{color:"red"}}>{errors.name != undefined ? errors.name[0] : null}</p>
                                       </label>
                                   </div>

                                     <div className="col-md-6">
                                         <label className={'w-100'}>
                                             <h6>Slug</h6>
                                             <input className={errors.slug != undefined ? "form-control is-invalid" : "form-control"}
                                                    type="text"  name={"slug"} onChange={handleInput} value={input.slug}  placeholder={'Enter category slug'} />
                                             <p style={{color:"red"}}>{errors.slug != undefined ? errors.slug[0] : null}</p>
                                         </label>
                                     </div>
                                     <div className="col-md-6">
                                         <label className={'w-100'}>
                                             <h6>Serial</h6>
                                             <input className={errors.serial != undefined ? "form-control is-invalid" : "form-control"}
                                                    type="number"  name={"serial"} onChange={handleInput} value={input.serial}  placeholder={'Enter category serial'} />
                                             <p style={{color:"red"}}>{errors.serial != undefined ? errors.serial[0] : null}</p>
                                         </label>
                                     </div>

                                     <div className="col-md-6">
                                         <label className={'w-100'}>
                                             <h6>Status</h6>
                                             <select className={errors.status != undefined ? "form-select is-invalid" : "form-select"}
                                                     name={"status"}
                                                     value={input.status}
                                                     onChange={handleInput}
                                                     placeholder={'Enter category status'} >
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
                                                    name={"description"} onChange={handleInput}   >  </textarea>
                                             <p style={{color:"red"}}>{errors.description != undefined ? errors.description[0] : null}</p>
                                         </label>
                                     </div>

                                     <div className="col-md-6">
                                         <label className={'w-100'}>
                                             <h6>Photo</h6>
                                             <input className={errors.photo != undefined ? "form-control is-invalid" : "form-control"}
                                                    type="file"  name={"photo"} onChange={handlePhoto}   placeholder={'Enter category photo'} />
                                             <p style={{color:"red"}}>{errors.photo != undefined ? errors.photo[0] : null}</p>
                                         </label>
                                         {input.photo != undefined ?
                                             <div className="row">
                                                 <div className="col-md-6">
                                                     <div className="photo-preview mt-3">
                                                         <img src={input.photo} alt={'photo-preview'} className={'img-thumbnail aspect-one'} />
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
                                                     <Button type="submit" className={'btn submit-button'} onClick={handleCategoryCreate} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Save'}}  />
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

export default AddCategory;