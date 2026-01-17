# Honest Govt App - API Documentation

## Overview
This document describes all available API endpoints, their parameters, responses, and usage examples.

## Base URL
```
http://localhost:3000/api
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register User
Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "password": "string (required, min 8 chars, uppercase, lowercase, number)",
  "confirmPassword": "string (required, must match password)"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-01-17T00:00:00.000Z",
      "updatedAt": "2026-01-17T00:00:00.000Z"
    },
    "expiresIn": 86400
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid email format",
  "code": 400
}
```

### Login User
Authenticate user and receive JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "expiresIn": 86400
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password",
  "code": 401
}
```

---

## User Management Endpoints

### Get All Users
Retrieve all user accounts. **Requires Authentication**

**Endpoint:** `GET /users`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Retrieved 5 users",
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-01-17T00:00:00.000Z"
    }
  ]
}
```

### Get User by ID
Retrieve a specific user. **Requires Authentication**

**Endpoint:** `GET /users/:id`

**Parameters:**
- `id` (path): User ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-01-17T00:00:00.000Z",
    "updatedAt": "2026-01-17T00:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "User not found",
  "code": 404
}
```

### Create User
Create a new user (admin endpoint).

**Endpoint:** `POST /users`

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "password": "string (required)",
  "confirmPassword": "string (required)"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "2",
      "name": "Jane Doe",
      "email": "jane@example.com"
    },
    "expiresIn": 86400
  }
}
```

### Update User
Update user information. **Requires Authentication**

**Endpoint:** `PUT /users/:id`

**Parameters:**
- `id` (path): User ID

**Request Body:**
```json
{
  "name": "string (optional)",
  "email": "string (optional)"
}
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "1",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "updatedAt": "2026-01-17T12:00:00.000Z"
  }
}
```

### Delete User
Delete a user account. **Requires Authentication**

**Endpoint:** `DELETE /users/:id`

**Parameters:**
- `id` (path): User ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": null
}
```

### Change Password
Change user password. **Requires Authentication**

**Endpoint:** `PUT /users/:id/password`

**Parameters:**
- `id` (path): User ID

**Request Body:**
```json
{
  "oldPassword": "string (required)",
  "newPassword": "string (required)"
}
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully",
  "data": null
}
```

---

## Product Management Endpoints

### Create Product
Create a new product. **Requires Authentication**

**Endpoint:** `POST /products`

**Request Body:**
```json
{
  "name": "string (required)",
  "description": "string (required)",
  "price": "number (required, positive)",
  "category": "string (required)",
  "stock": "number (required, non-negative)"
}
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1299.99,
    "category": "Electronics",
    "stock": 50,
    "createdAt": "2026-01-17T00:00:00.000Z",
    "updatedAt": "2026-01-17T00:00:00.000Z"
  }
}
```

### Get All Products
Retrieve all products with optional category filter.

**Endpoint:** `GET /products`

**Query Parameters:**
- `category` (optional): Filter by category

**Response (200):**
```json
{
  "success": true,
  "message": "Retrieved 10 products",
  "data": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop",
      "price": 1299.99,
      "category": "Electronics",
      "stock": 50
    }
  ]
}
```

### Get Product by ID
Retrieve a specific product.

**Endpoint:** `GET /products/:id`

**Parameters:**
- `id` (path): Product ID

**Response (200):**
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1299.99,
    "category": "Electronics",
    "stock": 50,
    "createdAt": "2026-01-17T00:00:00.000Z"
  }
}
```

### Search Products
Search products by name or description.

**Endpoint:** `GET /products/search`

**Query Parameters:**
- `q` (required): Search query

**Response (200):**
```json
{
  "success": true,
  "message": "Found 5 products",
  "data": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop",
      "price": 1299.99,
      "category": "Electronics",
      "stock": 50
    }
  ]
}
```

### Update Product
Update product information. **Requires Authentication**

**Endpoint:** `PUT /products/:id`

**Parameters:**
- `id` (path): Product ID

**Request Body:**
```json
{
  "name": "string (optional)",
  "description": "string (optional)",
  "price": "number (optional)",
  "category": "string (optional)",
  "stock": "number (optional)"
}
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": "1",
    "name": "Laptop Pro",
    "price": 1399.99,
    "updatedAt": "2026-01-17T12:00:00.000Z"
  }
}
```

### Update Product Stock
Update product stock quantity. **Requires Authentication**

**Endpoint:** `PATCH /products/:id/stock`

**Parameters:**
- `id` (path): Product ID

**Request Body:**
```json
{
  "quantity": "number (required, can be negative)"
}
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product stock updated successfully",
  "data": {
    "id": "1",
    "stock": 60,
    "updatedAt": "2026-01-17T12:00:00.000Z"
  }
}
```

### Delete Product
Delete a product. **Requires Authentication**

**Endpoint:** `DELETE /products/:id`

**Parameters:**
- `id` (path): Product ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": null
}
```

---

## General Endpoints

### Health Check
Check server status.

**Endpoint:** `GET /health`

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2026-01-17T00:00:00.000Z"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Description of the error",
  "code": 400
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No token provided",
  "code": 401
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Invalid or expired token",
  "code": 403
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found",
  "code": 404
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "code": 500
}
```

---

## Rate Limiting
Currently, there is no rate limiting implemented. Consider adding rate limiting middleware for production deployments.

## Pagination
Currently, endpoints return all records. Consider implementing pagination for large datasets.

## Sorting
Currently, no sorting options are available. Consider adding sort parameters.

---

## Example cURL Requests

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "confirmPassword": "SecurePass123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Get User (Authenticated)
```bash
curl -X GET http://localhost:3000/api/users/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Create Product (Authenticated)
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1299.99,
    "category": "Electronics",
    "stock": 50
  }'
```

### Search Products
```bash
curl -X GET "http://localhost:3000/api/products/search?q=laptop"
```

---

## Versioning
Current API Version: v1

---

**Last Updated:** January 17, 2026
