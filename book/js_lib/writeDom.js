// 写入dom
var writeDom = function(arr){
  var cont = document.getElementById('cont'),
      html = '';
  for(var i=0,len = arr.length;i<len;i++){
    item = arr[i];
    html += '<p>'+ item.p + '</p>';
    html += '<code>'+ item.code + '</code>';
  }
  cont.innerHTML = html;
};