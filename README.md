# 使用 vite 创建 react 项目模板

## 样式方案

本模板采用 预处理器 sass/scss + cssModule + postcss 的方案

1. 安装

- pnpm i sass -D
- pnpm i postcss -D
- pnpm i autoprefixer -D

2. 配置

- 由于 vite 对 sass/scss 或者 less 有开箱即用，所以此处的配置指的是一些额外的优化

```js
// vite.config.ts
import path from 'path';

import { normalizePath } from 'vite';
import autoprefixer from 'autoprefixer';

const variablePath = normalizePath(path.resolve('./src/variable.scss'));

export default defineConfig({
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
      generateScopedName: '[name]__[local]___[hash:base64:5]'
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
  }
});
```

## 代码规范

采用 ESLint + Prettier + Stylelint + Commitlint + husky + lint-staged + vscode 插件

1. 安装

- pnpm i eslint -D
- npx eslint --init
- pnpm i eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest -D
- pnpm i prettier -D
- pnpm i eslint-config-prettier eslint-plugin-prettier -D
- pnpm i vite-plugin-eslint -D
- pnpm i stylelint stylelint-prettier stylelint-config-prettier stylelint-config-recess-order stylelint-config-standard stylelint-config-standard-scss -D
- pnpm i @amatlash/vite-plugin-stylelint -D

2. 配置

```js
// vite.config.ts
// 有所省略
import viteStylelint from '@amatlash/vite-plugin-stylelint';
import viteEslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    viteStylelint({
      exclude: /dist|node_modules/
    }),
    viteEslint()
  ]
});
```

3. 提交
   Husky + lint-staged

- pnpm i husky -D
- npx husky install
- npx husky add .husky/pre-commit "npm run lint"
  > 仅仅这样是不行的这样会对全量代码进行 lint 检查，项目后期提交会越来越慢，所以需要 lint-staged
- pnpm i -D lint-staged
- npx --no -- lint-staged
- pnpm i commitlint @commitlint/cli @commitlint/config-conventional -D
- npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"

## 静态资源

1. 图片

- pnpm i vite-plugin-imagemin -D

2. svg

- pnpm i vite-plugin-svgr -D

3. json
4. worker

> 参考资料
>
> - https://vitejs.dev/guide/
> - https://github.com/sanyuan0704/juejin-book-vite/tree/main/4~7-vite-project-framework
