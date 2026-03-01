# 🚀 Smart Stock Pro - Scalable Inventory Management API

A high-performance, production-ready inventory management backend built with modern architectural principles, focusing on type safety, data integrity, and automated infrastructure.

## 🎯 Technical Vision
The primary goal of this project is to implement industry-standard best practices in the Node.js ecosystem, including structured layered architecture, rigorous environment validation, and containerized deployment workflows.

## 🛠 Tech Stack

* **Runtime:** Node.js (v20+) - Asynchronous, event-driven architecture.
* **Language:** TypeScript - Static typing for robust development and maintenance.
* **Framework:** Express.js - Modular routing and middleware management.
* **ORM:** Prisma 7 - Type-safe database access with automated migration handling.
* **Database:** PostgreSQL - Relational data integrity and complex query support.
* **Caching:** Redis - Low-latency data access and session management.
* **Validation:** Zod - Schema-based validation for runtime environment safety (Fail-fast principle).
* **Infrastructure:** Docker & Docker Compose - Isolated and reproducible development environments.

---

## 🏗 Architectural Decisions

The system is designed with sustainability and scalability in mind:

* **Config Layer:** Uses `Zod` to validate all environment variables (ENV) before the application boots, preventing runtime failures due to misconfiguration.
* **Singleton Pattern:** The `Prisma Client` is managed as a singleton instance to optimize the database connection pool and prevent resource exhaustion.
* **Containerization:** All core services (PostgreSQL, Redis) are containerized to ensure consistent behavior across different development and production environments.

---

## 📂 Project Structure

```text
smart-stock-pro/
├── prisma/             # Database modeling and migration history
├── src/
│   ├── config/         # Type-safe configuration management
│   ├── generated/      # Auto-generated Prisma client and types
│   ├── lib/            # Centralized library configurations (DB, Redis)
│   ├── controllers/    # Request handling and business logic orchestration
│   ├── routes/         # Express route definitions
│   └── app.ts          # Application entry point
├── docker-compose.yml  # Service orchestration (PostgreSQL, Redis)
└── README.md           # Technical documentation
```

---

## 📦 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone [https://github.com/cayirmedine/smart-stock-pro.git](https://github.com/cayirmedine/smart-stock-pro.git)
cd smart-stock-pro
npm install
```

### 2. Infrastructure
Spin up the PostgreSQL and Redis services:
```bash
docker-compose up -d
```

### 3. Database Setup
Copy the environment template and run migrations:
```bash
cp .env.example .env
npx prisma migrate dev
```

### 4. Running the App
```bash
npm run dev
```
 
---

## 🛡 Security & Validation
* **Fail-Fast Configuration:** The application will not start if required environment variables are missing or malformed.
* **Async Error Handling:** Implements structured error catching for database transactions.
* **CORS Policy:** Pre-configured for secure cross-origin resource sharing.

## 📄 License
This project is licensed under the MIT License.