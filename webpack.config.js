const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'test': resolve(__dirname, './src/base.browser.ts')
    },

    output: {
        path: resolve(__dirname, './dist/web'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader']
            }
        ]
    },

    target: 'web',

    resolve: {
        modules: ['node_modules'],
        extensions: [
            '.ts',
            '.js'
        ]
    },

    plugins: [
        new HtmlWebpackPlugin()
    ],

    mode: 'production'
};
