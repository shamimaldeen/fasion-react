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
import ProductAttribute from "../modules/product-attribute/ProductAttribute";
import ProductAttributeValue from "../modules/product-attribute/ProductAttributeValue";
import AddProduct from "../modules/product/AddProduct";
import AddProductPhoto from "../modules/product/AddProductPhoto";
import ProductList from "../modules/product/ProductList";
import ViewProduct from "../modules/product/ViewProduct";
import AddShop from "../modules/shop/AddShop";
import ShopList from "../modules/shop/ShopList";
import EditShop from "../modules/shop/EditShop";
import AddSalesManager from "../modules/sales-manager/AddSalesManager";
import SalesManagerList from "../modules/sales-manager/SalesManagerList";
import EditSalesManager from "../modules/sales-manager/EditSalesManager";
import CreateOrder from "../modules/order/CreateOrder";
import CustomerList from "../modules/customer/CustomerList";
import OrderList from "../modules/order/OrderList";
import OrderDetails from "../modules/order/OrderDetails";
import ProductBarcode from "../modules/barcode/ProductBarcode";
import Report from "../modules/report/Report";





const ProjectRouter = createBrowserRouter([
    {
        path:'/',
        element: <Master />,

        children:[
                {
                    path:'/',
                    element:<Report />
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
                    path:'/product/attribute',
                    element:<ProductAttribute />
                },

                {
                    path:'/product/attribute/value',
                    element:<ProductAttributeValue />
                },

                {
                    path:'/product/create',
                    element:<AddProduct />
                },

                {
                    path:'/product/photo/:id',
                    element:<AddProductPhoto />
                },

                {
                    path:'/product',
                    element:<ProductList />
                },

                {
                    path:'/product/view/:id',
                    element:<ViewProduct />
                },

                {
                    path:'/shop/create',
                    element:<AddShop />
                },
                {
                    path:'/shop/edit/:id',
                    element:<EditShop />
                },
                {
                    path:'/shop',
                    element:<ShopList />
                },

            {
                path:'/sales-manager/create',
                element:<AddSalesManager />
            },
            {
                path:'/sales-manager',
                element:<SalesManagerList />
            },
            {
                path:'/sales-manager/edit/:id',
                element:<EditSalesManager />
            },

            {
                path:'/order/create',
                element:<CreateOrder />
            },
            {
                path:'/order',
                element:<OrderList />
            },
            {
                path:'/order/details/:id',
                element:<OrderDetails />
            },
            {
                path:'/generate-barcode',
                element:<ProductBarcode />
            },
            {
                path:'/report',
                element:<Report />
            },
            {
                path:'/customer',
                element:<CustomerList />
            },

               {
                path:'/error',
                element:<Error500 />
               }
        ],

    }
])

export default ProjectRouter;