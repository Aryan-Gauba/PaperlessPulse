import express from 'express';
import pg from 'pg';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { Pool } = pg;
const app = express();

// Standard middleware
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// --- AUTH MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: "No authentication token found. Please login again." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Session expired or invalid token. Please log in again." });
    }
    req.user = user;
    next();
  });
};

app.get('/api/me', authenticateToken, async (req, res) => {
  try {
    // req.user comes from the authenticateToken middleware
    const result = await pool.query('SELECT id, name, email, role FROM users WHERE id = $1', [req.user.id]);
    
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error during session validation." });
  }
});

// --- AUTH ROUTES ---
app.post('/api/login', async (req, res) => {
  const { email, role } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND role = $2', [email, role]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const token = jwt.sign(
        { id: user.id, role: user.role, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '2h' }
      );
      res.json({ 
        token, 
        role: user.role, 
        name: user.name,
        userId: user.id 
      });
    } else {
      res.status(401).json({ message: "Invalid credentials. Please check your email and role." });
    }
  } catch (err) { 
    res.status(500).json({ error: "Database error during login." }); 
  }
});

app.post('/api/register', async (req, res) => {
  const { name, email, role, password } = req.body;
  try {
    const newUser = await pool.query(
      'INSERT INTO users (name, email, role, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, role, password]
    );
    const user = newUser.rows[0];
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, role: user.role, name: user.name });
  } catch (err) { 
    if (err.code === '23505') { // Unique violation
        return res.status(400).json({ error: "Email already exists." });
    }
    res.status(500).json({ error: err.message }); 
  }
});

// --- INDIVIDUAL DASHBOARD ROUTES ---

// 1. Fetch data for Individual Dashboard
app.get('/api/dashboard/individual', authenticateToken, async (req, res) => {
  try {
    // Parallel queries for efficiency
    const [issuesResult, surveysResult] = await Promise.all([
      pool.query('SELECT * FROM issues WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]),
      pool.query('SELECT * FROM surveys WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id])
    ]);

    res.json({ 
      title: "Community Member Portal",
      stats: {
        totalIssues: issuesResult.rowCount,
        totalSurveys: surveysResult.rowCount
      },
      issues: issuesResult.rows,
      surveys: surveysResult.rows
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Failed to fetch dashboard data." });
  }
});

// 2. Submit a New Issue (Report)
app.post('/api/issues', authenticateToken, async (req, res) => {
  const { type, location, description, priority } = req.body;
  
  if (!type || !location || !description) {
    return res.status(400).json({ error: "Type, location, and description are required." });
  }

  try {
    const result = await pool.query(
      'INSERT INTO issues (user_id, type, location, description, priority, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
      [req.user.id, type, location, description, priority || 'Medium', 'Pending']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit issue report." });
  }
});

// 3. Upload a Survey (Contribution)
app.post('/api/surveys', authenticateToken, async (req, res) => {
  const { title, description, location, metadata } = req.body;
  
  if (!location) {
    return res.status(400).json({ error: "Geographic location is required for survey data." });
  }

  try {
    const result = await pool.query(
      'INSERT INTO surveys (user_id, title, description, location, metadata, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
      [
        req.user.id, 
        title || 'Community Survey Contribution', 
        description || 'Digital upload', 
        location, 
        JSON.stringify(metadata || {}), 
        'Processed'
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Survey upload error:", err);
    res.status(500).json({ error: "Failed to upload survey data." });
  }
});

// --- NGO & VOLUNTEER ROUTES ---
app.get('/api/dashboard/ngo', authenticateToken, async (req, res) => {
  if (req.user.role !== 'ngo') {
    return res.status(403).json({ message: "Access denied. NGO role required." });
  }
  
  try {
    const surveys = await pool.query('SELECT * FROM surveys ORDER BY created_at DESC');
    const issues = await pool.query('SELECT * FROM issues ORDER BY created_at DESC');
    
    res.json({ 
        data: surveys.rows, // For legacy compat
        surveys: surveys.rows,
        issues: issues.rows 
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch NGO data." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));