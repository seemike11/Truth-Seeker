import { UserModel, ProductModel, IUser, IProduct } from '../models';
import { hashPassword, comparePasswords, generateToken, isValidEmail, isValidPassword, sanitizeUser } from '../utils';
import { User, Product, RegisterRequest, LoginRequest, AuthResponse } from '../types';

// In-memory storage (replace with database in production)
let users: User[] = [];
let products: Product[] = [];
let userIdCounter = 1;
let productIdCounter = 1;

export class UserService {
    // Register a new user
    async registerUser(userData: RegisterRequest): Promise<AuthResponse> {
        // Validate input
        if (!userData.name || !userData.email || !userData.password) {
            throw new Error('Missing required fields: name, email, password');
        }

        if (!isValidEmail(userData.email)) {
            throw new Error('Invalid email format');
        }

        if (!isValidPassword(userData.password)) {
            throw new Error('Password must be at least 8 characters with uppercase, lowercase, and number');
        }

        if (userData.password !== userData.confirmPassword) {
            throw new Error('Passwords do not match');
        }

        // Check if user already exists
        const existingUser = users.find(u => u.email === userData.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await hashPassword(userData.password);

        // Create new user
        const newUser: User = {
            id: String(userIdCounter++),
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        users.push(newUser);

        // Generate token
        const token = generateToken({
            userId: newUser.id,
            email: newUser.email,
        });

        return {
            token,
            user: sanitizeUser(newUser),
            expiresIn: 86400, // 24 hours
        };
    }

    // Authenticate user
    async authenticateUser(credentials: LoginRequest): Promise<AuthResponse> {
        const { email, password } = credentials;

        // Validate input
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        // Find user
        const user = users.find(u => u.email === email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Verify password
        const isPasswordValid = await comparePasswords(password, user.password || '');
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        // Generate token
        const token = generateToken({
            userId: user.id,
            email: user.email,
        });

        return {
            token,
            user: sanitizeUser(user),
            expiresIn: 86400, // 24 hours
        };
    }

    // Get user by ID
    async getUserById(userId: string): Promise<User> {
        const user = users.find(u => u.id === userId);
        if (!user) {
            throw new Error('User not found');
        }
        return sanitizeUser(user);
    }

    // Get all users
    async getAllUsers(): Promise<User[]> {
        return users.map(sanitizeUser);
    }

    // Update user
    async updateUser(userId: string, updates: Partial<User>): Promise<User> {
        const user = users.find(u => u.id === userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Update fields
        if (updates.name) user.name = updates.name;
        if (updates.email) {
            if (!isValidEmail(updates.email)) {
                throw new Error('Invalid email format');
            }
            user.email = updates.email;
        }

        user.updatedAt = new Date();
        return sanitizeUser(user);
    }

    // Delete user
    async deleteUser(userId: string): Promise<void> {
        const index = users.findIndex(u => u.id === userId);
        if (index === -1) {
            throw new Error('User not found');
        }
        users.splice(index, 1);
    }

    // Change password
    async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
        const user = users.find(u => u.id === userId);
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await comparePasswords(oldPassword, user.password || '');
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        if (!isValidPassword(newPassword)) {
            throw new Error('Password must be at least 8 characters with uppercase, lowercase, and number');
        }

        user.password = await hashPassword(newPassword);
        user.updatedAt = new Date();
    }
}

export class ProductService {
    // Create a new product
    async createProduct(productData: IProduct): Promise<Product> {
        if (!productData.name || !productData.description || productData.price === undefined || !productData.category || productData.stock === undefined) {
            throw new Error('Missing required fields');
        }

        const newProduct: Product = {
            id: String(productIdCounter++),
            name: productData.name,
            description: productData.description,
            price: productData.price,
            category: productData.category,
            stock: productData.stock,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        products.push(newProduct);
        return newProduct;
    }

    // Get product by ID
    async getProductById(productId: string): Promise<Product> {
        const product = products.find(p => p.id === productId);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    // Get all products
    async getAllProducts(category?: string): Promise<Product[]> {
        if (category) {
            return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }
        return products;
    }

    // Update product
    async updateProduct(productId: string, updates: Partial<Product>): Promise<Product> {
        const product = products.find(p => p.id === productId);
        if (!product) {
            throw new Error('Product not found');
        }

        if (updates.name) product.name = updates.name;
        if (updates.description) product.description = updates.description;
        if (updates.price !== undefined) product.price = updates.price;
        if (updates.category) product.category = updates.category;
        if (updates.stock !== undefined) product.stock = updates.stock;

        product.updatedAt = new Date();
        return product;
    }

    // Delete product
    async deleteProduct(productId: string): Promise<void> {
        const index = products.findIndex(p => p.id === productId);
        if (index === -1) {
            throw new Error('Product not found');
        }
        products.splice(index, 1);
    }

    // Search products
    async searchProducts(query: string): Promise<Product[]> {
        return products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Get products by category
    async getProductsByCategory(category: string): Promise<Product[]> {
        return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Update product stock
    async updateProductStock(productId: string, quantity: number): Promise<Product> {
        const product = products.find(p => p.id === productId);
        if (!product) {
            throw new Error('Product not found');
        }

        product.stock += quantity;
        product.updatedAt = new Date();
        return product;
    }
}