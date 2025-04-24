import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  
  // If user navigates directly to this page without order data, redirect to home
  if (!location.state || !location.state.orderId) {
    return <Navigate to="/" />;
  }
  
  const { orderId, customer, total } = location.state;
  
  return (
    <div className="text-center py-5">
      <div className="mb-4">
        <i className="fas fa-check-circle text-success fa-5x"></i>
      </div>
      
      <h2 className="mb-3">Thank You for Your Order!</h2>
      <p className="lead mb-4">Your order has been successfully placed.</p>
      
      <div className="card shadow-sm mb-4 mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <div className="mb-3">
            <h5>Order Details</h5>
            <p className="mb-1">Order ID: <strong>#{orderId}</strong></p>
            <p className="mb-1">Total: <strong>${total.toFixed(2)}</strong></p>
            <p className="mb-0">Date: <strong>{new Date().toLocaleDateString()}</strong></p>
          </div>
          
          <hr />
          
          <div className="mb-3">
            <h5>Customer Information</h5>
            <p className="mb-1"><strong>{customer.name}</strong></p>
            <p className="mb-1">{customer.email}</p>
            <p className="mb-1">{customer.phone}</p>
            <p className="mb-0">{customer.address}</p>
          </div>
          
          <hr />
          
          <div>
            <h5>What's Next?</h5>
            <p>You will receive an email confirmation shortly. We'll notify you when your order ships.</p>
          </div>
        </div>
      </div>
      
      <Link to="/" className="btn btn-primary">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmation;