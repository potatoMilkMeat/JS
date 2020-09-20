document.write('1');
document.body.innerHTML = 
    '<div><input type="text"><span>提示语占位符</span></div>'
  + '<div><input type="text"><ul><li>li的默认内容</li></ul></div>';
var input = document.getElementsByTagName('input');
/** =====20.3-请求模块 =================== */
/**
 * 异步请求对象（简化版本）
 * @param {*} data 请求数据
 * @param {*} dealType 相应数据处理对象
 * @param {*} dom 事件源
 */
var sendData = function(data, dealType, dom){
  // xhr对象（简化版本）  IE另外处理
  var xhr = new XMLHttpRequest(),
      // 请求路径
      url = 'getData.php?mod=userInfo';
  xhr.onload = function(event){
    // 请求成功
    if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
      dealData(xhr.responseText, dealType, dom);
    }else{
      // 请求失败
    }
  };
  // 拼接请求字符串
  for(var i in data){
    url += '&' + i + data[i];
  }
  // 发送异步请求
  xhr.open('get', url, true);
  xhr.send(null);
}

/** =====20.4- 相应数据适配模块 =================== */
/**
 * 处理响应数据
 * @param {*} data 相应数据
 * @param {*} dealType 响应数据处理对象
 * @param {*} dom 事件源
 */
var dealData = function(data, dealType, dom){
  // 对象 toString 方法简化引用
  var dataType = Object.prototype.toString.call(data);
  // 判断相应数据处理对象
  switch (dealType) {
    // 输入框提示功能
    case 'sug':
      // 如果数据为数组
      if(dataType === "[object Array]"){
        // 创建提示框组件
        return createSug(data, dom);
      }
      // 如果数据为对象，将对象数据转化为数组
      if(dataType === "[object Object]"){
        var newData = [];
        for(var i in data)
          newData.push(data[i]);
        // 创建提示框组件
        return createSug(newData, dom);
      }
      // 将响应的其他数据转化为数组
      return createSug([data], dom);
      break;
  
    case 'validate':
      // 创建校验组件
      return createValidateResult(data, dom);
      break;
  }
}

/** =====20.5- 相应数据适配模块 =================== */
/**
 * 创建提示框组件
 * @param {*} data 响应适配数据
 * @param {*} dom 事件源
 */
var createSug = function(data, dom){
  var i = 0,
      len = data.length,
      html = '';
  // 拼接每一条提示语句
  for(;i<len;i++){
    html += '<li>' + data[i] + '</li>';
  }
  // 显示提示框
  dom.parentElement.getElementsByTagName("ul")[0].innerHTML = html;
}

/**
 * 创建检验组件
 * @param {*} data 响应适配数据
 * @param {*} dom 事件源
 */
var createValidateResult = function(data, dom){
  // 显示校验结果
  dom.parentElement.getElementsByTagName('span')[0].innerHTML = data;
}

/** =====20.6- 检点检测-单元测试 =================== */
// createSug = function(data, dom){
//   console.log('****  createSug           *****', data, dom);
// }

// createValidateResult = function(data, dom){
//   console.log('**** createValidateResult *****', data, dom);
// }

// dealData('用户名不正确', 'validate', input[0]);
// dealData(123, 'sug', input[1]);
// dealData([123, 256, 56], 'sug', input[1]);
// dealData({
//   'iqy': '爱奇艺',
//   'albb': '阿里巴巴',
//   'imh': '爱漫画'
// }, 'sug', input[1]);

/** =====20.7- 方案确定 =================== */
// 没有异步请求，模拟格式化响应数据
input[0].onchange = function(e){
  // sendData({value: e.target.value}, 'validate', e.target);
  dealData('****提示***  '+e.target.value, 'validate', e.target);
}
input[1].onkeyup = function(e){
  // sendData({value: e.target.value}, 'sug', e.target);
  value = e.target.value;
  dealData({'0': value, '1': '***'+value,'2': '&&&&' + value}, 'sug', e.target);
}
