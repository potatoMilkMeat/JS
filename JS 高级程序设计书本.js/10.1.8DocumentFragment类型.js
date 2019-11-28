/**
 * DocumentFragment元素
 * 文档片段，作为节点仓库
 * 没有子节点
 */
document.body.innerHTML='<ul id="myList"><\/ul>';
var fragment = document.createDocumentFragment(); // #documnet-fragment

var li =null;
for(var i=0; i<3;i++){
  li=document.createElement('li');
  li.appendChild(document.createTextNode("item "+(i+1)));
  fragment.appendChild(li);
}
// #documnet-fragment
// <li>item 1</li>
// <li>item 2</li>
// <li>item 3</li>
document.getElementById('myList').appendChild(fragment);  // #documnet-fragment
