import request from 'supertest';
import { app } from '../src/index';

describe('Honest Govt App - API Tests', () => {
    let authToken: string = '';
    let userId: string = '';
    let productId: string = '';

    // ==================== AUTHENTICATION TESTS ====================
    describe('Authentication', () => {
        it('should register a new user', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'John Doe',
                    email: 'john@example.com',
                    password: 'Password123',
                    confirmPassword: 'Password123',
                });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data.token).toBeDefined();
            expect(response.body.data.user.email).toBe('john@example.com');

            authToken = response.body.data.token;
            userId = response.body.data.user.id;
        });

        it('should not register with invalid email', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Jane Doe',
                    email: 'invalid-email',
                    password: 'Password123',
                    confirmPassword: 'Password123',
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should not register with weak password', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Jane Doe',
                    email: 'jane@example.com',
                    password: 'weak',
                    confirmPassword: 'weak',
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should login with valid credentials', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'john@example.com',
                    password: 'Password123',
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.token).toBeDefined();
        });

        it('should not login with invalid credentials', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'john@example.com',
                    password: 'WrongPassword',
                });

            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
        });
    });

    // ==================== USER TESTS ====================
    describe('User Management', () => {
        it('should get user by ID with authentication', async () => {
            const response = await request(app)
                .get(`/api/users/${userId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.email).toBe('john@example.com');
        });

        it('should not get user without authentication', async () => {
            const response = await request(app)
                .get(`/api/users/${userId}`);

            expect(response.status).toBe(401);
        });

        it('should get all users', async () => {
            const response = await request(app)
                .get('/api/users')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should update user information', async () => {
            const response = await request(app)
                .put(`/api/users/${userId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: 'John Smith',
                    email: 'john.smith@example.com',
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBe('John Smith');
        });

        it('should not update non-existent user', async () => {
            const response = await request(app)
                .put('/api/users/nonexistent')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ name: 'Test' });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    // ==================== PRODUCT TESTS ====================
    describe('Product Management', () => {
        it('should create a new product', async () => {
            const response = await request(app)
                .post('/api/products')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: 'Laptop',
                    description: 'High-performance laptop',
                    price: 1299.99,
                    category: 'Electronics',
                    stock: 50,
                });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBe('Laptop');

            productId = response.body.data.id;
        });

        it('should not create product without authentication', async () => {
            const response = await request(app)
                .post('/api/products')
                .send({
                    name: 'Phone',
                    description: 'Smartphone',
                    price: 799.99,
                    category: 'Electronics',
                    stock: 100,
                });

            expect(response.status).toBe(401);
        });

        it('should get product by ID', async () => {
            const response = await request(app)
                .get(`/api/products/${productId}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBe('Laptop');
        });

        it('should get all products', async () => {
            const response = await request(app)
                .get('/api/products');

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should filter products by category', async () => {
            const response = await request(app)
                .get('/api/products?category=Electronics');

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should search products', async () => {
            const response = await request(app)
                .get('/api/products/search?q=Laptop');

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should update product', async () => {
            const response = await request(app)
                .put(`/api/products/${productId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    price: 1199.99,
                    stock: 30,
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.price).toBe(1199.99);
        });

        it('should update product stock', async () => {
            const response = await request(app)
                .patch(`/api/products/${productId}/stock`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({ quantity: 10 });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should delete product', async () => {
            const response = await request(app)
                .delete(`/api/products/${productId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should not get deleted product', async () => {
            const response = await request(app)
                .get(`/api/products/${productId}`);

            expect(response.status).toBe(404);
        });
    });

    // ==================== GENERAL TESTS ====================
    describe('General Endpoints', () => {
        it('should respond to health check', async () => {
            const response = await request(app)
                .get('/health');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('ok');
        });

        it('should return 404 for non-existent endpoint', async () => {
            const response = await request(app)
                .get('/api/nonexistent');

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });
    });

    // ==================== EDGE CASES ====================
    describe('Edge Cases', () => {
        it('should handle missing required fields', async () => {
            const response = await request(app)
                .post('/api/products')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ name: 'Incomplete Product' });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should handle invalid JSON in request body', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .set('Content-Type', 'application/json')
                .send('invalid json');

            expect(response.status).toBeGreaterThanOrEqual(400);
        });

        it('should delete user and clean up', async () => {
            // Create a new user to delete
            const registerRes = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Temp User',
                    email: 'temp@example.com',
                    password: 'TempPass123',
                    confirmPassword: 'TempPass123',
                });

            const tempUserId = registerRes.body.data.user.id;
            const tempToken = registerRes.body.data.token;

            // Delete the user
            const deleteRes = await request(app)
                .delete(`/api/users/${tempUserId}`)
                .set('Authorization', `Bearer ${tempToken}`);

            expect(deleteRes.status).toBe(200);
            expect(deleteRes.body.success).toBe(true);

            // Verify user is deleted
            const getRes = await request(app)
                .get(`/api/users/${tempUserId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(getRes.status).toBe(404);
        });
    });
});