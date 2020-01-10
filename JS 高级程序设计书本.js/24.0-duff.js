// credit: Speed Up Your Site (New Riders, 2003)


var iterations = Math.floor(values.length / 8);
var leftover = values.length % 8;
var i = 0;
if (leftover > 0) {
  do {
    process(values[i++]);
  } while (--leftover >= 0);
}
do {
  process(values[i++]);
  process(values[i++]);
  process(values[i++]);
  process(values[i++]);
  process(values[i++]);
  process(values[i++]);
  process(values[i++]);
  process(values[i++]);
} while (--iterations >= 0);

/**
 * 创建数组的研究
 * ===============================================================
 *    方法                  时间（秒）      内存（G）0, 20, 60秒
 * ---------------------------------------------------------------
 * str转换成数组             49.556           1950-982-550  
 * str转换成数组（简单）     55.002           1680-848-513
 * 数组push                  23.067                824-551
 * 数组[i]=赋值              21.860                684-555
 * Duff                      21.986                862-584
 */
values = []; str = 'Data:' + 0;                       // 10:03:17.664
console.log(str[5])                                   // 10:03:17.665   0.001
for (let i = 1, l = 10000000; i < l; i++) {
  str += ',Data:' + i;
}
console.log(str[5])                                   // 10:03:23.738   6.073
values = str.split(',');                              // 10:04:07.220  43.482   49.556



values = []; str = 0;                                 // 10:46:49.346
console.log(str[0])                                   // 10:46:49.348   0.001
for (let i = 1, l = 10000000; i < l; i++) {
  str += ',' + i;
}
console.log(str[0])                                   // 10:46:53.549   4.201
values = str.split(',');                              // 10:47:44.348  50.799   55.002



values = [];                                         // 10:08:56.645   
console.log(values[0]);                              // 10:08:56.647   0.002
for (let i = 0, l = 10000000; i < l; i++) {
  values.push('Data:' + i)
}                                                    // 10:09:19.712   23.065



values = [];                                         // 10:17:05.090   
console.log(values[0]);                              // 10:17:05.091   0.001
for (let i = 0, l = 10000000; i < l; i++) {
  values[i] = ('Data:' + i)
}                                                    // 10:09:26.950   21.859



function duff(values, process, j) {
  console.log('开始')
  var length = j || values.length
  var iterations = Math.floor(length / 8);
  var leftover = length % 8;
  console.log(length,iterations, leftover)
  var i = 0;
  if (leftover > 0) {
    do {
      process(i++);
    } while (--leftover >= 0);
  }
  do {
    process(i++);
    process(i++);
    process(i++);
    process(i++);
    process(i++);
    process(i++);
    process(i++);
    process(i++);
  } while (--iterations >= 0);

  console.log('完成')
}

values = [];
console.log(values[0]);
duff(values, function (i) {
  values[i] = ('Data:' + i)
}, 10000000)

/**
 * 
 * duff 运算 和传统的for循环时间  差距庞大
 * 2.600 和 25.560差距
 * 数字和string加法 应该指定他的转换; 避免js自己再编译。
 * valCl[i] += 100000;  =>  valCl[i] += (100000).toString(); 
 */

var valCL = [];
for (let i = 0, l = 10000000; i < l; i++) {
  valCL[i] ='data:'+i.toString();
}

function duff(values, process, j) {
  console.log('开始')
  var length = j || values.length
  var iterations = Math.floor(length / 8);
  var leftover = length % 8;
  console.log(length,iterations, leftover)
  var i = 0;
  if (leftover > 0) {
    do {
      process(i);
    } while (--leftover >= 0);
  }
  do {
    process(i);
    process(i);
    process(i);
    process(i);
    process(i);
    process(i);
    process(i);
    process(i);
  } while (--iterations >= 0);

  console.log('完成', i)
}

duff(valCL, function (i) {
  valCL[i++] += (10000).toString();
}, 10000000)

for (let i = 0, l = 10000000; i < l; i++) {
  valCL[i] += (10000).toString();
}

/**
 * 带有Math的方法是C/C++之类的编译语言写出来的，比js除法快
 * 尽可能用int 计算，浮点计算尽可能用 Math.floor()包含，应该是  (被除数 - 取模) / 被除数
 * 
 * ======================================================
 * 类型                     时间（毫秒）
 * ------------------------------------------------------
 * int                        22
 * float                      81
 * Math.floor                 16
 * 布尔计算                   22
 * 位运算                     26  
 * 模拟Math.floor             17
 * 转换程序2次 toFixed      4885
 * 转换程序2次 toString     2147
 * Number一次                 23
 */
for (let i = 0, l = 10000000; i < l; i++) {
  valCL = l/8; // int计算
}

for (let i = 0, l = 10000000; i < l; i++) {
  valCL = l/33;  // float计算
}

for (let i = 0, l = 10000000; i < l; i++) {
  valCL = Math.floor(l/33); // Math.floor
}

for (let i = 0, l = 10000000; i < l; i++) {
  valCL = !(true); // boolean
}

let  buffer = new ArrayBuffer(1);
let viewOne = new Int8Array(buffer);
console.log('viewOne',viewOne[0])
for (let i = 0, l = 10000000; i < l; i++) {
  valCL = ~viewOne[0]; // 位操作符
}

for (let i = 0, l = 10000000; i < l; i++) {
  valCL = (l - l%33)/33; // 模拟Math.floor   
}

for (let i = 0, l = 10000000; i < l; i++) {
  valCL = Number((l/33).toFixed(6)); // 数据格式转换2次
}

for (let i = 0, l = 10000000; i < l; i++) {
  valCL = Number((l/33).toString()); // 数据格式转换2次
}

L="10000000";
for (let i = 0, l = 10000000; i < l; i++) {
  valCL = Number(L); // 数据格式转换2次
}