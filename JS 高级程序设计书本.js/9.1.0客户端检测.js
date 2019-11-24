function getElement(id){
  if(document.getElementById){return document.getElementById(id);}
  else if(document.all){document.all(id);}
}

/**
 * ie8 特有的 document.createElement typeof属性是object（COM）
 */

function isHostMethod(object,  property){
  var t= typeof object[property];
  return t==='function' || (!!(t==='object' && object[property])) || t === 'unknown';
}

/**
 * ie8 特有的ActiveXObject属性
 */
var xhr= new ActiveXObject('Microsoft.XMLHttp');
// var a=isHostMethod(xhr, 'open');
// var b=isHostMethod(xhr, 'foo');

/**
 * ie8 特有的属性同名不可枚举属性，会受影响，也不可枚举
 */
var o=new Object();
o.toString='o.tostring';

var b= typeof Object.getOwnPropertyDescriptor; // ie8没有该属性
var a=Object.getOwnPropertyDescriptor(o,'toString');



alert(JSON.stringify(b)+'\n'+ typeof b);
alert(JSON.stringify(a)+'\n'+ typeof a);