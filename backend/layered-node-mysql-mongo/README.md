# Layered Node MySQL Mongo

A production-style Node.js backend demonstrating **layered architecture** with dual database integration:

- ✅ **MySQL** – Relational data (Users, Orders)
- ✅ **MongoDB** – Document data (Products)

This project is built to understand:

- Clean separation of concerns
- Repository & Service patterns
- Multi-database architecture
- Interview-ready backend design
- ESM (ES Modules) syntax

---

## 📌 Architecture Overview

### Request Flow

```
Client Request
      ↓
   Routes
      ↓
Controllers → Handles HTTP layer
      ↓
  Services → Business Logic
      ↓
Repositories → Database Queries
      ↓
MySQL / MongoDB
```

### Why This Architecture?

| Layer | Responsibility |
|-------|----------------|
| **Routes** | Endpoint definitions |
| **Controllers** | Request/Response handling |
| **Services** | Business logic |
| **Repositories** | Database communication |
| **Models** | Schema definition |
| **Config** | Infrastructure setup |
| **Middleware** | Error handling, validation |
| **Utils** | Custom error classes |

✔ Loosely coupled  
✔ Testable  
✔ Scalable  
✔ Database independent  

---

## 📁 Folder Structure

```
layered-node-mysql-mongo/
│
├── src/
│   ├── config/
│   │   └── mysql.js              # MySQL database configuration
│   │
│   ├── models/
│   │   └── mysql/
│   │       └── user.model.js     # User table reference
│   │
│   ├── repositories/
│   │   ├── user.repository.js    # User data access layer
│   │   ├── order.repository.js   # Order data access layer
│   │   └── orderItem.repository.js
│   │
│   ├── services/
│   │   ├── user.service.js       # User business logic
│   │   └── order.service.js      # Order business logic
│   │
│   ├── controllers/
│   │   ├── user.controller.js    # User HTTP handlers
│   │   └── order.controller.js   # Order HTTP handlers
│   │
│   ├── routes/
│   │   ├── user.routes.js        # User endpoints
│   │   └── order.routes.js       # Order endpoints
│   │
│   ├── middleware/
│   │   └── errorHandler.js       # Centralized error handling
│   │
│   ├── utils/
│   │   └── errors.js             # Custom error classes
│   │
│   ├── app.js                    # Express app setup
│   └── server.js                 # Server entry point
│
├── test.js                        # MySQL connection test
├── .env                           # Environment variables
├── package.json
└── README.md
```

---

## 🚀 Installation

### 1. Install Dependencies

```bash
npm install
```

**Dependencies:**
- `express` - Web framework
- `mysql2` - MySQL client
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variables

**Dev Dependencies:**
- `nodemon` - Auto-reload server

### 2. Configure Environment

Create or update `.env` file:

```env
# MySQL Configuration
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=your_database

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/your_database

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 3. Setup Database

#### MySQL Tables

```sql
-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total DECIMAL(10, 2),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order Items table
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  product_name VARCHAR(200),
  quantity INT,
  price DECIMAL(10, 2),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

#### MongoDB Collections

```javascript
// products collection
{
  name: String,
  price: Number,
  category: String,
  stock: Number
}
```

---

## ⚙️ Run the Application

### Start Server

```bash
npm start
```

Server runs at: **http://localhost:3000**

### Test MySQL Connection

```bash
node test.js
```

---

## 📡 API Endpoints

### Users (MySQL)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/users` | Get all users | - |
| `GET` | `/users/:id` | Get user by ID | - |
| `POST` | `/users` | Create new user | `{ name, email, phone }` |

**POST /users - Sample Request:**

```json
{
  "name": "Krishna",
  "email": "krishna@mail.com",
  "phone": "1234567890"
}
```

**GET /users/:id - Sample Response:**

```json
{
  "id": 1,
  "name": "Krishna",
  "email": "krishna@mail.com",
  "phone": "1234567890",
  "created_at": "2026-02-08T10:30:00.000Z"
}
```

