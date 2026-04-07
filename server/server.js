import express from 'express';
import pg from 'pg';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { Pool } = pg;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection

// Individual parameter connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test the connection on startup
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Successfully connected to PostgreSQL');
  release();
});

// --- AUTH MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

// --- ROUTES ---

// 1. Auth: Login & Generate JWT
app.post('/api/login', async (req, res) => {
  const { email, role } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND role = $2', 
      [email, role]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const token = jwt.sign(
        { id: user.id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '2h' }
      );
      res.json({ token, role: user.role, name: user.name });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register Route
app.post('/api/register', async (req, res) => {
  const { name, email, role, password } = req.body; // In a real app, hash the password here!
  try {
    const newUser = await pool.query(
      'INSERT INTO users (name, email, role, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, role, password]
    );

    const user = newUser.rows[0];
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    
    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    if (err.code === '23505') {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

// 2. NGO Dashboard (Protected)
app.get('/api/dashboard/ngo', authenticateToken, async (req, res) => {
  if (req.user.role !== 'ngo') return res.status(403).json({ message: "Forbidden" });
  
  try {
    const surveys = await pool.query('SELECT * FROM surveys ORDER BY created_at DESC');
    res.json({ 
      title: "NGO Admin Overview",
      stats: { totalSurveys: surveys.rowCount },
      data: surveys.rows 
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 3. Volunteer Dashboard (Protected)
app.get('/api/dashboard/volunteer', authenticateToken, async (req, res) => {
  if (req.user.role !== 'volunteer') return res.status(403).json({ message: "Forbidden" });
  
  try {
    // Fetch only surveys submitted by this volunteer
    const mySubmissions = await pool.query(
      'SELECT * FROM surveys WHERE volunteer_id = $1', 
      [req.user.id]
    );
    res.json({ 
      title: "Volunteer Portal",
      history: mySubmissions.rows 
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 4. Individual Dashboard (Protected)
app.get('/api/dashboard/individual', authenticateToken, async (req, res) => {
  try {
    res.json({ 
      title: "Community Member Portal",
      message: "View nearby resource distribution points." 
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server active on port ${PORT}`));