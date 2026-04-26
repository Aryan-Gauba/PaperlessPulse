import { pool } from '../db/connection.js';
import * as model from '../models/rootModel.js';

export const createTask = async (req, res) => {
    const { title, area, assigned } = req.body;
    const ngoId = req.user.id; // From auth middleware

    try {
        const newTask = await model.createTask(ngoId, title, area, assigned); 
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}; 

export const getTasks = async(req, res) => {
    const ngoId = req.user.id;
    try {
        const result = await model.getTasksByNgoId(ngoId);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}; 

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await model.deleteTaskById(id);
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}; 
