/** =====12.1 输入框的心需求=================== */
var telInput = document.getElementById('tel_input');
var telWarnText = document.getElementById('tel_warn_text');
telInput.onclick = function(){
  telWarnText.style.display = 'inline-block';
}

// 添加/改写部分
var telDemoText = document.getElementById('tel_demo_text');
telInput.onclick = function(){
  telWarnText.style.display = 'inline-block';
  telDemoText.style.display = 'none';
}

/** =====12.2 装饰已有的功能对象=================== */
var decorator = function (inputId, fn){
  var input = document.getElementById(inputId);
  if(typeof input.onclick === 'function'){
    var oldClickFn = input.onclick;
    input.onclick = function () { oldClickFn(); fn(); }
  } else {
    input.onclick = fn;
  }
}

/** =====12.3 为输入框添加新功能=================== */
decorator('tel_input', function () {
  document.getElementById('tel_domo_text').style.display = 'none';
})

decorator('name_input', function () {
  document.getElementById('name_domo_text').style.display = 'none';
})

decorator('address_input', function () {
  document.getElementById('address_domo_text').style.display = 'none';
})