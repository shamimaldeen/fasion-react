import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Constants from "../../../Constants";



const Login = () => {
    const [input , setInput] = useState({});
    const [errors , setErrors] = useState([]);
    const [isLoading , setIsloading] = useState(false);
    const  navigate = useNavigate();


    const handleInput = (e)=>{
        setInput(prevState => ({...prevState,[e.target.name] : e.target.value }));
    }

    const handleLogin = (e)=>{
        e.preventDefault();
        setIsloading(true);
        axios.post(`${Constants.BASE_URL}/login`,input)
            .then(res=> {
                localStorage.name = res.data.name;
                localStorage.email = res.data.email;
                localStorage.phone = res.data.phone;
                localStorage.role_id = res.data.role_id;
                localStorage.token = res.data.token;
                localStorage.photo = res.data.photo;
                setIsloading(false);
                window.location.reload();
            }).catch(errors =>{
            setIsloading(false);
                if (errors.response.status == 422){
                    setErrors(errors.response.data.errors);
                }
        });
    }

    return (
        <div>
           <div className="bg-primary">
               <div id="layoutAuthentication">
                   <div id="layoutAuthentication_content">
                       <main>
                           <div className="container">
                               <div className="row justify-content-center">
                                   <div className="col-lg-5">
                                       <div className="card shadow-lg border-0 rounded-lg mt-5">
                                           <div className="card-header"><h3
                                               className="text-center font-weight-light my-4">Login</h3></div>
                                           <div className="card-body">
                                               <form>
                                                   <div className={errors.email != undefined ? 'form-floating mb-3 is-invalid' : 'form-floating mb-3' }>
                                                       <input className="form-control" name={'email'} type="email"
                                                           value={input.email} onChange={handleInput}   placeholder="Enter Email/Phone"/>
                                                       <label htmlFor="inputEmail">Email Address / Phone</label>
                                                       <p style={{color:"red"}}>{errors.email != undefined ? errors.email[0] : null}</p>
                                                   </div>
                                                   <div className={errors.password != undefined ? 'form-floating mb-3 is-invalid' : 'form-floating mb-3' }>
                                                       <input className="form-control" name={'password'}
                                                              type="password" onChange={handleInput} value={input.password} placeholder="Enter Password"/>
                                                       <label htmlFor="inputPassword">Password</label>
                                                       <p style={{color:"red"}}>{errors.password != undefined ? errors.password[0] : null}</p>
                                                   </div>
                                                   <div style={{ textAlign:"center"}}>
                                                       <button onClick={handleLogin} type="submit" className="btn-lg btn btn-primary" dangerouslySetInnerHTML={{__html: isLoading ? ' <span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Logging...' : 'Login'}}  />
                                                   </div>
                                               </form>
                                           </div>

                                       </div>
                                   </div>
                               </div>
                           </div>
                       </main>
                   </div>
                   <div id="layoutAuthentication_footer">
                       <footer className="py-4 bg-light">
                           <div className="container-fluid px-4">
                               <div className="align-items-center justify-content-between small">
                                   <div style={{textAlign:"center"}}>Copyright &copy; Fasion Shop
                                   <div style={{float:"right"}}><h6>Developed by <strong>Shamim Al-Deen</strong></h6></div>
                                   </div>



                               </div>
                           </div>
                       </footer>
                   </div>
               </div>
           </div>
        </div>
    );
};

export default Login;