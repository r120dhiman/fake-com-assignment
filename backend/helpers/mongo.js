const { MongoClient } = require('mongodb');
const DEFAULT_URI = 'mongodb+srv://r120dhiman:gt0JpVANLFfF6U9X@validate-your-certifica.2p3gc.mongodb.net/';
const DB_NAME = process.env.MONGO_DB || 'mock_ecom';

let client;

async function connect() {
  if (client && client.isConnected && client.isConnected()) return client;
  client = new MongoClient(DEFAULT_URI, { maxPoolSize: 10 });
  await client.connect();
  return client;
}

async function getDb() {
  const c = await connect();
  return c.db(DB_NAME);
}

module.exports = { connect, getDb };
