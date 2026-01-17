import { Request, Response } from 'express';
import { UserService, ProductService } from '../services';
import { createSuccessResponse, createErrorResponse, sanitizeUser } from '../utils';
import { RegisterRequest, LoginRequest, CreateProductRequest, UpdateProductRequest } from '../types';

const userService = new UserService();
const productService = new ProductService();

// ==================== USER CONTROLLER ====================
export class UserController {
    // Register a new user
    public async register(req: Request, res: Response): Promise<void> {
        try {
            const userData: RegisterRequest = req.body;
            const result = await userService.registerUser(userData);
            res.status(201).json(createSuccessResponse(result, 'User registered successfully'));
        } catch (error: any) {
            res.status(400).json(createErrorResponse(error.message, 400));
        }
    }

    // Login user
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const credentials: LoginRequest = req.body;
            const result = await userService.authenticateUser(credentials);
            res.status(200).json(createSuccessResponse(result, 'Login successful'));
        } catch (error: any) {
            res.status(401).json(createErrorResponse(error.message, 401));
        }
    }

    // Get user by ID
    public async getUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            const user = await userService.getUserById(userId);
            res.status(200).json(createSuccessResponse(user, 'User retrieved successfully'));
        } catch (error: any) {
            res.status(404).json(createErrorResponse(error.message, 404));
        }
    }

    // Get all users
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(createSuccessResponse(users, `Retrieved ${users.length} users`));
        } catch (error: any) {
            res.status(500).json(createErrorResponse(error.message, 500));
        }
    }

    // Create user (admin endpoint)
    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userData: RegisterRequest = req.body;
            const result = await userService.registerUser(userData);
            res.status(201).json(createSuccessResponse(result, 'User created successfully'));
        } catch (error: any) {
            res.status(400).json(createErrorResponse(error.message, 400));
        }
    }

    // Update user
    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            const updates = req.body;
            const user = await userService.updateUser(userId, updates);
            res.status(200).json(createSuccessResponse(user, 'User updated successfully'));
        } catch (error: any) {
            res.status(400).json(createErrorResponse(error.message, 400));
        }
    }

    // Delete user
    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            await userService.deleteUser(userId);
            res.status(200).json(createSuccessResponse(null, 'User deleted successfully'));
        } catch (error: any) {
            res.status(404).json(createErrorResponse(error.message, 404));
        }
    }

    // Change password
    public async changePassword(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            const { oldPassword, newPassword } = req.body;
            await userService.changePassword(userId, oldPassword, newPassword);
            res.status(200).json(createSuccessResponse(null, 'Password changed successfully'));
        } catch (error: any) {
            res.status(400).json(createErrorResponse(error.message, 400));
        }
    }
}

// ==================== PRODUCT CONTROLLER ====================
export class ProductController {
    // Create product
    public async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const productData: CreateProductRequest = req.body;
            const product = await productService.createProduct(productData);
            res.status(201).json(createSuccessResponse(product, 'Product created successfully'));
        } catch (error: any) {
            res.status(400).json(createErrorResponse(error.message, 400));
        }
    }

    // Get product by ID
    public async getProduct(req: Request, res: Response): Promise<void> {
        try {
            const productId = req.params.id;
            const product = await productService.getProductById(productId);
            res.status(200).json(createSuccessResponse(product, 'Product retrieved successfully'));
        } catch (error: any) {
            res.status(404).json(createErrorResponse(error.message, 404));
        }
    }

    // Get all products
    public async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const category = req.query.category as string;
            const products = await productService.getAllProducts(category);
            res.status(200).json(createSuccessResponse(products, `Retrieved ${products.length} products`));
        } catch (error: any) {
            res.status(500).json(createErrorResponse(error.message, 500));
        }
    }

    // Update product
    public async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const productId = req.params.id;
            const updates: UpdateProductRequest = req.body;
            const product = await productService.updateProduct(productId, updates);
            res.status(200).json(createSuccessResponse(product, 'Product updated successfully'));
        } catch (error: any) {
            res.status(400).json(createErrorResponse(error.message, 400));
        }
    }

    // Delete product
    public async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const productId = req.params.id;
            await productService.deleteProduct(productId);
            res.status(200).json(createSuccessResponse(null, 'Product deleted successfully'));
        } catch (error: any) {
            res.status(404).json(createErrorResponse(error.message, 404));
        }
    }

    // Search products
    public async searchProducts(req: Request, res: Response): Promise<void> {
        try {
            const query = req.query.q as string;
            if (!query) {
                res.status(400).json(createErrorResponse('Search query is required', 400));
                return;
            }
            const products = await productService.searchProducts(query);
            res.status(200).json(createSuccessResponse(products, `Found ${products.length} products`));
        } catch (error: any) {
            res.status(500).json(createErrorResponse(error.message, 500));
        }
    }

    // Update product stock
    public async updateProductStock(req: Request, res: Response): Promise<void> {
        try {
            const productId = req.params.id;
            const { quantity } = req.body;
            if (quantity === undefined) {
                res.status(400).json(createErrorResponse('Quantity is required', 400));
                return;
            }
            const product = await productService.updateProductStock(productId, quantity);
            res.status(200).json(createSuccessResponse(product, 'Product stock updated successfully'));
        } catch (error: any) {
            res.status(400).json(createErrorResponse(error.message, 400));
        }
    }
}