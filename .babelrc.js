module.exports = {
    "presets": [
        "env",
        "react",
        [
            // 兼容tree-shaking https://babeljs.io/docs/en/next/babel-preset-env.html
            "@babel/preset-env",
            {
                "modules": false
            }
        ]
    ],
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
};
