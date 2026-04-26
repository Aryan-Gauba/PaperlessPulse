import { pool } from '../db/connection.js';

export const findByCredentials = async (email, role, password) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1 AND role = $2 AND password = $3', 
        [email, role, password]
    );
    return result.rows[0];
};

export const create = async (name, email, role, password) => {
    const result = await pool.query(
        'INSERT INTO users (name, email, role, password) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, role, password]
    );
    return result.rows[0];
};

export const getAllSurveys = async () => {
    return await pool.query('SELECT * FROM surveys ORDER BY created_at DESC');
};

export const getSurveysByVolunteerId = async (volunteerId) => {
    return await pool.query('SELECT * FROM surveys WHERE volunteer_id = $1', [volunteerId]);
};

export const getIssuesByUserId = async (userId) => {
    return await pool.query(
        'SELECT * FROM issues WHERE user_id = $1 ORDER BY created_at DESC', 
        [userId]
    );
};

export const createIssue = async (userId, type, location, description, priority) => {
    const result = await pool.query(
        'INSERT INTO issues (user_id, type, location, description, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userId, type, location, description, priority]
    );
    return result.rows[0];
};

export const deleteIssue = async (id, userId) => {
    return await pool.query(
        "DELETE FROM issues WHERE id = $1 AND user_id = $2 RETURNING *",
        [id, userId]
    );
};

export const createTask = async (ngoId, title, area, assigned) => {
    const result = await pool.query(
        'INSERT INTO tasks (ngo_id, title, area, assigned_to) VALUES ($1, $2, $3, $4) RETURNING *',
        [ngoId, title, area, assigned]
    );
    return result.rows[0];
};

export const getTasksByNgoId = async (ngoId) => {
    return await pool.query(
        'SELECT * FROM tasks WHERE ngo_id = $1 ORDER BY created_at DESC',
        [ngoId]
    );
};

export const deleteTaskById = async (id) => {
    return await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
};