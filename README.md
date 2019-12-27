#### 静态页面(H5+C3) -> gulp
#### vue/react -> webpack

---
[webpack](https://www.webpackjs.com/)
- 打包工具(模块打包器)

webpack作用:
- 打包  (把多个文件打包成一个js文件， 减小服务器压力、带宽)
- 转化  (比如less、sass、ts)   需要loader
- 优化  (SPA越来越盛行，前端项目复杂度高， webpack可以对项目进行优化)

---
webpack构成

    1. 入口  entry
    2. 出口	output
    3. loaders  转化器
    4. plugins  插件
    5. devServer 开发服务器
    6. mode

---
安装webpack

    yarn global add webpack webpack-cli
    webpack -v

---
运行webpack

    webpack src/index.js --output dist/bundle.js

---
默认配置文件 webpack.config.js    

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
    
    module.exports={
        //入口配置
        entry:{
            index: './src/index.js'
        },
        //出口配置
        output:{
            path: __dirname + '/dist', // path必须是绝对路径
            filename: 'bundle.js'
        }
    };

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
      "build": "node --trace-deprecation ./node_modules/.bin/webpack --mode development",
      "serve": "webpack-dev-server --mode development"
    }

---
webpack4.x 实现所谓的0配置 (另外可参考 [parcel](https://parceljs.org/))

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

[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin):

	用于生成html页面

	1. 安装
		npm i html-webpack-plugin -D
	2. 引入
		const HtmlWebpackPlugin = require('html-webpack-plugin');
	3. 使用
        plugins:[
          new HtmlWebpackPlugin()
        ]


    new HtmlWebpackPlugin({
      template:'模板地址' // By default it will use src/index.ejs if it exists.
    })
        


生成多个html页面, 多页面分别引入自己的js:
      
```
module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
    header: path.resolve(__dirname, '../src/header.js')
  },
  output: {
    filename: '[name].[hash:8].js', // 打包后的文件名称
    path: path.resolve(__dirname, '../dist')  // 打包后的目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      chunks: ['main'] // 与入口文件对应的模块名
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/header.html'),
      filename: 'header.html',
      chunks: ['header'] // 与入口文件对应的模块名
    }),
  ]
}
```

---
删除打包目录 [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)

	1. 下载
		yarn add clean-webpack-plugin -D
	2. 引入
		const { CleanWebpackPlugin } = require('clean-webpack-plugin');
	3. 使用:
		new CleanWebpackPlugin()
---
[devServer](https://webpack.js.org/configuration/dev-server/)

	1. 下载
		yarn add webpack-dev-server -D
	2. 使用
		devServer:{
            contentBase: path.resolve(__dirname, 'dist'), // 设置服务器访问的基本目录
            host: '0.0.0.0', // 服务器ip地址
            port: 8080 // 设置端口
        }

	此时 pakcage.json:
		"scripts": {
			"build": "webpack --mode development",
			"dev": "webpack-dev-server --mode development"
		}

	自动打开浏览器:
		open: true

	模块热更新:
		hot: true

		开启:
			new webpack.HotModuleReplacementPlugin()
			
		1、保留在完全重新加载页面期间丢失的应用程序状态
		2、不刷新页面，只更新变更内容
		3、在源代码中对 CSS/JS 进行修改，会立刻在浏览器中进行更新
		
		当代码发生变化，webpack 即会进行编译，并通过 websocket 通知客户端(浏览器)
		
	参考：
	    https://webpack.docschina.org/concepts/hot-module-replacement/
	    https://webpack.docschina.org/api/hot-module-replacement
	    
```
console.log(module.hot);
   
if (module.hot) {
  module.hot.accept('./library.js', function() {
    // 使用更新过的 library 模块执行某些操作...
  });
}
```

CSS 热更新

    样式更新比较简单，style-loader 中已经集成实现，直接使用即可
    
VUE 热更新

    脚手架中已经集成 https://github.com/vuejs/vue-loader
    
REACT 热更新

    脚手架中也有集成 https://github.com/gaearon/react-hot-loader                

---
处理 CSS 文件

[style-loader](https://webpack.js.org/loaders/style-loader/)

Automatically injects styles into the DOM using multiple `<style></style>`. It is default behaviour.

	yarn add style-loader css-loader -D

	配置:
        module: {
          rules: [
            {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
            },
          ],
        }

	loader 的三种写法:
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
url-loader 将图片转换成 BASE64

	1. yarn add file-loader url-loader -D
	
	2. 配置
		{
        test: /\.(png|jpg|gif)$/,
        use:[{
            loader: 'url-loader',
            options:{
                  limit: 50，
                  outputPath: 'images'
                }
            }]
        }
---
分离CSS:

webpack4.0以前，我们通过 [extract-text-webpack-plugin](https://www.npmjs.com/package/extract-text-webpack-plugin) 插件，把css样式从js文件中提取到单独的css文件中。

webpack4.0以后，官方推荐使用 [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin) 插件来打包css文件。

	1. yarn add extract-text-webpack-plugin -D  webpack3.x
	    yarn add extract-text-webpack-plugin@next -D  webpack4.x
	
	2. 在plugins里面应用
		new ExtractTextPlugin(提取出去的路径)

		use: ExtractTextPlugin.extract({
		    fallback: 'style-loader',
		    use: 'css-loader',
		    publicPath: '../' // 解决css背景图，路径问题
		})

    mini-css-extract-plugin:
        new MiniCssExtractPlugin({
            filename: 'css/index.css'
        })
---
less:

	1. yarn add less less-loader -D
	
	2. {
		test: /\.less$/,
		use: ['style-loader', 'css-loader', 'less-loader']
	}

分离less:

	{
        test: /\.less$/,
        //use: ['style-loader', 'css-loader', 'less-loader']
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'less-loader']
        })
    }
---
sass:

	yarn add node-sass sass-loader -D

	配置:
	{
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
    }

分离sass:

	{
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader','sass-loader']
        })
    }
