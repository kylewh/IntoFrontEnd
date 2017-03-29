const path = require('path');

module.exports = {
    context: __dirname,
    entry: './js/ClientApp.js',
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    stats: {
        colors: true,
        reasons: true,
        chunks: true
    },
    module: {
        rules: [
            {
                exclude: /node_moudles/,
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    }
};