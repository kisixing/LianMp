// ref: https://umijs.org/config/
import pageRoutes from './router.config';
import webpackPlugin from './plugin.config';
import theme from './theme.config';

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading',
        webpackChunkName: true,
      },
      title: '莲孕',
      // dll features https://webpack.js.org/plugins/dll-plugin/
      dll: {
        include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
        exclude: ['@babel/runtime', 'netlify-lambda'],
      },
      hd: false,
      fastClick: true,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
      hardSource: false,
    },
  ],
];

export default {
  treeShaking: true,
  // add for transfer to umi
  base: '',
  publicPath: '',
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  plugins,
  // 路由配置
  routes: pageRoutes,
  externals: {},
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssnano: {
    mergeRules: false,
  },
  targets: {
    android: 5,
    chrome: 58,
    edge: 13,
    firefox: 45,
    ie: 9,
    ios: 7,
    safari: 10,
  },
  outputPath: './dist',
  alias: {
    '@': require('path').resolve(__dirname, 'src'),
  },
  proxy: {
    '/server/api/': {
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
      target: 'https://preview.pro.ant.design/',
    },
    '/wx/api/': {
      changeOrigin: true,
      pathRewrite: { '^/wx/api': '' },
      target: 'https://games.parsec.com.cn/',
    },
    '/test/api/': {
      changeOrigin: true,
      pathRewrite: { '^/test/api': '' },
      // 截取地址 参考http://localhost:8000/test/api/users, 可以访问到http://jsonplaceholder.typicode.com/users
      target: 'http://jsonplaceholder.typicode.com/',
    },
  },
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  theme
}
