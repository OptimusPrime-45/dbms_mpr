CREATE DATABASE IF NOT EXISTS banking_db;
USE banking_db;

-- 1. Branch Table
CREATE TABLE IF NOT EXISTS branches (
    branch_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL
);

-- 2. Customer Table
CREATE TABLE IF NOT EXISTS customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    address TEXT NOT NULL
);

-- 3. Login Table (Auth)
CREATE TABLE IF NOT EXISTS logins (
    login_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'EMPLOYEE', 'CUSTOMER') DEFAULT 'CUSTOMER',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- 4. Employee Table
CREATE TABLE IF NOT EXISTS employees (
    emp_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT,
    name VARCHAR(100) NOT NULL,
    salary DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id)
);

-- 5. Account Table
CREATE TABLE IF NOT EXISTS accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    branch_id INT,
    account_type ENUM('SAVINGS', 'CURRENT') NOT NULL,
    balance DECIMAL(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id)
);

-- 6. SavingsAccount Table (Specialization)
CREATE TABLE IF NOT EXISTS savings_accounts (
    account_id INT PRIMARY KEY,
    interest_rate DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE
);

-- 7. CurrentAccount Table (Specialization)
CREATE TABLE IF NOT EXISTS current_accounts (
    account_id INT PRIMARY KEY,
    min_balance DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE
);

-- 8. Loan Table
CREATE TABLE IF NOT EXISTS loans (
    loan_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    amount DECIMAL(15, 2) NOT NULL,
    loan_type VARCHAR(50) NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'PAID') DEFAULT 'PENDING',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- 9. LoanPayment Table
CREATE TABLE IF NOT EXISTS loan_payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    loan_id INT,
    amount DECIMAL(15, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id)
);

-- 10. Transactions Table (History)
CREATE TABLE IF NOT EXISTS transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    from_account_id INT,
    to_account_id INT, -- NULL for deposit/withdraw
    amount DECIMAL(15, 2) NOT NULL,
    transaction_type ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER') NOT NULL,
    description VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_account_id) REFERENCES accounts(account_id),
    FOREIGN KEY (to_account_id) REFERENCES accounts(account_id)
);

-- Seed Initial Data (Admin Account)
-- Default Password: 'admin' (Hashed: $2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00dmxs.TVuHOn2)
INSERT INTO branches (name, location) VALUES ('Main Branch', 'Downtown City');
INSERT INTO customers (name, phone, address) VALUES ('System Admin', '0000000000', 'Office');
INSERT INTO logins (customer_id, username, password, role) VALUES (1, 'admin', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00dmxs.TVuHOn2', 'ADMIN');
