# Express REST API Documentation

This is a simple REST API built using Express.js. It provides CRUD operations for managing products and users. The data is stored in memory using JavaScript arrays.

## Table of Contents

1. [Getting Started](#getting-started)
2. [API Endpoints](#api-endpoints)
   - [Products](#products)
   - [Users](#users)
3. [Examples](#examples)
4. [Contributing](#contributing)
5. [License](#license)

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   git clone https://github.com/LALA09-erha/Express-RestAPI-Test.git
2. Navigate to the project directory:
   cd Express-RestAPI-Test
3. Install dependencies:
   npm install
4. Start the server:
   npm start
5. The server will run on http://localhost:5252.

---

## API Endpoints

### Products

#### Get All Products

- **GET** `/products`
  curl -X GET http://localhost:5252/products

#### Get Product by ID

- **GET** `/products/:id`
  curl -X GET http://localhost:5252/products/1

#### Create a New Product

- **POST** `/products`
  curl -X POST http://localhost:5252/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Product 1", "price": 100, "photo_url": "https://example.com/product1.jpg"}'

#### Update a Product

- **PUT** `/products/:id`
  curl -X PUT http://localhost:5252/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Product 1", "price": 150}'

#### Delete a Product

- **DELETE** `/products/:id`
  curl -X DELETE http://localhost:5252/products/1

---

### Users

#### Get All Users

- **GET** `/users`
  curl -X GET http://localhost:5252/users

#### Get User by ID

- **GET** `/users/:id`
  curl -X GET http://localhost:5252/users/1

#### Create a New User

- **POST** `/users`
  curl -X POST http://localhost:5252/users \
  -H "Content-Type: application/json" \
  -d '{"username": "user1", "password": "password123", "email": "user1@example.com"}'

#### Update a User

- **PUT** `/users/:id`
  curl -X PUT http://localhost:5252/users/1 \
  -H "Content-Type: application/json" \
  -d '{"username": "updatedUser1", "password": "newpassword123", "email": "updateduser1@example.com"}'

#### Delete a User

- **DELETE** `/users/:id`
  curl -X DELETE http://localhost:5252/users/1

---

## Examples

### Example 1: Create a New Product

curl -X POST http://localhost:5252/products \
-H "Content-Type: application/json" \
-d '{"name": "Laptop", "price": 1200, "photo_url": "https://example.com/laptop.jpg"}'

### Example 2: Update a User

curl -X PUT http://localhost:5252/users/1 \
-H "Content-Type: application/json" \
-d '{"username": "john_doe", "password": "newpassword123", "email": "john.doe@example.com"}'

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
