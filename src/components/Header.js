import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = ({ totalItems }) => {
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
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search for spices..." 
                />
                <button className="btn btn-primary">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
