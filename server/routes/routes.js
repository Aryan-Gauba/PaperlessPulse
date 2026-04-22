// import express from 'express'; 
// import { loginUser, 
//          registerUser, 
//          getNGOdashboard,
//          getVolunteerdashboard,
//          getIndividualdashboard } from '../controllers/rootController.js'; 
//          import { createIssue } from '../controllers/rootController.js';

// import {authenticateToken} from '../middlewares/authMiddleware.js'; 

// const router = express.Router(); 

// router.post('/api/login', loginUser);
// router.post('/api/register', registerUser);
// router.get('/api/dashboard/ngo', authenticateToken, getNGOdashboard)
// router.get('/api/dashboard/volunteer', authenticateToken, getVolunteerdashboard)
// router.get('/api/dashboard/individual', authenticateToken, getIndividualdashboard)
// router.post('/issues', authenticateToken, createIssue);

// export { router };  

// server/routes/routes.js
import express from 'express'; 
import { loginUser, registerUser, getNGOdashboard, getVolunteerdashboard, getIndividualdashboard, createIssue, deleteIssue } from '../controllers/rootController.js'; 
import { uploadFile } from '../controllers/visionController.js';
import { upload } from '../utils/uploads.js'; 
import { authenticateToken } from '../middlewares/authMiddleware.js'; 

const router = express.Router(); 

// Remove the '/api' prefix from these strings
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/dashboard/ngo', authenticateToken, getNGOdashboard);
router.get('/dashboard/volunteer', authenticateToken, getVolunteerdashboard);
router.get('/dashboard/individual', authenticateToken, getIndividualdashboard);
router.post('/issues', authenticateToken, createIssue);
router.delete('/issues/:id', authenticateToken, deleteIssue);
router.post('/upload', authenticateToken, upload.single('document'), uploadFile);

export { router };