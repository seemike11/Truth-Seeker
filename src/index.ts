import express from 'express';
import path from 'path';
import router from './routes';
import { errorHandler, requestLogger } from './middleware';

export const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// CORS (if needed)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Static web UI (served from /public)
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

// API routes
<<<<<<< HEAD
app.use('/api', router);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
        code: 404,
    });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API Documentation:`);
    console.log(`- POST /api/auth/register - Register a new user`);
    console.log(`- POST /api/auth/login - Login user`);
    console.log(`- GET /api/users - Get all users (authenticated)`);
    console.log(`- GET /api/users/:id - Get user by ID (authenticated)`);
    console.log(`- PUT /api/users/:id - Update user (authenticated)`);
    console.log(`- DELETE /api/users/:id - Delete user (authenticated)`);
    console.log(`- POST /api/products - Create product (authenticated)`);
    console.log(`- GET /api/products - Get all products`);
    console.log(`- GET /api/products/:id - Get product by ID`);
    console.log(`- PUT /api/products/:id - Update product (authenticated)`);
    console.log(`- DELETE /api/products/:id - Delete product (authenticated)`);
});

export { app };
=======
app.use('/api', router);
>>>>>>> cb93d563e04e750c8f5cd6a30a8e9cb6071b705f
