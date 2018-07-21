var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './demo/index.js',
  output: './dist/',
  devtool: "eval-source-map",
  resolve: {
    extensions: [".jsx", ".json", ".js"],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        include: [
          path.resolve(__dirname, '../src'), 
          path.resolve(__dirname, '../demo')
        ]
      }
    ]
  },
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    compress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'demo/index.html',
      inject: true
    })
  ]
};