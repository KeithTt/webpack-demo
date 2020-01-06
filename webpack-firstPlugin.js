class firstPlugin {
    constructor(options) {
        this.options = options;
        // console.log('firstPlugin options', options);
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('firstPlugin', (compilation, callback) => {
            let str = '';
            for (let filename in compilation.assets) {
                str += `文件: ${filename}\t大小: ${compilation.assets[filename]['size']()}\n`;
            }
            // 通过compilation.assets可以获取打包后静态资源信息，同样也可以写入资源
            compilation.assets['fileSize.md'] = {
                source: function () {
                    return str;
                },
                size: function () {
                    return str.length;
                }
            };
            callback();
        })
    }
}

module.exports = firstPlugin;
