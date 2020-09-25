document.write('1');
document.body.innerHTML = 
  '<div id="wrap">'+
      '<p>p 123</p>'+
      '<p>p 456</p>'+
      '<div>000</div>'+
      '<div>111</div>'+
      '<div>222</div>'+
      '<div><button id="button1">按钮</button></div>'+
  '</div>'+
  '<button id="button2">按钮</button>';
/** =====26.4-同级兄弟元素遍历=================== */
// 获取兄弟元素名称
function getSublingName(node){
  // 如果存在兄弟元素
  if(node.previousSibling){
    var name = '',   // 返回的兄弟元素名称字符串
        count = 1,   // 紧邻兄弟元素中相同明恒元素个数
        nodeName = node.nodeName,        // 原始节点名称
        sibling = node.previousSibling;  // 前一个兄弟元素
    // 如果存在前一个兄弟元素
    while(sibling){
      // 如果节点为元素 并且节点类型和前一个兄弟元素类型相同 并且前一个兄弟元素名称存在
      if(sibling.nodeType == 1 && sibling.nodeType === node.nodeType && sibling.nodeName){
        // 如果节点名称和前一个兄弟元素节点名称相同
        if(nodeName === sibling.nodeName){
          // 节点名称后面添加计数
          name += ++count;
        }else{
          // 重置相同紧邻节点名称节点个数
          count = 1;
          // 追加新的节点名称
          name += '|' + sibling.nodeName.toUpperCase();
        }
      }
      // 向前获取前一个兄弟元素
      sibling = sibling.previousSibling;
    }
    return name;
    // 否则不存在兄弟元素返回 ''
  }else{
    return '';
  }
}

button1 = document.getElementById('button1');
div = button1.parentElement;
function getName(node){
  return node.nodeName + getSublingName(node);
}
getName(div)

/** =====26.5-遍历文档树=================== */
//
var Interpreter = (function(){
  //
  var getSublingName = getSublingName;
  //
  return function(node, wrap){
    //
    var path = [],
        wrap = wrap || document;
    //
    if(node === wrap){
      //
      if(wrap.nodeType === 1){
        // 
        path.push(wrap.nodeName.toUpperCase());
      }
      //
      return path;
    }
    //
    if(node.parentNode !== wrap){
      //
      path = arguments.callee(node.parentNode, wrap);
    }
    //
    else{
      //
      if(wrap.nodeType === 1){
        //
        path.push(wrap.nodeName.toUpperCase());
      }

    }
  }
})()