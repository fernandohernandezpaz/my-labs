-- ==========================================
-- 1. CLEANUP
-- ==========================================
DROP TABLE IF EXISTS archived_orders;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS user_stats;
DROP TABLE IF EXISTS users;

-- ==========================================
-- 2. SCHEMA CREATION
-- ==========================================

-- Users Dictionary (Source of Truth)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    country VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Operational Orders Table (Messy Data)
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT, -- Intentionally no foreign key for the challenge
    amount DECIMAL(10, 2),
    status VARCHAR(20), -- 'pending', 'completed', 'failed', 'refunded'
    order_date TIMESTAMP,
    notes TEXT
);

-- Target Table for Migration Challenge
CREATE TABLE archived_orders (
    id INT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2),
    archived_at TIMESTAMP DEFAULT NOW()
);

-- Target Table for UPSERT Challenge
CREATE TABLE user_stats (
    user_id INT PRIMARY KEY,
    total_spent DECIMAL(15, 2) DEFAULT 0.00,
    last_order_date TIMESTAMP
);

-- ==========================================
-- 3. DATA POPULATION
-- ==========================================

-- Insert 5 Users
INSERT INTO users (name, email, country) VALUES
('Alice Johnson', 'alice@example.com', 'USA'),
('Bob Smith', 'bob@example.com', 'UK'),
('Charlie Brown', 'charlie@example.com', 'USA'),
('Diana Prince', 'diana@example.com', 'Canada'),
('Evan Wright', 'evan@example.com', 'USA');

-- Insert 20 Messy Orders
INSERT INTO orders (user_id, amount, status, order_date, notes) VALUES
(1, 100.50, 'completed', '2023-01-15', 'Old order'),
(1, 250.00, 'pending', '2024-02-20', 'Waiting for payment'),
(2, 50.00, 'failed', '2024-03-01', 'Card decline'),
(3, 1200.00, 'pending', '2024-03-05', 'High value check'), -- Candidate for bulk update
(3, 80.00, 'completed', '2023-05-20', 'Old order'),
(4, 300.00, 'completed', '2024-01-10', 'Recent'),
(5, 15.00, 'refunded', '2024-01-11', 'User complained'),
(99, 500.00, 'completed', '2024-04-01', 'Orphan order - User 99 does not exist!'),
(1, 60.00, 'completed', '2024-04-02', 'Recent'),
(2, 999.00, 'pending', '2024-04-03', 'almost high value'),
(3, 2000.00, 'pending', '2024-04-04', 'High value check'); -- Candidate for bulk update

-- Insert initial stats for Alice (User 1) only
INSERT INTO user_stats (user_id, total_spent, last_order_date) VALUES
(1, 100.50, '2023-01-15');
