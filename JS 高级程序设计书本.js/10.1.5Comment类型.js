/**
 * Comment元素
 * 没有子节点
 */
document.body.innerHTML='<div>div<!--A comment --></div>';
var c= document.getElementsByTagName('div')[0].childNodes; 
c[1] // <!--A comment -->
document.createComment('000'); // <!--000 -->
