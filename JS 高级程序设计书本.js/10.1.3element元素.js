
/**
 * element类型
 * 标签名是 nodeName  tagName
 * ID  element.id
 */
element = document.body.childNodes[1]; // div#custom-bg

name = element.nodeName; // "DIV" html中全大写，xml和XHTML中与源码保持一致
element.tagName == element.nodeName; // true
if(element.tagName.toLowerCase()==='div'){/* func() */}

id= element.id // "custom-bg"

a= element.getAttributeNode('id') //  id="custom-bg" ；typeof 是 object；keys()为空；getOwnPropertyDescriptors 为空


document.body.innerHTML='<button class="class-h1" style="background:rgba(0,0,0,0.1)">123<\/button><button>666<\/button>'
h=document.getElementsByTagName('button');
h[0].accessKey='q';h[1].accessKey='w';h[0].style.color="#0a0";
h[0].attributes;

/**
 * attribute
 * 默认的五个属性 id, className, tilte, dir, lang
 * 有些元素 align=left, width,height（图片和表格等）
 * .clientHeight 是只读属性，不能直接设置，通过 style.height
 */
document.body.innerHTML='<div id="id" class="class_cl" title="title" dir="ltr">我是文本信息<\/div>'
div= document.getElementsByTagName('div')[0];
div.title // "title" // 五大类常用是都可以访问的
div.align // "left" // 受dir 和align 共同影响
div.align='right' // 直接设置
div.height='34px' // 无效
div.style.height='34px' // div.clientHeight 从17 变成34

div.setAttribute('COLOR', 'red') // 设置特性，特性名会统一转换成小写
div.getAttribute('color') // 'red'

/**
 * attributes   NamedNodeMap类型  length
 * item(0), getNamedItem('id')
 * removeNameItem("id")
 * setNameItem(node)
 */
div.attributes // NamedNodeMap {0: id, 1: class, 2: title, 3: dir, 4: align, 5: color, 6: style, id: id, class: class, title: title, dir: dir, align: align, …}

div.attributes.id == div.attributes['id'] == div.attributes[0] == div.attributes.item('id') == div.attributes.getNamedItem('id') // 都是访问特性 'id'

var cla = div.attributes.class // 属性 具有两种值  nodeName  nodeValue
cla.nodeName == cla.localName == cla.name // "class"
cla.nodeValue == cla.textContent == cla.value // "class_cl"

div.attributes.removeNamedItem('id') 
div.removeAttribute('color')

/**
 * outputAttributes 将 attributes 属性遍历后输出 string 格式
 * attributes 适合遍历
 * ie 7级以前，会遍历出 默认特性，通过 div.attributes.class.specified
 */
function outputAttributes(element){
  var pairs=new Array(),attrName,attrValue,i,len;
  for(i=0,len=element.attributes.length; i<len; i++){
    attrName = element.attributes[i].nodeName;
    attrValue = element.attributes[i].nodeValue;

    if(element.attributes[i].specified){
      pairs.push(attrName + '=\''+attrValue+'\'');
    }
    
  }
  return pairs.join(' \t');
}

/**
 * 创建元素 createElement(tagName)
 */
var d12=document.createElement('div'); // <div></div>
d12.id='id12'; // <div id="id11"></div>
d12.innerHTML='d12'; // <div id="id11">d12</div>
document.body.appendChild(d12);