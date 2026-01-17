import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils';
import { JwtPayload } from '../types';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

// Authentication middleware
export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        res.status(401).json({
            success: false,
            message: 'No token provided',
            code: 401,
        });
        return;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        res.status(403).json({
            success: false,
            message: 'Invalid or expired token',
            code: 403,
        });
        return;
    }

    req.user = decoded;
    next();
}

// Error handling middleware
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    console.error('Error:', err);

    const status = err.status || 500;
    const message = err.message || 'Internal server error';

    res.status(status).json({
        success: false,
        message,
        code: status,
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
}

// Logging middleware
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
}
