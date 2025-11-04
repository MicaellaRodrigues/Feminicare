import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { userRoutes } from './routes/userRoutes';
import { authRoutes } from './routes/authRoutes';
import { professionalRoutes } from './routes/professionalRoutes';
import { articleRoutes } from './routes/articleRoutes';
import { contentRoutes } from './routes/contentRoutes';
import { searchRoutes } from './routes/searchRoutes';
import { errorHandler } from './middleware/errorHandler';
import { dbConnection } from './config/database';

// Load environment variables
dotenv.config();

// Initialize database connection
dbConnection.initialize();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/search', searchRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});