const { getDb } = require('../helpers/mongo');
const { ObjectId } = require('mongodb');

// Cart documents: { _id:ObjectId, userEmail: string, productId: string, qty: number }

async function addCartItem(userEmail, productId, qty) {
  const db = await getDb();
  const carts = db.collection('cart');
  // Use upsert to avoid duplicate rows and reduce reads (increment qty if exists)
  const res = await carts.findOneAndUpdate(
    { userEmail, productId },
    { $inc: { qty: qty } },
    { upsert: true, returnDocument: 'after' }
  );
  // res.value contains the document after update/insert
  const doc = res.value;
  return { id: doc._id.toString(), userEmail: doc.userEmail, productId: doc.productId, qty: doc.qty };
}

async function deleteCartItem(id, userEmail) {
  const db = await getDb();
  const carts = db.collection('cart');
  const res = await carts.deleteOne({ _id: new ObjectId(id), userEmail });
  return res.deletedCount;
}

async function getCartItems(userEmail) {
  const db = await getDb();
  const carts = db.collection('cart');
  const products = db.collection('products');
  const rows = await carts.find({ userEmail }).toArray();
  if (!rows.length) return { items: [], total: 0 };

  // Batch product lookup to avoid N+1 queries
  const productIds = [...new Set(rows.map(r => r.productId))];
  const productDocs = await products.find({ _id: { $in: productIds } }).toArray();
  const productMap = new Map(productDocs.map(p => [p._id, p]));

  const items = rows.map(r => {
    const p = productMap.get(r.productId);
    if (!p) return null;
    return { id: r._id.toString(), productId: r.productId, name: p.name, price: p.price, qty: r.qty };
  }).filter(Boolean);
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  return { items, total };
}

async function clearCart(userEmail) {
  const db = await getDb();
  const carts = db.collection('cart');
  await carts.deleteMany({ userEmail });
}

module.exports = { addCartItem, deleteCartItem, getCartItems, clearCart };
