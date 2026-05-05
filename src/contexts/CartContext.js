import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedWishlist) {
      const parsedWishlist = JSON.parse(savedWishlist);
      // Filter out null/undefined items from wishlist
      const cleanedWishlist = parsedWishlist.filter(item => item && item.id);
      setWishlist(cleanedWishlist);
    }
  }, []);

  // Update localStorage and counts when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  }, [cart]);

  // Update localStorage and counts when wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    setWishlistCount(wishlist.length);
  }, [wishlist]);

  // Add item to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Add to wishlist
  const addToWishlist = (product) => {
    console.log('🛒 addToWishlist called with:', product);
    console.log('🛒 Current wishlist before:', wishlist);
    
    // Prevent null or undefined products from being added
    if (!product || !product.id) {
      console.log('🛒 Invalid product, not adding to wishlist');
      return;
    }
    
    const exists = wishlist.find(item => item.id === product.id);
    console.log('🛒 Product exists in wishlist:', exists);
    if (!exists) {
      setWishlist(prev => {
        console.log('🛒 Adding to wishlist, new state:', [...prev, product]);
        return [...prev, product];
      });
    } else {
      console.log('🛒 Product already in wishlist, not adding');
    }
  };

  // Remove from wishlist
  const removeFromWishlist = (productId) => {
    console.log('🗑️ removeFromWishlist called with:', productId);
    setWishlist(prev => {
      console.log('🗑️ Removing from wishlist, new state:', prev.filter(item => item.id !== productId));
      return prev.filter(item => item.id !== productId);
    });
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    console.log('🔍 isInWishlist called with:', productId, 'current wishlist:', wishlist);
    if (!wishlist || !Array.isArray(wishlist)) {
      console.log('🔍 Wishlist is not an array or is empty, returning false');
      return false;
    }
    const result = wishlist.some(item => {
      console.log('🔍 Comparing item.id:', item.id, 'with productId:', productId, 'result:', item.id === productId);
      return item.id === productId;
    });
    console.log('🔍 isInWishlist result:', result);
    return result;
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.product_cost * item.quantity), 0);

  const value = {
    cart,
    wishlist,
    cartCount,
    wishlistCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    cartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
