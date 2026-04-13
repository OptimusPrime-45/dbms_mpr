# Nexus Banking Management System

A full-stack banking management system built with Spring Boot (JDBC) and React (Vite + Tailwind).

## 🚀 Features
- **Dashboard**: High-level overview of bank stats.
- **Customer Management**: CRUD operations for bank clients.
- **Account Management**: Support for Savings and Current accounts with specialization.
- **Transactions**: Secure processing of Deposits, Withdrawals, and Transfers.
- **Security**: JWT-based authentication and BCrypt password hashing.
- **Relational DB**: MySQL with normalized schema and foreign key constraints.

## 🛠️ Tech Stack
- **Backend**: Java 17, Spring Boot 3, JDBC, HikariCP, MySQL.
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Axios.

## 🏁 Setup Instructions

### 1. Database
- Create a MySQL database named `banking_db`.
- Run the script in `db/schema.sql`.
- Default credentials: `admin` / `admin`.

### 2. Backend
- Navigate to `backend/`
- Configure `application.properties` with your MySQL credentials.
- Run `mvn spring-boot:run`.

### 3. Frontend
- Navigate to `frontend/`
- Run `npm install`
- Run `npm run dev`

## 📡 API Endpoints
- `POST /api/auth/login` - Authenticate users
- `GET /api/customers` - List all customers
- `POST /api/accounts` - Open new account
- `POST /api/transactions/deposit` - Deposit funds
- `POST /api/transactions/withdraw` - Withdraw funds
- `POST /api/transactions/transfer` - Transfer between accounts
