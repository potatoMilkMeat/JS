/** =====10.3 JQuery 适配器=================== */
// 引入Jquery
window.A = A = jQuery;

/** =====10.4 适配异类框架=================== */
var A = A || {};
A.g = function(id){return document.getElementById(id);}

A.on = function(id, type, fn){
  var dom = typeof id === 'string' ? this.g(id) : id;
  if(dom.addEventListener){dom.addEventListener(type, fn, false);}
  else if(dom.attachEvent){dom.attachEvent('on'+type, fn);}
  else dom['on'+type] = fn;
}

A.on(window, load, function(){console.log('window 已经加载完成');})

// 适配异类框架
A.g = function(id){return $(id).get(0);}
A.on = function(id, type, fn){
  var dom = typeof id === 'string' ? $('#'+ id) : $(id);
  dom.on(type, fn);
}

/** =====10.5 参数适配器=================== */
function doSomeThing1(name, title, age, color, size, prize){}
// 改写
/**
 * @param obj.name: name
 * @param obj.title: title
 * @param obj.age: age
 * @param obj.color: color
 * @param obj.size: size
 * @param obj.prize: prize
 */
function doSomeThing(obj){
  // 默认参数
  let _adapter = {
    name: '程龙',
    title: '设计模式',
    age: 32,
    color: 'blue',
    size: 100,
    prize: 50
  };
  for(let i in _adapter){
    _adapter[i] = obj[i] || _adapter[i]; // 因obj[i] 取 0, NaN, '', false, undefined, null 而使用默认值。
    _adapter[i] = obj[i] ?? _adapter[i]; // obj[i] 不等于 undefined  null  就行了
  }
  // do things
}

/** =====10.6 数据适配器=================== */
var arr= ['程龙', '设计模式', 32];
function arrToObjectAdapter(arr){
  return {
    name: arr[0],
    title: arr[1],
    age: arr[2]
  }
}
obj = arrToObjectAdapter(arr);

/** =====10.7 服务器端数据适配=================== */
function ajaxAdapter(data){
  return [data['key1'], data['key2'], data['key3']];
}
$.ajax({
  url: 'someAddress.php',
  success: function(data, status){
    if(data)
      doSomeThing3(ajaxAdapter(data));
  }
})