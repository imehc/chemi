import {
  defineConfig,
  type PluginOption,
  splitVendorChunkPlugin,
  loadEnv,
} from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import unocss from 'unocss/vite';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import { insertHtml, h } from 'vite-plugin-insert-html';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import compress from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // https://github.com/vitejs/awesome-vite#plugins
  const envDir = 'env'; // 环境变量文件的文件夹，相对于项目的路径，也可以用 nodejs 函数拼接绝对路径
  const isProd = mode === 'production';
  const env = loadEnv(mode, envDir);

  const cesiumBaseUrl = env['VITE_CESIUM_BASE_URL'];
  const base = '/'; // 默认 base 是 '/'

  const plugins: Array<PluginOption> = [
    react(),
    eslint(),
    unocss(),
    splitVendorChunkPlugin(),
    viteExternalsPlugin(
      {
        // key 是要外部化的依赖名，value 是全局访问的名称，这里填写的是 'Cesium'
        // 意味着外部化后的 cesium 依赖可以通过 window['Cesium'] 访问；
        // 支持链式访问，参考此插件的文档
        cesium: 'Cesium',
      }
      // {
      //   disableInServe: true, // 开发模式时不外部化
      // }
    ),
    insertHtml({
      // 生产模式使用 CDN 或已部署的 CesiumJS 在线库链接，开发模式用拷贝的库文件，根据 VITE_CESIUM_BASE_URL 自动拼接
      head: [
        h('script', {
          // 因为涉及前端路径访问，所以开发模式最好显式拼接 base 路径，适配不同 base 路径的情况
          src: isProd
            ? `${cesiumBaseUrl}Cesium.js`
            : `${base}${cesiumBaseUrl}Cesium.js`,
        }),
      ],
    }),
  ];
  if (!isProd) {
    // 开发模式，复制 node_modules 下的 cesium 依赖
    const cesiumLibraryRoot = 'node_modules/cesium/Build/CesiumUnminified/';
    const cesiumLibraryCopyToRootPath = 'libs/cesium/'; // 相对于打包后的路径
    const cesiumStaticSourceCopyOptions = [
      'Assets',
      'ThirdParty',
      'Workers',
      'Widgets',
    ].map((dirName) => {
      return {
        src: `${cesiumLibraryRoot}${dirName}/*`, // 注意后面的 * 字符，文件夹全量复制
        dest: `${cesiumLibraryCopyToRootPath}${dirName}`,
      };
    });
    plugins.push(
      viteStaticCopy({
        targets: [
          // 主库文件，开发时选用非压缩版的 IIFE 格式主库文件
          {
            src: `${cesiumLibraryRoot}Cesium.js`,
            dest: cesiumLibraryCopyToRootPath,
          },
          // 四大静态文件夹
          ...cesiumStaticSourceCopyOptions,
        ],
      })
    );
  }
  plugins.push(
    compress({
      threshold: 10 * 1024, // 10KB 以下不压缩
    })
  );

  return {
    base,
    envDir,
    mode,
    plugins,
    server: {
      host: '0.0.0.0',
      port: 6012,
    },
    resolve: {
      alias: {
        // 设置别名后如果是typescript则必须在tsconfig.json中配置baseUrl和paths，否者ts类型会报错
        '~': resolve(__dirname, 'src'),
      },
    },
  };
});
