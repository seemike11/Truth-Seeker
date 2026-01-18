import express from 'express';
import path from 'path';
import router from './routes';

export const app = express();

// Middleware
app.use(express.json());

// Static web UI (served from /public)
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

// API routes
app.use('/api', router);