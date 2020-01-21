// class 是es6语法
class DB {
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
    request.onupgradeneeded = (e)=> {
      console.log('数据库进入升级---\nthis-----------',this);
      this.db = e.target.result;
      let myStore;
      if(!this.db.objectStoreNames.contains(this.tableName)){ // 若不存在名为person的表,就新建
        let keyCfg = this.keyPath ? {keyPath:this.keyPath} : {autoIncrement: true};
        myStore = this.db.createObjectStore(this.tableName, keyCfg); // 若不指定主键,让IndexedDB自动生成一个递增的整数为主键
        indexArr.forEach(v => { // 建立索引,索引名称、索引所在的属性、配置对象（说明该表中该属性是否包含重复的值）。
          myStore.createIndex(v.indexName, v.indexName, v.unique)
        });
      }
    }
  }
  // 向数据库写入数据
  /**
   * 在对新数据库做任何事情之前,如增删改查操作，都需要开始一个事务。
   *事务有三种模式，网上都有，我也把罗列一下
  *只读：readonly，不能修改数据库数据，可以并发执行
  *读写：readwrite，可以进行读写操作
  *版本变更，versionchange
  */
  addData(data){
    let request = this.db.transaction([this.tableName], 'readwrite') // 写入数据需要新建一个事务,新建时必须指定表格名称和操作模式（"只读"或"读写"）
      .objectStore(this.tableName) // 获取指定的IDBObjectStore 对象
      .add(data); // 通过表格对象的add()方法，向表格写入一条记录,写入操作是一个异步操作。
      // data 中应该有主键,索引
      // .add({id: 1112,name: '李四', age: Math.round(Math.random()*10+15), email: 'zhangsan@example.com' });

    // 通过监听连接对象的success事件和error事件，了解是否写入成功
    request.onsuccess = (e)=>{
      console.log('数据写入成功', data);
    };
    // 写入数据失败
    request.onerror = (e)=>{
      console.error('数据写入失败\ne----',e)
    };
  }
  // 遍历表中的数据,将全部数据data传入fn中进行调用
  readAll(fn){
    let objectStore = this.db.transaction(this.tableName).objectStore(this.tableName);
    let data = [] // 不能放在onsuccess内部
    // 新建指针对象的openCursor()方法是一个异步操作，所以要监听success事件。
    // 当记录有多条时,openCursor会多次执行
    objectStore.openCursor().onsuccess = (e)=>{
      let cursor = e.target.result;
      if(cursor){
        console.log('cursor-----', cursor.key,' : ', cursor.value);
        data.push(JSON.parse(JSON.stringify(cursor.value)));
        cursor.continue();
      } else {
        console.log('全部数据-----', data);
        fn && fn(data)
      }
    };
  }
  
  // 更新数据,newData必须含主键名,全部索引键值对
  put(newData){
    var request = this.db.transaction([this.tableName], 'readwrite').objectStore(this.tableName).put(newData)
    // .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' });   // put()方法自动更新了主键为1的记录(主键key名为 id)。

    request.onsuccess = (e)=>{
      console.log('数据更新成功')
    };
    request.onerror = (e)=>{
      console.log('数据更新失败')
    };
  }
  // 更新数据, newData必须含主键名, 需要跟新 的索引键值对
  updata(newData){
    let val = newData[this.keyPath], oldData,_that = this;
    function fn(result){
      oldData = JSON.parse(JSON.stringify(result));
      Object.assign(oldData, newData);
      _that.put(oldData);
    }
    this.readData(val, fn)
  }
  // 根据主键值查询,将查到的值传入fn进行操作
  readData(val, fn){
    var objectStore = this.db.transaction([this.tableName], 'readwrite').objectStore(this.tableName); // 获取指定的IDBObjectStore 对象
    var request = objectStore.get(val); // 读取数据，参数是主键的值。
    request.onerror = (e) => {
      console.log('事务失败');
    };
    request.onsuccess = (e)=>{
      if(request.result){
        fn(request.result);
      }else {
        console.log('未获得数据记录');
      }
    };
  }
  // 按照索引值来查询数据,将结果传入fn中操作
  getByName(indexName, val, fn){
    var request = this.db.transaction([this.tableName], 'readwrite').objectStore(this.tableName).index(indexName).get(val);
    request.onsuccess = (e)=>{
      var result = e.target.result;
      if(result){
        console.log('查到结果---',result)
        fn(result)
      }else console.error('未查到结果', indexName, val, fn)
    };
  }
  // 关闭数据库,相对于open
  closeDB(){
    this.db.close();
  }
  //  删除数据库中指定主键值的某条记录
  deleteByKeyPathVal(val){
    var request = this.db.transaction([this.tableName], 'readwrite').objectStore(this.tableName).delete(val);  // 删除指定主键值的某条记录

    request.onsuccess = (e) => {
      console.log('数据删除成功');
    };
  }
  // 删除某张指定表名的表
  deleteTableByName(tableName){
    this.db.deleteObjectStore(tableName);
  }
  // 对某张表清空但不删除
  clearTableByName(tableName){
    this.db.transaction(tableName,'readwrite').objectStore(tableName).clear();
  }

  // 删除数据库,name为 open时用的名字
  deleteDBByName(name){
    let request = window.indexedDB.deleteDatabase(name); // 删除指定数据库
    request.onerror =(e)=>{
      console.error('删除db失败', name);
    };
    request.onsuccess = (e)=>{
      console.log('删除db成功', e.result); // 删除成功后得到 e.result:  undefined
    };
  }
}

// 使用实例
// var newOptions ={ indexArr:[ { indexName: 'title', unique: { unique: false } }], name: 'bookshelf', tableName: 'bookName'}
// var store = new DB(newOptions);

// store.init(onready)

// // 更改等最好等初始化好了再进行
// function onready(){
//   console.log('onready')
//   store.addData({id:11,name:'chenglong',data: 'asdfasdfasdf'}) // 写入
//   store.readData(11,function(val){console.log(2222,val)}) // 读取
//   store.readAll() // 读取全部

//   store.getByName(name,'chenglong',function(val){console.log(11111111,val)}) // 按照索引读取，需要创建以name为index 的索引，并指定unique

// }

// store.clearTableByName(store.tableName) // 清空表
