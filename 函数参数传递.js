/**
 * 函数参数传递
 * 仅研究引用类型的传递
 * 仅传递指针，更改了指向，并没有传递值
 */

var a = {
  num:'1'
};

var ab = {
  num:'2'
};

function change(obj){
  obj.num = '3';
  obj = ab;
  return obj.num;
}

var result = change(a);
console.log(result + ' | ' + a.num); // 2 | 3
