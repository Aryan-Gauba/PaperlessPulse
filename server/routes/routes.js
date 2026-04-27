import express from 'express'; 
import * as auth from '../controllers/authController.js';
import * as dashboard from '../controllers/dashboardController.js';
import * as issues from '../controllers/issueController.js';
import * as tasks from '../controllers/tasksController.js';
import * as relations from '../controllers/relationController.js';
import * as profile from '../controllers/profileController.js';
 
import { uploadFile } from '../services/visionService.js';
import { upload } from '../utils/uploads.js'; 
import { authenticateToken } from '../middlewares/authMiddleware.js'; 

const router = express.Router(); 

router.post('/login', auth.loginUser);
router.post('/register', auth.registerUser);
router.get('/profile', authenticateToken, profile.getProfile);

router.get('/dashboard/ngo', authenticateToken, dashboard.getNGOdashboard);
router.get('/dashboard/volunteer', authenticateToken, dashboard.getVolunteerdashboard);
router.get('/dashboard/individual', authenticateToken, dashboard.getIndividualdashboard);

router.post('/issues', authenticateToken, issues.createIssue);
router.delete('/issues/:id', authenticateToken, issues.deleteIssue);

router.get('/volunteers', authenticateToken, relations.fetchVolunteers);
router.get('/my-organizations', authenticateToken, relations.fetchMyOrganizations);
router.post('/invite', authenticateToken, relations.inviteVolunteer);
router.post('/invite/respond', authenticateToken, relations.respondToInvite);
router.get('/notifications', authenticateToken, relations.fetchNotifications);

router.post('/upload', authenticateToken, upload.single('document'), uploadFile);

router.get('/tasks', authenticateToken, tasks.getTasks);
router.post('/tasks', authenticateToken, tasks.createTask);
router.put('/tasks/:id/status', authenticateToken, tasks.updateTaskStatus);
router.delete('/tasks/:id', authenticateToken, tasks.deleteTask);

export { router };