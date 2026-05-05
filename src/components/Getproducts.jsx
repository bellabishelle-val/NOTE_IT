import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import "../css/ProductCards.css";
import { useCart } from '../contexts/CartContext';

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const img_url = "https://varli.alwaysdata.net/static/images/"
  const { addToCart, addToWishlist, isInWishlist } = useCart();

  const fetchProducts = async() =>{
    try{
      setLoading(true)
      const response = await axios.get("https://varli.alwaysdata.net/api/get_products")
      setProducts(response.data)
      setLoading(false)
    }
    catch(error){
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="products-container">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="title1">| AVAILABLE STATIONERY |</h1>
          <p className="lead text-muted">Discover our premium collection of stationery essentials</p>
        </div>

        {loading && <Loader />}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <div className="row">
          {products.map((product, index) => (
            <div key={product.id} className="col-lg-4 col-md-4 col-sm-6 mb-4">
              <div className="custom-card card-animation">
                <div className="product-image-container">
                  <img 
                    src={img_url + product.product_photo} 
                    alt={product.product_name}
                    className='product_img'
                  />
                  <div className="product-overlay">
                    <button className="quick-view-btn">Quick View</button>
                  </div>
                  {product.product_cost < 50 && (
                    <div className="product-badge">Best Deal</div>
                  )}
                </div>

                <div className="card-body">
                  <h3 className="product-name">{product.product_name}</h3>
                  
                  <p className="product-description">
                    {product.product_description?.slice(0, 80)}...
                  </p>

                  <div className="product-price">${product.product_cost}</div>

                  <div className="product-actions">
                    <button
                      className="cart-btn"
                      onClick={() => addToCart(product)}
                      title="Add to Cart"
                    >
                      🛒 Add to Cart
                    </button>
                    <button
                      className={`wishlist-btn ${isInWishlist(product.id) ? 'in-wishlist' : ''}`}
                      onClick={() => addToWishlist(product)}
                      title="Add to Wishlist"
                    >
                      {isInWishlist(product.id) ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
                    </button>
                  </div>

                  <button
                    className="purchase-btn w-100"
                    onClick={() => navigate("/makepayment", { state: { product } })}
                  >
                    Purchase Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && products.length === 0 && (
          <div className="text-center py-5">
            <h3 className="text-muted">No products available at the moment</h3>
            <p className="text-muted">Check back soon for new arrivals!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Getproducts;