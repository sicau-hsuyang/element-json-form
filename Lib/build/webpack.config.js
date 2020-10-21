/*
 * @Author: JohnYang
 * @Date: 2020-10-14 17:16:03
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-14 23:40:13
 */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

function assetsPath(_path) {
  const assetsSubDirectory = "assets";
  return path.posix.join(assetsSubDirectory, _path);
}

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
console.log(resolve("static"));

module.exports = {
  mode: "production",
  // 程序的运行路径 不是当前文件相对于入口文件的路径
  entry: `./src/index.ts`, //入口文件,从项目根目录指定
  target: "web",
  output: {
    // 需要打包的文件
    library: "ElementJsonForm",
    libraryExport: "default",
    libraryTarget: "umd",
    umdNamedDefine: true,
    path: path.resolve(__dirname, `../dist`),
    filename: "index.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".vue"]
  },
  devServer: {
    contentBase: resolve("dist"),
    compress: true,
    hot: true,
    port: 8080,
    historyApiFallback: {
      rewrites: {
        from: /^\/$/,
        to: "index.html"
      }
    },
    open: false,
    proxy: {}
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
        // options: {
        //   loaders: {
        //     ts: "ts-loader",
        //     tsx: "babel-loader!ts-loader"
        //   }
        // }
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== "production"
            ? "vue-style-loader"
            : {
                loader: MiniCssExtractPlugin.loader
              },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV !== "production"
            ? "vue-style-loader"
            : {
                loader: MiniCssExtractPlugin.loader
              },
          "postcss-loader",
          "css-loader"
        ]
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        include: [resolve("src")]
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
              // appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.tsx$/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              // appendTsxSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: assetsPath("img/[name].[hash:7].[ext]")
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html"
    }),
    new copyWebpackPlugin({
      patterns: [
        {
          from: resolve("static"),
          to: resolve("dist")
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "styles/index.css"
    }),
    new VueLoaderPlugin()
  ]
};
