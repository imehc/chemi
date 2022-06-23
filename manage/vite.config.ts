import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // https://github.com/vitejs/awesome-vite#plugins
  plugins: [
    react(),
  ],
  server: {
    host: '0.0.0.0',
    proxy:{
      '/apis': {
        target: 'https://v1.hitokoto.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apis/, '') // 不可以省略rewrite
      }
    }
  },
  resolve: {
    alias: {
      // 设置别名后如果是typescript则必须在tsconfig.json中配置baseUrl和paths，否者ts类型会报错
      '~': resolve(__dirname, 'src'),
    },
  },
});