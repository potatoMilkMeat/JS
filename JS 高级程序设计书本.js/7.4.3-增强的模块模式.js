/**
 * 增强的模块模式
 * 单例创建私有变量和特权方法
 */
var singleton=function(){

  // 私有变量和函数
  var privateVariable=10;
  function getPrivateVariable(){ return privateVariable; }
  function getPublicName(){return this.name;}

  // 创建对象
  var object=new Object();

  // 特权方法 共有方法和属性
  object.name= 'chengl';
  object.publicMethod=function(){ privateVariable++; return getPrivateVariable() },
  object.getName=getPublicName;

  // 返回
  return object;
}()

singleton.getName() // "chengl"
singleton.publicMethod() // 11

/**
 * 增强的模块模式
 * 管理组件的 application对象
 */
var application=function(){

  // 私有变量和函数
  var components=new Array();
  // 初始化
  components.push(...(new BaseComponent()));
  
  // 创建一个局部副本
  var app = new BaseComponent()
  //公共接口
  app.getComponentCount= function(){ return components.length; };
  app.registerComponent= function(component){ if(typeof component === 'object'){ components.push(component);return true; }else{ return false; } };
  app.showComponents= function(){ return components; };
  // 返回
  return app;
}();
function BaseComponent(){
  return [{name:'Head'},{name:'Footer'}]
}

application.registerComponent({name:'Main'}) // true
application.getComponentCount() // 3
application.showComponents()
// 0:  {name: "Head"}
// 1:  {name: "Footer"}
// 2:  {name: "Main"}
