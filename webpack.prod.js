const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
    devtool: "source-map",
    entry: './src/client/index.js',
    optimization: {
        minimizer: [new TerserPlugin({}), 
            new CssMinimizerPlugin()]
           // new OptimizeCSSAssetsPlugin({})],
        },
    mode: 'production',   
    output: {
        libraryTarget: 'var',
        library: 'Client',
        assetModuleFilename: '[name] [ext]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.scss$/,
                //NOTE change style loader for production
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
                }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),        
        new MiniCssExtractPlugin(),
        new WorkboxPlugin.GenerateSW()
    ]
}
