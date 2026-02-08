# Layered Node MySQL Mongo - Prisma

A production-style Node.js backend demonstrating **layered architecture** with **Prisma ORM** and dual database integration:

- ✅ **MySQL** (via Prisma) – Relational data (Users, Orders, OrderItems)
- ✅ **MongoDB** – Document data (Products) - ready for integration

This project is built to understand:

- Clean separation of concerns
- Repository & Service patterns
- Prisma ORM integration
- Multi-database architecture
- ESM (ES Modules) syntax throughout
- Modern Node.js patterns
- Interview-ready backend design

---

## 📌 Architecture Overview

### Request Flow

```
Client Request
      ↓
   Routes (Express Router)
      ↓
Controllers → HTTP Request/Response Handling
      ↓
  Services → Business Logic & Orchestration
      ↓
Repositories → Data Access Layer
      ↓
Prisma Client → Type-safe ORM
      ↓
MySQL Database
```

### Why This Architecture?

| Layer | Responsibility | Example |
|-------|----------------|---------|
| **Routes** | Endpoint definitions | `/users`, `/orders` |
| **Controllers** | Request/Response handling | Validate input, send response |
| **Services** | Business logic | Create order with items |
| **Repositories** | Database communication | Prisma queries |
| **Prisma Client** | Type-safe ORM | Generated from schema |
| **Config** | Infrastructure setup | Database connections |
| **Middleware** | Error handling, validation | Global error handler |
| **Utils** | Custom error classes | NotFoundError, ValidationError |

✔ Loosely coupled  
✔ Testable  
✔ Scalable  
✔ Database independent  
✔ Type-safe with Prisma

---

## 📁 Folder Structure

```
layered-node-mysql-mongo-prisma/
│
├── prisma/
│   ├── schema.prisma             # Prisma schema (models, datasource)
│   └── migrations/               # Database migrations
│       ├── migration_lock.toml
│       └── 20260208053608_init/
│           └── migration.sql
│
├── src/
│   ├── config/
│   │   ├── prisma.js             # Prisma Client instance
│   │   └── mysql.js              # Legacy MySQL config (reference)
│   │
│   ├── models/
│   │   └── mysql/
│   │       └── user.model.js     # Model reference (Prisma-based)
│   │
│   ├── repositories/
│   │   ├── user.repository.js    # User data access with Prisma
│   │   ├── order.repository.js   # Order data access with Prisma
│   │   └── orderItem.repository.js # OrderItem data access
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
├── prisma.config.js               # Prisma 5 config (minimal)
├── test.js                        # Database connection test
├── .env                           # Environment variables
├── env_sample                     # Environment template
├── package.json
└── README.md
```

---

## 🚀 Installation

### 1. Install Dependencies

```bash
npm install
```

**Core Dependencies:**
- `@prisma/client@5.22.0` - Prisma Client (auto-generated, type-safe ORM)
- `prisma@5.22.0` - Prisma CLI for migrations and schema management
- `express@5.2.1` - Web framework
- `mongoose@9.1.6` - MongoDB ODM (ready for products integration)
- `dotenv@17.2.4` - Environment variable management

**Dev Dependencies:**
- `nodemon@3.1.11` - Auto-reload server during development
- `@types/node@25.2.2` - Node.js TypeScript definitions (for Prisma config)

### 2. Configure Environment

Create `.env` file in the project root:

```env
# MySQL Database Configuration
DATABASE_URL=mysql://root:password@localhost:3306/shop_db_prisma

# MongoDB Configuration (for future products integration)
MONGODB_URI=mongodb://localhost:27017/your_database

# Server Configuration
PORT=3000
NODE_ENV=development
```

**Note:** The `DATABASE_URL` follows Prisma's connection string format:
```
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

### 3. Setup Prisma & Database

#### Step 3.1: Review Prisma Schema

The `prisma/schema.prisma` file defines your data models:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id     Int      @id @default(autoincrement())
  name   String
  email  String   @unique
  phone  String?
  orders Order[]
}

model Order {
  id      Int         @id @default(autoincrement())
  userId  Int
  total   Float
  status  String
  user    User        @relation(fields: [userId], references: [id])
  items   OrderItem[]
}

model OrderItem {
  id        Int    @id @default(autoincrement())
  orderId   Int
  productId String
  qty       Int
  price     Float
  order     Order  @relation(fields: [orderId], references: [id])
}
```

#### Step 3.2: Generate Prisma Client

```bash
npx prisma generate
```

This generates the Prisma Client based on your schema.

#### Step 3.3: Run Database Migrations

```bash
# Create migration (if schema changed)
npx prisma migrate dev --name init

# Or apply existing migrations
npx prisma migrate deploy
```

#### Step 3.4: (Optional) Open Prisma Studio

Prisma Studio provides a GUI to browse and edit your database:

```bash
npx prisma studio
```

Access at: **http://localhost:5555**

![Prisma Studio](doc-img/image.png)

---

