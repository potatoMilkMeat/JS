document.write('1');
document.body.innerText = '';
var article = [];
for(let i=0;i<200;){ article.push('新闻名称----'+ (++i)) }
var dom = null,
    paper = 0,
    num = 5,
    i = 0,
    len = article.length
    parent = document.createElement('div');
parent.setAttribute('id', 'parent');
document.body.appendChild(parent);
// 下一页绑定事件
function addButton(text, id, fn, parent=document.body){
  dom = document.createElement('button');
  dom.innerHTML = text;
  dom.setAttribute('id', id);
  document.body.appendChild.call(parent, dom);
  dom.addEventListener('click', fn);
}
// // 添加新闻列表
// for(;i<len;i++){
//   dom = document.createElement('div');
//   dom.innerHTML = article[i];
//   if(i>=num){dom.style.display = 'none';}
//   parent.appendChild(dom);
// }
// function nextClick(event){
//   var div = parent.getElementsByTagName('div'),
//       j=k=n=0;
//   n= ++paper %Math.ceil(len/num) * num;
//   for(;j<len;j++){div[j].style.display = 'none';}
//   for(;k<num;k++){
//     if(div[n+k]){ div[n+k].style.display = 'block';}
//   }
// }
// addButton('下一页', 'next', nextClick);

/** =====15.3-享元对象 =================== */
var Flyweight = function (num){
  var n=num;
  var created = [];
  function create(){
    var dom = document.createElement('div');
    created.push(dom);
    return dom;
  }
  return {
    getDiv(){
      if(created.length < n){
        return create();
      }else {
        var div = created.shift();
        created.push(div);
        return div;
      }
    }
  }
}(num);

// 添加5条新闻
for(let i=0;i<num;i++){
    parent.appendChild(dom = Flyweight.getDiv());
    dom.innerHTML = article[i] || '';
}
addButton('下一页', 'next', nextClick2);

function nextClick2(){
  if(article.length<num) return;
  let n= ++paper * num % len,time =0;
  function run(n,j){
    Flyweight.getDiv().innerHTML = article[n+j] ? article[n+j] : article[n+j-len] ? article[n+j-len] : '';
  }
  for(let j=0;j<num;j++){
    setTimeout(()=>{run(n,j)},++time*34)
  }
}