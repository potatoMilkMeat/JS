/**
 * 作者：武汉-程龙
 * 开始时间：2020年1月26日 17:02
 * html 和 js 解耦做的
 * el.pre.onclick= fn
 */
function clearELE(){
  var defaultOptions = {
    bookshelf: 'bookshelf', // 书架模块
    bookshelfContent: 'bookshelfContent', // 书架内容
    addBook: 'addBook', // 添加书
    tool: 'tool', // 工具模块
    input: 'input', // 工具-input[type='file']
    encoding: 'encoding', // 工具-解码器
    gotoBookshelf: 'gotoBookshelf', // 工具-按钮 返回书架
    pre: 'pre', // 工具-按钮 上一章
    next: 'next', // 工具-按钮 下一章
    // save: 'save', // 工具-按钮 保存当前章到书签
    now: 'now', // 工具-当前章节名字
    // bookmark: 'bookmark', // 工具-书签列表
    txt: 'txt' // 正文阅读区域
  };
  var obj = defaultOptions,
      keys = Object.keys(obj),
      l = keys.length,
      i = 0,
      el = {};
  for(;i<l;i++){
    let str= keys[i];
    el[str] = document.getElementById(obj[str]);
  }
  return el;
}