const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成 html 页面

// const Uglify = require('uglifyjs-webpack-plugin');  // 压缩 JS
// const ExtractTextPlugin = require('extract-text-webpack-plugin');  // 抽取 CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PurifyCssWebpack = require('purifycss-webpack');  // 去除冗余 CSS

const glob = require('glob'); // 文件路径匹配
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 静态资源拷贝

const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 删除打包目录

// const rulesConfig = require('./webpack.rules.js'); // 抽取 loader rules

// console.log('--------', path.join(__dirname, 'src/index.html'))
// console.log('--------', path.resolve(__dirname, 'src/index.html'))

module.exports = {
    //mode: 'development',  // 可以在这里设置环境
    entry: {
        index: "./src/index.js",
        jquery: 'jquery'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(le|sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    'css-loader',
                    'sass-loader',
                    'less-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 50, // 超过限制转换成 base64
                        outputPath: 'images', // 图片打包之后输出的目录
                        fallback: 'file-loader'
                    }
                }]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '0.0.0.0',
        port: 8080,
        open: true,
        hot: true
    },
    //devtool: 'source-map', // 启用 sourcemap
    plugins: [
        new CleanWebpackPlugin(), // 删除打包目录
        //new Uglify(),
        // new webpack.HotModuleReplacementPlugin(), // 热更新
        new HtmlWebpackPlugin({
            // minify: {
            //   collapseWhitespace: true, // 压缩空白
            //   removeAttributeQuotes: true // 删除属性引号
            // },
            hash: true, // 添加 hash 使文件名唯一, 避免缓存
            title: 'I Love China',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: './css/index.css' //css分离打包之后输出的路径
        }),
        new PurifyCssWebpack({
            paths: glob.sync(path.join(__dirname, 'src/*.html')) // 去除冗余css
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/assets'), // 静态文件拷贝
            to: './public'
        }]),
        new webpack.ProvidePlugin({ // 导入模块
            $: 'jquery',
            _map: ['lodash', 'map']
        })
    ]
};
