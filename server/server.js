const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
}

// API Routes

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT o.*, c.name, c.email 
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      ORDER BY o.order_date DESC
    `);
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get specific order with items
app.get('/api/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  
  try {
    // Get order details
    const orderResult = await db.query(`
      SELECT o.*, c.name, c.email, c.phone, c.address
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE o.id = $1
    `, [orderId]);
    
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Get order items
    const itemsResult = await db.query(`
      SELECT * FROM order_items WHERE order_id = $1
    `, [orderId]);
    
    // Combine order with its items
    const order = orderResult.rows[0];
    order.items = itemsResult.rows;
    
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new order
app.post('/api/orders', async (req, res) => {
  const { customer, items, total, shippingAddress, paymentMethod } = req.body;
  
  // Start a transaction
  const client = await db.pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Check if customer exists or create new one
    let customerId;
    const customerResult = await client.query(
      'SELECT id FROM customers WHERE email = $1',
      [customer.email]
    );
    
    if (customerResult.rows.length > 0) {
      customerId = customerResult.rows[0].id;
      // Update customer information
      await client.query(
        'UPDATE customers SET name = $1, phone = $2, address = $3 WHERE id = $4',
        [customer.name, customer.phone, customer.address, customerId]
      );
    } else {
      // Create new customer
      const newCustomerResult = await client.query(
        'INSERT INTO customers (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING id',
        [customer.name, customer.email, customer.phone, customer.address]
      );
      customerId = newCustomerResult.rows[0].id;
    }
    
    // Create order
    const orderResult = await client.query(
      'INSERT INTO orders (customer_id, total_amount, shipping_address, payment_method) VALUES ($1, $2, $3, $4) RETURNING id',
      [customerId, total, shippingAddress, paymentMethod]
    );
    
    const orderId = orderResult.rows[0].id;
    
    // Insert order items
    for (const item of items) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal) VALUES ($1, $2, $3, $4, $5, $6)',
        [orderId, item.id, item.name, item.quantity, item.price, item.price * item.quantity]
      );
    }
    
    await client.query('COMMIT');
    
    res.status(201).json({ 
      orderId, 
      message: 'Order created successfully' 
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

// Update order status
app.patch('/api/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  
  try {
    const result = await db.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, orderId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// In production, serve the React app for any unknown paths
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

// Create database tables if they don't exist
const initializeDatabase = async () => {
  try {
    const fs = require('fs');
    const schemaSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await db.query(schemaSQL);
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initializeDatabase();
});

module.exports = app;