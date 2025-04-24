import React from 'react';
import { Link } from 'react-router-dom';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  const { id, name, price, quantity } = item;
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      updateQuantity(id, value);
    }
  };
  
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <div 
            className="me-3 bg-light rounded"
            style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <i className="fas fa-pepper-hot text-primary"></i>
          </div>
          <div>
            <Link to={`/product/${id}`} className="text-decoration-none text-dark">
              <h6 className="mb-0">{name}</h6>
            </Link>
          </div>
        </div>
      </td>
      <td>${price.toFixed(2)}</td>
      <td>
        <div className="input-group input-group-sm" style={{ width: '100px' }}>
          <button 
            className="btn btn-outline-secondary"
            onClick={() => updateQuantity(id, quantity - 1)}
          >
            <i className="fas fa-minus"></i>
          </button>
          <input 
            type="number" 
            className="form-control text-center" 
            min="1" 
            value={quantity} 
            onChange={handleQuantityChange} 
          />
          <button 
            className="btn btn-outline-secondary"
            onClick={() => updateQuantity(id, quantity + 1)}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </td>
      <td>${(price * quantity).toFixed(2)}</td>
      <td>
        <button 
          className="btn btn-sm btn-outline-danger"
          onClick={() => removeFromCart(id)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
