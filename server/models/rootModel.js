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

export const getTasksByVolunteerName = async (volunteerName) => {
    return await pool.query(
        "SELECT * FROM tasks WHERE assigned_to = $1 ORDER BY created_at DESC",
        [volunteerName]
    );
};

export const updateTaskStatus = async (id, status) => {
    const result = await pool.query(
        'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
    );
    return result.rows[0];
};

export const deleteTaskById = async (id) => {
    return await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
};

export const getAllVolunteers = async () => {
    return await pool.query("SELECT id, name, email FROM users WHERE role = 'volunteer'");
};

export const sendVolunteerInvite = async (orgId, volunteerId, orgName) => {
    await pool.query(
        "INSERT INTO org_volunteer_relations (org_id, volunteer_id) VALUES ($1, $2)",
        [orgId, volunteerId]
    );

    return await pool.query(
        "INSERT INTO notifications (recipient_id, sender_id, message, type) VALUES ($1, $2, $3, $4) RETURNING *",
        [volunteerId, orgId, `${orgName} has invited you to join their organization.`, 'invite']
    );
};

export const getNotifications = async (userId) => {
    return await pool.query(
        "SELECT * FROM notifications WHERE recipient_id = $1 AND is_read = FALSE ORDER BY created_at DESC",
        [userId]
    );
};

export const updateRelationStatus = async (volunteerId, orgId, status) => {
    const relation = await pool.query(
        "UPDATE org_volunteer_relations SET status = $1 WHERE volunteer_id = $2 AND org_id = $3 RETURNING *",
        [status, volunteerId, orgId]
    );

    await pool.query(
        "UPDATE notifications SET is_read = TRUE WHERE recipient_id = $1 AND sender_id = $2 AND type = 'invite'",
        [volunteerId, orgId]
    );

    return relation.rows[0];
};

export const getVolunteersWithStatus = async (orgId) => {
    return await pool.query(`
        SELECT u.id, u.name, u.email, r.status 
        FROM users u
        LEFT JOIN org_volunteer_relations r 
            ON u.id = r.volunteer_id AND r.org_id = $1
        WHERE u.role = 'volunteer'
    `, [orgId]);
};

export const getOrganizationsByVolunteer = async (volunteerId) => {
    return await pool.query(`
        SELECT u.id, u.name, u.email, r.status 
        FROM org_volunteer_relations r
        JOIN users u ON r.org_id = u.id
        WHERE r.volunteer_id = $1 AND r.status = 'accepted'
    `, [volunteerId]);
};

export const getUserProfile = async (userId) => {
    const result = await pool.query(
        "SELECT id, name, email, role, created_at FROM users WHERE id = $1",
        [userId]
    );
    return result.rows[0];
};