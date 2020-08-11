document.write('1');
document.body.innerText = '';
var styleText = `
.alert{position: fixed;top: 50%;left: 50%;width: 200px;min-height: 120px;margin-left: -100px;margin-top: -60px;background: #f8f8f8;}
.a-close{background: red;color: white;display: inline-block;padding: 5px;font-size: 12px;cursor: pointer;}
.a-cancel{background: #ddd;color: black;display: inline-block;padding: 5px;font-size: 12px;cursor: pointer;}
.a-confirm{background: blue;color: white;padding: 5px;font-size: 12px;cursor: pointer;}
`
var styleEle = document.createElement('style');
styleEle.type = 'text/css';
styleEle.innerHTML = styleText;
document.head.appendChild(styleEle);

/** =====16.3-创建基本提示框 =================== */
var Alert = function(data){
  if(!data) return;
  this.content = data.content; // 提示内容
  // 创建dom元素
  this.panel = document.createElement('div'); // 提示框面板
  this.closeBtn = document.createElement('b'); // 取消按钮
  this.contentNode = document.createElement('p'); // 内容组件
  this.confirmBtn = document.createElement('span'); // 确认按钮
  // 添加样式
  this.panel.className = 'alert';
  this.closeBtn.className = 'a-close';
  this.confirmBtn.className = 'a-confirm';
  // dom元素 内容
  this.confirmBtn.innerHTML = data.confirm || '确认';
  this.closeBtn.innerHTML = data.colose || '关闭';
  this.contentNode.innerHTML = data.content;
  // 成功/失败 方法
  this.success = data.success || function(){console.log('请重写success方法')};
  this.fail = data.fail || function(){console.log('请重写fail方法')};
}

/** =====16.4-模板的原型方法 =================== */
Alert.prototype = {
  init(parent=document.body){
    // 面板加载组件
    this.panel.appendChild(this.closeBtn);
    this.panel.appendChild(this.contentNode);
    this.panel.appendChild(this.confirmBtn);
    parent.appendChild(this.panel); // 插入页面中去
    this.bindEvent(); // 绑定事件
    this.show(); // 显示提示框
  },
  bindEvent(){
    this.closeBtn.addEventListener('click', ()=>{
      this.fail();this.hide();
    });
    this.confirmBtn.addEventListener('click', ()=>{
      this.success();this.hide();
    });
  },
  hide(){this.panel.style.display = 'none';},
  show(){this.panel.style.display = 'block';}
}

// // 测试基本提示框
// var popData = {content: '这是提示文字', confirm: '确认按钮', success: function(){console.log('用户点击了确认按钮');} };
// var pop = new Alert(popData);
// pop.init();

/** =====16.5- 根据模板创建类 =================== */
// 右侧按钮提示框
var RightAlert = function(data){
  Alert.call(this, data);
  this.confirmBtn.className = this.confirmBtn.className + ' right';
}
RightAlert.prototype = new Alert();

// 标题提示框
var TitleAlert = function(data){
  Alert.call(this, data);
  this.title = data.title;
  this.titleNode = document.createElement('h3');
  this.titleNode.innerHTML = this.title;
}
TitleAlert.prototype = new Alert();
TitleAlert.prototype.init = function(){
  this.panel.insertBefore(this.titleNode, this.panel.firstChild);
  Alert.prototype.init.call(this);
}

// // 测试标题提示框
// var popData = {title: '这是标题', content: '这是提示文字', confirm: '确认按钮', success: function(){console.log('用户点击了确认按钮');} };
// var popTitle = new TitleAlert(popData);
// popTitle.init();

/** =====16.5- 继承类作为模板创建新类 =================== */
var CancelAlert = function(data){
  TitleAlert.call(this, data);
  this.cancel = data.cancel;
  this.cancelBtn = document.createElement('span');
  this.cancelBtn.className = 'a-cancel';
  this.cancelBtn.innerHTML = this.cancel || '取消';
}
CancelAlert.prototype=new Alert();
CancelAlert.prototype.init = function(){
  TitleAlert.prototype.init.call(this);
  this.panel.appendChild(this.cancelBtn);
}
CancelAlert.prototype.bindEvent = function(){
  TitleAlert.prototype.bindEvent.call(this);
  this.cancelBtn.addEventListener('click', ()=>{
    this.fail();this.hide();
  })
}

// 测试取消提示框
var popCancelData = {title: '这是标题', content: '这是提示文字', success: function(){console.log('用户点击了确认按钮');} };
var popCancelTitle = new CancelAlert(popCancelData);
popCancelTitle.init();