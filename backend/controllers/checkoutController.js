const cartService = require('../services/cartService');
const { v4: uuidv4 } = require('uuid');
const historyService = require('../services/historyService');

async function checkout(req, res, next) {
  try {
    const user = req.user;
    if (!user || !user.email) return res.status(401).json({ error: 'auth required' });

    const cart = await cartService.getCartItems(user.email);
    if (!cart.items.length) return res.status(400).json({ error: 'cart empty' });
    const total = cart.total;
    const receipt = { id: uuidv4(), name: user.name || '', email: user.email, total, timestamp: new Date().toISOString(), items: cart.items };

    await cartService.clearCart(user.email);
    await historyService.addReceiptForUser(user.email, receipt);
    res.json({ receipt });
  } catch (err) {
    next(err);
  }
}

module.exports = { checkout };
