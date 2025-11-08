const { getDb } = require('../helpers/mongo');
const { ObjectId } = require('mongodb');

async function getAllProducts() {
  if (!getAllProducts._cache) {
    getAllProducts._cache = { ts: 0, data: null };
  }
  const now = Date.now();
  const ttl = 60 * 1000; // 60s
  if (getAllProducts._cache.data && now - getAllProducts._cache.ts < ttl) {
    return getAllProducts._cache.data;
  }

  const db = await getDb();
  const products = db.collection('products');
  const list = await products.find({}, { projection: { name: 1, price: 1 } }).toArray();
  const result = list.map(p => ({ id: p._id, name: p.name, price: p.price }));
  getAllProducts._cache = { ts: now, data: result };
  return result;
}

module.exports = { getAllProducts };
