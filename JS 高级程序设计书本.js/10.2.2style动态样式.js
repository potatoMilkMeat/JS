/**
 * 动态样式
 * html中加载外部link 
 * // <link rel="stylesheet" type="text/css" href="style.css">
 */
// body{background:#f0f0f0;}
var link = document.createElement('link');
link.rel="stylesheet";
link.type="text/css";
link.href='style.css';
document.getElementsByTagName('head')[0].appendChild(link);


/**
 * loadStyles 
 * @param {*} url 传递js 的src值
 */
function loadStyles(url){
  var link = document.createElement('link');
  link.rel="stylesheet";
  link.type="text/css";
  link.href=url;
  document.getElementsByTagName('head')[0].appendChild(link);
}
loadStyles('style.css') // 这是a.js

/**
 * loadStylesString
 * @param {*} css js代码
 */
function loadStylesString(css){
  var style = document.createElement('style');
  style.type="text/css";
  try {
    style.appendChild(document.createTextNode(css));
  } catch (ex) {
    style.styleSheet.cssText=css;
  }
  document.getElementsByTagName('head')[0].appendChild(style);
}
loadStylesString("body{background:#f0f0f0;}");
 