import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

const Cart = ({ cart, updateQuantity, removeFromCart, clearCart }) => {
  const [checkoutStep, setCheckoutStep] = useState(0);
  
  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Shipping cost (free for orders over $50)
  const shippingCost = subtotal > 50 ? 0 : 5.99;
  
  // Tax (8.5%)
  const tax = subtotal * 0.085;
  
  // Total cost
  const total = subtotal + shippingCost + tax;
  
  if (cart.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
        <h2>Your cart is empty</h2>
        <p className="mb-4">Looks like you haven't added any spices to your cart yet.</p>
        <Link to="/" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="mb-4">Your Shopping Cart</h2>
      
      <div className="row">
        <div className="col-lg-8 mb-4 mb-lg-0">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Cart Items ({cart.length})</h5>
              <button 
                className="btn btn-sm btn-outline-danger"
                onClick={clearCart}
              >
                <i className="fas fa-trash me-1"></i> Clear Cart
              </button>
            </div>
            
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item => (
                      <CartItem 
                        key={item.id} 
                        item={item} 
                        updateQuantity={updateQuantity} 
                        removeFromCart={removeFromCart} 
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="d-flex justify-content-between">
            <Link to="/" className="btn btn-outline-secondary">
              <i className="fas fa-arrow-left me-1"></i> Continue Shopping
            </Link>
            
            <button 
              className="btn btn-primary"
              onClick={() => setCheckoutStep(1)}
            >
              Proceed to Checkout <i className="fas fa-arrow-right ms-1"></i>
            </button>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-success">Free</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <span>Tax (8.5%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-3">
                <h5>Total:</h5>
                <h5>${total.toFixed(2)}</h5>
              </div>
              
              <div className="alert alert-success text-center">
                {subtotal < 50 ? (
                  <small>Add ${(50 - subtotal).toFixed(2)} more to get FREE shipping!</small>
                ) : (
                  <small>You've qualified for FREE shipping!</small>
                )}
              </div>
              
              <div className="text-center mt-3">
                <p className="text-muted mb-2">We accept:</p>
                <div className="fs-3">
                  <i className="fab fa-cc-visa me-2"></i>
                  <i className="fab fa-cc-mastercard me-2"></i>
                  <i className="fab fa-cc-amex me-2"></i>
                  <i className="fab fa-cc-paypal"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Checkout steps would go here in a real application */}
      {checkoutStep > 0 && (
        <div className="mt-4">
          <div className="alert alert-info">
            <h4>Checkout functionality</h4>
            <p>In a complete application, this would be where you implement the checkout process with shipping details, payment processing, etc.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
