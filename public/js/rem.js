// 实现移动端的适配布局
function remsize() {
    // 获取设备的宽度
    var devicewidth = document.documentElement.clientWidth || window.innerWidth;
    if (devicewidth >= 750) {
        devicewidth = 750;
    }
    if (devicewidth <= 320) {
        devicewidth = 320;
    }
    // 1rem=100px
    document.documentElement.style.fontSize = (devicewidth / 7.5) + 'px';
    // 设置字体大小
    document.querySelector('body').style.fontSize = 0.3 + "rem";
}
remsize()
// 窗口发生变化
window.onresize = function () {
    remsize()
}

