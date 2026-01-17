import { Router } from 'express';
import { UserController, ProductController } from '../controllers';
import { authenticateToken } from '../middleware';

const router = Router();
const userController = new UserController();
const productController = new ProductController();

// ==================== USER ROUTES ====================
// Authentication routes
router.post('/auth/register', userController.register.bind(userController));
router.post('/auth/login', userController.login.bind(userController));

// User CRUD routes
router.get('/users', authenticateToken, userController.getAllUsers.bind(userController));
router.get('/users/:id', authenticateToken, userController.getUser.bind(userController));
router.post('/users', userController.createUser.bind(userController));
router.put('/users/:id', authenticateToken, userController.updateUser.bind(userController));
router.delete('/users/:id', authenticateToken, userController.deleteUser.bind(userController));
router.put('/users/:id/password', authenticateToken, userController.changePassword.bind(userController));

// ==================== PRODUCT ROUTES ====================
// Product CRUD routes
router.post('/products', authenticateToken, productController.createProduct.bind(productController));
router.get('/products', productController.getAllProducts.bind(productController));
router.get('/products/search', productController.searchProducts.bind(productController));
router.get('/products/:id', productController.getProduct.bind(productController));
router.put('/products/:id', authenticateToken, productController.updateProduct.bind(productController));
router.delete('/products/:id', authenticateToken, productController.deleteProduct.bind(productController));
router.patch('/products/:id/stock', authenticateToken, productController.updateProductStock.bind(productController));

export default router;