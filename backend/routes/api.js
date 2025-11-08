const express = require('express');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const checkoutController = require('../controllers/checkoutController');
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');
const historyController = require('../controllers/historyController');

const router = express.Router();

// public
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/products', productController.getProducts);

// protected (require JWT)
router.post('/cart', requireAuth, cartController.addCart);
router.delete('/cart/:id', requireAuth, cartController.deleteCart);
router.get('/cart', requireAuth, cartController.getCart);
router.post('/checkout', requireAuth, checkoutController.checkout);
router.get('/history', requireAuth, historyController.getHistory);

module.exports = router;
