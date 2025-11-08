const express = require('express');
const cors = require('cors');
const { getDb } = require('./helpers/mongo');
const productService = require('./services/productService');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

getDb()
  .then(async () => {
    const db = await getDb();
    console.log("Database connected");
    try {
      await db.collection('cart').createIndex({ userEmail: 1 });
      await db.collection('cart').createIndex({ productId: 1 });
      await db.collection('histories').createIndex({ email: 1 });
      console.log('Indexes ensured');
    } catch (err) {
      console.error('Index creation error', err);
    }
  })
  .catch(err => console.error('Mongo init error', err));

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
}

module.exports = app;
