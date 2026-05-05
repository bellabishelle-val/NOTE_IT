import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const WishlistIcon = () => {
  const { wishlistCount } = useCart();

  return (
    <Link to="/wishlist" className="wishlist-icon-container">
      <div className="wishlist-icon">
        ❤️
        {wishlistCount > 0 && (
          <span className="wishlist-badge">{wishlistCount}</span>
        )}
      </div>
    </Link>
  );
};

export default WishlistIcon;
