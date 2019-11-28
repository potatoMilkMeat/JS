/**
 * Text元素
 * 没有子节点
 */
document.body.innerHTML='<div>我是文本信息</div>';
var t= document.getElementsByTagName('div')[0].childNodes; 
// .childNodes[0] 等同于 document.getElementsByTagName('div')[0].firstChild;

t[0].data == t[0].nodeValue // true // "我是文本信息"
t[0].appendData(' \t 新的数据');

t[0].deleteData(t[0].nodeValue.length-2,1); // 删除最后一个字符 '据'
t[0].insertData(t[0].nodeValue.length-2, '11111'); // 从最后一个 插入'11111'
t[0].replaceData(t[0].nodeValue.length-2, 1, '新中国'); 

/**
 * 创建文本节点
 */
var textNode = document.createTextNode('<b>新文本信息<\/b>');
document.getElementsByTagName('div')[0].appendChild(textNode);

/**
 * 规范化文本节点 - 合并
 */
t.length // 2
document.getElementsByTagName('div')[0].normalize(); // 将相邻文本合并
t.length // 1
document.getElementsByTagName('div')[0].firstChild.nodeValue; // "我是文本信息<b>新文本信息</b>"

/**
 * 分割文本节点 - 合并
 */
document.getElementsByTagName('div')[0].firstChild.splitText(6); // <b>新文本信息</b>"
document.getElementsByTagName('div')[0].firstChild.nodeValue; // "我是文本信息"
