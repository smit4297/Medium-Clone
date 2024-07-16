```markdown
# Medium-Clone

This project consists of a backend service and a frontend application.

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

1. Navigate to the backend directory:

   cd backend

2. Create a `.env` file in the backend directory with the following content:
   ```env
   DATABASE_URL=YOUR_POSTGRES-DB-URL
   ```

3. Ensure you have a `wrangler.toml` file with the following content:
   ```toml
   name = "backend"
   compatibility_date = "2023-12-01"
   [vars]
   DATABASE_URL=prisma-accelerate-url
   JWT_SECRET = YOUR_JWT_SECRET
   ```

4. Install dependencies:
   ```sh
   npm install
   ```

5. After adding the database configuration, run the following Prisma commands:
   ```sh
   npx prisma migrate dev --name init_schema
   npx prisma generate --no-engine
   ```

6. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

2. Create a `.env` file in the frontend directory with the following content:
   ```env
   VITE_BACKEND_URL=YOUR_BACKEND_URL
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Start the frontend development server:
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
```

This README now includes the steps to run Prisma migrations and generate the client. If you have any additional specific requirements or changes, feel free to let me know!