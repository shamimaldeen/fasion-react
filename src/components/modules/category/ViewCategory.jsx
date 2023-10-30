import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ViewCategory = (props) => {
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
                              <td>{props.category.id}</td>
                          </tr>
                          <tr>
                              <th>Name</th>
                              <td>{props.category.name}</td>
                          </tr>
                          <tr>
                              <th>Slug</th>
                              <td>{props.category.slug}</td>
                          </tr>
                          <tr>
                              <th>Description</th>
                              <td>{props.category.description}</td>
                          </tr>
                          <tr>
                              <th>Serial</th>
                              <td>{props.category.serial}</td>
                          </tr>
                          <tr>
                              <th>Status</th>
                              <td>{props.category.status == 1 ? <strong style={{ color:"green" }}>Active</strong> : <strong style={{ color:"red" }}>Inactive </strong> }</td>
                          </tr>
                          <tr>
                              <th>Image</th>
                              <td>  <img style={{ width:"90px"}} src={props.category.photo} /> </td>
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

export default ViewCategory;