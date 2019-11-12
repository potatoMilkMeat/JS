Object.defineProperties(book, {
  _year: { value: 2004, writable:true },
  edition: { value: 0, writable:true },
  year: {
    get: function () { return this._year; },
    set: function (v) {
      if (v > 2004) { this._year = v; this.edition += v - 2004; } else { return 'error: \t 参数不大于2004'; }
    }
  }
})