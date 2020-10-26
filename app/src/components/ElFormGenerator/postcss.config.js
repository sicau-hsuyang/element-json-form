/*
 * @Author: JohnYang
 * @Date: 2020-10-24 20:44:00
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-24 20:50:22
 */

var autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    autoprefixer({
      browsers: ["last 5 version"]
    })
  ]
};
