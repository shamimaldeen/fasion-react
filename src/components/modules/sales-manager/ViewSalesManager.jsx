import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ViewSalesManager = (props) => {
    return (
        <>
            <Modal
                {...props}
                size={props.size}
                aria-labelledby="category-details-modal"

            >
                <Modal.Header closeButton>
                    <Modal.Title id="category-details-modal">
                        <h4>{props.modal_title}</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className={'table table-hover table-striped table-bordered'}>
                        <tbody>
                        <tr>
                            <th>Id</th>
                            <td>{props.sales_manager.id}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>{props.sales_manager.name}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{props.sales_manager.email}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>{props.sales_manager.contact}</td>
                        </tr>
                        <tr>
                            <th>NID/Passport</th>
                            <td>{props.sales_manager.nid}</td>
                        </tr>
                        <tr>
                            <th>Shop</th>
                            <td>{props.sales_manager.shop}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>{props.sales_manager.address ? props.sales_manager.address.address : null} ({props.sales_manager.address ? props.sales_manager.address.landmark : null}),{props.sales_manager.address ? props.sales_manager.address.area : null} , {props.sales_manager.address ? props.sales_manager.address.district : null},{props.sales_manager.address ? props.sales_manager.address.division : null}</td>
                        </tr>

                        <tr>
                            <th>Status</th>
                            <td>{props.sales_manager.status == 1 ? <strong style={{ color:"green" }}>Active</strong> : <strong style={{ color:"red" }}>Inactive </strong> }</td>
                        </tr>
                        <tr>
                            <th>Bio</th>
                            <td>{props.sales_manager.bio}</td>
                        </tr>
                        <tr>
                            <th>Image</th>
                            <td>  <img style={{ width:"90px"}} src={props.sales_manager.photo} /> </td>
                        </tr>

                        <tr>
                            <th>NID/Passport Photo</th>
                            <td>  <img style={{ width:"90px"}} src={props.sales_manager.nid_photo} /> </td>
                        </tr>
                        </tbody>
                    </table>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default ViewSalesManager;