import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import "../css/CardEffects.css";
import { useLocation } from "react-router-dom";
import makepayment from "./Makepayment.jsx";


const Getproducts = () => {

  // initilaize hooks to help manage the state of your application
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // declare the navigate hook
  const navigate = useNavigate()

  const { state } = useLocation();

  // below we specify the image base URL
  const img_url = "https://varli.alwaysdata.net/static/images/"

  // create a function to help you fetch the product from ur API
  const fetchProducts = async() =>{
    try{
      // 4. update the loading hook
      setLoading(true)

      // 5. interact with endpoint for fetching the products
      const response = await axios.get("https://varli.alwaysdata.net/api/get_products")

      // 6. update products hook with response given from the API
      setProducts(response.data)

      // 7. set loading hook back to default
      setLoading(false)
    }
    catch(error){
      // if there is an error
      // set loading hook back ot default
      setLoading(false)

      //update the error hook with a message
      setError(error.message)
    }
  }

  // we shall use the useEffect hook. it enables us to automatically re-render new features in case of any changes
  useEffect(() => {
    fetchProducts()
  }, [])

  // console.log(products)


  return (
  <div
    style={{
      backgroundImage: "url('/images/stat.png')",
      backgroundSize: "cover",
      minHeight: "100vh"
    }}
  >
    <div className='row'>
      <br /> <br />
      <h1 className=" title1 mt-5"> | AVAILABLE STATIONERY |</h1> <br />

      {loading && <Loader />}
      <h4 className="text-danger">{error}</h4>

      {products.map((product) => (
        <div key={product.id} className="col-md-3 justify-content-center mb-3">
          <div className="card shadow custom-card">
            <img 
              src={img_url + product.product_photo} 
              alt="product image"
              className='product_img mt-3'
            />

            <div className="card-body">
              <h2 className="pn"> ~{product.product_name}~ </h2> <br />

              <h5 className="text-left pd">
                {product.product_description?.slice(0, 80)}...
              </h5> <br />

              <h2 className="pc"> $ {product.product_cost} </h2> <br />

              <button
                className="btn btn-outline-success BTN"
                onClick={() => navigate("/makepayment", { state: { product } })}
                style={{
    fontSize: "25px",
    fontFamily: "'Goudy Old Style', Garamond, 'Times New Roman', serif",
    padding: "0.4rem 1rem"
  }}
              >
                PURCHASE NOW
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)
}
export default Getproducts;