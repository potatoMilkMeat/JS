document.write('数据库IndexDB');
var request,db,objectStore,objectStoreName = 'person',oldV=0;
/**
 * indexedDB.open(databaseName, version);
 *    第一个参数是字符串，表示数据库的名字。如果指定的数据库不存在，就会新建数据库。
 *    第二个参数是整数，表示数据库的版本。
 *    如果省略，打开已有数据库时，默认为当前版本；不会触发升级事件；
 *    新建数据库时，默认为1。不会触发升级事件；
 *    设置为2，触发升级事件
 * ------------------
 *    返回一个 IDBRequest 对象。
 *    这个对象通过三种事件error、success、upgradeneeded，处理打开数据库的操作结果。
 */
request = indexedDB.open('myIBD',2)


// 打开数据库失败
request.onerror = function (event) { console.log('数据库打开报错');}

// 打开数据库成功。
request.onsuccess = function (event) {
  db = request.result;
  console.log('数据库打开成功');
};

// 数据库升级
request.onupgradeneeded = function (event) {
  if(db && db.version){oldV = db.version};
  db = event.target.result;
  console.log('数据库升级: new/old', db.version, oldV);
  /**
   * 新建数据库
   * 新建对象仓库（即新建表）
   *   |--   新增一张叫做person的表格，主键是id。 
   *   |     // db.createObjectStore('person', { keyPath: 'id' });
   *   | 
   *     |-- 主键（key）是默认建立索引的属性。比如，数据记录是{ id: 1, name: '张三' }，那么id属性可以作为主键。
   *     |-- 主键也可以指定为下一层对象的属性，比如{ foo: { bar: 'baz' } }的foo.bar也可以指定为主键。
   *     |-- 如果数据记录里面没有合适作为主键的属性，那么可以让 IndexedDB 自动生成主键。
   *     |   主键为一个递增的整数。
   *     |   // db.createObjectStore('person', { autoIncrement: true });
   *     |
   *   |--   更好的写法是先判断一下，这张表格是否存在，如果不存在再新建。 
   *   |     // db.objectStoreNames.contains('person')
   *   |
   *   |--   新建索引。
   *   |--   //IDBObject.createIndex(indexName, property, {})
   *     |-- 索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）。
   */
  console.log(objectStoreName)
  if(!db.objectStoreNames.contains('person')){
    objectStore = db.createObjectStore('person', { keyPath: 'id' });
  }

  objectStore.createIndex('name', 'name', { unique: false });
  objectStore.createIndex('email', 'email', { unique: true });
}
/**
 * 设置版本号
 * database.setVersion('2.0') chrome 不支持
 */

/**
 * 新增数据
 * 向对象仓库写入数据记录
 * 新建事务 必须指定表格名称和操作模式（"只读"或"读写"）
 *    // db.transaction(['person'], 'readwrite')
 * 通过 IDBTransaction.objectStore(name) 方法，拿到 IDBObjectStore 对象
 * 通过表格对象的add()方法，向表格写入一条记录。
 * 
 *    写入操作是一个异步操作，通过监听连接对象的success事件和error事件，了解是否写入成功。
 */
function add(objectStoreName, obj) {
  var request = db.transaction([objectStoreName], 'readwrite')
    .objectStore(objectStoreName)
    .add(obj);

  request.onsuccess = function (event) {
    console.log('数据写入成功', obj);
  };

  request.onerror = function (event) {
    console.log('数据写入失败', obj);
  }
}

add(objectStoreName,{ id: 1, name: '张1', age: 24, email: 'zhangsan1@example.com' });
add(objectStoreName,{ id: 2, name: '张2', age: 24, email: 'zhangsan2@example.com' });
add(objectStoreName,{ id: 3, name: '张3', age: 24, email: 'zhangsan3@example.com' });

/**
 * 读取数据  需要等待写入完成，需要等待open()成功
 * 读取数据也是通过事务完成。
 *      // db.transaction(['person']) 默认是读取
 * 参数是 主键的值 keyPathValue
 */
