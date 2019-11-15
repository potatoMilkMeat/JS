/**
 * 模块模式
 * 单例创建私有变量和特权方法
 */
var singleton=function(){

  // 私有变量和函数
  var privateVariable=10;
  function getPrivateVariable(){ return privateVariable; }
  function getPublicName(){return this.name;}

  // 特权方法 共有方法和属性
  return {
    name: 'chengl',
    publicMethod: function(){
      privateVariable++;
      return getPrivateVariable()
    },
    getName: getPublicName
  };
}()

singleton.getName() // "chengl"
singleton.publicMethod() // 11

/**
 * 模块模式
 * 管理组件的 application对象
 */
var application=function(){

  // 私有变量和函数
  var components=new Array();
  // 初始化
  components.push(...(new BaseComponent()));
  //公共
  return {
    getComponentCount: function(){ return components.length; },
    registerComponent: function(component){ if(typeof component === 'object'){ components.push(component);return true; }else{ return false; } },
    showComponents: function(){ return components; }
  };
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
