import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity));
  };

  const handleCheckout = () => {
    // Navigate to payment page with cart data
    navigate('/makepayment', { state: { cart: cart, total: cartTotal * 1.1 } });
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container text-center py-5">
          <div className="empty-cart-icon">🛒</div>
          <h2 className="empty-cart-title">Your Cart is Empty</h2>
          <p className="empty-cart-message">
            Looks like you haven't added any items to your cart yet.
          </p>
          <a href="/" className="btn btn-primary continue-shopping-btn">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="container">
        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-subtitle">
            You have {cart.reduce((total, item) => total + item.quantity, 0)} items in your cart
          </p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img
                    src={`https://varli.alwaysdata.net/static/images/${item.product_photo}`}
                    alt={item.product_name}
                    className="img-fluid"
                  />
                </div>
                
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.product_name}</h3>
                  <p className="cart-item-description">
                    {item.product_description?.slice(0, 100)}...
                  </p>
                  <p className="cart-item-price">${item.product_cost}</p>
                </div>

                <div className="cart-item-quantity">
                  <label className="quantity-label">Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="quantity-input"
                      min="1"
                    />
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-total">
                  <p className="item-total-price">
                    ${(item.product_cost * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="remove-item-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3 className="summary-title">Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              
              <div className="summary-row">
                <span>Tax:</span>
                <span>${(cartTotal * 0.1).toFixed(2)}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total-row">
                <span>Total:</span>
                <span>${(cartTotal * 1.1).toFixed(2)}</span>
              </div>

              <div className="summary-actions">
                <button className="btn btn-outline-secondary clear-cart-btn" onClick={clearCart}>
                  Clear Cart
                </button>
                <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>

              <div className="continue-shopping">
                <a href="/" className="continue-shopping-link">
                  ← Continue Shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
