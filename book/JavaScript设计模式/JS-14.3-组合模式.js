/** =====2.3.6-寄生式组合继承 《==引用==》 =================== */
// 原型式继承：
function inheritObject(o) {
  function F () {}
  F.prototype = o
  return new F ()
}
/* 寄生式继承 继承原型
*  传递参数： subClass 子类
*  传递参数： superClass父类
*  特点: 只执行子类的原型继承，并不会执行构造函数
*/
function inheritPrototype(subClass, superClass) {
  // 复制一份父类的原型副本保存在变量中
  var p = inheritObject(superClass.prototype)
  // 修正因为重写子类原型导致子类的constructor 属性被修改
  p.constructor = subClass
  // 设置子类的原型
  subClass.prototype = p
}

/** =====14.3-虚拟父类 -每个成员要有祖先=================== */
var News = function(){
  this.children = []; // 子组件
  this.element = null; // 当前组件元素
}
News.prototype = {
  init() {
    throw new Error('请重写你的方法');
  },
  add(){
    throw new Error('请重写你的方法');
  },
  getElement(){
    throw new Error('请重写你的方法');
  }
}
// a= new News(); a.init();

/** =====14.4-组合要有容器类=================== */
// 公用方法抽离
function addElement (child) {
  this.children.push(child); // 在子元素容器中插入元素
  this.element.appendChild(child.getElement()); // 插入当前组件元素树中
  return this;
}
function getElement() { return this.element; }

/* --------容器类--------  */ 
var Container = function(id, parent){
  News.call(this); // 构造函数继承父类
  this.id = id; // 模块的id
  this.parent = parent; // 模块的父容器
  this.init(); // 构造函数
}
inheritPrototype(Container, News); // 寄生式继承父类原型方法
// 构建方法
Container.prototype.init = function () {
  this.element = document.createElement('ul');
  this.element.id = this.id;
  this.element.className = 'new-container';
}

// 添加子元素方法
Container.prototype.add = addElement;
// 获取当前元素的方法
Container.prototype.getElement = getElement;
// 显示方法
Container.prototype.show = function(){
  this.parent.appendChild(this.element);
}

/* --------下一层级的行成员集合--------  */
var Item = function (className){
  News.call(this);
  this.className = className;
  this.init();
}
inheritPrototype(Item, News);
Item.prototype.init = function(){
  this.element = document.createElement('li');
  this.element.className = this.className;
}
Item.prototype.add = addElement;
Item.prototype.getElement = getElement;
/* --------新闻组合类--------  */
var NewsGroup = function (className){
  News.call(this);
  this.className = className;
  this.init();
};
inheritPrototype(NewsGroup, News);
NewsGroup.prototype.init = function(){
  this.element = document.createElement('div');
  this.element.className = this.className;
}
NewsGroup.prototype.add = addElement;
NewsGroup.prototype.getElement = getElement;


// document.writeln('1');
// // ...
// c = new Container('123000', document.body);i = new Item('li-cl');g = new NewsGroup('li-group-cl');
// i.element.innerText='sfasdfasd';g.element.innerText='div-001';
// c.show();c.add(i);i.add(g);

/** =====14.5-创建一个新闻类 =================== */
// 图片新闻
var ImageNews = function(url='', href='',className='normal'){
  News.call(this);
  this.url = url; this.href = href; this.className = className;
  this.init();
}
inheritPrototype(ImageNews, News);
ImageNews.prototype.init = function(){
  this.element = document.createElement('a');
  var img = new Image();
  img.src = this.url;
  this.element.appendChild(img);
  this.element.className = 'image-news ' + this.className;
  this.element.href = this.href;
}
ImageNews.prototype.add = function(){};
ImageNews.prototype.getElement = getElement;

// 直播图标的新闻
var IconNews = function(text='', href='#', type='video'){
  News.call(this);
  this.text = text; this.href = href; this.type = type;
  this.init();
}
inheritPrototype(IconNews, News);
IconNews.prototype.init = function(){
  this.element = document.createElement('a');
  this.element.innerHTML = this.text;
  this.element.href = this.href;
  this.element.className = 'icon ' + this.type;
}
IconNews.prototype.add = function(){};
IconNews.prototype.getElement = getElement;

// 文字新闻
var EasyNews = function(text='', href='#'){
  News.call(this);
  this.text = text; this.href = href;
  this.init();
}
inheritPrototype(EasyNews, News);
EasyNews.prototype.init = function(){
  this.element = document.createElement('a');
  this.element.innerHTML = this.text;
  this.element.href = this.href;
  this.element.className = 'text';
}
EasyNews.prototype.add = function(){};
EasyNews.prototype.getElement = getElement;

// 带类型的文字新闻
var TypeNews = function(text='', href='#', type='', position='left'){
  News.call(this);
  this.text = text; this.href = href; this.type = type; this.position = position;
  this.init();
}
inheritPrototype(TypeNews, News);
TypeNews.prototype.init = function(){
  this.element = document.createElement('a');
  if(this.position === 'left')
       this.element.innerHTML = '[' + this.type + '] ' + this.text;
  else this.element.innerHTML = this.text + ' [' + this.type + ']';
  this.element.href = this.href;
  this.element.className = 'text';
}
TypeNews.prototype.add = function(){};
TypeNews.prototype.getElement = getElement;

/** =====14.6- 把新闻模块创建出来 =================== */
document.writeln('1');
var news1 = new Container('news', document.body);
news1.add(
  new Item('normal').add(
    new IconNews('足球新闻', '###', 'video')
  )
).add(
  new Item('normal1').add(
    new NewsGroup('has-img').add(
      new ImageNews('https://img0.bdstatic.com/static/searchdetail/img/logo-2X_0c4ef02.png', '###', 'small')
    ).add(
      new EasyNews('百度', '###')
    ).add(
      new EasyNews('   =不是谷歌', '###')
    )
  )
).add(
  new Item('normal').add(
    new TypeNews('vue 是前端开发工具', '###', 'Vue', 'left')
  )
).add(
  new Item('normal').add(
      new TypeNews('Js 正在工作中', '###', 'JavaScript', 'right')
  )
).show();

var styleText = `
ul{padding: 0 10px; margin: 0;}
li{list-style: none;display: block;}
a{text-decoration: none;color: #333;font-size: 14px;line-height: 23px;display: inline-block;}
a:hover{color:blue;}
.normal a{}
.icon{padding-left: 50px;position: relative;}
.icon::before{content: '';position: absolute;left:0; top: 4px;text-align: center;width:40px;height: 16px;font-size:12px;line-height:16px;background: #f2f2f2;}
.icon.video::before{content: 'video'}
.image-news.small,.image-news.small img{width:80px;}
a.text{padding: 0 1em;}
`
var styleEle = document.createElement('style');
styleEle.type = 'text/css';
styleEle.innerHTML = styleText;
document.head.appendChild(styleEle); // document.getElementsByTagName('head')[0]