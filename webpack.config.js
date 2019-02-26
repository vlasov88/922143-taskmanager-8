const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    path: path.resolve(__dirname, `public`),
    filename: `bundle.js`
  },
  devtool: `sourcemap`,
  devServer: {
    contentBase: path.resolve(__dirname, `public`),
    publicPath: 'http://localhost:8080/',
    hot: true,
    compress: true
  }
};