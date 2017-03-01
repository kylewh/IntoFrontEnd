 var webpack = require('webpack');

 module.exports = {
     entry: './src/app.js',
     output: {
         path: './bin',
         filename: 'app.bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.(jpg|png)$/,
                 loader: 'url-loader',
                 options: {
                     limit: 25000,
                 }
             },
             {
                 test: /\.css$/,
                 loader: "style-loader!css-loader"
             }
         ]
     },
     plugins: [
         new webpack.ProvidePlugin({
             $: "jquery",
             jQuery: "jquery",
             "window.jQuery": "jquery"
         }),
         new webpack.optimize.UglifyJsPlugin({
             compress: {
                 warnings: false,
             },
             output: {
                 comments: false,
             },
         })
     ]
 };