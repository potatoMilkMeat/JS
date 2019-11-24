
/**
 * document 类型
 * 节点特性
 */
document.nodeName // "#document"
document.nodeType // 9
document.nodeValue // null
document.parentNode // null
document.ownerDocument // null
document.childNodes // NodeList(2) [html, html]

document.childNodes[0] // <!DOCTYPE html>               10 文档类型 document type
document.childNodes[1] // <html lang="en">...</html>    1  元素 element

document.documentElement // <html lang="en">...</html>
document.documentElement == document.childNodes[1] // true

document.body // <body>...</body>
// document.doctype // <!DOCTYPE html>  浏览器和各版本差异大，请不用使用。

/**
 * 文档信息
 * title
 * URL 完整地址
 * domain  域名  唯一可以设置，只支持统一域的符合规则地址
 * referrer 来源页面的URL
 */
document.title='程昱勋对妈妈好的不行了' // 设置
document.title // 程昱勋 获取

document.URL // "file:///C:/Users/admin/Desktop/test.html"
document.domain // "fanyi.baidu.com"
document.domain='baidu.com' // "baidu.com"
document.referrer // 


/**
 * domain  域名 允许设置子域名为唯一父域名，可以通讯
 * 不能再允许还原
 */
document.domain // "fanyi.baidu.com"
document.domain='baidu.com' // "baidu.com"
// 此 百度翻译域名就可以和百度搜索进行 JS通讯

/**
 * 查找元素
 * id 该节点
 * tagName  HTMLCollection
 * * 来查找全部
 * name NodeList 类 ；  没有 namedItem('myDiv')属性
 */
document.getElementById('idName') // ie7及以前不区分大小写 // ie7及以前会匹配表单的 name属性
document.getElementsByTagName('div') // 返回 HTMLCollection 类

document.getElementsByTagName('div')[0]  // 
document.getElementsByTagName('div').item(0) // 
document.getElementsByTagName('div').namedItem('myDiv') // 通过div name='myDiv'访问

document.getElementsByTagName("*"); // 获取全部

document.getElementsByName('myDiv') // NodeList 类
// document.getElementsByName('myDiv').namedItem('myDiv') // 报错

/**
 * 特殊集合 HTMLCollection
 */
document.anchors // 返回 带name属性的 a 元素
document.forms // 与右边效果相同 document.getElementsByTagName('form')
document.images // 与右边效果相同 document.getElementsByTagName('img')
document.links // 返回 带 href 特性的 a 元素

/**
 * DOM一致性检测
 * 不推荐单个使用，因为个厂商的浏览器返回的 值为true,实际上还是不支持
 * 建议同时使用 能力检测
 */
document.implementation.hasFeature('XML','1.0')
document.implementation.hasFeature('LS-Async','3.0')