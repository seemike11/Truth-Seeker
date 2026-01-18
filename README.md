# Honest Govt App

A complete, production-ready Express.js application with user authentication, product management, and comprehensive API testing dashboard.

## 🎯 Features

### Authentication & Security
- User registration and login with JWT tokens
- Password hashing with bcryptjs
- Email validation and password strength requirements
- Token-based authorization on protected endpoints
- Secure password change functionality

### User Management
- User registration and authentication
- Get user profiles
- Update user information
- Delete user accounts
- List all users (admin access)

### Product Management
- Create and manage products
- Full CRUD operations (Create, Read, Update, Delete)
- Product categorization and filtering
- Product search functionality
- Stock management
- Category-based filtering

### API & Testing
- RESTful API with comprehensive endpoints
- Interactive API testing dashboard (built-in web UI)
- Full Jest test suite with 20+ test cases
- Error handling and validation
- CORS support
- Request logging middleware

## 📁 Project Structure

```
replit-to-vscode-app/
├── src/
│   ├── index.ts              # Express server setup with middleware
│   ├── controllers/          # Request handlers (UserController, ProductController)
│   ├── services/             # Business logic (UserService, ProductService)
│   ├── models/               # Data models and interfaces
│   ├── routes/               # API route definitions
│   ├── middleware/           # Authentication, error handling, logging
│   ├── types/                # TypeScript interfaces
│   └── utils/                # Utilities (crypto, JWT, validation)
├── public/
│   └── index.html            # Interactive API testing dashboard
├── tests/
│   └── app.test.ts           # Comprehensive test suite
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd replit-to-vscode-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file (optional):
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:3000`

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/register      # Register a new user
POST   /api/auth/login         # Login user
```

<<<<<<< HEAD
### Users (Protected - Requires JWT Token)
```
GET    /api/users              # Get all users
GET    /api/users/:id          # Get user by ID
POST   /api/users              # Create new user
PUT    /api/users/:id          # Update user
DELETE /api/users/:id          # Delete user
PUT    /api/users/:id/password # Change password
```
=======
### Render Quickstart (recommended)
1. **Push to GitHub** (Render deploys from GitHub).
2. **Create a new Web Service** in Render and select this repo.
3. Render will read `render.yaml` automatically. If asked for commands:
   - **Build command:** `npm ci && npm run build`
   - **Start command:** `npm start`
4. After the deploy is live, use the Render dashboard to **add your custom domain**.
5. In Squarespace DNS, add the **CNAME/A records** that Render provides for your domain.
6. Wait for DNS to propagate (usually minutes, sometimes up to 24 hours).

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.
>>>>>>> cb93d563e04e750c8f5cd6a30a8e9cb6071b705f

### Products
```
POST   /api/products           # Create product (requires auth)
GET    /api/products           # Get all products
GET    /api/products/:id       # Get product by ID
GET    /api/products/search    # Search products
PUT    /api/products/:id       # Update product (requires auth)
DELETE /api/products/:id       # Delete product (requires auth)
PATCH  /api/products/:id/stock # Update product stock (requires auth)
```

### Utilities
```
GET    /health                 # Health check endpoint
```

## 📝 API Examples

### Register User
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

### Create Product (Requires Auth)
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1299.99,
    "category": "Electronics",
    "stock": 50
  }'
```

## 🧪 Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

### Test Coverage
The test suite includes:
- Authentication tests (registration, login, validation)
- User management tests (CRUD operations)
- Product management tests (CRUD operations)
- Search and filter functionality tests
- Error handling and edge case tests
- Authorization tests (protected endpoints)

## 🎨 Interactive Dashboard

Open `http://localhost:3000` in your browser to access the interactive API testing dashboard. The dashboard includes:

- **Authentication Section**: Register and login users
- **User Management**: Create, read, update, delete users
- **Product Management**: Manage products with full CRUD operations
- **Real-time Response Display**: See API responses instantly
- **Token Management**: View and manage JWT tokens
- **Search & Filter**: Test product search and category filtering

## 🔒 Security Features

- **Password Hashing**: Bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Email Validation**: RFC 5322 compliant email validation
- **Password Requirements**: Minimum 8 characters with uppercase, lowercase, and numbers
- **Protected Routes**: Authentication middleware on sensitive endpoints
- **CORS Support**: Configurable cross-origin requests
- **Error Handling**: Comprehensive error responses with proper HTTP status codes

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-key

# Security
BCRYPT_ROUNDS=10
CORS_ORIGIN=*
```

## 📦 Dependencies

### Production
- `express`: Web framework
- `jsonwebtoken`: JWT authentication
- `bcryptjs`: Password hashing
- `dotenv`: Environment variable management
- `typescript`: Type safety
- `ts-node`: TypeScript runtime

### Development
- `jest`: Testing framework
- `ts-jest`: TypeScript support for Jest
- `supertest`: HTTP assertion library
- `@types/*`: TypeScript type definitions

## 🚢 Deployment

### Deploy to Render

1. Push your repository to GitHub
2. Connect to Render.com
3. Create a new Web Service from the repository
4. The `render.yaml` file will automatically configure the deployment
5. Set environment variables in Render dashboard
6. Deploy!

### Deploy to Heroku

1. Install Heroku CLI
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create a new app:
   ```bash
   heroku create your-app-name
   ```
4. Set environment variables:
   ```bash
   heroku config:set JWT_SECRET=your-secret-key
   ```
5. Deploy:
   ```bash
   git push heroku main
   ```

## 📖 Development

### Build
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Run Development Server
```bash
npm run dev
```

## 📄 Data Validation

### User Registration
- Name: Required, string
- Email: Required, valid email format
- Password: Required, minimum 8 characters, uppercase + lowercase + number
- Confirm Password: Must match password

### Product Creation
- Name: Required, string
- Description: Required, string
- Price: Required, positive number
- Category: Required, string
- Stock: Required, non-negative integer

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in .env or command line
PORT=3001 npm run dev
```

### Dependencies Not Installing
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Tests Failing
```bash
# Run tests with verbose output
npm test -- --verbose
```

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

**Happy Coding! 🎉**
