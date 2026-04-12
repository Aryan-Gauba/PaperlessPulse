-- 1. Create the Users Table
-- This handles the three stakeholders and stores the hashed passwords (once you implement hashing).

-- SQL
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('ngo', 'volunteer', 'individual')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 2. Create the Surveys Table
-- This is where the "paper survey" data lives. We link it to a volunteer_id so you can track who collected the information.

-- SQL
CREATE TABLE surveys (
    id SERIAL PRIMARY KEY,
    volunteer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    contact_info VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'processed')),
    image_url TEXT, -- For storing the Google Vision/OCR source image link
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 3. Create the Resources Table (Optional/Advanced)
-- If your project also tracks the inventory being sent out (food, medical supplies, etc.).

-- SQL
CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    quantity INTEGER DEFAULT 0,
    managed_by_ngo_id INTEGER REFERENCES users(id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 4. Seed Data (For Testing)
-- Use these to populate your database so your UI isn't empty when you first run it. Note: Use a plain text password for now since your current logic doesn't have bcrypt yet.

-- SQL
-- Add one of each role
INSERT INTO users (name, email, password, role) VALUES 
('Delhi NGO Admin', 'admin@ngo.org', 'password123', 'ngo'),
('Rahul Volunteer', 'rahul@gmail.com', 'password123', 'volunteer'),
('Suresh Individual', 'suresh@outlook.com', 'password123', 'individual');

-- Add a dummy survey tied to the volunteer (ID 2)
INSERT INTO surveys (volunteer_id, location, description, contact_info) VALUES 
(2, 'Okhla Phase III', 'Paper survey: 50 families need clean water', '9876543210');
-- 5. Useful Maintenance Queries
-- Keep these handy for the hackathon to quickly reset or check your progress:

-- View all users: SELECT * FROM users;

-- Clear all surveys: TRUNCATE TABLE surveys RESTART IDENTITY;

-- Check surveys by a specific volunteer: ```sql
-- SELECT users.name, surveys.location
-- FROM surveys
-- JOIN users ON surveys.volunteer_id = users.id
-- WHERE users.role = 'volunteer';