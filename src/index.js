// import React,{Component} from 'react'
// import ReactDOM from 'react-dom'

// ReactDOM.render(
//     <h2>我是react</h2>,
//     document.querySelector('#root')
// )

import './css/index.css';
import './less/index.less';

// import './sass/index.scss'
//import $ from 'jquery'

// $('#box').css({
//     width:'100px',
//     height:'100px',
//     background:'yellow'
// })

import imgSrc from './images/bg.png';

let oImg = new Image();

oImg.onload = function () {
    document.body.appendChild(oImg);
};

oImg.src = imgSrc;

import hot1 from './hot1';
import hot2 from './hot2';
import myAlert from './myAlert';

import axios from 'axios';

let input = document.querySelector('input');
input.onfocus = function () {
    hot1();
};

document.onclick = function () {
    axios.get('/api/data').then(res => {
        console.log(res);
        console.log(res.data); // 获取服务端返回的数据
    })
};

// document.onclick = async function () {
//     let rs = await fetch('/api/data');
//     console.log('rs', rs);
//     console.log('我修改了代码!!!!');
// };

console.log(module.hot);

let btn = myAlert();

if (module.hot) {
    module.hot.accept('./hot1', () => { // 接受(accept)给定依赖模块(dependencies)的更新，并触发一个 回调函数 来对这些更新做出响应
        console.log('hot1更新了...');
        hot1();
    });

    module.hot.accept('./hot2', () => {
        console.log('hot2更新了...');
        hot2();
    });

    module.hot.accept('./myAlert', () => {
        console.log('按钮更新了...');
        btn.remove();
        btn = myAlert();
    })
}
