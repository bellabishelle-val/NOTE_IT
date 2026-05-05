import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import "../css/Payment.css";
const Makepayment = () => {

    // destructure the details passed from the Cart or Getproducts component
    // the useLocation hook allows us to get/destructure the properties passed from the previous component
    const {product, cart, total} = useLocation().state || {}
    
    // Determine if this is a cart checkout or single product purchase
    const isCartCheckout = cart && Array.isArray(cart);

    // console.log(product)

    const navigate = useNavigate()

    // below we specify the image base URL
  const img_url = "https://varli.alwaysdata.net/static/images/"


  // initialize hooks to manage state of your application
  const [number, setNumber] = useState("")
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // create a function that will handle the submit action
  const handleSubmit = async (e) =>{
    // prevent site from reloading
    e.preventDefault()

    // update loading hook
    setLoading(true)

    try{
        // create a form data object
        const formdata = new FormData()

        // append the data to the formdata
        formdata.append("phone", number)
        // Use cart total for cart checkout, or product cost for single item
        const amount = isCartCheckout ? total : product.product_cost
        formdata.append("amount", amount)

        const response = await axios.post("https://varli.alwaysdata.net/api/mpesa_payment", formdata)

        // update the success hook with the message
        setSuccess(response.data.message)
    }
    catch(error){
        // if there is an error respond t error
        setLoading(false)

        // update error hook with error message
        setError(error.message)
    }
  }
  

  return ( 
    
    <div className='row justify-content-center'>
        {/* <button className="btn btn-outline-info">Back to Products</button> */}
        <div className="col-md-1 ">
            <input type="button"
            className="btn btn-outline-danger BTN"
            value="<- BACK TO HOME"
            onClick={() => navigate("/")} />
        </div> <br /> <br />

        <h1 className="title1">Make Payment - Lipa na Mpesa</h1> <br /> <br /> 

        <div className="col-md-4 card shadow p-4 custom-card payment-card">
            {isCartCheckout ? (
                // Cart checkout display
                <div className='card-body'>
                    <h2 className="pn">Cart Checkout</h2> <br />
                    <div className="cart-summary-payment">
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item-payment">
                                <p className="item-name">{item.product_name} x {item.quantity}</p>
                                <p className="item-price">${(item.product_cost * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                        <hr />
                        <h3 className="pc"> Total: $ {total.toFixed(2)} </h3> <br />
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/* bind the loading hook */}
                        {loading && <Loader/>}
                        <h3 className='text-success'>{success}</h3>
                        <h4 className='text-danger'>{error}</h4>
                        <input type="number"
                        className='form-control mb-5 p-3'
                        placeholder='Enter the phone number 254XXXXXXXXX'
                        style={{ fontSize: '1.4rem', borderRadius: '15px', border: '1px solid #264361', fontFamily: '"Roboto", sans-serif', color: '#333' }}
                        required
                        value={number}
                        onChange = {(e) => setNumber(e.target.value)} /> <br />
                        <input type="submit"
                        value="PURCHASE"
                        className='btn btn-outline-danger BTN' 
                        style={{
        fontSize: "25px",
        fontFamily: "'Goudy Old Style', Garamond, 'Times New Roman', serif",
        padding: "0.5rem 1rem", 
      }} />
                    </form>
                </div>
            ) : (
                // Single product display
                <>
                    <img src={img_url + product.product_photo} alt="Product" className='product_img'/>
                    <div className='card-body'>
                        <h2 className="pn">{product.product_name}</h2> <br /> 
                        <h4 className='pd'>{product.product_description}</h4> <br />
                        <h3 className="pc"> $ {product.product_cost} </h3> <br />
                        <form onSubmit={handleSubmit}>
                            {/* bind the loading hook */}
                            {loading && <Loader/>}
                            <h3 className='text-success'>{success}</h3>
                            <h4 className='text-danger'>{error}</h4>
                            <input type="number"
                            className='form-control mb-5 p-3'
                            placeholder='Enter the phone number 254XXXXXXXXX'
                            style={{ fontSize: '1.4rem', borderRadius: '15px', border: '1px solid #264361', fontFamily: '"Roboto", sans-serif', color: '#333' }}
                            required
                            value={number}
                            onChange = {(e) => setNumber(e.target.value)} /> <br />
                            <input type="submit"
                            value="PURCHASE"
                            className='btn btn-outline-danger BTN' 
                            style={{
            fontSize: "25px",
            fontFamily: '"Goudy Old Style", Garamond, "Times New Roman", serif',
            padding: "0.5rem 1rem", 
          }} />
                        </form>
                    </div>
                </>
            )}
        </div>
    </div>
  )
}

export default Makepayment