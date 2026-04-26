-- SQL
-- 1. Users Table
-- Stores credentials and roles for NGO admins, volunteers, and individuals.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('ngo', 'volunteer', 'individual')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 2. Surveys Table
-- Stores data submitted by volunteers and individuals.
-- Includes a JSONB field for flexible OCR data or survey metadata.
CREATE TABLE surveys (
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
title VARCHAR(200) DEFAULT 'General Survey',
description TEXT,
location VARCHAR(255),
metadata JSONB, -- Stores key-value pairs from OCR or form fields
status VARCHAR(20) DEFAULT 'Processed',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Issues Table
-- Specifically for the Individual Dashboard "Report Issue" feature.
CREATE TABLE issues (
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
type VARCHAR(50) NOT NULL, -- e.g., 'Water Shortage', 'Medical'
location VARCHAR(255) NOT NULL,
description TEXT,
priority VARCHAR(10) DEFAULT 'Medium',
status VARCHAR(20) DEFAULT 'Pending', -- 'Pending', 'In Review', 'Resolved'
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Indexing for faster queries based on user_id
CREATE INDEX idx_surveys_user ON surveys(user_id);
CREATE INDEX idx_issues_user ON issues(user_id);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    ngo_id INTEGER REFERENCES users(id), -- The NGO who created it
    title VARCHAR(255) NOT NULL,
    area VARCHAR(255) NOT NULL,
    assigned_to VARCHAR(255), -- Volunteer name
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE org_volunteer_relations (
    id SERIAL PRIMARY KEY,
    org_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    volunteer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'accepted', 'rejected'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(org_id, volunteer_id) -- ensures an Org can't invite the same volunteer twice
);


CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    recipient_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    type VARCHAR(50), -- 'invite', 'assignment'
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);