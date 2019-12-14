const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rules = {
    rules: [
        {
            test: /\.css$/,
            //use:['style-loader','css-loader']
            //loader:['style-loader','css-loader']
            /* use:[
                {loader:'style-loader'},
                {loader:'css-loader'},
                {loader:'postcss-loader'}
            ] */
            /* use:ExtractTextPlugin.extract({
                fallback:'style-loader',
                use:'css-loader',
                publicPath:'../' // 解决css背景图，路径问题
            }) */
            /* use:[
                MiniCssExtractPlugin.loader,
                'css-loader'
            ] */
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader'],
                publicPath: '../' // 解决css背景图，路径问题
            })
        },
        {
            test: /\.less$/,
            //use:['style-loader','css-loader','less-loader']
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader']
            })
        },
        {
            test: /\.(sass|scss)$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
            test: /\.(js|jsx)$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 50,
                    outputPath: 'images' // 图片打包输出的目录
                }
            }]
        }
    ]
};

module.exports = rules;
