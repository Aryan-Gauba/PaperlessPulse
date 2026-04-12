import express from 'express'; 
import { loginUser, 
         registerUser, 
         getNGOdashboard,
         getVolunteerdashboard,
         getIndividualdashboard } from '../controllers/rootController.js'; 
import {authenticateToken} from '../middlewares/authMiddleware.js'; 

const router = express.Router(); 

router.post('/api/login', loginUser);
router.post('/api/register', registerUser);
router.get('/api/dashboard/ngo', authenticateToken, getNGOdashboard)
router.get('/api/dashboard/volunteer', authenticateToken, getVolunteerdashboard)
router.get('/api/dashboard/individual', authenticateToken, getIndividualdashboard)

export { router };  