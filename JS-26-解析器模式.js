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
function g(id){ return document.getElementById(id);}
getName(div);

/** =====26.5-遍历文档树=================== */
// XPath 解释器
var Interpreter = (function(){
  // 获取兄弟元素名称
  // var getSublingName = getSublingName;
  // 参数 node: 目标节点  参数 wrap: 容器节点
  return function(node, wrap){
    // 路径数组
    var path = [],
        // 如果不存在容器节点，默认为documnet
        wrap = wrap || document;
    // 如果当前节点等于容器节点
    console.log('程序开始', path, node, wrap);
    if(node === wrap){
      // 容器节点为元素
      if(wrap.nodeType === 1){
        // 路径数组中输入容器节点名称
        path.push(wrap.nodeName.toUpperCase());
      }
      // 返回最终路径数组结果
      console.log('***  node === wrap 返回最终路径数组结果', path);
      return path;
    }
    // 递归
    // 如果当前节点的父节点不等于容器节点
    if(node.parentNode !== wrap){
      // 对当前节点的父节点执行遍历操作
      console.log('+++  递归函数');
      path = arguments.callee(node.parentNode, wrap);
    }
    // 如果当前节点的父元素节点与容器节点相同
    else{
      // 容器节点为元素
      if(wrap.nodeType === 1){
        // 路径数组中输入容器节点名称
        path.push(wrap.nodeName.toUpperCase());
      }
      console.log('*** wrap.nodeName', path);
    }
    // 获取元素的兄弟元素名称统计
    var sublingsNames = getSublingName(node);
    // 如果节点为元素
    if(node.nodeType === 1){
      // 输入当前节点元素名称及其前面兄弟元素名称统计
      path.push(node.nodeName.toUpperCase() + sublingsNames);
    }
    // 返回最终路径数组结果
    console.log('*** 返回最终路径数组结果', path);
    return path;
  }
  // 立即执行方法
})();

var path = Interpreter(g('button1'));