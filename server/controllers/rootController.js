import jwt from 'jsonwebtoken';
import { pool } from '../db/connection.js'; // Ensure this path matches your structure

async function loginUser(req, res) {
    const { email, role, password } = req.body; // Added password here
    try {
        // Updated query to check password
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND role = $2 AND password = $3', 
            [email, role, password]
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
            // This is likely why you saw "Authentication failed"
            res.status(401).json({ message: "Invalid email, role, or password" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// ... rest of your registerUser and dashboard functions
async function registerUser(req, res) {
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
}

async function getNGOdashboard(req, res) {
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
}

async function getVolunteerdashboard(req, res) {
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
}


// Add this to your rootController.js exports
export async function createIssue(req, res) {
  const { type, location, description, priority } = req.body;
  const userId = req.user.id; // From authenticateToken middleware

  try {
    const result = await pool.query(
      'INSERT INTO issues (user_id, type, location, description, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, type, location, description, priority]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const deleteIssue = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // From your authMiddleware

    try {
        const result = await pool.query(
            "DELETE FROM issues WHERE id = $1 AND user_id = $2 RETURNING *",
            [id, userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Report not found or unauthorized" });
        }

        res.status(200).json({ message: "Report deleted successfully" });
    } catch (err) {
        console.error("Delete Error:", err.message);
        res.status(500).json({ error: "Server error during deletion" });
    }
};

// Update your existing getIndividualdashboard function
 async function getIndividualdashboard(req, res) {
  const userId = req.user.id;
  try {
    // 1. Fetch reports filed by this specific user
    const issues = await pool.query(
      'SELECT * FROM issues WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    // 2. Calculate simple stats for this user
    const stats = {
      totalIssues: issues.rowCount,
      activeReports: issues.rows.filter(i => i.status !== 'Resolved').length
    };

    res.json({
      title: "Community Member Portal",
      issues: issues.rows,
      stats: stats
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export {
    loginUser, 
    registerUser,
    getNGOdashboard,
    getVolunteerdashboard,
    getIndividualdashboard
}; 


