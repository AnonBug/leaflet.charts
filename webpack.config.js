/*
 * @Description: contents
 * @Author: zyc
 * @Date: 2021-05-24 10:37:58
 * @LastEditTime: 2021-05-24 12:27:53
 */
const package = require('./package.json')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
module.exports = {
    entry: {
        [package.name]: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    devServer: { //开发服务器的位置
        port: 3000,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'test/index.html'
        }),
    ]
}