const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const path = require('path');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: { main: './src/index.js',
             about: './src/about/about.js',
             analytics: './src/analytics/analytics.js'},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            { test: /\.js$/,
            use: { loader: "babel-loader" },
            exclude: /node_modules/
            },
            { test: /\.css$/,
              use: [
              {loader: 'style-loader'},
              {loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../'
              }
              },
              {loader: 'css-loader'},
              {loader: 'postcss-loader'}]
            },
            {
                test: /\.(svg|png|jpg|gif|ico)$/i,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                      esModule: false,
                      outputPath: "./images/",
                    },
                  },
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/i,
                loader: 'file-loader?name=./vendor/[name].[ext]'
              }
          ]
        },
    plugins: [
        new MiniCssExtractPlugin({ filename: './css/[name].[contenthash].css' }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
    }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
            filename: 'index.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
            chunks: ["main"],
            favicon: './src/images/favicon.ico'
          }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/about/about.html',
            filename: 'about.html',
            chunks: ["about"],
            favicon: './src/images/favicon.ico'
          }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/analytics/analytics.html',
            filename: 'analytics.html',
            chunks: ["analytics"],
            favicon: './src/images/favicon.ico'
          }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
        ]
};
