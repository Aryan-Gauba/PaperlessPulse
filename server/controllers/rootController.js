import jwt from 'jsonwebtoken';

async function loginUser(req, res) {
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
}

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

async function getIndividualdashboard(req, res) {
  try {
    res.json({ 
      title: "Community Member Portal",
      message: "View nearby resource distribution points." 
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
}

export {
    loginUser, 
    registerUser,
    getNGOdashboard,
    getVolunteerdashboard,
    getIndividualdashboard
}; 


