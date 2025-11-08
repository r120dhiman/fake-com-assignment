const historyService = require('../services/historyService');

async function getHistory(req, res, next) {
  try {
    const user = req.user;
    if (!user || !user.email) return res.status(401).json({ error: 'auth required' });
    const receipts = await historyService.getHistory(user.email);
    res.json({ receipts });
  } catch (err) {
    next(err);
  }
}

module.exports = { getHistory };
