import React from 'react';
import {Link} from "react-router-dom";
import ProductAttributeValue from "../modules/product-attribute/ProductAttributeValue";
import GlobalFunction from "../../GlobalFunction";

const Sidebar = () => {
    return (
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <Link className="nav-link" to="/">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </Link>


                            <div className="sb-sidenav-menu-heading">Product</div>
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                               data-bs-target="#products" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Products
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="products" aria-labelledby="headingOne"
                                 data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/product">Product List</Link>
                                    {
                                        GlobalFunction.isAdmin() &&
                                         <>
                                            <Link className="nav-link" to="/product/create">Add Product</Link>
                                            <Link className="nav-link" to="/product/trash">Trash</Link>
                                         </>
                                    }

                                </nav>
                            </div>

                            {
                                GlobalFunction.isAdmin() &&
                                <>
                                    <div className="sb-sidenav-menu-heading">Shops</div>
                                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                       data-bs-target="#shops" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                        Shop
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="shops" aria-labelledby="headingOne"
                                         data-bs-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <Link className="nav-link" to="/shop/create">Add Shop</Link>
                                            <Link className="nav-link" to="/shop">Shop List</Link>
                                        </nav>
                                    </div>

                                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                       data-bs-target="#salesManager" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                        Sales Manager
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="salesManager" aria-labelledby="headingOne"
                                         data-bs-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <Link className="nav-link" to="/sales-manager/create">Add Sales Manager</Link>
                                            <Link className="nav-link" to="/sales-manager">Sales Manager List</Link>
                                        </nav>
                                    </div>



                                    <div className="sb-sidenav-menu-heading">Management</div>

                                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                       data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                        Category
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne"
                                         data-bs-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <Link className="nav-link" to="/category/create">Add Category</Link>
                                            <Link className="nav-link" to="/category">Category List</Link>
                                        </nav>
                                    </div>

                                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                       data-bs-target="#sub-category" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                        Sub Category
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="sub-category" aria-labelledby="headingOne"
                                         data-bs-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <Link className="nav-link" to="/sub-category/create">Add Sub Category</Link>
                                            <Link className="nav-link" to="/sub-category">Sub Category List</Link>
                                        </nav>
                                    </div>

                                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                       data-bs-target="#brand" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                        Brand
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="brand" aria-labelledby="headingOne"
                                         data-bs-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <Link className="nav-link" to="/brand/create">Add Brand</Link>
                                            <Link className="nav-link" to="/brand">Brand List</Link>
                                        </nav>
                                    </div>

                                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                       data-bs-target="#supplier" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                        Supplier
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="supplier" aria-labelledby="headingOne"
                                         data-bs-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <Link className="nav-link" to="/supplier/create">Add Supplier</Link>
                                            <Link className="nav-link" to="/supplier">Supplier List</Link>
                                        </nav>
                                    </div>
                                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                       data-bs-target="#Attributes" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                        Product Attributes
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="Attributes" aria-labelledby="headingOne"
                                         data-bs-parent="#Attributes">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <Link className="nav-link" to="/product/attribute">Attributes </Link>
                                            <Link className="nav-link" to="/product/attribute/value">Attributes Value</Link>
                                        </nav>
                                    </div>

                                </>
                            }

                            <div className="sb-sidenav-menu-heading">Orders</div>
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                               data-bs-target="#orders" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Orders
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="orders" aria-labelledby="headingOne"
                                 data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/order/create">Create Order</Link>
                                    <Link className="nav-link" to="/order">Order List</Link>
                                </nav>
                            </div>

                            <div className="sb-sidenav-menu-heading">Accessories</div>
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                               data-bs-target="#Attributes" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                 Generate Barcode
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>


                            <div className="sb-sidenav-menu-heading">Customers</div>
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                               data-bs-target="#customers" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Customers
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="customers" aria-labelledby="headingOne"
                                 data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/customer">Customer List</Link>
                                </nav>
                            </div>


                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        {localStorage.name != undefined ? localStorage.name : null  }
                    </div>
                </nav>
            </div>
    );
};

export default Sidebar;