## ⚙️ Run the Application

### Start Development Server

```bash
npm start
```

Server runs at: **http://localhost:3000**

Uses `nodemon` for auto-reload on file changes.

### Test Database Connection

```bash
node test.js
```

Expected output:
```
MySQL Connected via Prisma ✅
```

---

## 📡 API Endpoints

### Users (MySQL via Prisma)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/users` | Get all users | - |
| `GET` | `/users/:id` | Get user by ID | - |
| `POST` | `/users` | Create new user | `{ name, email, phone? }` |

**POST /users - Sample Request:**

```json
{
  "name": "Krishna",
  "email": "krishna@mail.com",
  "phone": "1234567890"
}
```

**Response (201 Created):**

```json
{
  "id": 1,
  "message": "User Created"
}
```

**GET /users/:id - Sample Response:**

```json
{
  "id": 1,
  "name": "Krishna",
  "email": "krishna@mail.com",
  "phone": "1234567890"
}
```

**Error Response (404):**

```json
{
  "error": "User not found"
}
```

---

### Orders (MySQL via Prisma)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/orders/:id` | Get order with details | - |
| `POST` | `/orders` | Create order with items | See below |

**POST /orders - Sample Request:**

```json
{
  "user_id": 1,
  "total": 150.00,
  "items": [
    {
      "product_id": "PROD-001",
      "qty": 1,
      "price": 100.00
    },
    {
      "product_id": "PROD-002",
      "qty": 2,
      "price": 25.00
    }
  ]
}
```

**Response (200 OK):**

```json
{
  "id": 1,
  "message": "Order Created"
}
```

**GET /orders/:id - Sample Response:**

```json
{
  "id": 1,
  "userId": 1,
  "total": 150.00,
  "status": "CREATED",
  "user": {
    "id": 1,
    "name": "Krishna",
    "email": "krishna@mail.com",
    "phone": "1234567890"
  },
  "items": [
    {
      "id": 1,
      "orderId": 1,
      "productId": "PROD-001",
      "qty": 1,
      "price": 100.00
    },
    {
      "id": 2,
      "orderId": 1,
      "productId": "PROD-002",
      "qty": 2,
      "price": 25.00
    }
  ]
}
```

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 20.x | JavaScript runtime |
| **Express** | 5.2.1 | Web framework |
| **Prisma** | 5.22.0 | Next-generation ORM |
| **@prisma/client** | 5.22.0 | Auto-generated database client |
| **MySQL** | 8.x | Relational database |
| **MongoDB** | Latest | NoSQL database (ready for integration) |
| **mongoose** | 9.1.6 | MongoDB ODM |
| **dotenv** | 17.2.4 | Environment configuration |
| **nodemon** | 3.1.11 | Development auto-reload |

### Why Prisma?

✅ **Type-safe** - Auto-generated types  
✅ **Intuitive API** - Easier than raw SQL  
✅ **Migrations** - Version-controlled schema changes  
✅ **Studio** - Built-in database GUI  
✅ **Performance** - Optimized queries  
✅ **Developer Experience** - Auto-completion, validation  

---

## 🏗 Design Patterns

### Repository Pattern with Prisma

Abstracts Prisma queries from business logic:

```javascript
// user.repository.js
import prisma from '../config/prisma.js';

class UserRepository {
  getAll() {
    return prisma.user.findMany();
  }

  getById(id) {
    return prisma.user.findUnique({
      where: { id: Number(id) }
    });
  }

  create(data) {
    return prisma.user.create({ data });
  }
}

export default new UserRepository();
```

### Service Pattern

Contains business logic and orchestrates repositories:

```javascript
// order.service.js
import orderRepo from '../repositories/order.repository.js';
import itemRepo from '../repositories/orderItem.repository.js';

class OrderService {
  async createOrder(data) {
    // 1. Create order
    const order = await orderRepo.create({
      user_id: data.user_id,
      total: data.total,
      status: 'CREATED'
    });

    // 2. Add items
    for (let item of data.items) {
      await itemRepo.addItem({
        order_id: order.id,
        ...item
      });
    }

    return order.id;
  }

  async getOrderFull(orderId) {
    return await orderRepo.getOrderDetails(orderId);
  }
}

export default new OrderService();
```

### Prisma Relations & Includes

Leverage Prisma's powerful relation queries:

```javascript
// Get order with user and items
getOrderDetails(orderId) {
  return prisma.order.findUnique({
    where: { id: Number(orderId) },
    include: {
      user: true,    // Include related user
      items: true    // Include related order items
    }
  });
}
```

### Error Handling

Centralized error handling with custom error classes:

```javascript
// Custom error with status code
if (!user) {
  return res.status(404).json({ error: 'User not found' });
}

// Caught by error handler middleware
app.use(errorHandler);
```

---

## 🎯 Key Features

