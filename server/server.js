import dotenv from 'dotenv';
import http from 'node:http'; 
import {app} from './app.js'; 
import {connectDB} from './db/connection.js'; 

dotenv.config();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
  connectDB(); 
  console.log(`Server active on port ${PORT}`)});