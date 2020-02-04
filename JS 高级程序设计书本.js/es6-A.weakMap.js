document.write('0<br><div id="div">123</div>');
var div = document.getElementById('div');
var wm =new WeakMap();
wm.set(div,'div123 存在');
console.log(div,'\n',wm) // <div id="div">123</div> \n WeakMap {div#div => "div123 存在"}

document.body.removeChild(div);
div = null;
console.log('删除了div',div,'\n',wm);  // 删除了div null  \n  WeakMap {div#div => "div123 存在"}
// 按道理，wm应该没有 div#div ,也没有对应的值
// 实际上，js回收机制无法主动触发，导致wm 的 div#div 没有被回收
// 肯定是被回收的，但是无法确定执行时间