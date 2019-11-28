/**
 * Attr元素
 * 文档片段，作为节点仓库
 * 没有父节点 和 子节点
 */
document.body.innerHTML='<div id="myId">111<\/div>'; // 默认左对齐

var attr = document.createAttribute('align'); // align=""
attr.value='center';

document.getElementById('myId').setAttributeNode(attr); // 会居中对齐

attr.nodeValue='right' // 会右对齐