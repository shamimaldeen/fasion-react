import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Breadcrumb = (props) => {
    return (
        <>
            <HelmetProvider>
          <Helmet>

              <title>{props.title} | Ecommerce </title>
          </Helmet>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><h5>Dashboard</h5></li>
                <li className="breadcrumb-item active">{props.title}</li>
            </ol>
                </HelmetProvider>
        </>
    );
};

export default Breadcrumb;