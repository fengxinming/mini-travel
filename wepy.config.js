const path = require('path');
var prod = process.env.NODE_ENV === 'production';

module.exports = {
  wpyExt: '.vue',
  eslint: false,
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
    stylus: {
      compress: prod
    },
    pug: {

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
}

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
    }
  }
}