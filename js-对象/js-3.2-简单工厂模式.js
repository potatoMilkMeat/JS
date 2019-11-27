/* 第三章 简单工厂模式
*  3.2 如果类太多，提供一个
*    作者：程龙 时间：2019-5-7 10:16
*/

//
var Basketball = function () {
  this.intro = '篮球盛行于美国'
}
Basketball.prototype = {
  getMember : function () {
    console.log('每个队伍需要5名球员')
  },
  getBallSize : function () {
    console.log('篮球很大')
  }
}

//
var Football = function () {
  this.intro = '足球在世界范围内很流行'
}
Football.prototype = {
  getMember : function () {
    console.log('每个队伍需要11名球员')
  },
  getBallSize : function () {
    console.log('篮球很大')
  }
}

//
var Tennis = function () {
  this.intro = '每年有很多网球系列赛'
}
Tennis.prototype = {
  getMember : function () {
    console.log('每个队伍需要1名球员')
  },
  getBallSize : function () {
    console.log('篮球很小')
  }
}

//
var SportsFactory = function (name) {
  switch (name) {
    case 'NBA':
      return new Basketball()
    case 'wordCup':
      return new Football()
    case 'FrenchOpen':
      return new Tennis()
    default:
      const msg = "仅支持['NBA', 'wordCup', 'FrenchOpen']"
      console.log('您输入的是：' + name + ' - ' + msg)
      return false
  }
}

//
var footnall = SportsFactory('wordCup')
console.log(footnall)
console.log(footnall.intro)
footnall.getMember()

var footnall = SportsFactory('125')