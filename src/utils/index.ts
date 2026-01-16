export function formatDate(date: Date, format: string): string {
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

export function generateToken(payload: object, secret: string, expiresIn: string): string {
    const jwt = require('jsonwebtoken');
    return jwt.sign(payload, secret, { expiresIn });
}