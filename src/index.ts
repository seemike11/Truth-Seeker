import express from 'express';
import path from 'path';
import { logMissingEnvVars } from './config';
import router from './routes';

export const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Static web UI (served from /public)
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

// API routes
app.use('/api', router);

if (require.main === module) {
    logMissingEnvVars();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
