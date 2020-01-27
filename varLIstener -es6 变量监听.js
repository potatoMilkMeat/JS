function varLIstener(obj,keys=null,fn,that){
  // 给属性绑定set监听
  if(!keys || !keys.length) keys = Object.keys(obj);
  // 自生复制属性
  var keysChange = []
  keys.forEach((item,i)=>{
    keysChange[i] = '_' + item;
    var val = typeof obj[item] !== 'object' ? obj[item] : JSON.parse(JSON.stringify(obj[item]));
    Object.defineProperty(obj,keysChange[i],{ writable: true, value: val });
  })
  for(let key of keys){
    Object.defineProperty(obj, key, {
      get: function(){
        return this['_' + key];
      },
      set: function (value) {
        // 当listenMenuTree 的value值发生改变时，触发set函数的内容
        this['_' + key] = value;
        fn.call(that);
        // this.creatTamp();
      }
    })
  }
}
a={name: "万古最强宗", marks: Array(0), n: 1}
b={name:'bbbb'};
function log(){console.log(this.name)}

varLIstener(a,null,log,b)