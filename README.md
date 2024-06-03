# ARTVISTA GALLERY PAINTING WEB APPLICATION (BACKEND)
- Artistic Paintings are Displayed category-wise with an Admin panel to control product uploads.
- Artists (Admins) can fill out their profiles with essential details such as name, bio, and portfolio, allowing them to showcase their work effectively (CRUD) using the Admin Panel.

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
4. [Render URL]
5. [Installation](#installation)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
8. [Database Schema](#database-schema)

## Introduction
- Users can view all artwork information, including title, artist, description, price, and images.
- Users can search & filter based on their preferences by category of arts.
- Artists (Admins) can fill out their profiles with essential details such as name, bio, and portfolio, allowing them to showcase their work effectively (CRUD).
- Users can add artwork to their shopping cart for future purchase.
- For secure transactions, the platform implements a checkout process integrated with payment gateways such as Stripe or RazorPay.


## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Stripe](https://stripe.com/)


## Render URL :https://artvista-backend-3ycc.onrender.com

## Installation

Step-by-step instructions on how to get a development environment running.

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the necessary environment variables.
   ```env
   PORT=5000
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   STRIPE_SECRET_KEY=your-stripe-secret-key
   ```

4. **Run the development server:**
   ```sh
   npm start
   ```

## Usage

Provide instructions and examples for using the project.

1. **Start the server:**
   ```sh
   npm start
   ```

2. **API Base URL:**
   ```sh
   http://localhost:5000/api
   ```

## API Endpoints

### User Authentication Endpoints-  Login and Register(SignUp)

- **POST https://artvista-backend-3ycc.onrender.com/signup** - Get all users
- **POST https://artvista-backend-3ycc.onrender.com/login** - Create a new user

### Products  Endpoints

- **POST https://artvista-backend-3ycc.onrender.com/addproduct** - To add Product from Admin
- **POST https://artvista-backend-3ycc.onrender.com/removeproduct** - To Remove Product
- **GET  https://artvista-backend-3ycc.onrender.com/allprodcts** - To get all products 


### Orders Endpoints

- **POST https://artvista-backend-3ycc.onrender.com/place** - Place Order
- **POST https://artvista-backend-3ycc.onrender.com/verify** - Verify userOrder
- **POST https://artvista-backend-3ycc.onrender.com/userorders** - Get order by ID BY USER
- **GET https://artvista-backend-3ycc.onrender.com/list** -Get order by ID
- **POST https://artvista-backend-3ycc.onrender.com/status** - Update order by ID

### Cart Endpoints

- **POST https://artvista-backend-3ycc.onrender.com/addtocart** - ADD to cart
- **POST https://artvista-backend-3ycc.onrender.com/removefromcart** - Remove from cart
- **POST https://artvista-backend-3ycc.onrender.com/getcart** - Get cart by ID BY USER

## Database Schema

### User Model
```json

 {
  "name": "String",
  "email": "String",
  "password": "String",
  "cartData": "Object"
}


```
### Product Model
```json
{
  "title": "String",
  "artist": "String",
  "description": "String",
  "price": "Number",
  "image": "String",
  "category": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Order Model
```json
{
 "userId": "String",
  "items": "Array",
  "amount": "Number",
  "address": "Object",
  "status": "String",
  "date": "Date",
  "payment": "Boolean"
}
```




