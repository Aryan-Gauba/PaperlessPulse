import express from 'express';
import cors from 'cors';
import authenticateToken from './middlewares/authMiddleware.js'; 
import router from './routes/routes.js'; 

const app = express(); 

app.use(cors());
app.use(express.json());
app.use(authenticateToken); 
app.use(router); 

export { app };  