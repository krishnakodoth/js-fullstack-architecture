# 🚀 Clean Architecture with Node.js, Prisma & MongoDB

> **Architecture #2** – CLEAN ARCHITECTURE (Hexagonal / Ports & Adapters)

This is one of the most asked architectural patterns in interviews.

## 📋 Table of Contents

- [What We Are Building](#what-we-are-building)
- [Core Concepts](#core-concepts)
- [Project Structure](#project-structure)
- [Implementation Steps](#implementation-steps)
- [Key Learnings](#key-learnings)

## 🎯 What We Are Building

We'll build the same domain as before with **Clean Architecture** structure:

- **Users**
- **Orders**
- **Mongo Products**

### Goal

By the end of this project, you'll be able to confidently say in an interview:

> _"I implemented Clean Architecture where business logic is independent of framework, DB, and UI. Prisma/Mongo are just adapters."_ 💯

## 💡 Core Concepts

### Simple Explanation

```
Core Business  ← independent
Adapters       ← prisma / mongo / express
```

### Dependency Direction

| Pattern | Correct? |
|---------|----------|
| Express → Business | ❌ Wrong |
| Prisma → Business | ❌ Wrong |
| Business knows nothing about DB or HTTP | ✅ Correct |

**Key Principle:** Business logic has **zero knowledge** about databases or HTTP frameworks.

## 📁 Project Structure

Project folder: `clean-node-prisma-mongo`

```
src/
│
├── domain/                ← PURE BUSINESS
│   ├── entities/
│   │   ├── user.js
│   │   └── order.js
│   │
│   └── interfaces/
│       ├── user.repository.js
│       └── order.repository.js
│
├── application/           ← USE CASES
│   ├── createUser.js
│   ├── createOrder.js
│   └── getUserOrders.js
│
├── infrastructure/        ← ADAPTERS
│   ├── prisma/
│   │   └── prismaUserRepo.js
│   │
│   ├── mongo/
│   │   └── productRepo.js
│   │
│   └── http/
│       └── express.js
│
└── index.js
```


## 🛠️ Implementation Steps

### STEP 1 – Create Domain Entities

#### 📁 `src/domain/entities/user.js`

class User {
  constructor({ id, name, email, phone }) {

    if (!email) {
      throw new Error("Email required");
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

module.exports = User;
```

#### 📁 `src/domain/entities/order.js`

```javascript

class Order {
  constructor({ userId, total, status }) {

    if (total <= 0) {
      throw new Error("Total must be positive");
    }

    this.userId = userId;
    this.total = total;
    this.status = status || "NEW";
  }
}

module.exports = Order;
```

**Key Points:**
- ✅ No Prisma
- ✅ No Express
- ✅ PURE JS = Domain

---

### STEP 2 – Domain Interfaces (Ports)

#### 📁 `src/domain/interfaces/user.repository.js`

```javascript

class UserRepository {

  create(user) {
    throw new Error("not implemented");
  }

  getById(id) {
    throw new Error("not implemented");
  }

}

module.exports = UserRepository;
```

**Key Points:**
- ✅ This is a **PORT** (interface)
- ✅ Implementation comes later (in adapters)

---

### STEP 3 – Use Case Layer

#### 📁 `src/application/createUser.js`

```javascript

const User = require('../domain/entities/user');

class CreateUser {

  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(data) {

    const user = new User(data);

    return this.userRepository.create(user);
  }
}

module.exports = CreateUser;
```

**Key Points:**
- ✅ Contains the business flow
- ✅ Depends ONLY on interface (not on implementation)

---

### STEP 4 – Prisma Adapter

#### 📁 `src/infrastructure/prisma/prismaUserRepo.js`

```javascript

const prisma = require('../../config/prisma');
const UserRepository = require('../../domain/interfaces/user.repository');

class PrismaUserRepo extends UserRepository {

  create(user) {
    return prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  }

  getById(id) {
    return prisma.user.findUnique({
      where: { id: Number(id) }
    });
  }

}

module.exports = PrismaUserRepo;
```

**Key Points:**
- ✅ This is an **ADAPTER** implementing the PORT
- ✅ Prisma-specific implementation

---

### STEP 5 – Express Adapter

#### 📁 `src/infrastructure/http/express.js`

```javascript

const express = require('express');

const PrismaUserRepo = require('../prisma/prismaUserRepo');
const CreateUser = require('../../application/createUser');

const app = express();
app.use(express.json());

const userRepo = new PrismaUserRepo();
const createUser = new CreateUser(userRepo);

app.post('/users', async (req, res) => {

  const result = await createUser.execute(req.body);

  res.json(result);
});

module.exports = app;
```

---

### STEP 6 – Start App

#### 📁 `index.js`

```javascript

const app = require('./src/infrastructure/http/express');

app.listen(3000, () => {
  console.log("Clean architecture running");
});
```

---

## 🎯 Key Learnings

### Difference from Layered Architecture

| Aspect | Layered Architecture | Clean Architecture |
|--------|---------------------|--------------------|
| **Dependency** | Service knows repo | Use case knows interface |
| **Database** | DB tightly coupled | DB is adapter |
| **Flexibility** | Hard to switch | Easy to switch |

### 💥 Interview Explanation

You can now confidently say:

> _"I implemented Clean Architecture where:_
> 
> - **Domain** has entities & business rules
> - **Application** has use cases
> - **Prisma/Mongo** are adapters
> - **Business logic** is independent of framework"

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Prisma:**
   ```bash
   npx prisma init
   npx prisma migrate dev
   ```

3. **Run the application:**
   ```bash
   node index.js
   ```

## 📝 License

MIT