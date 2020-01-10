
/**
 * 13.2.2 DOM0级
 */
function duff(values, process, j) {
  var length = j || values.length
  var iterations = Math.floor(length / 8);
  var leftover = length % 8;
  var i = 0;
  if (leftover > 0) {
    do {
      process(values[i++], i);
    } while (--leftover >= 0);
  }
  do {
    process(values[i++], i);
    process(values[i++], i);
    process(values[i++], i);
    process(values[i++], i);
    process(values[i++], i);
    process(values[i++], i);
    process(values[i++], i);
    process(values[i++], i);
  } while (--iterations >= 0);

  console.log('完成')
}

values = [];
console.log(values[0]);
duff(values, function (item, i) {
  values[i] = ('Data:' + i)
}, 10000000)