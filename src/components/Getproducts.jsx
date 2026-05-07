import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import "../css/ProductCards.css";
import { useCart } from '../contexts/CartContext';

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const productsPerPage = 12;
  
  const navigate = useNavigate()
  const img_url = "https://varli.alwaysdata.net/static/images/"
  const { addToCart, addToWishlist, wishlist } = useCart();
  
  // Create a Set of wishlist item IDs for quick lookup (filter out null items)
  const wishlistItemIds = new Set(
    wishlist?.filter(item => item && (item.id || item.product_id)).map(item => item.id || item.product_id) || []
  );
  
  // Local function to check if product is in wishlist
  const isProductInWishlist = (productId) => {
    return wishlistItemIds.has(productId);
  };

  const handleAddToWishlist = (product) => {
    console.log('🏠 Home page addToWishlist called with product:', product);
    console.log('🏠 Product ID type:', typeof product.product_id, 'Product ID value:', product.product_id);
    console.log('🏠 Current wishlist:', wishlist);
    console.log('🏠 isProductInWishlist result:', isProductInWishlist(product.product_id));
    
    // Create a normalized product object with id property for consistency
    const normalizedProduct = {
      ...product,
      id: product.product_id // Use product_id as id for consistency
    };
    
    addToWishlist(normalizedProduct);
  };

  const fetchProducts = async() =>{
    try{
      setLoading(true)
      const response = await axios.get("https://varli.alwaysdata.net/api/get_products")
      console.log('🏠 Response from API:', response);
      setProducts(response.data)
      setLoading(false)
    }
    catch(error){
      setLoading(false)
      setError(error.message)
    }
  }

  // Search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Sort functionality
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Filter and sort products
  useEffect(() => {
    let filtered = products.filter(product =>
      product.product_name?.toLowerCase().includes(searchTerm) ||
      product.product_description?.toLowerCase().includes(searchTerm)
    );

    // Sort products
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.product_name || '';
          bValue = b.product_name || '';
          break;
        case 'price':
          aValue = parseFloat(a.product_cost) || 0;
          bValue = parseFloat(b.product_cost) || 0;
          break;
        default:
          aValue = a.product_name || '';
          bValue = b.product_name || '';
      }

      if (typeof aValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, sortBy, sortOrder]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

        {/* Search and Sort Controls */}
        <div className="search-sort-controls mb-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="🔍 Search products..."
                  value={searchTerm}
                  onChange={handleSearch}
                  style={{
                    fontFamily: 'Bookman Old Style, serif',
                    fontSize: '1rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '2px solid #e9ecef',
                    width: '100%',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="sort-controls">
                <label className="sort-label" style={{ fontFamily: 'Bookman Old Style, serif', marginRight: '1rem' }}>SORT BY:</label>
                <button
                  className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
                  onClick={() => handleSort('name')}
                  style={{
                    fontFamily: 'Bookman Old Style, serif',
                    padding: '0.5rem 1rem',
                    margin: '0 0.25rem',
                    borderRadius: '8px',
                    border: '2px solid #e9ecef',
                    background: sortBy === 'name' ? '#6366f1' : 'white',
                    color: sortBy === 'name' ? 'white' : '#495057',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontSize: '0.9rem'
                  }}
                >
                  NAME {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <button
                  className={`sort-btn ${sortBy === 'price' ? 'active' : ''}`}
                  onClick={() => handleSort('price')}
                  style={{
                    fontFamily: 'Bookman Old Style, serif',
                    padding: '0.5rem 1rem',
                    margin: '0 0.25rem',
                    borderRadius: '8px',
                    border: '2px solid #e9ecef',
                    background: sortBy === 'price' ? '#6366f1' : 'white',
                    color: sortBy === 'price' ? 'white' : '#495057',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontSize: '0.9rem'
                  }}
                >
                  PRICE {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {loading && <Loader />}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Results count */}
        {!loading && !error && (
          <div className="results-count mb-3" style={{ fontFamily: 'Bookman Old Style, serif', color: '#6c757d' }}>
            Showing {currentProducts.length} of {filteredProducts.length} products
            {searchTerm && ` for "${searchTerm}"`}
          </div>
        )}

        <div className="row">
          {currentProducts.map((product, index) => (
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
                      className={`wishlist-btn ${isProductInWishlist(product.product_id) ? 'in-wishlist' : ''}`}
                      onClick={() => handleAddToWishlist(product)}
                      title="Add to Wishlist"
                    >
                      {isProductInWishlist(product.product_id) ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
                    </button>
                  </div>

                  <div className="purchase-button-container">
                    <button
                      className="purchase-btn"
                      onClick={() => navigate("/makepayment", { state: { product } })}
                      style={{
                        fontSize: "1rem",
                        fontFamily: '"Bookman Old Style", serif',
                        padding: "0.6rem 1.2rem",
                        background: "linear-gradient(135deg, #ff6b9d, #c44569)",
                        border: "none",
                        borderRadius: "10px",
                        color: "white",
                        fontWeight: "400",
                        letterSpacing: "0.5px",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 15px rgba(255, 107, 157, 0.3)",
                        width: "auto",
                        minWidth: "150px"
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 8px 25px rgba(255, 107, 157, 0.4)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 4px 15px rgba(255, 107, 157, 0.3)";
                      }}
                    >
                      PURCHASE NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {!loading && filteredProducts.length > productsPerPage && (
          <div className="pagination-container mt-5">
            <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  fontFamily: 'Bookman Old Style, serif',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: '2px solid #e9ecef',
                  background: currentPage === 1 ? '#f8f9fa' : '#6366f1',
                  color: currentPage === 1 ? '#6c757d' : 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.9rem',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                PREVIOUS
              </button>
              
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    style={{
                      fontFamily: 'Bookman Old Style, serif',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '8px',
                      border: '2px solid #e9ecef',
                      background: currentPage === pageNumber ? '#6366f1' : 'white',
                      color: currentPage === pageNumber ? 'white' : '#495057',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontSize: '0.9rem',
                      minWidth: '40px'
                    }}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  fontFamily: 'Bookman Old Style, serif',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: '2px solid #e9ecef',
                  background: currentPage === totalPages ? '#f8f9fa' : '#6366f1',
                  color: currentPage === totalPages ? '#6c757d' : 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.9rem',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
              >
                NEXT
              </button>
            </div>
            
            <div className="pagination-info text-center mt-3" style={{ fontFamily: 'Bookman Old Style, serif', color: '#6c757d', fontSize: '0.9rem' }}>
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <h3 className="text-muted">
              {searchTerm ? `No products found for "${searchTerm}"` : 'No products available at the moment'}
            </h3>
            <p className="text-muted">
              {searchTerm ? 'Try searching with different keywords' : 'Check back soon for new arrivals!'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Getproducts;