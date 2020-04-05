/* eslint-disable sort-keys */
// eslint-disable-next-line no-undef
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

// eslint-disable-next-line no-undef
module.exports = {
    mode: 'development',
    entry: './public/js/main.js',
    output: {
        filename: 'main.js',
        // eslint-disable-next-line no-undef
        path: path.resolve(__dirname, 'public', 'scripts'),
        publicPath: 'public/scripts/'
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: './public/'
    },
    plugins: [
        new CleanPlugin.CleanWebpackPlugin()
    ]
    
};