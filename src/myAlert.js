export default function MyAlert() {
    let button = document.createElement('button');
    button.innerHTML = '我是按钮';
    document.body.appendChild(button);
    return button;
}
