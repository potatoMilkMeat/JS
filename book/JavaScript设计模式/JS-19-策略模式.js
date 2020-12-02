document.write('1');
document.body.innerHTML = '';
/** =====19.3-策略对象 =================== */
var PriceStrategy = function(){
  // 
  var strategy = {
    // 100 返回30
    return30: function(price){
      return +price - parseInt(price/100)*30;
    },
    // 100 返回50
    return50: function(price){
      return +price - parseInt(price/100)*50;
    },
    // 9折
    parcent90: function(price){
      return price*100*90/10000;
    },
    // 8折
    parcent80: function(price){
      return price*100*80/10000;
    },
    // 5折
    parcent50: function(price){
      return price*100*50/10000;
    }
  };

  return function(algorithm, price){
    return strategy[algorithm] && strategy[algorithm](price);
  };
}();

console.log(PriceStrategy('return50', '200'));

/** =====19.6-表单验证 =================== */
var InputStrategy = function(){
  var strategy = {
    // 不为空
    notNull: function(value){
      return value === '' ? '请输入内容' : '';
    },
    // 数字
    number: function(value){
      return /^\d+(\.\d+)?$/.test(value) ? '': '请输入数字';
    }
  };
  return {
    // 
    check: function(type, value){
      // 
      value = value.replace(/^\s+|\s+$/g, '');
      return strategy[type] ? strategy[type](value) : '没有该类型的检测方法';
    },
    // 
    addStrategy: function(type, fn){
      strategy[type] = fn;
    }
  };
}();

console.log(
  InputStrategy.check('notNull', ''),
  InputStrategy.check('number', '256.23.23')
)
console.log("InputStrategy.check('notNull', 'dd')  :"+ InputStrategy.check('notNull', 'dd') )
console.log( "InputStrategy.check('number', '256.23')  :"+ InputStrategy.check('number', '256.23') )

InputStrategy.addStrategy('nickname', function(value){
  return /^[a-zA-Z]\w{3,7}$/.test(value) ? '' : '请输入4-8位昵称，列如：A1_3';
})

console.log( "InputStrategy.check('nickname', 'A1_3')  :"+  InputStrategy.check('nickname', 'A1_3'))
console.log( InputStrategy.check('nickname', '_12sdd') )
