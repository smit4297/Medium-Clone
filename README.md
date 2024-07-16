# Medium-Clone

This project consists of a backend service and a frontend application, simulating the core functionalities of a medium-style blog platform.

## Table of Contents

- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Additional Notes](#additional-notes)
- [Security Warning](#security-warning)

## Project Structure

```
project-root/
│
├── backend/
│   ├── .env
│   └── wrangler.toml
│
└── frontend/
    └── .env
```

## Setup Instructions

### Backend Setup

1. **Navigate to the backend directory:**

   ```sh
   cd backend
   ```

2. **Create a `.env` file in the backend directory with the following content:**

   ```env
   DATABASE_URL=YOUR_POSTGRES_DB_URL
   ```

3. **Ensure you have a `wrangler.toml` file with the following content: create prisma url from here(https://www.prisma.io/data-platform/accelerate)**

   ```env
   name = "backend"
   compatibility_date = "2023-12-01"
   [vars]
   DATABASE_URL=PRISMA_URL
   JWT_SECRET=YOUR_JWT_SECRET
   ```

4. **Install dependencies:**

   ```sh
   npm install
   ```

5. **Run Prisma migrations and generate the client:**

   ```sh
   npx prisma migrate dev --name init_schema
   npx prisma generate --no-engine
   ```

6. **Start the backend server:**

   ```sh
   npm start
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```sh
   cd frontend
   ```

2. **Create a `.env` file in the frontend directory with the following content:**

   ```env
   VITE_BACKEND_URL=YOUR_BACKEND_URL
   ```

3. **Install dependencies:**

   ```sh
   npm install
   ```

4. **Start the frontend development server:**

   ```sh
   npm run dev
   ```

## Additional Notes

- Ensure you have Node.js and npm installed on your system.
- The backend uses Cloudflare Workers (as indicated by the `wrangler.toml` file).
- The frontend uses Prisma for database access.
- Make sure to keep your `.env` files secure and do not commit them to version control.

## Security Warning

The provided configuration files contain sensitive information such as database URLs and API keys. In a production environment, ensure these are kept secure and not exposed in public repositories.
