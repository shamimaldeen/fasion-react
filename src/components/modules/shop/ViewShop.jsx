import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ViewShop = (props) => {

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
                            <td>{props.shop.id}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>{props.shop.name}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{props.shop.email}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>{props.shop.contact}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>{props.shop.address ? props.shop.address.address : null} ({props.shop.address ? props.shop.address.landmark : null}),{props.shop.address ? props.shop.address.area : null} , {props.shop.address ? props.shop.address.district : null},{props.shop.address ? props.shop.address.division : null}</td>
                        </tr>

                        <tr>
                            <th>Status</th>
                            <td>{props.shop.status == 1 ? <strong style={{ color:"green" }}>Active</strong> : <strong style={{ color:"red" }}>Inactive </strong> }</td>
                        </tr>
                        <tr>
                            <th>Image</th>
                            <td>  <img style={{ width:"90px"}} src={props.shop.logo} /> </td>
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

export default ViewShop;