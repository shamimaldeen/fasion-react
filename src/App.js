import './assets/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import {RouterProvider} from "react-router-dom";
import ProjectRouter from "./components/router/ProjectRouter";
import {useEffect, useState} from "react";
import AuthRouter from "./components/router/AuthRouter";
import axios from "axios";
function App() {
    const [auth,setAuth] = useState(false);
    useEffect(()=>{
        if ( localStorage.token !== undefined){
            setAuth(true);
        }
    },[])


  return (
    <>
         {
            auth ?  <RouterProvider router={ProjectRouter} />
                :
                <RouterProvider router={AuthRouter} />
         }
    </>
  );
}

export default App;
