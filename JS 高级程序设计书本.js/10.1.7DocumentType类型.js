/**
 * DocumentType元素
 * 继承自 Text类型，没有 splitText() 方法
 * 没有子节点
 */
document.doctype // <!doctype html>
document.doctype.name == document.doctype.nodeName // true // html
document.doctype.nodeValue // null
