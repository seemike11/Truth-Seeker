export interface User {
    _id?: string;
    id?: string;
    name: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Product {
    _id?: string;
    id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AuthResponse {
    token: string;
    user: Omit<User, 'password'>;
    expiresIn: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface CreateProductRequest {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
}

export interface UpdateProductRequest {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    stock?: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
    code?: number;
}

export interface JwtPayload {
    userId: string;
    email: string;
    iat?: number;
    exp?: number;
}