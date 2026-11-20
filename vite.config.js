import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/commerce-dashboard-demo/'', // Change this if your GitHub repository has a different name.
});
