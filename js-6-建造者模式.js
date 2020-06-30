/** =====6.2 创建对象的另一种形式=================== */
// 创建一位人类
var Human = function (param){
  this.skill = param?.skill ?? '保密';
  this.hobby = param?.hobby ?? '保密';
}
// 类人原型方法
Human.prototype = {
  getSkill(){return this.skill;},
  getHobby(){return this.hobby;}
}

// 实例化姓名类
var Named = function(name){
  (name=>{
    this.wholeName = name;
    if(name.indexOf(' ') > -1){
      this.firstName = name.slice(0, name.indexOf(' '));
      this.secondName = name.slice(name.indexOf(' ')+1);
    }
  })(name)
}
// 实例化职位类
var Work = function(work){
  (work=>{
    switch (work) {
      case 'code':
        this.work = '工程师';
        this.workDescript = '每天沉醉于编程';
        break;
      case 'UI':
        this.work = '设计师';
        this.workDescript = '设计更似一种艺术';
        break;
      case 'teacher':
        this.work = '教师';
        this.workDescript = '分享也是一种快乐';
        break;
      default:
        this.work = work;
        this.workDescript = '对不起，我们还不清楚您所选职位的相关描述';
        break;
    }
  })(work)
}


/** =====6.3 创建一位应聘者=================== */
var Person = function (name, work, param) {
  let _p = new Human(param);
  _p.name = new Named(name);
  _p.work = new Work(work);
  return _p;
}

var chenglong = new Person('cheng long', 'code', {skill: '超级多技巧', hobby: '听歌，游戏。'});

