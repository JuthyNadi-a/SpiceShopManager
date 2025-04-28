import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = ({ totalItems, onSearch, searchTerm }) => {
  const [searchInput, setSearchInput] = useState(searchTerm || '');
  const navigate = useNavigate();
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
    
    // If user is not on the home page, navigate there to see results
    navigate('/');
  };
  
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    // For real-time search updates
    onSearch(e.target.value);
  };
  
  const clearSearch = () => {
    setSearchInput('');
    onSearch('');
  };
  
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <h1 className="h3 mb-0 text-spice-primary">
              <i className="fas fa-pepper-hot me-2"></i>
              Spice Shop
            </h1>
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink 
                  className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item ms-3">
                <NavLink 
                  className={({isActive}) => isActive ? "nav-link active position-relative" : "nav-link position-relative"}
                  to="/cart"
                >
                  <i className="fas fa-shopping-cart"></i>
                  {totalItems > 0 && (
                    <span className="cart-badge">{totalItems}</span>
                  )}
                </NavLink>
              </li>
              <li className="nav-item ms-3">
                <NavLink 
                  className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                  to="/admin"
                >
                  Admin
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <div className="bg-light py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="display-5">Premium Spices</h2>
              <p className="lead">Discover exotic flavors from around the world</p>
            </div>
            <div className="col-md-6">
              <form onSubmit={handleSearchSubmit}>
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search for spices..." 
                    value={searchInput}
                    onChange={handleSearchInputChange}
                  />
                  {searchInput && (
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary" 
                      onClick={clearSearch}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
