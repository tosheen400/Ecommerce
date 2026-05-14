# MERN Ecommerce

Full-stack ecommerce site built with **MongoDB, Express, React, Node.js**.

## Features
- User auth (register / login) with JWT
- Product listing & detail pages
- Shopping cart (persisted in localStorage)
- Place orders (auth required)
- Seed script for sample products

## Project Structure
```
backend/    Express + MongoDB API
frontend/   React + Vite + Tailwind UI
```

## Quick Start

### 1. Backend
```bash
cd backend
cp .env.example .env        # then edit MONGO_URI and JWT_SECRET
npm install
npm run seed                # optional: populate sample products
npm run dev                 # runs on http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev                 # runs on http://localhost:5173
```

## Environment Variables (backend/.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```

## API Endpoints
| Method | Path                  | Auth | Description           |
|--------|-----------------------|------|-----------------------|
| POST   | /api/auth/register    | No   | Register user         |
| POST   | /api/auth/login       | No   | Login user            |
| GET    | /api/products         | No   | List all products     |
| GET    | /api/products/:id     | No   | Get product by id     |
| POST   | /api/products         | Yes  | Create product (admin)|
| GET    | /api/orders           | Yes  | List user orders      |
| POST   | /api/orders           | Yes  | Place new order       |

## License
MIT
