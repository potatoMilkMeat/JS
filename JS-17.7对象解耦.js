document.write('1');
document.body.innerHTML = '';
/** =====17.3-创建一个观察者 =================== */
var Observer = (function (){
  var _messages = {}; // 消息队列，是静态私有变量
  return {
    // 注册信息接口
    regist: function(type, fn){
      if(typeof _messages[type] === 'undefined'){
        _messages[type] = [fn];
      }else{
        _messages[type].push(fn);
      }
      return this;
    },
    // 发布消息接口
    fire: function(type, args){
      if(!_messages[type]){return;} // 该消息没有注册，退出
      var event = {type: type, args: args};
      for(var i=0,l=_messages[type].length;i<l;i++){
        _messages[type][i].call(this, event);
      }
    },
    // 移除信息接口
    remove: function(type, fn){
      if(_messages[type] instanceof Array){
        // 消息队列是否存在
        for(var i=_messages[type].length;i;){
          _messages[type][--i] === fn && _messages[type].splice(i, 1);
        }
      }
    }
  }
})();

/** =====17.7 对象间解耦 =================== */
// 学生类
var Student = function(result){
  var that= this;
  this.result = result;
  this.say = function(){
    console.log(that.result);
  }
}
// 回答问题方法
Student.prototype.answer = function(question){
  // 注册参数问题
  Observer.regist(question, this.say);
}
// 学生睡觉，不能会发问题
Student.prototype.sleep = function(question){
  console.log(this.result + '  '+ question+ '  已被注销；');
  Observer.remove(question, this.say);
}

// 教师类
var Teacher = function(){};
Teacher.prototype.ask = function(question){
  console.log('问题是 '+ question);
  Observer.fire(question);
  return this;
}

/** =====17.8 课堂演练 =================== */
var student1 = new Student('学生1回答问题'),
    student2 = new Student('学生2回答问题'),
    student3 = new Student('学生3回答问题'),
    question1 = '什么是设计模式',
    question2 = '简述观察者-JS';

// 学生订阅（监听）了老师提问的两个问题    
student1.answer(question1);
student1.answer(question2);
student2.answer(question1);
student3.answer(question1);
student3.answer(question2);
// 学生3在问题二睡着
student3.sleep(question2);

var teacher = new Teacher();
teacher.ask(question1).ask(question2);
