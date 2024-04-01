import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../partials/Breadcrumb";
import CardHeader from "../../partials/CardHeader";
import axios from "axios";
import Constants from "../../../Constants";
import {Link, useNavigate} from "react-router-dom";
import ShowOrderConfirmation from "./ShowOrderConfirmation";
import Swal from "sweetalert2";

const CreateOrder = () => {
    const [input , setInput] = useState({
        'status' : 1,
        'direction':'desc',
        'per_page':'10',
        'search':'',
    });

    const [customerInput , setCustomerInput] = useState('');
    const [customers , setCustomers] = useState([]);
    const [paymentMethods , setPaymentMethods] = useState([]);
    const [modalOrderShow, setModalOrderShow] = React.useState(false);

    const [products , setProducts] = useState([]);
    const [itemsCountPerPage,setItemsCountPerPage] = useState(0);
    const [totalItemsCount,setTotalItemsCount] = useState(1);
    const [startFrom,setStartFrom] = useState(1);
    const [activePage,setActivePage] = useState(1);
    const [errors , setErrors] = useState([]);
    const [isLoading , setIsloading] = useState(false);
    const navigate = useNavigate();

    const [orderSummary , setOrderSummary] = useState({
        items:0,
        amount:0,
        discount:0,
        payable_amount:0,
        customer:'',
        customer_id:0,
        paid_amount:0,
        due_amount:0,
        payment_method_id:1,
        trans_id:'',
    });
    const [order,setOrder] = useState({})
    const [carts , setCarts] = useState({});



    const getPaymentMethodsData = ()=>{
        axios.get(`${Constants.BASE_URL}/get-payment-methods-data`)
            .then(res=> {
                setPaymentMethods(res.data);
                setIsloading(false);
            }).catch(errors =>{
            setIsloading(false);
        });
    }
    const handleInput = (e)=>{
        setInput(prevState => ({...prevState,[e.target.name] : e.target.value }));
    }

    const handleCustomerInput = (e)=>{
      setCustomerInput(e.target.value);
    }
    const customerSelect = (customer)=>{
        setOrder(prevState => ({...prevState,customer_id : customer.id }));
        setOrderSummary(prevState => ({...prevState,customer: customer.name + '-'+customer.phone }));
        setOrderSummary(prevState => ({...prevState,customer_id: customer.id}));
    }


    const getCustomerData = ()=>{
        axios.get(`${Constants.BASE_URL}/get-all-customer?search=${customerInput}`)
            .then(res=> {
                setCustomers(res.data);
                setIsloading(false);
            }).catch(errors =>{
            setIsloading(false);
        });
    }

  const handleIncrement=(id)=>{
        if (carts[id].stock > carts[id].quantity) {
            setCarts(prevState => (
                {
                    ...prevState,
                    [id]: {
                        ...prevState[id], quantity: carts[id].quantity + 1
                    } }
            ));
        }
  }

    const handleDecrement=(id)=>{
        if (carts[id].quantity > 1) {
            setCarts(prevState => (
                {
                    ...prevState,
                    [id]: {
                        ...prevState[id], quantity: carts[id].quantity - 1
                    } }
            ));
        }

    }


    const handleCart = (id)=>{
       products.map((product,index)=>{
           if (product.id == id){
               if (carts[id]== undefined){
                   setCarts(prevState => ({...prevState,[id] : product }));
                   setCarts(prevState => (
                       {...prevState,
                           [id] : {
                               ...prevState[id],quantity:1
                           }
                       }
                   ));
               }else{
                   if (carts[id].stock > carts[id].quantity) {
                       setCarts(prevState => (
                           {
                               ...prevState,
                               [id]: {
                                   ...prevState[id], quantity: carts[id].quantity + 1
                               } }
                       ));
                   }
               }

           }
       })
    }
    const handleRemoveCart = (id)=>{
   setCarts(current =>{
       const copy = {...current};
       delete copy[id];
       return copy;
   })
    }


    const getProductData =(pageNumber=1)=>{
        setIsloading(true);
        axios.get(`${Constants.BASE_URL}/product?page=${pageNumber}&search=${input.search}&status=${input.status}&direction=${input.direction}&per_page=${input.per_page}`)
            .then(res=> {
                setProducts(res.data.data);
                setItemsCountPerPage(res.data.meta.per_page);
                setTotalItemsCount(res.data.meta.total);
                setStartFrom(res.data.meta.from);
                setActivePage(res.data.meta.current_page);
                setIsloading(false);
            }).catch(errors =>{
            setIsloading(false);
        });
    }

    const calculateOrderSummary = ()=>{
        let items =  0;
        let amount = 0;
        let discount= 0;
        let payable_amount = 0;
        let paid_amount = 0;
        Object.keys(carts).map((key)=>{
            amount += carts[key].original_price * carts[key].quantity;
            discount += carts[key].selling_price.discount * carts[key].quantity;
            payable_amount +=carts[key].selling_price.price * carts[key].quantity;
            items += carts[key].quantity;
        })
        setOrderSummary(prevState => ({...prevState,
            items:items,
            amount:amount,
            discount:discount,
            payable_amount:payable_amount,
            paid_amount:payable_amount,
        }))
    }

    const handleOrderInput=(e)=>{
        if (e.target.name == 'paid_amount' && orderSummary.payable_amount >= e.target.value){
            setOrderSummary(prevState => ({...prevState,
                paid_amount:e.target.value,
                due_amount:orderSummary.payable_amount-e.target.value,
            }))
        }else if(e.target.name == 'payment_method_id'){
            setOrderSummary(prevState => ({...prevState,
                payment_method_id:e.target.value,
            }))
            if(e.target.value == 1){
                setOrderSummary(prevState => ({...prevState,
                    trans_id:'',
                })) }
        }else if(e.target.name == 'trans_id'){
            setOrderSummary(prevState => ({...prevState,
                trans_id:e.target.value,

            }))
        }
    }

    const handleOrderPlace = ()=>{
        setIsloading(true);
        axios.post(`${Constants.BASE_URL}/order`,{carts:carts,'order_summary':orderSummary})
            .then(res=> {
                setIsloading(false);
                Swal.fire({
                    position: 'top-end',
                    icon: res.data.cls,
                    title: res.data.msg,
                    showConfirmButton: false,
                    toast:true,
                    timer: 1500
                })
                if (res.data.flag != undefined){
                    setModalOrderShow(false)
                    navigate(`/order/details/${res.data.order_id}`);
                }

            }).catch(errors =>{
            setIsloading(false);
        });
    }


    useEffect(()=>{
        getProductData();
        getPaymentMethodsData();
    },[])

    useEffect(()=>{
       calculateOrderSummary()
    },[carts])

    return (
        <>
            <Breadcrumb title={"Create Order"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <CardHeader title={'Create Order'} link={'/order'} button_text={'Order List'} icon={'fa-list'} />
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Product List</h5>
                                    </div>
                                    <div className="card-body">

                                        <div className="product-search-area mb-2">
                                            <div className="input-group">
                                                <input className="form-control form-control-sm"
                                                       type="search" name={"search"} onChange={handleInput} value={input.search} placeholder={"search...  "} />
                                                <button onClick={getProductData} className={'input-group-text text-bg-primary'}><i className="fa-solid fa-search"></i></button>
                                            </div>
                                        </div>

                                        {
                                            products && products.map((product,index)=>(
                                                <div className="d-flex align-items-center py-2 border-bottom position-relative product-container" key={index}>
                                                    <div className="flex-shrink-0">
                                                        <img className={'img-thumbnail'} style={{ width:"50px"}} src={product.photo} alt="image"/>
                                                    </div>
                                                    <div className="details-area" style={{position:"absolute",left:"2px",bottom:"0px" }}>
                                                        <Link target={"_blank"} to={`/product/view/${product.id}`}>  <button className={'btn btn-sm btn-info ms-1'}><i className="fa-solid fa-eye"></i></button></Link>
                                                        <button  onClick={()=>handleCart(product.id)} className={'btn btn-sm btn-success mx-1'}><i className="fa-solid fa-plus"></i></button>
                                                    </div>
                                                    <div className="flex-grow-1 ms-4">
                                                       <p> <strong>{product.name} </strong><br/>
                                                        <small>original Price</small> : {product.price} <br/>
                                                       <small> Price: {product.selling_price.price} {product.selling_price.symbol} | Discount :  {product.selling_price.discount} {product.selling_price.symbol}</small> <br/>
                                                       <small> SKU : {product.sku}  | Stock : {product.stock}</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Cart</h5>
                                    </div>
                                    <div className="card-body">
                                        {Object.keys(carts).map((key)=>(
                                            <div className="d-flex align-items-center p-2 border-bottom position-relative product-container" key={key}>
                                                <div className="flex-shrink-0">
                                                    <img className={'img-thumbnail'} style={{ width:"50px"}} src={carts[key].photo} alt="image"/>
                                                </div>
                                                <div className="details-area" style={{position:"absolute",left:"2px",bottom:"0px" }}>

                                                    <Link target={"_blank"} to={`/product/view/${carts[key].id}`}>  <button className={'btn btn-sm btn-info ms-1'}><i className="fa-solid fa-eye"></i></button></Link>
                                                    <button  onClick={()=>handleRemoveCart(key)} className={'btn btn-sm btn-danger mx-1'}><i className="fa-solid fa-times"></i></button>
                                                </div>
                                                <div className="flex-grow-1 ms-4">
                                                    <p> <strong>{carts[key].name} </strong><br/>
                                                        <small>original Price</small> : {carts[key].price} <br/>
                                                        <small> Price: {carts[key].selling_price.price} {carts[key].selling_price.symbol} | Discount :  {carts[key].selling_price.discount} {carts[key].selling_price.symbol}</small> <br/>
                                                        <small> SKU : {carts[key].sku}  | Stock : {carts[key].stock}</small>

                                                      <br/><span> <strong>Quantity :</strong>
                                                            <button onClick={()=>handleDecrement(carts[key].id)} disabled={carts[key].quantity <= 1} className={'quantity-button'}>-</button>
                                                            <span>{carts[key].quantity}</span>
                                                            <button onClick={()=>handleIncrement(carts[key].id)} disabled={carts[key].stock <= carts[key].quantity} className={'quantity-button'}>+</button>

                                                       </span>

                                                    </p>

                                                </div>
                                            </div>
                                        ))}
                                        <br/>

                                        <div className="order-summary my-2">
                                            <div className="card-header">
                                                <h4> <strong>Order Summary</strong></h4>
                                            </div>
                                            <div>
                                                <p><strong>Customer : {orderSummary.customer}</strong></p>
                                            </div>
                                            <table className={'table-sm table table-responsive table-hover table-striped table-bordered'}>
                                                <thead>
                                                <tr>
                                                    <th>Total Items</th>
                                                    <td> {orderSummary.items}</td>
                                                </tr>
                                                <tr>
                                                    <th>Amount</th>
                                                    <td> {orderSummary.amount}৳</td>
                                                </tr>
                                                <tr>
                                                    <th>Discount</th>
                                                    <td> {orderSummary.discount}৳</td>
                                                </tr>
                                                <tr>
                                                    <th>Net Amount</th>
                                                    <th> <strong>{orderSummary.payable_amount}৳</strong> </th>
                                                </tr>
                                                </thead>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Customer List</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="input-group">
                                            <input className="form-control form-control-sm"
                                                   type="search" name={"search"} onChange={handleCustomerInput} value={customerInput} placeholder={"Customer search...  "} />
                                            <button onClick={getCustomerData} className={'input-group-text text-bg-primary'}><i className="fa-solid fa-search"></i></button>
                                        </div>

                                         <ul style={{ marginTop:"5px" }}>
                                            { customers && customers.map((customer)=>(
                                                <li className={orderSummary.customer_id == customer.id ? "text-bg-primary px-2 product-container" : "product-container px-2"} onClick={()=>customerSelect(customer)} style={{listStyle:"none",borderBottom:"1px solid silver", padding:"3px 0", cursor:"pointer"}} key={customer.id}> {customer.name} - {customer.phone}</li>
                                            ))}
                                         </ul>
                                    </div>
                                </div>
                                <br/>
                                <div className="d-grid">
                                    <button disabled={orderSummary.items == 0 || orderSummary.customer_id == 0} onClick={()=>setModalOrderShow(true)} className={"btn btn-primary"}>Place Order</button>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <ShowOrderConfirmation
                show={modalOrderShow}
                onHide={() => setModalOrderShow(false)}
                orderSummary = {orderSummary}
                carts = {carts}
                handleOrderPlace = {handleOrderPlace}
                isLoading = {isLoading}
                handleOrderInput = {handleOrderInput}
                paymentMethods = {paymentMethods}
            />
        </>
    );
};

export default CreateOrder;