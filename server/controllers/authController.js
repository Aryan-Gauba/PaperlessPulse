import jwt from 'jsonwebtoken';
import { pool } from '../db/connection.js';
import * as model from '../models/rootModel.js';

export const loginUser = async(req, res) => {
    const { email, role, password } = req.body; // Added password here
    try {
        const user = await model.findByCredentials(email, role, password); 
    
        if (user) {
            const token = jwt.sign(
                { id: user.id, role: user.role, name:user.name }, 
                process.env.JWT_SECRET, 
                { expiresIn: '2h' }
            );
            res.json({ token, role: user.role, name: user.name });
        } else {
            res.status(401).json({ message: "Invalid email, role, or password" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}; 


export const registerUser = async (req, res) => {
  const { name, email, role, password } = req.body; 
  try {
    const user = await model.create(name, email, role, password);
    const token = jwt.sign({ id: user.id, role: user.role, name: user.name  }, process.env.JWT_SECRET, { expiresIn: '2h' });
    
    res.json({ token, role: user.role, name: user.name });
    } catch (err) {
        if (err.code === '23505') {
            res.status(400).json({ message: "Email already exists" });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
}; 