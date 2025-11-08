const { getDb } = require('../helpers/mongo');

// history collection: one doc per user: { email, receipts: [ { id, total, timestamp, items } ] }

async function addReceiptForUser(email, receipt) {
  const db = await getDb();
  const histories = db.collection('histories');
  await histories.updateOne({ email }, { $push: { receipts: receipt } }, { upsert: true });
}

async function getHistory(email) {
  const db = await getDb();
  const histories = db.collection('histories');
  const doc = await histories.findOne({ email });
  return doc ? doc.receipts || [] : [];
}

module.exports = { addReceiptForUser, getHistory };
