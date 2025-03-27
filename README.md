# MERN E-Commerce Application

A full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). This project provides a complete online shopping platform with product listings, shopping cart functionality, user authentication, and order processing.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Register, login, and profile management
- **Product Management**: Browse products, view details, filter by category and price
- **Shopping Cart**: Add/remove items, adjust quantities, persistent cart
- **Checkout Process**: Shipping details, payment integration
- **Order Management**: View order history and details
- **Admin Panel**: Manage products, categories, and orders (for admin users)
- **Responsive Design**: Mobile-friendly interface

## Project Structure

```
mern-ecommerce/
│-- backend/
│   │-- controllers/
│   │-- models/
│   │-- routes/
│   │-- config/
│   │-- middleware/
│   │-- server.js
│
│-- frontend/
│   │-- src/
│   │   │-- components/
│   │   │-- pages/
│   │   │-- context/
│   │   │-- services/
│   │   │-- App.js
│   │   │-- index.js
│
│-- .env
│-- package.json
│-- README.md
```

## Technologies Used

- **Frontend**: React, React Router, Redux, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens), bcrypt.js
- **Payment Integration**: Stripe / PayPal (optional)
- **State Management**: Redux Toolkit
- **API Testing**: Postman
- **Deployment**: Vercel (Frontend), Render/Heroku (Backend)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (latest stable version)
- MongoDB (local or cloud-based like MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/mern-ecommerce.git
   cd mern-ecommerce
   ```

2. Install dependencies for backend and frontend:
   ```sh
   cd backend && npm install
   cd ../frontend && npm install
   ```

### Environment Variables

Create a `.env` file in the backend directory and configure the following:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET=your_stripe_secret_key (if using Stripe)
PAYPAL_CLIENT_ID=your_paypal_client_id (if using PayPal)
```

## Running the Application

1. Start the backend server:
   ```sh
   cd backend && npm start
   ```
2. Start the frontend development server:
   ```sh
   cd frontend && npm start
   ```

The application should now be running at `http://localhost:3000/`.

## API Documentation

The backend API provides endpoints for authentication, products, orders, and more. You can use Postman to test these endpoints. API routes include:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/orders` - Place an order
- `GET /api/orders/:id` - Get order details

## Deployment

### Deploy Backend

1. Push your code to GitHub.
2. Use Render or Heroku for deployment.
3. Configure environment variables in the deployment platform.

### Deploy Frontend

1. Use Vercel or Netlify for React frontend.
2. Update API URLs in the frontend `.env` file.

## Future Enhancements

- Implement product reviews and ratings
- Add multi-vendor functionality
- Integrate AI-based recommendations
- Add a wishlist feature
- Implement live chat support

## Contributing

Contributions are welcome! If you’d like to improve the project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.

