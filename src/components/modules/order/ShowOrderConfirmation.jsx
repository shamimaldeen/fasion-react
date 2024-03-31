import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Moment from "react-moment";
import Button from "react-bootstrap/Button";

const ShowOrderConfirmation = ({handleOrderPlace,handleOrderInput,...props}) => {
    const [branch, setBranch] = useState({})

    useEffect(()=>{
        if (localStorage.branch != undefined){
            setBranch( JSON.parse(localStorage.branch)) ;
        }
    },[])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Order Details Confirmation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="order-confirmantion">
                <div className="row px-4">
                    <div className="col-md-6">
                        {Object.keys(branch).length > 0 ?
                            <>
                                <img src={branch.logo} alt="Logo" style={{width:50}} />
                            </> : null
                        }
                    </div>
                    <div className="col-md-6 text-end">
                        <h4>Order Details</h4>
                    </div>
                    <div className="col-md-6">
                        {Object.keys(branch).length > 0 ?
                            <>
                                <p><strong>{branch.name}</strong> <br/>
                                    <address>{branch.address.address},{branch.address.area},{branch.address.district},{branch.address.division} , Phone :{branch.contact}</address>
                                </p>
                            </> : null
                        }
                    </div>
                    <div className="col-md-6 text-end">
                        <p><strong>Date:   <Moment format="DD MMMM ,YYYY">

                        </Moment></strong> <br/>
                        <h5>Customer Details</h5>
                            <div className="customar-details" style={{fontSize:'14px'}}>
                                <p>Name:{props.orderSummary.customer.split('-')[0]}<br/>
                                    phone:{props.orderSummary.customer.split('-')[1]}
                                </p>
                            </div>
                        </p>

                    </div>

                    <div className="col-md-12">
                        <table className={'table table-responsive table-striped table-bordered '}>
                            <thead>
                              <tr>
                                  <th>Sl</th>
                                  <th>Description</th>
                                  <th>Quantity</th>
                                  <th>Unit Price</th>
                                  <th className={'text-end'}> Sub Total</th>
                              </tr>
                            </thead>
                            <tbody>
                            {Object.keys(props.carts).map((key,index)=>(
                            <tr>
                                <td>{++index}</td>
                                <td>{props.carts[key].name}</td>
                                <td>{props.carts[key].quantity}</td>
                                <td>{props.carts[key].price}</td>
                                <td className={'text-end'}>{ new Intl.NumberFormat('us').format(props.carts[key].original_price * props.carts[key].quantity) }{props.carts[key].symbol} </td>
                            </tr>
                            ))}
                            <tr>
                                <td colSpan={4} className={'text-end'}>Sub Total</td>
                                <td className={'text-end'}>{new Intl.NumberFormat('us').format(props.orderSummary.amount)}৳</td>
                            </tr>
                            <tr>
                                <td colSpan={4} className={'text-end'}>Discount</td>
                                <td className={'text-end'}>{new Intl.NumberFormat('us').format(props.orderSummary.discount)}৳</td>
                            </tr>
                            <tr>
                                <th colSpan={4} className={'text-end'}>Total</th>
                                <th className={'text-end'}>{new Intl.NumberFormat('us').format(props.orderSummary.payable_amount)}৳</th>
                            </tr>

                            <tr>
                                <th colSpan={4} className={'text-end align-middle'}>Paid Amount</th>
                                <th className={'text-end align-middle'}  style={{width:"150px"}}>
                                    <div className="input-group">
                                        <input className="form-control form-control-sm text-center"
                                               type="number" name={"paid_amount"}
                                               onChange={handleOrderInput}
                                               value={props.orderSummary.paid_amount}
                                             />
                                        <div className="input-group-text"> ৳ </div>
                                    </div>
                                   </th>
                            </tr>
                            <tr>
                                <th colSpan={4} className={'text-end'}>Due Amount</th>
                                <th className={'text-end'}>{new Intl.NumberFormat('us').format(props.orderSummary.due_amount)} ৳ </th>
                            </tr>

                            <tr>
                                <th colSpan={4} className={'text-end'}>Payment Method</th>
                                <th className={'text-end'}>
                                        <select className="form-select form-select-sm text-center"
                                               name={"payment_method_id"}
                                               onChange={handleOrderInput}
                                               value={props.orderSummary.payment_method_id}  >
                                            { props.paymentMethods.map((payment_method,index)=>(
                                                    <option value={payment_method.id}>{payment_method.name}</option>
                                                ))}
                                        </select>
                                </th>
                            </tr>

                              {  props.orderSummary.payment_method_id != 1 ?
                                    <tr>
                                        <th colSpan={4} className={'text-end'}>Transaction ID</th>
                                        <td className={'text-end'}>
                                            <input className="form-control form-control-sm text-center"
                                                   type="text" name={"trans_id"}
                                                   onChange={handleOrderInput}
                                                   value={props.orderSummary.trans_id}
                                            />
                                        </td>
                                    </tr> : null
                              }
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <div className="px-4">
                <button className={'btn btn-danger'} onClick={props.onHide}>Close</button>
                    <Button onClick={handleOrderPlace} type="submit" className={'btn btn-success ms-2'} dangerouslySetInnerHTML={{__html: props.isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Confirm'}}  />
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default ShowOrderConfirmation;