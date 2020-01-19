document.write('数据库IndexDB');
var request,db,objectStore,objStoreName = 'person';

function createIDB(IDBName, ver, objStore){
  var tamp = indexedDB.open(IDBName, ver);
  // 将用到的数据提前转备好,提高执行效率
  var OS = objStore,
      n = OS.name || false,
      k = OS.keyPath || false,
      I = OS.index || false,
      IN = I.Name || false,
      IV = I.value ||false;
  // 数据库升级，并创建表
  function createObjectStore(event){
    db = event.target.result;
    if(OS && n){
      // 创建表
      if(!db.objectStoreNames.contains(n)){
        var config = k ? {keyPath: k} : {autoIncrement: true};
        objectStore = db.createObjectStore(n, config);
      }
      // 创建表内索引
      if(I && IN){
        objectStore.createIndex(IN, IN, { unique: IV || false });
      }
    }
  }
  // 绑定监听
  tamp.onerror = function (event) { console.log('数据库打开报错');}
  tamp.onsuccess = function (event) { db = request.result; console.log('数据库打开成功'); };
  tamp.onupgradeneeded = createObjectStore
  return tamp;
}

request = createIDB('myIBD', 2, {name: objStoreName, keyPath: 'id', index: {name: 'name',value: true} })
