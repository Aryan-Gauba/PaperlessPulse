import express from 'express'; 
import * as auth from '../controllers/authController.js';
import * as dashboard from '../controllers/dashboardController.js';
import * as issues from '../controllers/issueController.js';
import * as tasks from '../controllers/tasksController.js';
 
import { uploadFile } from '../services/visionService.js';
import { upload } from '../utils/uploads.js'; 
import { authenticateToken } from '../middlewares/authMiddleware.js'; 

const router = express.Router(); 

router.post('/login', auth.loginUser);
router.post('/register', auth.registerUser);

router.get('/dashboard/ngo', authenticateToken, dashboard.getNGOdashboard);
router.get('/dashboard/volunteer', authenticateToken, dashboard.getVolunteerdashboard);
router.get('/dashboard/individual', authenticateToken, dashboard.getIndividualdashboard);

router.post('/issues', authenticateToken, issues.createIssue);
router.delete('/issues/:id', authenticateToken, issues.deleteIssue);

router.post('/upload', authenticateToken, upload.single('document'), uploadFile);

router.post('/tasks', authenticateToken, tasks.createTask);
router.get('/tasks', authenticateToken, tasks.getTasks);
router.delete('/tasks/:id', authenticateToken, tasks.deleteTask);

export { router };