import React, {useEffect, useState} from 'react';
import $ from 'jquery';
import Swal from "sweetalert2";
import axios from "axios";
import Constants from "../../Constants";
import GlobalFunction from "../../GlobalFunction";
import {Link, useNavigate} from "react-router-dom";

const Nav = () => {
    const  navigate = useNavigate();
    const [branch, setBranch] = useState({})


    const handleLogout=()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged Out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,Logged Out!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`${Constants.BASE_URL}/logout`)
                    .then(res=> {
                        GlobalFunction.logout();
                    }).catch(errors =>{
                    GlobalFunction.logout();
                });
            }
        })
    }
    const handleToogle =()=>{
        $('body').toggleClass('sb-sidenav-toggled')
    }

    useEffect(()=>{
        if (localStorage.branch != undefined){
            setBranch( JSON.parse(localStorage.branch))
        }

    },[])

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <Link className="navbar-brand ps-3" to="/">
                <img src={process.env.PUBLIC_URL + '/fasion.png'} alt="Logo" style={{width:50}} />
                Fasion Shop</Link>
            <button onClick={handleToogle} className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i
                className="fas fa-bars"></i></button>
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..."
                           aria-describedby="btnNavbarSearch"/>
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i
                        className="fas fa-search"></i></button>
                </div>
            </form>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <p className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false"> <strong>{branch !=undefined ? branch.name + ' |'  :null} </strong> {localStorage.name != undefined ? localStorage.name : null  } <i className="fas fa-user fa-fw"></i></p>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#!">Settings</a></li>
                        <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><button onClick={handleLogout} className="dropdown-item">Logout</button></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;