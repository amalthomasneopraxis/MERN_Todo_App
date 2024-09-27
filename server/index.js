import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { todoRouter } from './routes/todo.js';
import validateToken from './middleware/validateToken.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Adjust origin as necessary

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('connected', () => {
  console.log('Connected to MongoDB');
});
db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.post('/validate-token', validateToken, (req, res) => {
  res.status(200).json({ isValid: true, user: req.user });
});

app.use("/api", todoRouter);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
