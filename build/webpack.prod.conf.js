const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

module.exports = {
  target: 'web',
  entry: './src/index.js',
  output: {
    filename: 'hg-virtual-dom.js',
    path: path.resolve(__dirname, '../dist'),
    library: 'HgVirtualDom',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
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
        loader: 'babel-loader',
        include: [path.resolve(__dirname, '../src')]
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin()
  ]
}
