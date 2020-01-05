// document.cookie 
// get 时返回所有cookie，以';'分割。
// set 时，设置新的cookie, 也可以设置多个，以';'分割。
document.cookie = 'id=chenglong111;goods=pc01'
document.cookie = 'goods1=pc11'

console.log(document.cookie)

// cookie 符合 URL编码，同时也需要解码
// decodeURIComponent()

/**
 * decodeURIComponent 和 decodeURI 区别
 * ```js
 * str="http://192.168.0.121:5000/home/index.html?name=程龙&id=11111#hash"
 * encodeURI(str)          // "http:  /  /  192.168.0.121:  5000/  home/  index.html?  name=  %E7%A8%8B%E9%BE%99&  id=  11111#  hash"
 * encodeURIComponent(str) // "http%3A%2F%2F192.168.0.121%3A5000%2Fhome%2Findex.html%3Fname%3D%E7%A8%8B%E9%BE%99%26id%3D11111%23hash"
 * 
 * decodeURIComponent("http%3A%2F%2F192.168.0.121%3A5000%2Fhome%2Findex.html%3Fname%3D%E7%A8%8B%E9%BE%99%26id%3D11111%23hash")
 * // "http://192.168.0.121:5000/home/index.html?name=程龙&id=11111#hash"
 * ```
 */

/**
 * js 读写删cookie
 */
var cookieUtil = {
  get: function (name) {
    var cookieName = encodeURIComponent(name) + '=',
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null;

    if (cookieStart > -1) {
      var cookieEnd = document.cookie.indexOf(';', cookieStart);
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = document.cookie.substr(cookieStart, cookieEnd);
    }

    return cookieValue;
  },

  set: function (name, value, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    if (expires instanceof Date) {
      cookieText += '; expires=' + expires.toGMTString();
    }

    if (path) {
      cookieText += '; path=' + path;
    }

    if (domain) {
      cookieText += '; domain=' + domain;
    }

    if (secure) {
      cookieText += '; secure=' + secure;
    }

    document.cookie = cookieText;
  },

  unset: function (name, path, domain, secure) {
    this.set(name, '', new Date(0), path, domain, secure);
  }

};

// 设置cookie
cookieUtil.set('id', '22222')

cookieUtil.unset('goods','/','192.168.0.121',false)
cookieUtil.unset('goods1')