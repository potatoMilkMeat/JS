document.write('数据库IndexDB');
// class 是es6语法
class IDB {
  constructor(options){
    let defaultOpts = { // 默认选项
      db: {},
      name: 'myDB', //数据库名
      version: 1, // 数据库版本号
      tableName: 'tabName', //表名
      keyPath: 'id', // 默认以id 为主键,可选
      indexArr: []  // 索引数组  内容：{ indexName: 'name', unique: { unique: false } }
    }
    this.options = Object.assign(defaultOpts, options)
  }
  init(fn){
    for(let k in this.options){
      this[k] = this.options[k]
    }
    this.openDb(this.indexArr,fn)
  }
  openDb(indexArr, fn){
    /**新建或打开数据库 */
    let request = window.indexedDB.open(this.name);
    // 打开数据库成功，新建时走onupgradeneeded线
    request.onsuccess = ()=> {
      this.db = request.result; // 获取数据库对象
      fn && fn()
      console.log('数据库打开成功----\nversion----',this.version) // 获取版本号，得到整数
    };
    // 新建或打开失败
    request.onerror = (e)=> {
      console.error('数据库打开报错----\n',e)
    };
    // 新建数据库,或者指定的版本号大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded,不再支持 setVersion()来设置版本号
    // 在此回调中,数据库处于升级状态,不能进行增删改查的操作
  }
}


function IDB() {
  // 公共属性，暴露给外面用
  this.request = null;
  this.db = null;
  this.objectStore = null;
}
IDB.prototype = {
  // 创建数据库,表,索引
  create: function(IDBName, ver, objStore){
    // objStore 格式: { name: 'person', keyPath: 'id', index: { name: 'title', value: true } }
    this.objStore = objStore;
    var tamp = this.request = indexedDB.open(IDBName, ver);

    // 绑定监听
    tamp.onerror = function(event) { console.log('数据库打开报错',IDBName, ver); };
    tamp.onsuccess = (event)=> { 
      this.db = event.target.result;
      console.log('数据库打开成功', IDBName, ver);
    };
    tamp.onupgradeneeded = (event)=>{
      console.log('函数 onupgradeneeded', this)
      this.createObjectStore(event)
    }
  },
  // 数据库升级，并创建表
  createObjectStore: function(event) {
    console.log('函数 createObjectStore', this)
    this.db = event.target.result;
    // 将用到的数据提前转备好,提高执行效率
    var OS = this.objStore,
        n = OS.name || false,
        k = OS.keyPath || false,
        I = OS.index || false,
        IN = I.Name || false,
        IV = I.value || false;

    if (OS && n) {
      // 创建表
      if (!this.db.objectStoreNames.contains(n)) {
        var config = k ? { keyPath: k } : { autoIncrement: true };
        this.objectStore = this.db.createObjectStore(n, config);
      }
      // 创建表内索引
      if (I && IN) {
        this.objectStore.createIndex(IN, IN, { unique: IV || false });
      }
    }
  },
}


/**
 * 使用IBD 是类，请用new IDB()
 * this.request：数据库 IDBOpenDBRequest
 * this.db：数据库 
  this.objectStore = null;
 */
var store = new IDB();
store.create('myIBD', 2, { name: 'person', keyPath: 'id', index: { name: 'name', value: true } })
