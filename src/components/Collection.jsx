import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import '../css/Collection.css';


const Collection = () => {
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Collections', icon: '📚' },
    { id: 'books', name: 'Books & Journals', icon: '📖' },
    { id: 'stationery', name: 'Stationery', icon: '✏️' },
    { id: 'printing', name: 'Printing Services', icon: '🖨️' }
  ];

  const products = [
    // Books & Journals
    {
      id: 'bk-jnl1',
      category: 'books',
      name: 'Premium Journal',
      description: 'Capture your thoughts and plans with our exquisite range of journals',
      price: 24.99,
      image: `${process.env.PUBLIC_URL}/images/collection/bk-jnl1.webp`,
      badge: 'Best Seller'
    },
    {
      id: 'bk-jnl2',
      category: 'books',
      name: 'Creative Notebook',
      description: 'Designed for every need and creative expression',
      price: 19.99,
      image: `${process.env.PUBLIC_URL}/images/collection/bk-jnl2.webp`,
      badge: 'New'
    },
    {
      id: 'bk-jnl3',
      category: 'books',
      name: 'Artistic Journal',
      description: 'Express your creativity with our artistic journal collection',
      price: 29.99,
      image: `${process.env.PUBLIC_URL}/images/collection/bk-jnl3.webp`
    },
    {
      id: 'bk-card1',
      category: 'books',
      name: 'Year Planner',
      description: 'Plan your year with style and organization',
      price: 34.99,
      image: `${process.env.PUBLIC_URL}/images/collection/bk-card1.webp`,
      badge: 'Popular'
    },
    {
      id: 'bk-card2',
      category: 'books',
      name: 'Study Cards',
      description: 'Perfect for studying and memorization',
      price: 14.99,
      image: `${process.env.PUBLIC_URL}/images/collection/bk-card2.webp`,
      badge: ''
    },
    {
      id: 'bk-card3',
      category: 'books',
      name: 'Creative Cards',
      description: 'Unleash your creativity with our card sets',
      price: 16.99,
      image: `${process.env.PUBLIC_URL}/images/collection/bk-card3.webp`
    },

    // Stationery
    {
      id: 'stat-pr1',
      category: 'stationery',
      name: 'Professional Notebook',
      description: 'High-quality notebook for professionals',
      price: 22.99,
      image: `${process.env.PUBLIC_URL}/images/collection/stat-pr1.jpg`,
      badge: 'Premium'
    },
    {
      id: 'stat-pr2',
      category: 'stationery',
      name: 'Elegant Pen Set',
      description: 'Complete writing set for the discerning user',
      price: 45.99,
      image: `${process.env.PUBLIC_URL}/images/collection/stat-pr2.jpg`,
      badge: 'Luxury'
    },
    {
      id: 'stat-pr3',
      category: 'stationery',
      name: 'Desk Organizer',
      description: 'Keep your workspace tidy and organized',
      price: 32.99,
      image: `${process.env.PUBLIC_URL}/images/collection/stat-pr3.jpg`
    },
    {
      id: 'stat-pr4',
      category: 'stationery',
      name: 'Creative Kit',
      description: 'Everything you need for creative expression',
      price: 39.99,
      image: `${process.env.PUBLIC_URL}/images/collection/stat-pr4.jpg`,
      badge: 'Complete Set'
    },
    {
      id: 'kit1',
      category: 'stationery',
      name: 'Student Kit',
      description: 'Perfect kit for students of all ages',
      price: 28.99,
      image: `${process.env.PUBLIC_URL}/images/collection/kit1.webp`
    },
    {
      id: 'kit2',
      category: 'stationery',
      name: 'Artist Kit',
      description: 'Professional kit for artists and designers',
      price: 52.99,
      image: `${process.env.PUBLIC_URL}/images/collection/kit2.webp`,
      badge: 'Professional'
    },
    {
      id: 'kit3',
      category: 'stationery',
      name: 'Office Kit',
      description: 'Complete office stationery solution',
      price: 41.99,
      image: `${process.env.PUBLIC_URL}/images/collection/kit3.webp`
    },

    // Printing Services
    {
      id: 'print1',
      category: 'printing',
      name: 'Custom Business Cards',
      description: 'Professional business card printing service',
      price: 89.99,
      image: `${process.env.PUBLIC_URL}/images/collection/print1.webp`,
      badge: 'Service'
    },
    {
      id: 'print2',
      category: 'printing',
      name: 'Poster Printing',
      description: 'High-quality poster and banner printing',
      price: 124.99,
      image: `${process.env.PUBLIC_URL}/images/collection/print2.webp`,
      badge: 'Service'
    },
    {
      id: 'print3',
      category: 'printing',
      name: 'Custom Stationery',
      description: 'Personalized stationery printing service',
      price: 149.99,
      image: `${process.env.PUBLIC_URL}/images/collection/print3.webp`,
      badge: 'Premium Service'
    }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
  };

  return (
    <div className="collection-container">
      {/* Hero Section */}
      <section className="collection-hero" style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/collection/bgi.png)`,
        backgroundColor: '#f8f9fa'
      }}>
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Explore Our Complete Collection</h1>
            <p className="hero-subtitle">
              Discover our comprehensive range of books, stationery, and printing services designed to meet your every need
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="category-filter">
        <div className="container">
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="filter-icon">{category.icon}</span>
                <span className="filter-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          <div className="row">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-lg-4 col-md-6 col-sm-6 mb-4">
                <div className="collection-card">
                  <div className="card-image-container">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="card-image"
                      onError={(e) => {
                        console.log('Image failed to load:', product.image);
                        e.target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
                      }}
                    />
                    {product.badge && (
                      <div className="product-badge">{product.badge}</div>
                    )}
                  </div>
                  <div className="card-body">
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price">${product.price}</div>
                    <div className="product-actions">
                      <button
                        className="cart-btn"
                        onClick={() => handleAddToCart(product)}
                        title="Add to Cart"
                      >
                        🛒 Add to Cart
                      </button>
                      <button
                        className={`wishlist-btn ${isInWishlist(product.id) ? 'in-wishlist' : ''}`}
                        onClick={() => handleAddToWishlist(product)}
                        title="Add to Wishlist"
                      >
                        {isInWishlist(product.id) ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="featured-sections">
        <div className="container">
          <div className="row">
            {/* Books Section */}
            <div className="col-lg-4">
              <div className="featured-card">
                <img 
                  src={`${process.env.PUBLIC_URL}/images/collection/book.jpg`} 
                  alt="Books Collection" 
                  className="featured-image"
                  onError={(e) => {
                    console.log('Featured image failed to load:', 'book.jpg');
                    e.target.src = 'https://via.placeholder.com/400x300?text=Books+Collection';
                  }}
                />
                <div className="featured-content">
                  <h3>Books & Journals</h3>
                  <p>Explore our curated collection of journals and books designed for every writer and reader.</p>
                  <button 
                    className="featured-btn"
                    onClick={() => setActiveCategory('books')}
                  >
                    Explore Books
                  </button>
                </div>
              </div>
            </div>

            {/* Stationery Section */}
            <div className="col-lg-4">
              <div className="featured-card">
                <img 
                  src={`${process.env.PUBLIC_URL}/images/collection/stat.jpg`} 
                  alt="Stationery Collection" 
                  className="featured-image"
                  onError={(e) => {
                    console.log('Featured image failed to load:', 'stat.jpg');
                    e.target.src = 'https://via.placeholder.com/400x300?text=Stationery+Collection';
                  }}
                />
                <div className="featured-content">
                  <h3>Premium Stationery</h3>
                  <p>Discover high-quality stationery that combines functionality with elegant design.</p>
                  <button 
                    className="featured-btn"
                    onClick={() => setActiveCategory('stationery')}
                  >
                    Explore Stationery
                  </button>
                </div>
              </div>
            </div>

            {/* Printing Section */}
            <div className="col-lg-4">
              <div className="featured-card">
                <img 
                  src={`${process.env.PUBLIC_URL}/images/collection/printaa.jpg`} 
                  alt="Printing Services" 
                  className="featured-image"
                  onError={(e) => {
                    console.log('Featured image failed to load:', 'printaa.jpg');
                    e.target.src = 'https://via.placeholder.com/400x300?text=Printing+Services';
                  }}
                />
                <div className="featured-content">
                  <h3>Printing Services</h3>
                  <p>Professional printing solutions tailored to your specific needs and requirements.</p>
                  <button 
                    className="featured-btn"
                    onClick={() => setActiveCategory('printing')}
                  >
                    Explore Services
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Showcase */}
      <section className="customer-showcase">
        <div className="container">
          <h2 className="showcase-title">Customer Favorites</h2>
          <div className="row">
            <div className="col-lg-4">
              <img 
                src={`${process.env.PUBLIC_URL}/images/collection/showcar1.webp`} 
                alt="Customer Work 1" 
                className="showcase-image"
                onError={(e) => {
                  console.log('Showcase image failed to load:', 'showcar1.webp');
                  e.target.src = 'https://via.placeholder.com/400x300?text=Customer+Work+1';
                }}
              />
            </div>
            <div className="col-lg-4">
              <img 
                src={`${process.env.PUBLIC_URL}/images/collection/showcar2.webp`} 
                alt="Customer Work 2" 
                className="showcase-image"
                onError={(e) => {
                  console.log('Showcase image failed to load:', 'showcar2.webp');
                  e.target.src = 'https://via.placeholder.com/400x300?text=Customer+Work+2';
                }}
              />
            </div>
            <div className="col-lg-4">
              <img 
                src={`${process.env.PUBLIC_URL}/images/collection/showcar3.webp`} 
                alt="Customer Work 3" 
                className="showcase-image"
                onError={(e) => {
                  console.log('Showcase image failed to load:', 'showcar3.webp');
                  e.target.src = 'https://via.placeholder.com/400x300?text=Customer+Work+3';
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collection;
