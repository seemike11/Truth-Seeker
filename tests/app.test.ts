import request from 'supertest';
import { app } from '../src/index'; // Adjust the import based on your app's structure

describe('App Tests', () => {
    it('should respond with a 200 status for the root endpoint', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });

    // Add more tests for specific routes, controllers, or services as needed
});