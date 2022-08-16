import path from 'path';

import { defineConfig, normalizePath } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import viteStylelint from '@amatlash/vite-plugin-stylelint';
import viteEslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import viteImagemin from 'vite-plugin-imagemin';

const variablePath = normalizePath(path.resolve('./src/variable.scss'));

export default ({ mode }) => {
  const isProduction = mode === 'production' ? true : false;
  
  return defineConfig({
    server: {
      proxy: {
        // 代理配置
        // '/api/': {
        //   target: 'http://127.0.0.1:3300/',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, '')
        // }
      }
    },
    resolve: {
      // 别名
      alias: {
        '@': path.join(__dirname, 'src'),
        '@assets': path.join(__dirname, 'src/assets')
      }
    },
    // css 相关的配置
    css: {
      // 预处理
      preprocessorOptions: {
        scss: {
          // additionalData 所对应的内容会自动引入到每个scss文件的开头
          additionalData: `@import "${variablePath}";`
        }
      },

      // 模块
      modules: {
        // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
        // 其中，name 表示当前文件名，local 表示类名
        generateScopedName: '[name]__[local]___[hash:base64:6]'
      },

      // 后处理
      postcss: {
        plugins: [
          autoprefixer({
            // 指定目标浏览器
            overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
          })
        ]
      }
    },
    // 插件
    plugins: [
      react(),
      viteEslint(),
      viteStylelint({
        exclude: /dist|node_modules/
      }),
      svgr(),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7
        },
        mozjpeg: {
          quality: 20
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox'
            },
            {
              name: 'removeEmptyAttrs',
              active: false
            }
          ]
        }
      })
    ]
  });
};
