/**
 * 动态脚本
 * html中加载外部js
 * // <script src="a.js"></script> 
 */
// function a(){ console.log('这是a.js'); }a();

var script = document.createElement('script');
script.type="text/javascript";
script.src='a.js';
document.body.appendChild(script);


/**
 * loadScript 
 * @param {*} url 传递js 的src值
 */
function loadScript(url){
  var script = document.createElement('script');
  script.type="text/javascript";
  script.src=url;
  document.body.appendChild(script);
}
loadScript('./a.js') // 这是a.js

/**
 * loadScriptString
 * @param {*} code js代码
 */
function loadScriptString(code){
  var script = document.createElement('script');
  script.type="text/javascript";
  try {
    script.appendChild(document.createTextNode(code));
  } catch (ex) {
    script.text=code;
  }
  document.body.appendChild(script);
}
loadScriptString("console.log('这是code');") // 这是code // eval("console.log('这是code');")
 