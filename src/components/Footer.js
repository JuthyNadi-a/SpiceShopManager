import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h4 className="h5 mb-3">About Spice Shop</h4>
            <p className="mb-3">We source premium spices from around the world, bringing authentic flavors directly to your kitchen.</p>
            <div className="social-icons">
              <a href="#" className="text-white me-3"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-white me-3"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white me-3"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-white"><i className="fab fa-pinterest"></i></a>
            </div>
          </div>
          
          <div className="col-md-4 mb-4 mb-md-0">
            <h4 className="h5 mb-3">Customer Service</h4>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">FAQs</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Shipping & Returns</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Track Order</a></li>
            </ul>
          </div>
          
          <div className="col-md-4">
            <h4 className="h5 mb-3">Newsletter</h4>
            <p className="mb-3">Subscribe to get special offers, recipes, and updates!</p>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Your email address" />
              <button className="btn btn-primary" type="button">Subscribe</button>
            </div>
          </div>
        </div>
        
        <hr className="mt-4 mb-4 border-light" />
        
        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <p className="mb-0">&copy; 2023 Spice Shop. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <a href="#" className="text-white text-decoration-none me-3">Privacy Policy</a>
            <a href="#" className="text-white text-decoration-none">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
