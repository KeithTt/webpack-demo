const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成 html 页面

// const Uglify = require('uglifyjs-webpack-plugin');  // 压缩 JS
// const ExtractTextPlugin = require('extract-text-webpack-plugin');  // 抽取 CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TerserJSPlugin = require('terser-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// const PurifyCssWebpack = require('purifycss-webpack');  // 去除冗余 CSS
const PurgecssPlugin = require('purgecss-webpack-plugin');

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
                    'postcss-loader',
                    'sass-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 50, // 超过限制转换成 base64
                        outputPath: 'images', // 图片打包之后输出的目录
                        fallback: 'file-loader',
                        esModule: false, // 解决ESmodule语法不识别问题
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
            // minify: { // 压缩 html
            //   collapseWhitespace: true, // 压缩空白
            //   removeAttributeQuotes: true // 删除属性引号
            // },
            hash: true, // 添加 hash 使文件名唯一, 避免缓存
            title: 'I Love China',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: './css/index.css' //css分离打包之后输出的路径
            // filename: '[name].css',
            // chunkFilename: '[id].css',
        }),
        // new PurifyCssWebpack({
        //     paths: glob.sync(path.join(__dirname, 'src/*.html')) // 去除冗余css
        // }),
        new PurgecssPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html'), {nodir: true})
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/assets'), // 静态文件拷贝
            to: './public'
        }]),
        new webpack.ProvidePlugin({ // 导入模块
            $: 'jquery',
            _map: ['lodash', 'map']
        })
    ],
    // optimization: {
    //     minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    //     splitChunks: {
    //         cacheGroups: {
    //             styles: {
    //                 name: 'styles',
    //                 test: /\.css$/,
    //                 chunks: 'all',
    //                 enforce: true,
    //             },
    //         },
    //     },
    // },
};