✅ **Layered architecture** - Clear separation of concerns  
✅ **Prisma ORM** - Type-safe database access  
✅ **Repository pattern** - Database abstraction layer  
✅ **Service layer** - Business logic isolation  
✅ **Multi-database ready** - MySQL (via Prisma) + MongoDB support  
✅ **ESM modules** - Full ES6+ import/export syntax  
✅ **Async/await** - Clean asynchronous code  
✅ **Migrations** - Version-controlled database schema  
✅ **Environment config** - Dotenv integration  
✅ **Error handling** - Centralized error middleware  
✅ **Auto-completion** - Prisma provides IntelliSense  
✅ **Type safety** - Generated TypeScript-like types  

---

## 📝 Code Style & Conventions

### ESM Modules

All files use modern ES6+ module syntax:

```javascript
// ✅ Correct - ESM with .js extension
import prisma from '../config/prisma.js';
import userService from '../services/user.service.js';

// ❌ Incorrect - Missing .js extension
import prisma from '../config/prisma';
```

**Important:** When using `"type": "module"` in package.json, all local imports **must** include the `.js` extension.

### Project Conventions

- **ESM modules** (`import`/`export`) everywhere
- **Async/await** (no callbacks or .then())
- **Class-based** repositories and services
- **Named exports** for controllers
- **Default exports** for services/repos/config
- **Prisma Client** for all database operations
- **Consistent error handling** with try-catch
- **camelCase** for variables and functions
- **PascalCase** for class names

### Example: Repository with Prisma

```javascript
import prisma from '../config/prisma.js';

class UserRepository {
  getAll() {
    return prisma.user.findMany();
  }

  getById(id) {
    return prisma.user.findUnique({
      where: { id: Number(id) }
    });
  }

  create(data) {
    return prisma.user.create({ data });
  }
}

export default new UserRepository();
```

---

## 🧪 Testing

### Test Database Connection

```bash
node test.js
```

Expected output:
```
MySQL Connected via Prisma ✅
User count: 5
```

### Test API Endpoints

Use tools like:
- **Postman** - API testing GUI
- **curl** - Command-line HTTP client  
- **Thunder Client** (VS Code extension)
- **REST Client** (VS Code extension)

Example curl request:

```bash
# Create user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Krishna","email":"krishna@mail.com","phone":"1234567890"}'

# Get user
curl http://localhost:3000/users/1
```

---

## 🚦 Prisma Commands Reference

### Schema Management

```bash
# Generate Prisma Client after schema changes
npx prisma generate

# View database in browser (Studio)
npx prisma studio

# Format schema file
npx prisma format
```

### Migrations

```bash
# Create new migration
npx prisma migrate dev --name description_here

# Apply migrations to production
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### Database Introspection

```bash
# Pull schema from existing database
npx prisma db pull

# Push schema to database without migrations
npx prisma db push
```

---

## 📚 Learning Resources

### What This Project Demonstrates

1. **Separation of Concerns** - Each layer has a single responsibility
2. **Dependency Inversion** - High-level modules don't depend on low-level modules
3. **Prisma ORM** - Modern database access with type safety
4. **Repository Pattern** - Abstract database operations
5. **Service Layer** - Centralize business logic
6. **ESM Syntax** - Modern JavaScript module system
7. **Scalability** - Easy to add features without breaking existing code
8. **Testability** - Each layer can be tested independently
9. **Maintainability** - Clear structure for team collaboration

### Prisma Benefits

- **No SQL injection** - Parameterized queries by default
- **Type safety** - Catch errors at development time
- **Auto-completion** - IntelliSense in your IDE
- **Migrations** - Track database changes like code
- **Relations** - Easy to query related data
- **Performance** - Optimized query generation

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

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

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Prisma Client not found**
```bash
# Solution: Generate Prisma Client
npx prisma generate
```

**Issue: ESM import errors**
```bash
# Make sure all local imports include .js extension
import prisma from './config/prisma.js'  // ✅ Correct
import prisma from './config/prisma'     // ❌ Wrong
```

**Issue: Database connection failed**
```bash
# Check your .env file DATABASE_URL format:
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"
```

**Issue: Cannot find module errors**
```bash
# Make sure "type": "module" is in package.json
# All files should use import/export, not require()
```

---

## 📊 Project Status

✅ **Completed Features:**
- Layered architecture implementation
- Prisma ORM integration
- User CRUD operations
- Order creation with items
- Repository and Service patterns
- ESM module system
- Error handling middleware

🚧 **Upcoming Features:**
- MongoDB integration for Products
- Authentication & Authorization
- Input validation with Zod
- Unit and integration tests
- API documentation with Swagger
- Docker containerization

---

## 💡 Tips

1. Always run `npx prisma generate` after changing `schema.prisma`
2. Use Prisma Studio (`npx prisma studio`) to inspect your database

![Prisma Studio](doc-img/image.png)

3. Keep migrations in version control
4. Use environment variables for sensitive data
5. Test your API endpoints with Postman or Thunder Client
6. Use `nodemon` for development (auto-restart on changes)

---

**Happy Coding! 🚀**