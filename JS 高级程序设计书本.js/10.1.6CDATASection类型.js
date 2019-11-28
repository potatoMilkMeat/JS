/**
 * CDATASection元素
 * 继承自 Text类型，没有 splitText() 方法
 * 没有子节点
 */
document.body.innerHTML='<div>div<![CDATA[this is come content.]]></div>';
var cdata= document.getElementsByTagName('div')[0].childNodes; 
c[1] // <![CDATA[this is come content.]]>
document.createCDATASection('000'); // <![CDATA[000]]>
