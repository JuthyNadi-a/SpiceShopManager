# Spice Shop

An e-commerce application for selling premium spices, built with React.

## Features

- Browse spice products with categories and ratings
- View detailed product information
- Add products to cart with quantity selection
- Manage shopping cart (update quantities, remove items)
- Responsive design for mobile and desktop

## Running Locally

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/spice-shop.git
cd spice-shop
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open your browser and navigate to http://localhost:3000

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Docker Deployment

A Dockerfile is included to containerize the application:

1. Build the Docker image
```bash
docker build -t spice-shop .
```

2. Run the container
```bash
docker run -p 80:80 spice-shop
```

3. Access the application at http://localhost

## Backend Information

This application currently uses a PostgreSQL database to store order information. When a customer completes an order, the data is stored in the database with the following structure:

- Customer information (name, email, address)
- Order details (products, quantities, prices)
- Order status and timestamps

### Accessing Order Information

You can access order information through:

1. The admin dashboard (under development)
2. Direct database queries using the provided environment variables

### Database Connection

The application uses the following environment variables for database connection:
- DATABASE_URL
- PGPORT
- PGUSER
- PGPASSWORD
- PGDATABASE
- PGHOST

## Technologies Used

- React
- React Router
- PostgreSQL
- Bootstrap 5
- Font Awesome