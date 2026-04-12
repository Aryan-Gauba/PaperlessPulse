import 'dotenv/config';
import http from 'node:http'; 
import app from './app.js'; 
import connectDB from './db/connection.js'; 

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, async() => {
  await connectDB(); 
  console.log(`Server active on port ${PORT}`)});