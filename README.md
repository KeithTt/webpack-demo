#### 静态页面(H5+C3) -> gulp
#### vue/react -> webpack

---
webpack
- 打包工具(模块打包器)

webpack作用:
- 打包  (把多个文件打包成一个js文件， 减小服务器压力、带宽)
- 转化  (比如less、sass、ts)   需要loader
- 优化  (SPA越来越盛行，前端项目复杂度高， webpack可以对项目进行优化)

---
webpack构成:
1. 入口  entry
2. 出口	output
3. loaders  转化器
4. plugins  插件
5. devServer 开发服务器
6. mode

---
安装webpack
```
yarn global add webpack webpack-cli
webpack -v
```

---
运行webpack
```
webpack src/index.js --output dist/bundle.js
```

---
默认配置文件 webpack.config.js    
```
module.exports={
    //入口配置
    entry:{},
    //出口配置
    output:{},
    //module.rules
    //loaders
    module:{},
    //插件
    plugins:[],
    //开发服务器
    devServer:{}
};
```
```
module.exports={
    //入口配置
    entry:{
        aaa: './src/index.js'
    },
    //出口配置
    output:{
        path: __dirname + '/dist', // path必须是绝对路径
        filename: 'bundle.js'
    }
};
```
```
const path = require('path');

module.exports={
    //入口配置
    entry:{
        index: './src/index.js'
    },
    //出口配置
    output:{
        path: path.resolve(__dirname,'dist'), // path必须是绝对路径
        filename: 'bundle.js'
    }
};
```

自定义配置文件名 wb.config.js

    webpack --config wb.config.js

npm scripts:

    "scripts": {
        "build": "webpack --config wb.config.js",
        "dev": "xxx"
      }

---
webpack4.x 实现所谓的0配置

mode:

	webpack --mode development
	webpack --mode production  // 文件自动被压缩

---

多入口(多文件)打包一起
	
	const path = require('path');
	module.exports = {
		entry: ['./src/index.js', './src/index2.js'],  // 按照顺序一起打包 bundle.js
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle.js'
		}
	};

多入口多出口

	const path = require('path');
	module.exports = {
		entry: {
			index: './src/index.js',
			index2: './src/index2.js'
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].bundle.js'
		}
	};
---

html-webpack-plugin:

	依赖webpack、webpack-cli
	生成html页面

	1. 安装
		npm i html-webpack-plugin -D
	2. 引入
		const HtmlWebpackPlugin = require('html-webpack-plugin');
	3. 使用
		plugins:[
			new HtmlWebpackPlugin()
		]

    html-webpack-plugin:
        模板:
            new HtmlWebpackPlugin({
                template:'模板地址'
            })
        页面标题:
            new HtmlWebpackPlugin({
                title:'xxxxx',
                template:'模板地址'
            })
        消除缓存:
            new HtmlWebpackPlugin({
                hash:true,
                title:'xxxxx',
                template:'模板地址'
            })
        压缩html:
            new HtmlWebpackPlugin({
                minify:{
                    collapseWhitespace: true,  // 压缩空白
                    removeAttributeQuotes: true  // 删除属性引号
                },
                hash:true,
                title:'I Love China',
                template:'./src/index.html'
            })
        生成多个html页面:
            filename:'xxx'
        多页面分别引入自己的js:
            chunks:['index']

	https://www.npmjs.com/package/html-webpack-plugin
---
删除打包目录

	1. 下载
		yarn add clean-webpack-plugin -D
	2. 引入
		const { CleanWebpackPlugin } = require('clean-webpack-plugin');
	3. 使用:
		new CleanWebpackPlugin()
---
devServer

	1. 下载
		yarn add webpack-dev-server -D
	2. 使用
		devServer:{
            //设置服务器访问的基本目录
            contentBase: path.resolve(__dirname, 'dist'),
            //服务器ip地址
            host: 'localhost',
            //设置端口
            port: 8080
        }

	此时 pakcage.json:
		"scripts": {
			"build": "webpack --mode development",
			"dev":"webpack-dev-server --mode development"
		}

	自动打开浏览器:
		open: true

	热更新:
		hot: true

		开启:
			new webpack.HotModuleReplacementPlugin()

	https://webpack.js.org/configuration/dev-server/

---
处理css文件

	yarn add style-loader css-loader -D

	配置:
		module:{
			rules:[
				{
					test:/\.css$/,
					use:['style-loader','css-loader']
				}
			]
		}

	关于loader的写法:
		1. use:['xxx-loader','xxx-loader']
		2. loader:['xxx-loader','xxx-loader']
		3. use:[
                {loader:'style-loader'},
                {loader:'css-loader'}
            ]
