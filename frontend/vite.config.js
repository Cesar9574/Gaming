import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Puerto fijo 5173 porque el backend solo acepta CORS de ese origen exacto
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true },
});
