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

// P35 第三章 DOM编程 ==============
/**
 * 3.1 浏览器中的DOM
 * P36 访问和修改：减少访问DOM的次数，把运算经量留在ECMAScript这一端处理
 * P37 innerHTML 对比DOM方法：推荐innerHTML，速度差不多，代码可读性更强。
 *     采用 + 合并字符串 比 [].join('') 要快，因新浏览器 对 + 优化。
 * P41 element.cloneNode 比 document.createElement 快 3-10%
 * P42 HTML集合：转化为 数组操作会快些，避免DOM改变（结构，index）。
 *     for循环，申明len变量和item 会加速程序
 * P46 遍历Dom children 比 node 的childNodes ，firstChild 等快
 * P48 选择器API document.querySelectorAll('#id a', '#id2 a') 快
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
  var doneArr = [false, false]; // 执行的函数 状态
  var state; // 函数为 找到匹配的值
  var done; // 函数循环
  var doneFunc; // 实际执行函数
  context = context || null;

  // 找到匹配的值
  if(if_break_Fun && typeof if_break_Fun === 'function'){
    state = function(item, index) {
      if(if_break_Fun(item, index)){
        return true;
      }else {return false;}
    };
    doneArr[0] = true;
  }
  
  // 执行函数
  if(func && typeof func === 'function'){
    done = function(item, index){
      func.call(context, item, index);
    };
   doneArr[1] = true;
  }
  // 没有执行函数报错
  if(!doneArr[0] && !doneArr[1]){
    throw new Error(JSON.stringify({type: '参数错误', message: 'func 和 if_break_Fun 不是函数'}));
  }
  
  // 正序
  if(!isSort){
  for(index = 0;index<len;index++){
    item = arr[index];
    if(doneArr[0] && state(item, index)){return {index: index, item: item}};
    doneArr[1] && done(item, index);
  }
  index--;
  // 逆序
  }else{
    for(index = len;index--;){
      item = arr[index];
      if(doneArr[0] && state(item, index)){return {index: index, item: item}};
      doneArr[1] && done(item, index);
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

/**
 * 3.2 重绘和 重排
 * P52 el.style.cssText = '';
 * P54 推荐文档片段来 批量修改Dom
 * P56 将导致重绘的数值缓存成变量 例如 offsetTop
 *     动画- 绝对定位脱离，动画结束后恢复
 * P57 事件委托给父级，判断是不是子集触发的，做成类库使用
 */

 // P61 第四章 算法和流程控制 ==============
/**
 * 3.1 循环
 * P63 for-in 最慢 速度为其他循环类的 1/7
 * P63 减少迭代的工作量：声明变量 var len；倒叙(快50%-60%)
 * P66 减少迭代次数
 */

/**
 * P66 减少迭代次数
 * // 循环体展开技术 ‘达夫设备 Duff's Device’
 * // 根据 Jeff Greenberg 改编
 * @param {*} arr 操作数组对象
 * @param {*} func 处理程序
 * @param {*} num 循环体展开的个数，默认为8次
 */
var while_cl = function(arr, func, num){
  // 克隆的循环体展开个数，用于动态创建 done 函数体
  var numClone = num = num || 8;
  // 克隆的数组长度，用于处理程序使用
  var lenClone = len = arr.length;
  var i = len % num; // 现在 的 i为 余数
  // 执行 余数循环
  while (i--) {
    func(arr[--lenClone]);
  }

  // 动态创建 done 函数体，eval 返回了一个新的匿名函数
  var doneFuncString = '(function a(){return function(){';
  while (numClone--) {
    doneFuncString += 'func(arr[--lenClone]);';
  }
  doneFuncString += '}})();';
  var done = eval(doneFuncString);

  // 现在 的 i为 倍数（循环体展开技术的核心）
  i = Math.floor(len/num);
  while (i--) {
    done();
  }
};
// 使用示例
// while_cl(['000',111,222,3333,4444],function(item){console.log(item);}, 3);

/**
 * 3.2 条件语句
 * P68 条减少用if-else, 否则用switch。实际上switch 有语言的分支优化，并且switch采用===（快）
 * P70 if-else 采用二分法会加快运行
 * P72 查找表，数组和对象建立索引表，会加快速度。（完全抛弃条件判断）
 */

 /**
 * 3.3 递归
 * P75 递归模式分为 调用自身；双函数相互调用（一般会卡死）
 * P76 迭代 来替换递归，避免调用栈限制。
 * P77 缓存方式减少重复计算，加快速度
 */
// P76 迭代 来替换递归，避免调用栈限制。
/**
 * 比较大小，小排前面。数组不限制长度
 * 展开时，left 和 right数组内部排列顺序，此时长度为1，或者2
 * 展开后，left 和 right数组比较大小，一次循环后结束
 * @param {*} left 左数组
 * @param {*} right 右数组
 */
var merge = function(left, right) {
  var result = []; // 暂存数组，存小值
  // 遍历，直到 左或者右的数组为空
  while(left.length > 0 && right.length > 0){
    if(left[0] < right[0]){
      result.push(left.shift());
    }else{
      result.push(right.shift());
    }
  }
  // 返回的结果，需要拼接剩下的数组。其中一个为空
  // 结果就是小的在前，大的在后
  return result.concat(left).concat(right);
};

/**
 * 排序数组，递归处理 分成左右两个数组，依次展开，直到长度为1时返回
 * @param {*} items 被排序的数组
 */
var mergeSort = function(items){
  // 递归的终止条件
  if(items.length ===1){
    return items;
  }
  // 二分法 来展开
  var middle = Math.floor(items.length / 2),
      left = items.slice(0, middle),
      right = items.slice(middle);
  // 返回结果 - 递归的核心
  // 展开时，二分到 单独的一个为止
  // 展开后，只比较 做开始的左右数组
  return merge(mergeSort(left), mergeSort(right));
};

console.log(mergeSort([123,56,25,4,0]));