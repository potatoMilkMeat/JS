
/**
 * DOM1-节点层次
 * Node类是所有节点的基础类，节点都继承此类
 */
document.nodeName // "#document" // 文档节点
document.body.nodeName // "BODY" // body.nodeType 会报错
document.head.nodeName // "HEAD"
// 以下方法可以访问其它节点
document.getElementsByTagName('html')[0].nodeName // "HTML" // document.html 会报错// 文档元素

/**
 * 每个节点都有nodeType属性
 * 分为12个值，还有对象的数值
 */
Node.ELEMENT_NODE                 // 1  元素 element
Node.ATTRIBUTE_NODE               // 2  特性 attribute
Node.TEXT_NODE                    // 3  文本 txt                            换行符也是一个单独的文本元素
Node.CDATA_SECTION_NODE           // 4  Cdata 切面 cdata section
Node.ENTITY_REFERENCE_NODE        // 5  实体引用 entity reference
Node.ENTITY_NODE                  // 6  实体 entity
Node.PROCESSING_INSTRUCTION_NODE  // 7  处理指令 processing instruction
Node.COMMENT_NODE                 // 8  注释 comment                         <!-- txt -->
Node.DOCUMENT_NODE                // 9  文档 document
Node.DOCUMENT_TYPE_NODE           // 10 文档类型 document type
Node.DOCUMENT_FRAGMENT_NODE       // 11 文档片段 document fragment
Node.NOTATION_NODE                // 12 标记 notation

/**
 * 判断节点类型 nodeType
 * 跨浏览器支持
 */
function nodeTypeIsElement(someNode){
  if(someNode.nodeType == 1){console.log(someNode.nodeName + ' is an element.');}
}
nodeTypeIsElement(document.body) // BODY is an element.

/**
 * 子节点列表  NodeList 类，不是数组
 * 结构类似数组
 * 属性： length（通过内部方法 length() 来动态获取）
 * 方法： item(1) 跟数组 arr[1]用法相同
 *        forEach()
 */

document.body.childNodes instanceof NodeList // true
document.body.childNodes instanceof Array // false

// 转换成数组 非IE8及以前有效
var arrayOfNodes= Array.prototype.slice.call(document.body.childNodes)

// 跨浏览器支持
function converToArray(nodes){
  var array = null;
  try{
    array= Array.prototype.slice.call(document.body.childNodes);
  }catch(ex){
    array=new Array();
    for(var i=0,len=nodes.length;i<len;i++){
      array.push(nodes[i]);
    }
  }
  return array;
}

document.body.childNodes[0].parentNode.nodeName // "BODY"
document.body.childNodes[2].nextSibling.nodeName // "#comment"
document.body.childNodes[2].previousSibling.nodeName // "DIV"

/**
 * 创建，添加，替换，删除，克隆节点
 */

var p=document.createElement('p'); // 创建
p.innerText='这是P标签'; // 设置文本信息

document.body.replaceChild(p, document.body.lastChild); // 替换
var text = document.body.removeChild(document.body.firstChild); // 删除
text.nodeValue='text 设置的新属性'; // 设置文本信息

document.body.appendChild(text); // 添加  把第一个放在最后一个
document.body.insertBefore(p, document.body.firstChild); // 添加  把p标签放在body的第一个

var ul= document.body.childNodes[3].cloneNode(false); // 浅复制，不包含子节点
ul.innerText='设置浅复制的ul, 通过 innerText 设置的属性';
document.body.appendChild(ul);

var ul1= document.body.childNodes[3].cloneNode(true);  // 深复制，包含所有子节点
document.body.appendChild(ul1); 