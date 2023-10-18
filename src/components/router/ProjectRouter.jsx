import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import Master from "../layout/Master";
import Dashboard from "../modules/Dashboard";
import Error500 from "../modules/Error500";

const ProjectRouter = createBrowserRouter([
    {
        path:'/',
        element: <Master />,

        children:[
            {
                path:'/',
                element:<Dashboard />
            },
            {
                path:'/error',
                element:<Error500 />
            }
        ],

    }
])

export default ProjectRouter;