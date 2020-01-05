function IsOnLine(onHandle, offHandle) {
  this.isOnLine = navigator.onLine;
  this.offHandle = offHandle;
  this.onHandle = onHandle;
  that = this;
  this.init();
}
IsOnLine.prototype = {
  setOnLine: function (event) {
    that.isOnLine = event.type === 'online' ? true : false;
    if (that.isOnLine) {
      that.onHandle()
    } else {
      that.offHandle()
    }
  },
  init: function () {
    window.ononline = this.setOnLine;
    window.onoffline = this.setOnLine;
  }
}

a = new IsOnLine(function () {
  console.log('在线')
}, function () {
  console.log('离线')
})
