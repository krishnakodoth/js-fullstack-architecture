# Layered Node MySQL Mongo

A production-style Node.js backend demonstrating **layered architecture** with  
dual database integration:

- ✅ MySQL – relational data (Users)
- ✅ MongoDB – document data (Products)

This project is built to understand:

- Clean separation of concerns  
- Repository & Service patterns  
- Multi-DB architecture  
- Interview-ready backend design  

---

## 📌 Architecture Overview

### Request Flow

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


### Why This Architecture?

| Layer | Responsibility |
|-----|----------------|
| Routes | Endpoint definitions |
| Controllers | Request/Response handling |
| Services | Business logic |
| Repositories | DB communication |
| Models | Schema definition |
| Config | Infrastructure setup |

✔ Loosely coupled  
✔ Testable  
✔ Scalable  
✔ DB independent  

---

## 📁 Folder Structure

layered-node-mysql-mongo/
│── src/
│ ├── config/
│ │ ├── mysql.js
│ │ └── mongo.js
│ │
│ ├── models/
│ │ ├── mysql/
│ │ │ └── user.model.js
│ │ └── mongo/
│ │ └── product.model.js
│ │
│ ├── repositories/
│ │ ├── user.repository.js
│ │ └── product.repository.js
│ │
│ ├── services/
│ │ ├── user.service.js
│ │ └── product.service.js
│ │
│ ├── controllers/
│ │ ├── user.controller.js
│ │ └── product.controller.js
│ │
│ ├── routes/
│ │ ├── user.routes.js
│ │ └── product.routes.js
│ │
│ ├── middlewares/
│ │ └── errorHandler.js
│ │
│ └── app.js
│
├── server.js
└── package.json


---

```bash
npm init -y
npm install express mongoose mysql2 dotenv
npm install nodemon --save-dev

```

## 🚀 Features

- Layered architecture  
- Repository pattern  
- Multi-database support  
- Centralized error handling  
- Async/await pattern  
- Clean code separation  

---

## 🛠 Tech Stack

- Node.js  
- Express  
- MySQL  
- MongoDB  
- Mongoose  
- mysql2  

---

## ⚙ Setup & Run

### 1. Install Dependencies

```bash
npm install

2. Configure Databases
MySQL Table
CREATE TABLE users(
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100),
 email VARCHAR(100)
);
```

MongoDB Collection
products
 - name
 - price


 3. Start Application
node server.js


Server runs at:

http://localhost:3000

| Method | Endpoint | Description   |
| ------ | -------- | ------------- |
| GET    | /users   | Get all users |
| POST   | /users   | Create user   |


Sample Payload

{
  "name": "Krishna",
  "email": "krishna@mail.com"
}

Products (MongoDB)
Method	Endpoint	Description
GET	/products	Get all products
POST	/products	Create product

Sample Payload

{
  "name": "Laptop",
  "price": 50000
}