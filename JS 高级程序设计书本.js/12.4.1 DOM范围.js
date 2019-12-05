
/**
 * 12.4.1 DOM范围
 * document.createRange()
 */

document.write('<html><body><p id="p1"><b>Hello</b> World!</p></body></html>')
p1=document.getElementById('p1')
h=p1.firstChild.firstChild;w=p1.lastChild;rang=document.createRange();
rang.setStart(h,2);rang.setEnd(w,3);

/**
 * deleteContents 删除所选中的范围
 */
rang.deleteContents()

/**
 * extractContents 删除所选中的范围，并返回该片段子节点
 */
var temp=rang.extractContents()
p1.parentNode.appendChild(temp)

/**
 * cloneContents 克隆所选中的范围  的 该片段子节点
 */
var clone=rang.cloneContents()
p1.parentNode.appendChild(clone)

/**
 * cloneContents 克隆所选中的范围  的 该片段子节点
 */
var span = document.createElement('span')
span.style.color='red'
span.appendChild(document.createTextNode('Inserted text'))

rang.insertNode(span)

/**
 * surroundContents 环绕
 */
document.write('<html><body><div id="p1"><b>Hello</b> World!</div></body></html>')
p1=document.getElementById('p1')
h=p1.firstChild.firstChild;w=p1.lastChild;rang=document.createRange();
rang.selectNode(h);
clone=rang.cloneContents();
var span = document.createElement('span')
span.style.backgroundColor='yellow'

rang.surroundContents(span)
// <div id="p1"><span style="background-color: yellow;"><b>Hello</b></span> World!</div>

/**
 * collapse z折叠
 */
rang.collapse(true)
rang.collapsed

document.write('<html><body><p id="p1">Paragraph 1</p><p id="p2">Paragraph 2</p></body></html>');
p1=document.getElementById('p1');
p2=document.getElementById('p2');
rang=document.createRange();
rang.setStartBefore(p1);rang.setEndBefore(p2);

rang.collapsed

/**
 * detach 清理
 */
rang.detach();
rang=null