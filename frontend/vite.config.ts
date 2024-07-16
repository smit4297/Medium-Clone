import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Load env file based on mode
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
