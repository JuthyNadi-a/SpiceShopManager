import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ProductDetail = ({ products, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
    }
    
    setLoading(false);
  }, [id, products]);
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="alert alert-danger">
        <h4>Product not found!</h4>
        <p>Sorry, the product you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  // Generate stars based on rating
  const stars = Array.from({ length: 5 }, (_, index) => {
    return (
      <i 
        key={index} 
        className={`fas fa-star ${index < Math.floor(product.rating) ? 'text-warning' : 'text-muted'}`}
      ></i>
    );
  });
  
  return (
    <div className="row">
      <div className="col-lg-6 mb-4 mb-lg-0">
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center p-4">
            <svg width="100%" height="400" className="product-detail-img">
              <rect width="100%" height="100%" fill="#f8f9fa" />
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#6c757d" fontSize="24px">
                {product.name}
              </text>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="col-lg-6">
        <div className="ps-lg-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/">Products</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
            </ol>
          </nav>
          
          <h2 className="mb-3">{product.name}</h2>
          
          <div className="d-flex align-items-center mb-3">
            <div className="me-2">
              {stars}
            </div>
            <span className="text-muted">({product.rating})</span>
          </div>
          
          <h3 className="h4 mb-4">${product.price.toFixed(2)}</h3>
          
          <p className="mb-4">{product.description || "Experience the rich, authentic flavor of our premium spices. Handpicked from the finest sources around the world, our spices will elevate your cooking to new heights. Perfect for both everyday meals and special occasions."}</p>
          
          <div className="mb-4">
            <h4 className="h6 mb-3">Key Features:</h4>
            <ul className="list-unstyled">
              <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> Premium quality</li>
              <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> 100% natural ingredients</li>
              <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> No additives or preservatives</li>
              <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> Ethically sourced</li>
            </ul>
          </div>
          
          <div className="d-flex align-items-center mb-4">
            <div className="me-3">
              <label htmlFor="quantity" className="form-label">Quantity:</label>
              <input 
                type="number" 
                id="quantity" 
                className="form-control" 
                min="1" 
                value={quantity} 
                onChange={handleQuantityChange} 
              />
            </div>
            
            <button 
              className="btn btn-primary btn-lg"
              onClick={handleAddToCart}
            >
              <i className="fas fa-cart-plus me-2"></i>
              Add to Cart
            </button>
          </div>
          
          <div className="d-flex align-items-center text-muted">
            <div className="me-3">
              <i className="fas fa-shipping-fast me-1"></i> Free shipping
            </div>
            <div className="me-3">
              <i className="fas fa-box-open me-1"></i> Easy returns
            </div>
            <div>
              <i className="fas fa-shield-alt me-1"></i> Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
