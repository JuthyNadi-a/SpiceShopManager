import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Calculate order totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.085;
  const total = subtotal + shippingCost + tax;
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Create order object for API
    const order = {
      customer: customerInfo,
      items: cart,
      total: total,
      shippingAddress: customerInfo.address,
      paymentMethod: paymentMethod
    };
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      
      const data = await response.json();
      
      // Clear cart and redirect to confirmation page
      clearCart();
      navigate('/order-confirmation', { 
        state: { 
          orderId: data.orderId,
          customer: customerInfo,
          total: total
        }
      });
    } catch (err) {
      console.error(err);
      setError('There was a problem processing your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (cart.length === 0) {
    return (
      <div className="text-center py-5">
        <h2>Your cart is empty</h2>
        <p className="mb-4">Add some spices to your cart before checkout.</p>
        <Link to="/" className="btn btn-primary">Browse Products</Link>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="mb-4">Checkout</h2>
      
      <div className="row">
        <div className="col-lg-8">
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}
          
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Customer Information</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Shipping Address</label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    rows="3"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <h5 className="mb-3">Payment Method</h5>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="creditCard"
                      value="credit_card"
                      checked={paymentMethod === 'credit_card'}
                      onChange={() => setPaymentMethod('credit_card')}
                    />
                    <label className="form-check-label" htmlFor="creditCard">
                      Credit Card
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="paypal"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      PayPal
                    </label>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between">
                  <Link to="/cart" className="btn btn-outline-secondary">
                    <i className="fas fa-arrow-left me-1"></i> Back to Cart
                  </Link>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      <>Place Order</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h6 className="mb-2">Items ({cart.length})</h6>
                {cart.map(item => (
                  <div key={item.id} className="d-flex justify-content-between mb-2">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <hr />
              
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
              
              <div className="d-flex justify-content-between mb-0">
                <h5>Total:</h5>
                <h5>${total.toFixed(2)}</h5>
              </div>
            </div>
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
  );
};

export default Checkout;