---
压缩JS

	1. webpack4.x
		--mode production
	2. 之前版本
		uglifyjs-webpack-plugin

		a). yarn add uglifyjs-webpack-plugin -D
		b). const uglify = require('xxx);
		c). new ugliufy()
---
图片转换 base64

	1. yarn add file-loader url-loader -D
	2. 配置
		{
        test:/\.(png|jpg|gif)$/,
        use:[{
            loader:'url-loader',
            options:{
                  limit:50，
                  outputPath:'images'
                }
            }]
        }
---
分离CSS:

	1. yarn add extract-text-webpack-plugin -D  webpack3.x
	    yarn add extract-text-webpack-plugin@next -D  webpack4.x
	2. 在plugins里面应用
		new ExtractTextPlugin(提取出去的路径)

		use:ExtractTextPlugin.extract({
		    fallback:'style-loader',
		    use:'css-loader',
		    publicPath:'../' // 解决css背景图，路径问题
		})

    mini-css-extract-plugin:
        new MiniCssExtractPlugin({
            filename: 'css/index.css'
        })
---
less:

	1. yarn add less less-loader -D
	2. {
		test:/\.less$/,
		use:['style-loader','css-loader','less-loader']
	}

分离less:

	{
        test:/\.less$/,
        //use:['style-loader','css-loader','less-loader']
        use:ExtractTextPlugin.extract({
            fallback:'style-loader',
            use:['css-loader','less-loader']
        })
    }
---
sass:

	yarn add node-sass sass-loader -D

	配置:
	{
        test:/\.(sass|scss)$/,
        use:['style-loader','css-loader','sass-loader']
    }

分离sass:

	{
        test:/\.(sass|scss)$/,
        use:ExtractTextPlugin.extract({
            fallback:'style-loader',
            use:['css-loader','sass-loader']
        })
    }
---
自动处理前缀:

	postCss	预处理器
	
	transform:
    -webkit-transform:

```
1. yarn add postcss-loader autoprefixer -D

2. 准备 postcss.config.js

	module.exports ={
		plugins:[
			require('autoprefixer')
		]
	};

3. 配置loader
	use:[
        {loader:'style-loader'},
        {loader:'css-loader'},
        {loader:'postcss-loader'}
    ]

4. 提取出来
	use:ExtractTextPlugin.extract({
        fallback:'style-loader',
        use:['css-loader','postcss-loader'],
        publicPath:'../' // 解决css背景图，路径问题
    })
```
---
消除冗余css代码:

	1. 安装
		yarn add purifycss-webpack purify-css -D
	2. 引入
		const PurifyCssWebpack = require('purifycss-webpack');
	3. 需要引入一个额外包
		yarn add glob -D
	4. 添加plugins
		new PurifyCssWebpack({
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        })
---
开启调试:

	webpack4.x 开启调试:
		--mode development

	webpack3.x之前:
		sourceMap
		devtool: 'source-map',

---
babel:

	- babel用来编译js
	- ESnext
	- jsx

	1. 下载
		yarn add babel-loader babel-core babel-preset-env -D

	2. 配置
        {
            test:/\.(js|jsx)$/,
            use:['babel-loader'],
            exclude:/node_modules/
        }

    jsx:
        yarn add babel-preset-react -D
        yarn add react react-dom -D

---
在webpack中使用json:
	
	json-loader

	到webpack.3x版本之后不用，json默认就能识别

	const json = require('./xxx.json')
---
静态资源输出:

	1. 下载
		yarn add copy-webpack-plugin -D
	2. 引入
		const CopyWebpackPlugin = require('copy-webpack-plugin');
	3. 使用
		plugins: [
			new CopyWebpackPlugin([{
				from: path.resolve(__dirname, 'src/assets'),
				to: './public'
			}])
		]

https://webpack.js.org/plugins/copy-webpack-plugin/

---
使用第三库:

	1. 直接npm下载，然后引入
	
		yarn add jquery

		import $ from 'jquery'

		$(xxxx).on()
		$(xxx).css()

	2. ProvidePlugin (推荐此方式)
	
		const webpack = require('webpack');

		在plugins里面使用:

			new webpack.ProvidePlugin({
				$:'jquery',
				lodash:'lodash'
				....
			})

	通过ProvidePlugin和 import直接引入区别:
	  1. import $ ...，引入之后，无论你在代码中是否使用jquery，打包时都会打进去，这样会产生大量冗余js代码
	  2. ProvidePlugin 只有你使用到该库，才会打包
