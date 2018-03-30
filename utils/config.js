'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const deepAssign = _.merge;

class Factory {

  constructor(options) {

    const confDir = options.confDir;
    const NODE_ENV = options.env || process.env.NODE_ENV || 'development';
    const defaults = this.defaults = {};
    (fs.readdirSync(confDir) || []).forEach((file) => {
      // 遍历每个文件夹
      const newConfPath = path.join(confDir, file);
      var stats = fs.statSync(newConfPath);
      if (stats.isDirectory(newConfPath)) {
        let confObject = {};
        // 校验主配置文件是否存在
        const confMainFile = path.join(newConfPath, 'index.js');
        if (fs.existsSync(confMainFile)) {
          confObject = require(confMainFile);
        }
        const confFile = path.join(newConfPath, NODE_ENV + '.js');
        if (fs.existsSync(confFile)) {
          deepAssign(confObject, require(confFile));
        }
        defaults[file] = confObject;
      }
    });

  }

  get(name) {
    return this.defaults[name];
  }

}

module.exports = Factory;
