# Mock E-Com Cart — Vibe Commerce Coding Assignment

This repository contains a small full-stack shopping cart app (React frontend + Node/Express backend + MongoDB). It implements add/remove items, cart totals, and a mock checkout flow (no real payments). This version adds user auth (JWT) and stores user history in the database.

Quick run (dev):

1. Install dependencies for both backend and frontend

```bash
cd /backend
npm install
cd ../frontend
npm install
```

2. Start backend (runs on port 4000) and frontend (Vite dev server on 5173)

```bash
# In one terminal
cd /backend
npm run dev

# In another terminal
cd /frontend
npm run dev
```

Open http://localhost:5173 (frontend). API proxying is configured so requests to `/api` are forwarded to the backend.

What’s included

- Backend: Express server with REST endpoints:
  - POST /api/auth/register
  - POST /api/auth/login
  - GET /api/products
  - POST /api/cart (protected — requires JWT)
  - DELETE /api/cart/:id (protected — requires JWT)
  - GET /api/cart (protected — requires JWT)
  - POST /api/checkout (protected — requires JWT)
- Database: MongoDB (products seeded on first run)
- Frontend: Vite + React app with product grid, cart panel, login/register modal, checkout modal, and responsive layout
- Basic backend tests using Jest + Supertest (may need adapting to MongoDB)

Notes
- This is a mock assignment — checkout returns a receipt JSON and stores a receipt in the user's history. No payments or external services used.

Authentication and environment
- Register with `/api/auth/register` and login with `/api/auth/login` to receive a JWT. Protected endpoints require an `Authorization: Bearer <token>` header.
- By default the app expects a MongoDB instance at `mongodb://127.0.0.1:27017` and uses the database name `mock_ecom`. You can override with the `MONGO_URI` and `MONGO_DB` environment variables.
- Set `JWT_SECRET` to override the default development secret.

UI updates & animations
- The frontend UI was recently polished: modern product cards, sticky cart panel, a brand-aware navbar with Login/Profile/Logout, and responsive adjustments.
- Animations: adding an item triggers a short "bump" animation on the product card and shows a small "Added" mini-toast; completing checkout shows an animated checkmark success state. These are CSS-based and require no extra setup.

Quick walkthrough
1. Start the backend and frontend (see commands above).
2. Open the app at http://localhost:5173.
3. Click "Login / Signup" in the navbar to create an account or login. The modal shows a loading spinner while requests are in-flight.
4. Add items to the cart — watch the add animation and toast. The cart panel shows updated totals immediately.
5. Click "Checkout" in the cart panel while logged in — the checkout button disables while processing and upon success you'll see the animated receipt.
6. Visit "Profile" in the navbar to see your past receipts stored in the database.

Security note
- I noticed a MongoDB connection string present in `backend/helpers/mongo.js`. If that contains real credentials rotate them and prefer storing secrets in environment variables or a secrets manager. Do not commit credentials to git.

If you want, I can run the installs and start the dev servers here for a quick demo (I'll need a reachable MongoDB instance). Otherwise, run the commands above locally and I can help debug any startup errors.
