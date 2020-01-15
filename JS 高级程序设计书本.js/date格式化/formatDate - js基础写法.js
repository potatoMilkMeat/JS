function formatDate(date){
  if(!date || Object.prototype.toString.call(date) !== '[object Date]'){
    date = new Date()
  }
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var seconds = date.getSeconds()
  function numToString(date){
    return date > 9 ? date.toString() : '0' + date.toString()
  }
  return year.toString() + '/' + numToString(month) + '/' + numToString(day) + ' ' + numToString(hour) + ':' + numToString(minute) + ':' + numToString(seconds)
}
// formatDate()