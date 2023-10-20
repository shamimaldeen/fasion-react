import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import GlobalFunction from "./GlobalFunction";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));


      // Start Interceptor Execute
    axios.interceptors.request.use(function (config) {
        if ( localStorage.token != undefined){
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
        }else if(error.response.status == 500){
            window.location.href =window.location.origin +'/error';
        }
        return Promise.reject(error);
    });
// End Interceptor Execute






root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
