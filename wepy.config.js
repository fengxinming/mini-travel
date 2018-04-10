'use strict';

const path = require('path');
const fs = require('fs');
const Config = require('./utils/config');

const prod = process.env.NODE_ENV === 'production';

// ================= 动态生成配置文件 travel.config

const TRAVEL_CONFIG_NAME = 'travel.config';
const CONFIG_DIR = path.join(__dirname, 'conf');

const configUtil = new Config({
  confDir: CONFIG_DIR
});
const travelConfig = configUtil.get('travel');
fs.writeFileSync(`./src/${TRAVEL_CONFIG_NAME}.js`, `module.exports = ${JSON.stringify(travelConfig)}`);

// ================= wepy 配置参数 ===============

module.exports = {
  wpyExt: '.vue',
  eslint: true,
  cliLogs: !prod,
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.pug'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod
    },
    styl: {
      compress: prod,
      includeCSS: true,
      globals: {
        '$imgUrlPrefix': travelConfig.imgUrlPrefix
      },
      import: [
        path.join('src', 'css', 'utils', '**/*.styl')
      ]
    },
    jade: {
      travelConfig
    },
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions',
      ]
    }
  },
  plugins: {},
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
};

if (prod) {
  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {}
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    },
    replace: {
      filter: /moment\.js$/,
      config: {
        find: /([\w\[\]a-d\.]+)\s*instanceof Function/g,
        replace: function (matchs, word) {
          return ' typeof ' + word + " ==='function' ";
        }
      }
    }
  };
} else {
  // ================= 初始化一个本地开发服务，用于加载静态资源

  const DEV_PORT = 7310;
  const Koa = require('koa');
  const serve = require('koa-static');
  const app = new Koa();
  app.use(serve(path.join(__dirname, 'public')));
  app.listen(DEV_PORT, () => {
    console.log(`本地服务正在监听端口${DEV_PORT}`);
  });
}
