const webpack = require('webpack');
const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './lib/bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/templates/index.hbs'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.handlebars/,
                loader: 'handlebars-loader'
            }
        ]
        
    },

    devServer: {
        contentBase: path.resolve(__dirname, './src')
    }
};