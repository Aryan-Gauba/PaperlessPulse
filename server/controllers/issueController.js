import { pool } from '../db/connection.js';
import * as model from '../models/rootModel.js';

export const createIssue = async (req, res) => {
  const { type, location, description, priority } = req.body;
  const userId = req.user.id; 
  try {
    const newIssue = await model.createIssue(userId, type, location, description, priority);
    res.status(201).json(newIssue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const deleteIssue = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; 

    try {
        const result = await model.deleteIssue(id, userId);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Report not found or unauthorized" });
        }

        res.status(200).json({ message: "Report deleted successfully" });
    } catch (err) {
        console.error("Delete Error:", err.message);
        res.status(500).json({ error: "Server error during deletion" });
    }
};