function read(objectStoreName, keyPathValue) {
  var request = db.transaction([objectStoreName])
    .objectStore(objectStoreName)
    .get(keyPathValue);

  request.onerror = function(event) {
    console.log('事务失败', keyPathValue);
  };

  request.onsuccess = function( event) {
     if (request.result) {
      console.log(request.result);
     } else {
       console.log('未获得数据记录', keyPathValue);
     }
  };
}

read(objectStoreName, 1);

/**
 * 遍历数据
 * 也是通过事务完成
 * 要使用指针对象 IDBCursor
 */
function readAll(objectStoreName) {
  var objectStore = db.transaction(objectStoreName).objectStore(objectStoreName);

   objectStore.openCursor().onsuccess = function (event) {
     var cursor = event.target.result;

     if (cursor) {
       console.log('Id: ' + cursor.key);
       console.log('Name: ' + cursor.value.name);
       console.log('Age: ' + cursor.value.age);
       console.log('Email: ' + cursor.value.email);
       cursor.continue();
    } else {
      console.log('没有更多数据了！');
    }
  };
}

readAll(objectStoreName);

/**
 * 更新数据 update
 * IDBObjectStore.put({keyPath: keyPathValue, ... })
 */
function update(objectStoreName,obj) {
  var request = db.transaction([objectStoreName], 'readwrite')
    .objectStore(objectStoreName)
    .put(obj);

  request.onsuccess = function (event) {
    console.log('数据更新成功');
  };

  request.onerror = function (event) {
    console.log('数据更新失败');
  }
}

update(objectStoreName,{ id: 1, name: '李四', age: 35, email: 'lisi@example.com' });

/**
 * 更新数据 change
 * 因为指针遍历，感觉不如put方法直观，是put 和get混用的方式
 * cursor.update(value)
 */
function change(objectStoreName,obj) {
  var request = db.transaction([objectStoreName], 'readwrite')
    .objectStore(objectStoreName)
    .openCursor();

  request.onsuccess = function (event) {
    var cursor = event.target.result,value,updateRequest;

    if(cursor){
      // 找到匹配项
      if(cursor.key === obj.key){
        value = cursor.value;
        for(let i of Object.keys(obj.data)){
          value[i] = typeof obj.data[i] === 'object' ? JSON.parse(JSON.stringify(obj.data[i])) : obj.data[i];
        }
        updateRequest = cursor.update(value);
        updateRequest.onsuccess = function(){ console.log('更新成功');return true;}
        updateRequest.onerror = function(){ console.log('更新失败');return false;}
      }

      cursor.continue();
    }else {
    console.log('没有更多数据了！');
    }
  }
}

change(objectStoreName,{ key: 3, data:{name: '李四', email: 'li4@example.com'}});

/**
 * 删除数据
 */
function remove(objectStoreName, keyPathValue) {
  var request = db.transaction([objectStoreName], 'readwrite')
    .objectStore(objectStoreName)
    .delete(keyPathValue);

  request.onsuccess = function (event) {
    console.log('数据删除成功');
  };
}

remove(objectStoreName, 1);

/**
 * 使用索引
 * 索引的意义在于，可以让你搜索任意字段，也就是说从任意字段拿到数据记录。如果不建立索引，默认只能搜索主键（即从主键取值）。
 * 假定新建表格的时候，对name字段建立了索引。
 *  // objectStore.createIndex('name', 'name', { unique: false });
 * 就可以从name找到对应的数据记录了。
 */
function searchIndex(objectStoreName,obj){
  var n=obj.name,v=obj.value; 
  var index = db.transaction([objectStoreName], 'readonly')
    .objectStore(objectStoreName)
    .index(n)
  var request = index.get(v);

  request.onsuccess = function (e) {
    var result = e.target.result;
    if (result) {
      return result;
    } else return false;
  }
}
searchIndex(objectStoreName, {name: 'name', value: '张'})