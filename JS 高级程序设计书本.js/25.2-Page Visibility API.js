// 最小化 - 最大化，后台标签页的切换
// Document.hidden （只读属性）返回布尔值，表示页面是（true）否（false）隐藏

// Document.visibilityState （只读属性）, 
// 返回document的可见性 'visible' 'hidden'  
//                     'prerender' : 页面此时正在渲染中, 因此是不可见的 
//                     'unloaded' : 页面从内存中卸载清除. 注意: 浏览器支持是可选的.
document.addEventListener("visibilitychange", function() {
  console.log( document.hidden, document.visibilityState);
});

// hidden 比 visibilityState 支持广些
// ===============================================================
// 为了兼容可以使用 ms webkit moz
function handleVisibilityChange(){
  if(document.hidden || document.msHidden || document.webkitHidden){
    console.log('hidden')
  }else {
    console.log('visible')
  }
}
document.addEventListener('msvisiblitychange', handleVisibilityChange)
document.addEventListener('webkitvisiblitychange', handleVisibilityChange)