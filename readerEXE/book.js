class Book {
  constructor(){
    this.el = window.el; // 获取el对象，由config.js定义
    // book需要保存的信息
    this.data = {
      bookes: [], // 书架列表
      // activeNum = 0, // 默认打开第一本书
      defaultCookie: { marks: [], n: 1}, // 当前书保存的信息
      encoding: 'GBK', // 解码方式
      book: [], // 书本存储的的 {title: '第一章节 标题', data: '小说正文'}
      bookIndex: [], // 书本存储的章节分段，[0, 1256, 2565, ...]
      bookTitle: [], // 存储书本章节信息 [书名, 第一章, 第二章, ...]
      bookData: '' // 存储的当前书信息
    };
    this.file = undefined; // 存储读取的文件
    this.store = undefined; // 存储，和操作DB
    this.reader = new FileReader();
  }
  // 执行逻辑都在此
  init(){
    var name,n;
    console.log('=========初始化======');
    // 添加监听事件
    this.elAddEventListener();
    // 默认打开第一本书
    this.getDataFromLocalStorage();
    if((name = this.data.defaultCookie.name) && (n= this.data.defaultCookie.n) ){
      this.readFromBookshelf(name, n);
    }

  }
  initDB(bookName, fn){ // 初始化DB 必须等到获取 书名，以书名为表名存储的
    var v = this.getStorage('dbVersion') || 1, version = Number(v) + 1;
    var newOptions ={ indexArr:[ { indexName: 'title', unique: { unique: false } }], name: 'bookshelf', tableName: bookName, version: version};
    if(this.store && this.store.db){ this.store.closeDB(); }
    this.store = new DB(newOptions); // 将store暴露给Book使用
    this.store.init(fn)
  }
  getDataFromLocalStorage(){
    var data= this.data, bookes = this.getStorage('bookes'),defaultCookie = this.getStorage('readNow');
    if(bookes) data.bookes = JSON.parse(bookes);
    if(defaultCookie) data.defaultCookie = JSON.parse(defaultCookie);
    else if(data.bookes.length && data.bookes[0]) data.defaultCookie = JSON.parse(JSON.stringify(bookes[0]));
    this.varAddListener(); // 给变量添加监听
    if(!data.bookes.length) this.el.bookshelf.style.visibility = 'visible';
  }
  elAddEventListener(){ // 给el添加监听，并制定this指向
    // a={age: 21,name: 'chenglong'};
    // function log(){ console.log(this.name+' 的年龄是 ' +this.age ) }
    // addEL(document.body, log,'click', a)
    var el = this.el, defaultCookie=this.data.defaultCookie, _that=this;
    function addEL(el,fn,type='click', obj){
      if(obj){
        el.addEventListener(type, function(event){
          fn.apply(obj, arguments)
        })
      }else el.addEventListener(type, fn)
    }

    // 功能模块
    function addBook(){
      var evt = new MouseEvent('click',{ bubbles:false,cancelable: true,view: window });
      window.el.input.dispatchEvent(evt);
    }
    function filesChange(event) {
      this.file = event.target.files[0];
      if (/text/.test(this.file.type)) { this.readerText(); }
    }
    function readBook(event){
      var target = event.target;
      if(target === this.el.bookshelfContent){
        // console.log('点击无效');
        return;
      }

      var data=this.data, bookes=data.bookes,l = bookes.length, name = target.getAttribute('name');
      for(let i=0;i<l;i++){
        if(bookes[i].name === name){
          data.defaultCookie = JSON.parse(JSON.stringify(bookes[i]));
          this.varAddListener(); // 给变量添加监听
          break;
        }
      }

      this.readFromBookshelf(name, data.defaultCookie.n);
    }
    
    // 执行添加--begin
    addEL(this.reader, this.loaded, 'load', _that); // 解码成功
    addEL(el.addBook, addBook); // 增加书本
    addEL(el.gotoBookshelf, function(event){ this.el.bookshelf.style.visibility = 'visible';this.bookesSetDo(this.data.bookes);}, 'click',_that); // 返回书架
    addEL(el.input, filesChange, 'change', _that);  // 选择了文件
    addEL(el.encoding, function(event){ this.encoding = event.target.value; this.readerText(); }, 'change', _that); // 选择编码
    addEL(el.pre, function(event){ this.changeN(--this.data.defaultCookie.n); },'click',_that); // 前一章
    addEL(el.next, function(event){ this.changeN(++this.data.defaultCookie.n); },'click',_that); // 后一章
    // addEL(el.save, function(event){var defaultCookie =  this.data.defaultCookie; defaultCookie.marks.unshift({title: this.el.now.innerText ,n: defaultCookie.n});this.setStorage('readNow', defaultCookie); },'click',_that); // 保存
    addEL(el.bookshelfContent, readBook, 'click', _that); // 从书架开始阅读
    // 执行添加--结束

    this.varAddListener(); // 给变量添加监听
  }

  readFromBookshelf(name, n){ // 从书架开始阅读
    var data = this.data, bookData = data.bookData, bookIndex = data.bookIndex,bookTitle = data.bookTitle, name=data.defaultCookie.name, _that=this;
    this.initDB(name, fnc);
    function fnc(){
      console.log('=========本地db已经上线, fnc=====');
      _that.writeText(n); // 读取数据
      _that.el.bookshelf.style.visibility = 'hidden';
    }
  }

  readerText(){  // 解码文件
    // console.log('开始解码文件');
    this.reader.readAsText(this.file, this.data.encoding);
  }

  loaded(event) {  // 小说内容存储
    // console.log('解码文件成功');
    var data = this.data;
    data.bookData = JSON.parse(JSON.stringify(event.target.result));
    this.getBookName(data.bookData); // 设置书名
    this.spider(data.bookData); // 执行抓取
    this.storeBook(); // 存储IDB
    
    this.el.bookshelf.style.visibility = 'hidden'; // 进入阅读
    this.el.txt.innerText = '数据正开始写入数据库'; // 提示
    
  }

  getBookName(str){  // 获取小说名字
    var defaultCookie = this.data.defaultCookie = { marks: [], n: 1 };
    if(/\《(.+)\》/.test(str)){ defaultCookie.name = RegExp.$1; }
    else {
      var fName = this.file.name; 
      defaultCookie.name = fName.substring(0, fName.length-4);
    }
    this.varAddListener(); // 给变量添加监听
  }

  storeBook(){  // 将信息存放到idb中，以后读取都是从IDB中查找
    var data = this.data, bookData = data.bookData, bookIndex = data.bookIndex,bookTitle = data.bookTitle, name=data.defaultCookie.name, _that=this;
    this.initDB(name, fnc);
    function fnc(){
      console.log('=========本地db已经上线, fnc=====');
      _that.store.addData({id: 0, title: '书名-'+name, data: bookData}); // 存储所有的txt数据 string
      _that.store.addData({id: -1, title: '章节分段-lastIndex', data: bookIndex}); // 存储分段信息
      _that.store.addData({id: -2, title: '章节名称-title', data: bookTitle}); // 存储章节名称信息

      var len = bookIndex.length -1; // 按照章节存储
      for(var i=1; i<len; i++){
        _that.store.addData({id: i, title: bookTitle[i] , data: bookData.substring(bookIndex[i], bookIndex[i+1])});
        _that.el.txt.innerText = '数据正开始写入数据库:  ' + i+'/'+ len;
      }
      _that.store.addData({id: len, title: bookTitle[len] , data: bookData.substring(bookIndex[len])});
      _that.writeText(data.defaultCookie.n); // 写入数据
    }
  }

  writeText(n) {  // 将小说内容加载到数据中
    // 从js读取
    // var data = this.data, bookTitle = data.bookTitle, bookIndex = data.bookIndex;
    // var now = this.el.now;
    // now.innerText = bookTitle[n];
    // now.setAttribute('title', bookTitle[n]);
    // var lastIndex = n < bookIndex.length-1 ? n+1 : undefined;
    // txt.innerText = data.bookData.substring(bookIndex[n], bookIndex[lastIndex]);
    // 从IDB读取
    var el = this.el , store =  this.store;
    store.readData(n,function(val){
      el.txt.innerText = val.data;
      el.now.setAttribute('title', val.title);
      el.now.innerText = val.title.substr(0, 11);
      })
  }
  
  spider(str) {  // 将小说文字 按章节分成数组
    var title,data = this.data, bookIndex = data.bookIndex = [], bookTitle = data.bookTitle = [],
        reg = /((第(?:\d+|[万千百十零一二三四五六七八九]+)章)(?: *-*_*:*：*)([^\s]+))/gi; // 章节分段正则
    bookIndex.push(0);
    bookTitle.push('');
    while (reg.test(str)) {
      title = RegExp.$2 + ' ' + RegExp.$3;
      bookIndex.push(reg.lastIndex - RegExp.$1.length);
      bookTitle.push(title);
    }
  }

  changeN(n){ // 修改章节，造成刷新和缓存当前
    var total = this.data.defaultCookie.total,_that=this;
    if(!total && this.store.readData) {
      this.store.readData(-2, function(val){
        total = _that.data.defaultCookie.total = val.data.length -1
      })
    }
    if(n<1) { this.data.defaultCookie.n=n=1;return; }
    else if(n > total ){this.data.defaultCookie.n=n=total;return;}

    var defaultCookie = this.data.defaultCookie;
    defaultCookie.n = n;
    this.writeText(n);
  }

  setStorage(name, val){ // 设置localStorage
    if(typeof val === "object") val = JSON.stringify(val);
    localStorage.setItem(name, val);
  }
  getStorage(name){ // 获取localStorage 不做类型转换
    return localStorage.getItem(name);
  }

  varListener(obj, keys = null, fn, that){ // 只能针对对象不能针对数组 添加变量监听，并回调函数
    if(!keys || !keys.length) keys = Object.keys(obj);
    var keysChange = [];

    keys.forEach((item,i)=>{ // 把原本数据绑定到 name 变成 _name等
      keysChange[i] = '_' + item;
      var val = typeof obj[item] !== 'object' ? obj[item] : JSON.parse(JSON.stringify(obj[item]));
      Object.defineProperty(obj,keysChange[i],{ writable: true, value: val });
    })

    for(let key of keys){
      Object.defineProperty(obj, key, {
        get: function(){ return this['_' + key]; },
        set: function (value) { this['_' + key] = value; fn.call(that); }
      })
    }
  }

  varAddListener(){
    this.varListener(this.data.defaultCookie, null, this.defaultCookieSetDo, this);
  }

  defaultCookieSetDo(){
    var data = this.data, defaultCookie = data.defaultCookie, bookes = data.bookes,name=defaultCookie.name;
    this.setStorage('readNow', defaultCookie);
    // 改变  this.data.bookes, 因数组监听需要对array 公共方法在封装，故此放弃，改为手动绑定
    for(let i=0,l=bookes.length;i<l;i++){
      if(name === bookes[i].name){
        bookes.splice(i, 1);break;
      }
    }
    bookes.unshift(defaultCookie);
    this.setStorage('bookes', bookes);
    this.bookesSetDo(bookes);
  }

  bookesSetDo(bookes){ // 刷新书架
    var el = this.el.bookshelfContent, l=bookes.length, book, name, n, html='';
    for(let i=0;i<l;){
      book = bookes[i++];name = book.name;n = book.n;
      html += '<div class="book-li"><div class="book-img" name="'+ name +'" n="'+ n +'">'+ name+'</div></div>';
    }
    el.innerHTML = html;
  }

}