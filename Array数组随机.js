// 洗牌算法(高效版)
var arr=['A',2,3,4,5,6,7,8,9,10,'J','Q','K']
if(!Array.prototype.derange){
  Array.prototype.derange = function() {
    for(var j, x, i=this.length; i;j=parseInt(Math.random()*i), x=this[--i], this[i]=this[j], this[j] =x){}
    return this
  }
}
console.log(arr.derange().toString())