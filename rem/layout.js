//rem单位用的js
// var remFun = function(doc, win) {
//     var docEl = doc.documentElement,
//         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//         recalc = function() {
//             var clientWidth = docEl.clientWidth;
//             if (!clientWidth) return;
//
//             // var ratio = docEl.clientHeight / docEl.clientWidth;
//             // var ratio = window.devicePixelRatio;
//
//             //这里是假设在640px宽度设计稿的情况下，1rem = 20px；
//             //可以根据实际需要修改
//             //宽是750像素时 1rem=24px;
//             docEl.style.fontSize = Math.round(64 * (clientWidth / 640)) + 'px';
//         };
//     if (!doc.addEventListener) return;
//     // win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
// }
// remFun(document, window);


/**
 * 相对上面的版本，解决了部分安卓手机，系统字体大小影响rem布局的问题
 * @param doc
 * @param win
 */
var remFun = function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            var remSize = 100 * (clientWidth / 640);
            docEl.style.fontSize = remSize + 'px';

            var htmlSize = window.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize; // 获取缩放后计算出来的大小
            if(htmlSize) {
                var size = Number(htmlSize.split('p')[0]);
                if(size !== remSize){
                    let scale = remSize / size;  // 缩放系数
                    var resetSize = size * scale;  // 根据缩放 还原根节点font-size
                    docEl.style.fontSize = resetSize.toFixed(2) + 'px';
                }
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}
remFun(document, window);