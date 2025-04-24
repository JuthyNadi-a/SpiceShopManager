import React, { useState } from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, addToCart }) => {
  const [sortOption, setSortOption] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  
  // Get unique categories
  const categories = ['All', ...new Set(products.map(product => product.category))];
  
  // Filter and sort products
  let filteredProducts = [...products];
  
  if (filterCategory && filterCategory !== 'All') {
    filteredProducts = filteredProducts.filter(
      product => product.category === filterCategory
    );
  }
  
  if (sortOption === 'price-low-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-high-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'name-a-z') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'name-z-a') {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  }
  
  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="d-flex align-items-center">
            <label className="me-2">Filter by:</label>
            <select 
              className="form-select" 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category, idx) => (
                <option key={idx} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex align-items-center">
            <label className="me-2">Sort by:</label>
            <select 
              className="form-select" 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="alert alert-info">No products found.</div>
      ) : (
        <div className="row">
          {filteredProducts.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <ProductItem product={product} addToCart={addToCart} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
