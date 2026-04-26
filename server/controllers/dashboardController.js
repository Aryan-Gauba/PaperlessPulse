import { pool } from '../db/connection.js';
import * as model from '../models/rootModel.js';

export const getNGOdashboard = async (req, res) => {
  if (req.user.role !== 'ngo') return res.status(403).json({ message: "Forbidden" });
  
  try {
    const result = await model.getAllSurveys();
    res.json({ 
      title: "NGO Admin Overview",
      stats: { totalSurveys: result.rowCount },
      data: result.rows 
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
}; 

export const getVolunteerdashboard = async (req, res) => {
  if (req.user.role !== 'volunteer') return res.status(403).json({ message: "Forbidden" });
  
  try {
    const result = await model.getSurveysByVolunteerId(req.user.id);
    res.json({ 
      title: "Volunteer Portal",
      history: result.rows 
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
}; 

export const getIndividualdashboard = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await model.getIssuesByUserId(userId);

    const stats = {
      totalIssues: result.rowCount,
      activeReports: result.rows.filter(i => i.status !== 'Resolved').length
    };

    res.json({
      title: "Community Member Portal",
      issues: result.rows,
      stats: stats
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 