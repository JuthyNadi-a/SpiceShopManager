import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);
  
  // Fetch single order details
  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      
      const data = await response.json();
      setSelectedOrder(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load order details. Please try again.');
    }
  };
  
  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
      
    } catch (err) {
      console.error(err);
      setError('Failed to update order status. Please try again.');
    }
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-warning';
      case 'processing':
        return 'bg-info';
      case 'shipped':
        return 'bg-primary';
      case 'delivered':
        return 'bg-success';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error && !selectedOrder && orders.length === 0) {
    return (
      <div className="alert alert-danger">{error}</div>
    );
  }
  
  return (
    <div>
      <h2 className="mb-4">Admin Dashboard</h2>
      
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}
      
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Recent Orders</h5>
            </div>
            <div className="card-body p-0">
              {orders.length === 0 ? (
                <div className="p-4 text-center">
                  <p className="mb-0">No orders found.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{order.name}</td>
                          <td>{formatDate(order.order_date)}</td>
                          <td>${parseFloat(order.total_amount).toFixed(2)}</td>
                          <td>
                            <span className={`badge ${getStatusBadgeColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => fetchOrderDetails(order.id)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          {selectedOrder ? (
            <div className="card shadow-sm">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Order Details (#{selectedOrder.id})</h5>
                <button 
                  className="btn-close"
                  onClick={() => setSelectedOrder(null)}
                ></button>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <h6>Customer Information</h6>
                  <p className="mb-1">{selectedOrder.name}</p>
                  <p className="mb-1">{selectedOrder.email}</p>
                  <p className="mb-1">{selectedOrder.phone}</p>
                  <p className="mb-0">{selectedOrder.address}</p>
                </div>
                
                <hr />
                
                <div className="mb-3">
                  <h6>Order Information</h6>
                  <p className="mb-1">Date: {formatDate(selectedOrder.order_date)}</p>
                  <p className="mb-1">Total: ${parseFloat(selectedOrder.total_amount).toFixed(2)}</p>
                  <p className="mb-0">
                    Status: 
                    <span className={`badge ${getStatusBadgeColor(selectedOrder.status)} ms-2`}>
                      {selectedOrder.status}
                    </span>
                  </p>
                </div>
                
                <hr />
                
                <div className="mb-3">
                  <h6 className="mb-2">Order Items</h6>
                  {selectedOrder.items && selectedOrder.items.map(item => (
                    <div key={item.id} className="d-flex justify-content-between mb-2">
                      <span>
                        {item.product_name} × {item.quantity}
                      </span>
                      <span>${parseFloat(item.subtotal).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <hr />
                
                <div>
                  <h6 className="mb-2">Update Status</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                      <button 
                        key={status}
                        className={`btn btn-sm ${selectedOrder.status.toLowerCase() === status.toLowerCase() ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => updateOrderStatus(selectedOrder.id, status.toLowerCase())}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card shadow-sm">
              <div className="card-body text-center p-4">
                <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
                <h5>Order Details</h5>
                <p>Select an order to view its details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;