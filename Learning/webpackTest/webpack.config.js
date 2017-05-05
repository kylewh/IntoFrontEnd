const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname,'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/public'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          'url-loader',
          'image-webpack-loader'
        ]
      }
    ]
  }
}