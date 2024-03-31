import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../partials/Breadcrumb";
import {Alert} from "react-bootstrap";
import CardHeader from "../../partials/CardHeader";
import Button from "react-bootstrap/Button";
import $ from 'jquery';
import axios from "axios";
import Constants from "../../../Constants";
import Swal from "sweetalert2";
import {useNavigate, useParams} from "react-router-dom";

const AddProductPhoto = () => {
    const [input , setInput] = useState({});
    const [photos , setPhotos] = useState({});
    const [progress , setProgress] = useState(0);
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading , setIsloading] = useState(false);


    const  handleProductPhotoUpload = async (e)=>{
        e.preventDefault();
        await productPhotoForm();
    }

    const  productPhotoForm = async ()=>
    {
        for (let i = 0; i<Object.keys(input).length;i++){
            const  formData = new FormData();
            formData.append('photo',input[i].photo);
            formData.append('is_primary',input[i].is_primary);
            await axios.post(`${Constants.BASE_URL}/product/photo/upload/${params.id}`,formData, {
                onUploadProgress:(progressEvent)=>{
                    const progress = Math.round(
                        (progressEvent.loaded * 100)/progressEvent.total
                    )
                    setProgress(progress)
                }
            },{
                headers: {'Content-Type': 'multipart/form-data' },
            });
        }
        setIsloading(false);
        Swal.fire({
            position: 'top-end',
            icon: "success",
            title: "Product Photo Successfully Uploaded",
            showConfirmButton: false,
            toast:true,
            timer: 1500
        })
       navigate('/product');


    }

    const handlePhotoInputField = ()=>{
        $('#photo_input').trigger('click')
    }

    const handleUploadedPhoto = (e)=>{
      let files = e.target.files;
      for (let i = 0; i<files.length;i++){
          setInput(prevState => ({
              ...prevState,
              [i]:{
                  ...prevState[i], photo: files[i],
                  ...prevState[i], is_primary: i == 0 ? 1 : 0,
              }
          }))

          let reader = new FileReader();
          reader.onloadend =()=>{
              setPhotos(prevState => ({
                  ...prevState,
                  [i]:{
                      ...prevState[i], photo: reader.result,
                      ...prevState[i], is_primary: i == 0 ? 1 : 0,
                  }
              }))
          }
          reader.readAsDataURL(files[i])
      }
    }
    const handlePrimaryPhoto = (key)=>{
        for (let i = 0; i<Object.keys(photos).length;i++){
                setPhotos(prevState => ({
                    ...prevState,
                    [i]:{
                        ...prevState[i], is_primary: i == key? 1 : 0,
                    }
                }))

            setInput(prevState => ({
                ...prevState,
                [i]:{
                    ...prevState[i], is_primary: i == 0 ? 1 : 0,
                }
            }))
        }
    }



    useEffect(()=>{
        //console.log("check data:",photos);

       },[photos])

    return (
        <>
            <Breadcrumb title={"Add Product Photo"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <CardHeader title={'Add Product Photo'} link={'/product'} button_text={'Product List'} icon={'fa-list'} />
                        </div>
                        <div className="card-body">
                         <form onSubmit={handleProductPhotoUpload}>
                            <div className="photo-upload-container">
                                <div className="icon" onClick={handlePhotoInputField}>
                                    <i className="fa-solid fa-camera fa-2x"></i>
                                </div>
                            </div>

                            <input
                                id="photo_input"
                                type={"file"}
                                className={"d-none"}
                                multiple={true}
                                accept="image/png, image/jpg, image/jpeg,image/webp"
                                onChange={handleUploadedPhoto}
                            />

                            <div className="row">
                                {Object.keys(photos).map((key)=>(
                                    <div className={'col-md-2  my-2'} key={key}>
                                        <img onClick={()=>handlePrimaryPhoto(key)} style={{height:100}} src={photos[key].photo} className={photos[key].is_primary == 1 ? 'primary-photo img-thumbnail preview-photo':'img-thumbnail preview-photo'} alt="photo preview"/>

                                    </div>

                                ))}
                            </div>

                             <div className="col-md-12 mt-3">
                                 <div className="row justify-content-center">
                                     <div className="col-md-8">
                                         <div className="progress" style={{display:`${progress < 1 ? 'none': 'block'}`}}>
                                         <div className="progress-bar progress-bar-striped btn-info" style={{width:`${progress}%`}}>
                                             {`${progress}%`}
                                         </div>
                                         </div>
                                     </div>
                                     <div className="col-md-4">
                                         <div className="d-grid">
                                             <Button type="submit" className={'btn submit-button'} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Upload'}}  />
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

export default AddProductPhoto;