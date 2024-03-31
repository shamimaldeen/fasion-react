import axios from "axios";
import {redirect} from "react-router-dom";
import GlobalFunction from "./GlobalFunction";

axios.interceptors.request.use(function (config) {

    if (localStorage.token != undefined){
        config.headers['Authorization'] = `Bearer ${localStorage.token}`
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {

    return response;

}, function (error) {
    if (error.response.status == 401){
        GlobalFunction.logout();

    }else if (error.response.status == 500){
      //  window.location.href = window.location.origin + '/error'
    }

    return Promise.reject(error);
});