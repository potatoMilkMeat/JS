function process() {
  var args = Array.prototype.slice.call(arguments, 0)
  console.log(args, this.a)
}

chengl = {
  a: 'chenglong'
}
arr = [0, 1, 2, 3, 4, 5]

/**
 * 数组分块技术
 * 适用于长时间运行脚本，分块技术，然后分开运行
 * @param {array} array 
 * @param {Function} process 
 * @param {this} context 
 */
function chunk(array, process, context) {
  setTimeout(function () {
    var item = array.shift();
    process.call(context, item);

    if (array.length > 0) {
      setTimeout(arguments.callee, 100);
    }
  }, 100)
}

chunk(arr.concat(), process, chengl)