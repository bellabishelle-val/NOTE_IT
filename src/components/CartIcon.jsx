import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const CartIcon = () => {
  const { cartCount } = useCart();

  return (
    <Link to="/cart" className="cart-icon-container">
      <div className="cart-icon">
        🛒
        {cartCount > 0 && (
          <span className="cart-badge">{cartCount}</span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;