---
为 css 添加浏览器前缀:

	postcss	后处理器
	
	transform:
    -webkit-transform:

```
1. yarn add postcss-loader autoprefixer -D

2. 准备 postcss.config.js

	module.exports ={
		plugins: [
			require('autoprefixer')
		]
	};

3. 配置loader
	use:[
            {loader: 'style-loader'},
            {loader: 'css-loader'},
            {loader: 'postcss-loader'}
        ]

4. 提取出来
	use:ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader','postcss-loader'],
            publicPath: '../' // 解决css背景图，路径问题
        })
```
---
去除冗余CSS代码:

经测试，[purifycss-webpack](https://www.npmjs.com/package/purifycss-webpack) 已出现 API 不兼容警告

使用 [purgecss-webpack-plugin](https://www.npmjs.com/package/purgecss-webpack-plugin) 替代

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
开启 sourceMap:

	webpack4.x 开启 sourceMap:
		--mode development

	webpack3.x 之前:
		devtool: 'source-map',

---
用 [babel](https://github.com/babel/babel) 编译 js 和 jsx 文件

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
        
babel-loader只会将 ES6/7/8语法转换为ES5语法，但是对新api并不会转换 例如(promise、Generator、Set、Maps、Proxy等)

解决 async 不识别问题
[Uncaught ReferenceError: regeneratorRuntime is not defined](https://segmentfault.com/a/1190000016384693)      

    yarn add -D babel-plugin-transform-runtime
    
    在 .bablerc 文件中添加
    
    "plugins": [
        [
            "transform-runtime",
            {
                "helpers": false,
                "polyfill": false,
                "regenerator": true,
                "moduleName": "babel-runtime"
            }
        ]
    ]
    
---
静态资源输出 [copy-webpack-plugin](https://www.npmjs.com/package/copy-webpack-plugin)

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
				$: 'jquery',
				_map: ['lodash', 'map']
			})

	通过ProvidePlugin和 import直接引入区别:
	  1. import $ ...，引入之后，无论你在代码中是否使用jquery，打包时都会打进去，这样会产生大量冗余js代码
	  2. ProvidePlugin 只有你使用到该库，才会打包
