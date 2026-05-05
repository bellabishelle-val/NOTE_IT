import React from 'react';
import { useCart } from '../contexts/CartContext';
import '../css/Wishlist.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <div className="container text-center py-5">
          <div className="empty-wishlist-icon">❤️</div>
          <h2 className="empty-wishlist-title">Your Wishlist is Empty</h2>
          <p className="empty-wishlist-message">
            Start adding items you love to your wishlist!
          </p>
          <a href="/" className="btn btn-primary continue-shopping-btn">
            Explore Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <div className="container">
        <div className="wishlist-header">
          <h1 className="wishlist-title">My Wishlist</h1>
          <p className="wishlist-subtitle">
            You have {wishlist.length} items in your wishlist
          </p>
        </div>

        <div className="wishlist-items">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <div className="wishlist-item-image">
                <img
                  src={`https://varli.alwaysdata.net/static/images/${item.product_photo}`}
                  alt={item.product_name}
                  className="img-fluid"
                />
              </div>
              
              <div className="wishlist-item-details">
                <h3 className="wishlist-item-name">{item.product_name}</h3>
                <p className="wishlist-item-description">
                  {item.product_description?.slice(0, 120)}...
                </p>
                <p className="wishlist-item-price">${item.product_cost}</p>
              </div>

              <div className="wishlist-item-actions">
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(item)}
                >
                  🛒 Add to Cart
                </button>
                <button
                  className="remove-from-wishlist-btn"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="wishlist-footer">
          <div className="wishlist-summary">
            <p className="wishlist-count">
              Total items: {wishlist.length}
            </p>
            <p className="wishlist-total">
              Total value: ${wishlist.reduce((total, item) => total + parseFloat(item.product_cost), 0).toFixed(2)}
            </p>
          </div>
          
          <div className="wishlist-actions">
            <a href="/" className="btn btn-outline-secondary continue-shopping-btn">
              Continue Shopping
            </a>
            <button className="btn btn-primary add-all-to-cart-btn">
              Add All to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
