import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 6012
  },
  resolve: {
    alias: {
      '#': resolve(__dirname, './styled-system'),
      '~': resolve(__dirname, './src'),
    }
  }
})
