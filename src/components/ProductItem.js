import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product, addToCart }) => {
  const { id, name, price, image, rating, category } = product;
  
  // Generate stars based on rating
  const stars = Array.from({ length: 5 }, (_, index) => {
    return (
      <i 
        key={index} 
        className={`fas fa-star ${index < Math.floor(rating) ? 'text-warning' : 'text-muted'}`}
      ></i>
    );
  });
  
  return (
    <div className="card h-100">
      <div className="badge bg-danger position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>
        {category}
      </div>
      
      <Link to={`/product/${id}`}>
        <div className="text-center p-3">
          <svg width="100%" height="200" className="product-image">
            <rect width="100%" height="100%" fill="#f8f9fa" />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#6c757d">
              {name}
            </text>
          </svg>
        </div>
      </Link>
      
      <div className="card-body">
        <div className="text-center">
          <h5 className="card-title">
            <Link to={`/product/${id}`} className="text-decoration-none text-dark">
              {name}
            </Link>
          </h5>
          
          <div className="d-flex justify-content-center small text-warning mb-2">
            {stars}
            <span className="ms-1 text-muted">({rating})</span>
          </div>
          
          <h6 className="mb-3">${price.toFixed(2)}</h6>
        </div>
      </div>
      
      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div className="text-center">
          <button 
            className="btn btn-outline-primary mt-auto"
            onClick={() => addToCart(product)}
          >
            <i className="fas fa-cart-plus me-1"></i> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
