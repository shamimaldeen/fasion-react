import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import Master from "../layout/Master";
import Dashboard from "../modules/Dashboard";
import Error500 from "../modules/Error500";
import AddCategory from "../modules/category/AddCategory";
import CategoryList from "../modules/category/CategoryList";
import EditCategory from "../modules/category/EditCategory";
import AddSubCategory from "../modules/sub-category/AddSubCategory";
import SubCategoryList from "../modules/sub-category/SubCategoryList";
import EditSubCategory from "../modules/sub-category/EditSubCategory";
import AddBrand from "../modules/brand/AddBrand";
import BrandList from "../modules/brand/BrandList";
import EditBrand from "../modules/brand/EditBrand";
import SupplierList from "../modules/supplier/SupplierList";
import AddSupplier from "../modules/supplier/AddSupplier";
import EditSupplier from "../modules/supplier/EditSupplier";




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
                    path:'/category',
                    element:<CategoryList />
                },
               {
                path:'/category/create',
                element:<AddCategory />
               },
                {
                    path:'/category/edit/:id',
                    element:<EditCategory />
                },

                {
                    path:'/sub-category',
                    element:<SubCategoryList />
                },

                {
                    path:'/sub-category/create',
                    element:<AddSubCategory />
                },
                {
                    path:'/sub-category/edit/:id',
                    element:<EditSubCategory />
                },

                {
                    path:'/brand',
                    element:<BrandList />
                },
                {
                    path:'/brand/create',
                    element:<AddBrand />
                },
                {
                    path:'/brand/edit/:id',
                    element:<EditBrand />
                },

                {
                    path:'/supplier',
                    element:<SupplierList />
                },
                {
                    path:'/supplier/create',
                    element:<AddSupplier />
                },
                {
                    path:'/supplier/edit/:id',
                    element:<EditSupplier />
                },

               {
                path:'/error',
                element:<Error500 />
               }
        ],

    }
])

export default ProjectRouter;