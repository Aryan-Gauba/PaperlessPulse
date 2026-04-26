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
    try {
        if (req.user.role === 'ngo') {
            const result = await RootModel.getTasksByNgoId(req.user.id);
            res.json(result.rows);
        } else if (req.user.role === 'volunteer') {
            const result = await RootModel.getTasksByVolunteerName(req.user.name);
            res.json(result.rows);
        } else {
            res.status(403).json({ message: "Forbidden role" });
        }
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
