import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import progress from 'vite-plugin-progress'
import windiCSS from 'vite-plugin-windicss'
import cesium from 'vite-plugin-cesium';
// import { qrcode } from 'vite-plugin-qrcode';// 在服务器启动时显示 QR 码
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // https://github.com/vitejs/awesome-vite#plugins
  plugins: [
    react(),
    progress(),
    windiCSS(),
    cesium(),
    // qrcode(),
  ],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/apis': {
        target: 'https://v1.hitokoto.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apis/, '') // 不可以省略rewrite
      },
      // 高德地图跨域
      '^/appmaptile': {
        target: 'https://webst02.is.autonavi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/appmaptile/, '/appmaptile')
      },
      '^/empty': {
        target: 'https://webst02.is.autonavi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/empty/, '/empty')
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