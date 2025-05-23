import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import Admin from './components/Admin';
import products from './data/products';

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  // Update item quantity in cart
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  // Clear cart
  const clearCart = () => {
    setCart([]);
  };
  
  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTermLower) || 
        product.category.toLowerCase().includes(searchTermLower) || 
        product.description.toLowerCase().includes(searchTermLower)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm]);
  
  // Calculate total items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header totalItems={totalItems} onSearch={handleSearch} searchTerm={searchTerm} />
        <main className="container py-4 flex-grow-1">
          <Routes>
            <Route 
              path="/" 
              element={<ProductList products={filteredProducts} addToCart={addToCart} searchTerm={searchTerm} />} 
            />
            <Route 
              path="/product/:id" 
              element={<ProductDetail products={products} addToCart={addToCart} />} 
            />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cart={cart} 
                  updateQuantity={updateQuantity} 
                  removeFromCart={removeFromCart} 
                  clearCart={clearCart} 
                />
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <Checkout 
                  cart={cart} 
                  clearCart={clearCart} 
                />
              } 
            />
            <Route 
              path="/order-confirmation" 
              element={<OrderConfirmation />} 
            />
            <Route 
              path="/admin" 
              element={<Admin />} 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
