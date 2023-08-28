const path = require("path");
const webpack = require("webpack");
const miniCss = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
      publicPath: '/dist'
    },
    compress: true,
    port: 9000,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [miniCss.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  devtool: false,
  plugins: [
    new miniCss({
      filename: "css/style.css",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/static" }],
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map[query]",
      exclude: ["vendor.js"],
    }),
  ],
};
