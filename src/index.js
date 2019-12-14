// import React,{Component} from 'react'
// import ReactDOM from 'react-dom'

// ReactDOM.render(
//     <h2>我是react</h2>,
//     document.querySelector('#root')
// )

import './css/index.css'
import './less/index.less'

// import './sass/index.scss'
//import $ from 'jquery'

// $('#box').css({
//     width:'100px',
//     height:'100px',
//     background:'yellow'
// })

import imgSrc from './images/404.jpg';

let oImg = new Image();

oImg.onload = function () {
    document.body.appendChild(oImg);
};

oImg.src = imgSrc;
