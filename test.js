//转换时间格式
// function formateDate (datetime){
//   function addDateZero(num) {
//       return (num < 10 ? "0" + num : num);
//   }
//   let d = new Date(datetime);
//   let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
//   return formatdatetime;
// }

// console.log(formateDate('2019-09-27T02:31:09.000Z'))


// let cookieExpires = 1 / 24

// function setTokenLostTime () {
//   let d = new Date()
//   d.setTime(d.getTime() +  cookieExpires * 24 * 60 * 60 * 1000) // 设置date为当前时间 加的天数
//   console.log('setTokenLostTime: ', d)
//   // return Cookies.set(TokenTime, d)
// }
// setTokenLostTime()

var time ='2019-09-29T04:15:27.000Z'
console.log(time)  //2019-09-29T04:15:27.000Z
var d = new Date(time);
console.log(d)   //Sun Jan 20 2019 16:43:42 GMT+0800
