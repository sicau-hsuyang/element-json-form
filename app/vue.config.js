/*
 * @Author: JohnYang
 * @Date: 2020-10-24 20:22:11
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-24 20:24:52
 */

const webpack = require("webpack");

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Vue: "vue"
      })
    ]
  }
};
