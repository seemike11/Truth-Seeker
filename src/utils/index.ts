import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Password hashing
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

// JWT token generation
export function generateToken(payload: object, expiresIn: string = '24h'): string {
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    return jwt.sign(payload, secret, { expiresIn });
}

// JWT token verification
export function verifyToken(token: string): any {
    try {
        const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

// Date formatting
export function formatDate(date: Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Email validation
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password validation
export function isValidPassword(password: string): boolean {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

// Generate error response
export function createErrorResponse(message: string, code: number = 400) {
    return {
        success: false,
        message,
        code,
    };
}

// Generate success response
export function createSuccessResponse<T>(data: T, message: string = 'Success') {
    return {
        success: true,
        message,
        data,
    };
}

// Sanitize user object
export function sanitizeUser(user: any) {
    const { password, ...sanitized } = user;
    return sanitized;
}

// Generate random ID
export function generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
}