const cartService = require('../services/cartService');


async function addCart(req, res, next) {
  try {
    const { productId, qty } = req.body;
    if (!productId || !qty || qty <= 0) return res.status(400).json({ error: 'productId and positive qty required' });
    // require authenticated user
    const user = req.user;
    if (!user || !user.email) return res.status(401).json({ error: 'auth required' });
    const item = await cartService.addCartItem(user.email, productId, qty);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

async function deleteCart(req, res, next) {
  try {
    const id = req.params.id;
    const user = req.user;
    if (!user || !user.email) return res.status(401).json({ error: 'auth required' });
    const changes = await cartService.deleteCartItem(id, user.email);
    if (!changes) return res.status(404).json({ error: 'not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

async function getCart(req, res, next) {
  try {
    const user = req.user;
    if (!user || !user.email) return res.status(401).json({ error: 'auth required' });
    const cart = await cartService.getCartItems(user.email);
    res.json(cart);
  } catch (err) {
    next(err);
  }
}

module.exports = { addCart, deleteCart, getCart };
