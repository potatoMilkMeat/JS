document.write('1');
document.body.innerHTML = '<div id="div">'+ creatDom()+ '</div>';
  function creatDom(){
    var first = '<p>这是第  ',
        last = '  个</p>',
        i=0,
        len=5,
        html='';
    for(;i<len;i++){
      html += first + i + last;
    }
    return html;
  }
/** =====25.9- 分支循环嵌套问题=================== */
var canvas = document.getElementsByTagName('canvas')[0],
    img = document.images[0],
    width = (canvas.width = img.width * 2) / 2,
    height = canvas.height = img.height,
    ctx = canvas.getContext('2d');
ctx.drawImage(img, 0, 0);
// 绘制特效图片
/**
 * 
 * @param {*} t 特效类型
 * @param {*} x x坐标
 * @param {*} y y坐标
 * @param {*} w 宽度
 * @param {*} h 高度
 * @param {*} a 透明度
 */
function dealImage(t, x, y, w, h, a){
  // 获取画布数据
  

}
// 为图片添加特效
dealImage('gray', 0, 0, width, height, 255);
dealImage('gray', 100, 50, 300, 200, 100);
dealImage('gray', 150, 100, 200, 100, 255);