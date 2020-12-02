console.log('main.js 开始运行')
// P1 第一章 加载和执行 ==============
/**
 * 推荐把script放在</body>前. script下载会阻塞页面（ 因为script会改变dom，所以script下载并执行完，才会继续渲染页面，监听用户交互）
 * 通过合并，减少js数量。
 */
/**
 * defer属性 建议用在内嵌<script>标签
 *      // 外链作为js库存在，不推荐使用此属性
 * // <script src="" defer> 等同于 window.onload. 流程： DOM加载完 》defer 》 window.onload
 * // defer之间执行顺序： 内嵌1 》... 》内嵌n 》外链1 》... 》外链n
 */

// <script type="text/javascript">
/**
 * 1.1 - 动态脚本元素 推荐内嵌模式
 * P11
 * @param {*} url js路径
 * @param {*} func 回调函数
 */
  var loadScript = function(url, func){
    // 创建script标签 设定类型
    var script = document.createElement('script');
    script.type = 'text/javascript';
    // 兼容IE
    if(script.readyState){
      // 添加IEscript监听事件
      script.onreadystatechange = function(){
        var state = script.readyState;
        if(state === 'loaded' || state === 'complete'){
          func && func(); // 执行回调
          script.onreadystatechange = null; // 移除监听
        }
      }
    // 其他浏览器
    }else{
      script.onload = function(){
        func && func(); // 执行回调
        script.onload = null; // 移除监听
      }
    }
    // 设置url 并绑定到页面
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script); // 此时开始请求，下载script
  };

  // 使用示例
  // loadScript('../js_lib/writeDom.js', function(){
  //   console.log('../js_lib/writeDom.js 加载完成');
  // });
  // 还可以串联使用，下载等待等

// </script>

/**
 * 1.2 - XMLHttpRequest 脚本注入
 * P9
 * 不能跨域 会立即执行 
 * 还可以添加新的执行语句
 * @param {*} url js路径
 * @param {*} func 回调函数
 */
var xhr_loadScript = function(url, func){
  var xhr = new XMLHttpRequest();
  var script = document.createElement('script'); // script标签
  // 设置内容，并绑定到body
  var appendScript = function(text){
    script.type = 'text/javascript';
    script.text = text + ';console.log("新增打印语句");';
    document.getElementsByTagName('head')[0].appendChild(script);
  };
  xhr.open('get', url, true);
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status >=200 && xhr.status < 300 || xhr.status ===304){
        // 执行绑定并回调
        appendScript(xhr.responseText);
        func && func();
      }
    }
  };
  xhr.send(null);
};
// // 使用示例
// xhr_loadScript('../js_lib/writeDom.js', function(){
//   console.log('../js_lib/writeDom.js 加载完成  xhr');
// });

// P16 第二章 数据存储 ==============
/**
 * P15 尽量使用字面量和局部变量，减少数组项和对象成员的使用。
 * P15 var 申明为局部变量
 */

/**
 * 2.1 管理作用域
 * P16 解析变量 ：搜索执行环境的作用域链，查找相同的标识符。最先找到就会屏蔽之后的
 * P19 标识符性能：函数中局部变量最快，全局变量最慢。
 * P20 标识符性能 - 浏览器：Chrome 和 Safari 4以后，基本没影响。
 * P21 改变作用域链：不要用with, 性能慢；
 *       try-catch 中catch函数中 作用域改为异常对象，原函数为第二作用域链对象。
 * P24 动态作用域链 with try-catch中catch函数 eval函数都是 作用域在代打运行中动态创建，无法静态分析
 * P26 闭包需要更多的内容开销
 */

// 2.1.4 try-catch 调用优化
var try_catch = function(func, context, args, handleError){
  if(!func){console.log('****try_catch函数 参数func：'+ func); return;}
  // 设置默认值
  context = context || null;
  args = args || [];
  // 默认的处理错误方法
  handleError = handleError || function(error){
    console.log('****try_catch函数 参数context/args：', context, args);
    console.log(error);
  };
  try {
    func && func.apply(context, args);
  } catch (error) {
    handleError(error);
  }
  return context;
};

/**
 * 2.2 对象成员
 * P27 原型：对象包含 实例对象 和 原型对象
 * P28 解析对象成员 ： 对象实例 => 原型对象 搜索 key值
 * P29 原型链：原型链越深，找到它就越慢
 * P30 嵌套成员：嵌套越深，读取速度就越慢
 *     location 比 window.location 快
 * P31 缓存对象成员值，减少读取次数
 */
// 2.2.1 in操作符 是否包含特定属性
console.log('toString' in {});

// P35 第二章 DOM访问和修改 ==============
/**
 * 2.1 浏览器中的DOM
 * P36 访问和修改：减少访问DOM的次数，把运算经量留在ECMAScript这一端处理
 * P37 innerHTML 对比DOM方法：推荐innerHTML，速度差不多，代码可读性更强。
 *     采用 + 合并字符串 比 [].join('') 要快，因新浏览器 对 + 优化。
 * P41 element.cloneNode 比 document.createElement 快 3-10%
 * P42 HTML集合：转化为 数组操作会快些，避免DOM改变（结构，index）。
 *     for循环，申明len变量和item 会加速程序
 */
/**
 * for循环封装
 * @param {*} arr 数组对象
 * @param {*} func(item,index) 遍历函数 返回最后一次执行 {index: index, item: item}
 * @param {*} isSort 是否倒叙 默认false;
 * @param {*} context 遍历函数的作用域
 * @param {*} if_break_Fun 打断函数, 返回匹配的{index: index, item: item}，可用于查找item值
 */
var for_cl = function(arr, func,  isSort, context, if_break_Fun){
  if(Object.prototype.toString.call(arr) !== '[object Array]'){
    return false;
  }
  var len = arr.length;
  var index;
  var item;
  context = context || null;
  // 找到匹配的值
  var state = function(item, index) {
    if(if_break_Fun && if_break_Fun(item, index)){
      return {index: index, item: item};
    }
  };
  // 执行函数
  var done = function(item, index){
    func && func.call(context, item, index);
  };
  // 正序
  if(!isSort){
  for(index = 0;index<len;index++){
      state(arr[index], index);
      item = arr[index];
      done(item, index);
    }
  index--;
  // 逆序
  }else{
    for(index = len-1; index>=0; index--){
      state(arr[index], index);
      item = arr[index];
      done(item, index);
    }
    index++;
  }
  return {index: index, item: item};
};
// 使用示例
// 顺序 递增
// for_cl([0, 11, 22, 33],function(item, i){console.log(i, item);});
// // 倒叙 递减
// for_cl([0, 11, 22, 33],function(item, i){console.log(i, item);},true);
// // 顺序 递增，传递作用域
// for_cl([0, 11, 22, 33],function(item, i){console.log(i, item, this.id);},false, {id:'a'});
// // 顺序 递增，执行打断, 返回 {index: 2, item: 22}
// for_cl([0, 11, 22, 33], null, false, null, function(item, i){return item ===22});