**Error Response (404):**

```json
{
  "error": "User Not Found"
}
```

---

### Orders (MySQL)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/orders/:id` | Get order with items | - |
| `POST` | `/orders` | Create order with items | See below |

**POST /orders - Sample Request:**

```json
{
  "user_id": 1,
  "total": 150.00,
  "items": [
    {
      "product_name": "Laptop",
      "quantity": 1,
      "price": 100.00
    },
    {
      "product_name": "Mouse",
      "quantity": 2,
      "price": 25.00
    }
  ]
}
```

**GET /orders/:id - Sample Response:**

```json
{
  "id": 1,
  "user_id": 1,
  "total": 150.00,
  "status": "CREATED",
  "created_at": "2026-02-08T10:30:00.000Z",
  "items": [
    {
      "id": 1,
      "order_id": 1,
      "product_name": "Laptop",
      "quantity": 1,
      "price": 100.00
    },
    {
      "id": 2,
      "order_id": 1,
      "product_name": "Mouse",
      "quantity": 2,
      "price": 25.00
    }
  ]
}
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express** | Web framework |
| **MySQL** | Relational database |
| **MongoDB** | NoSQL database |
| **mysql2** | MySQL client with promises |
| **mongoose** | MongoDB ODM |
| **dotenv** | Environment configuration |
| **nodemon** | Development auto-reload |

---

## 🏗 Design Patterns

### Repository Pattern

Abstracts data access logic from business logic:

```javascript
// Repository handles DB queries
class UserRepository {
  async getById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
      throw new NotFoundError('User Not Found');
    }
    return rows[0];
  }
}
```

### Service Pattern

Contains business logic and orchestrates repositories:

```javascript
// Service handles business logic
class OrderService {
  async createOrder(data) {
    const orderId = await orderRepo.create(data);
    for (let item of data.items) {
      await itemRepo.addItem({ order_id: orderId, ...item });
    }
    return orderId;
  }
}
```

### Error Handling

Centralized error handling with custom error classes:

```javascript
// Custom error with status code
throw new NotFoundError('User Not Found'); // 404

// Caught by error handler middleware
app.use(errorHandler);
```

---

## 🎯 Key Features

✅ **Layered architecture** - Clear separation of concerns  
✅ **Repository pattern** - Database abstraction  
✅ **Service layer** - Business logic isolation  
✅ **Multi-database** - MySQL + MongoDB support  
✅ **Error handling** - Custom errors with status codes  
✅ **ESM syntax** - Modern import/export  
✅ **Async/await** - Clean asynchronous code  
✅ **Environment config** - Dotenv integration  

---

## 📝 Code Style

- **ESM modules** (`import`/`export`)
- **Async/await** (no callbacks)
- **Class-based** repositories and services
- **Named exports** for controllers
- **Default exports** for services/repos
- **Consistent error handling**

---

## 🧪 Testing

Test MySQL connection:

```bash
node test.js
```

Expected output:
```
MySQL Connected ✅
```

---

## 🚦 Error Handling

The app uses custom error classes for consistent error responses:

```javascript
// NotFoundError - 404
// ValidationError - 400
// Custom errors with statusCode property
```

All errors are caught by the centralized error handler middleware.

---

## 📚 Learning Resources

This project demonstrates:

1. **Separation of Concerns** - Each layer has a single responsibility
2. **Dependency Inversion** - High-level modules don't depend on low-level modules
3. **Scalability** - Easy to add new features without modifying existing code
4. **Testability** - Each layer can be tested independently
5. **Maintainability** - Clear structure makes code easy to understand

---

## 🤝 Contributing

Feel free to fork, improve, and submit pull requests!

---

## 📄 License

ISC

---

## 👤 Author

**Krishna**

---

## 🔗 Related Projects

- [Full Stack Architecture](../../README.md)
- Backend architectures and patterns
- Database integration examples