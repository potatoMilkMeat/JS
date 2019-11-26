/**
 * 用户代理检测
 * navigator.userAgent 字符
 */

// var b=navigator.userAgent
// 谷歌浏览器          // "Mozilla/5.0 (Windows NT 10.0; Win64; x64)  AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36"
// 360 急速：weblit    // "Mozilla/5.0 (Windows NT 10.0; WOW64)       AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"
// opera 2013：weblit  // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36 OPR/65.0.3467.48"
// edge 2019：weblit   // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18362"

// IE  5,7            // "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3)"
// IE  8              // "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3)"
// IE  9              // "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3)"
// IE 10              // "Mozilla/5.0 (compatible; MSIE 10.0;Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3)"
// IE 11              // "Mozilla/5.0 (                      Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko"

// if(console && typeof console.log === 'function' ){console.log(b);}
// else { alert(JSON.stringify(b)+'\n'+ typeof b); } // 适应 Mozilla/4.0 及以前的老版本

var client = function(){

  // 呈现引擎
  var engine = {
    ie: 0, // Trident内核 ie6,ie7,ie8(Trident4.0) ie9(Trident 5.0) ie10(Trident 6.0) ie11(Trident/7.0)
    edge: 0, // edgeHtml内核        // 现在已经放弃
    gecko: 0, // 火狐
    webKit: 0, // 苹果 和 谷歌(旧)  // blink: 0, 谷歌
    khtml: 0, // KDE开发的。        // webKit和blink基于khtml开发的
    opera: 0, // 欧朋 Presto        // 现在已经放弃
    ver: null // 具体版本号
  };

  // 浏览器
  var browser = {
    // 主要浏览器
    ie: 0,
    edge: 0,
    firefox: 0,
    safari: 0,
    konq: 0,
    opera: 0, // 欧朋
    chrome: 0,
    ver: null // 具体版本号
  };

  // 平台，设备和操作系统
  var system = {
    win: false,
    mac: false,
    x11: false,

    // 移动设备
    iphone: false,
    ipod: false,
    ipad: false,
    ios: false,
    android: false,
    nokiaN: false,
    winMobile: false,

    // 游戏系统
    wii: false,
    ps: false
  };

  // 检测呈现引擎和浏览器
  var ua = navigator.userAgent;
  if(window.opera){/* opera 旧版 */
    engine.ver = browser.ver = window.opera.version();
    engine.opera = browser.opera = parseFloat(engine.ver);
  }else if(/AppleWebKit\/(\S+)/.test(ua)){/* webKit 内核 */
    engine.ver = RegExp["$1"];
    engine.webKit = parseFloat(engine.ver);

    // 确定是 edge, opera
    if(/Edge\/([\d\.]+)/.test(ua)){
      browser.ver = RegExp["$1"];
      browser.edge = parseFloat(browser.ver);
    }else if(/OPR\/([\d\.]+)/.test(ua)){
      browser.ver = RegExp["$1"];
      browser.opera = parseFloat(browser.ver);
    }

    // 确定是 Chrome , Safari
    else if(/Chrome\/(\S+)/.test(ua)){
      browser.ver = RegExp["$1"];
      browser.chrome = parseFloat(browser.ver);
    }else if(/Version\/(\/S+)/.test(ua)){
      browser.ver = RegExp["$1"];
      browser.safari = parseFloat(browser.ver);
    }else {
      // 近似地确定版本号
      var safariVersion = 1;
      if(engine.webKit > 412){ safariVersion = 2; }
      else if(engine.webKit > 312){ safariVersion = 1.3; }
      else if(engine.webKit > 100){ safariVersion = 1.2; }
    }
    
  }else if(/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
    engine.ver = browser.ver = RegExp["$1"];
    engine.khtml = browser.konq = parseFloat(engine.ver);
  }else if(/rv:([^\)]+) Gecko\/\d{8}/.test(ua)){
    engine.ver = RegExp["$1"];
    engine.gecko = parseFloat(engine.ver);

    // 确定是不是firefox
    if(/Firefox\/(\S+)/.test(ua)){
      browser.ver = RegExp["$1"];
      browser.firefox = parseFloat(browser.ver);
    }
  }else if(/Trident/.test(ua)){/* ie */
    if(/MSIE ([^;]+)/.test(ua)){/* 针对ie 5-10*/ engine.ver = browser.ver = RegExp["$1"]; }
    else if(/rv:([^\)]+)/.test(ua)){/* ie11  rv:11.0) */ engine.ver = browser.ver = RegExp["$1"]; }
    engine.ie = browser.ie = parseFloat(engine.ver);
  }

  var p = navigator.platform;
  system.win = p.indexOf('Win') == 0;
  system.mac = p.indexOf('Mac') == 0;
  system.x11 = p.indexOf('X11') == 0 || p.indexOf('Linux') == 0;

  // 检测 win 版本
  if(system.win){
    if(/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
      if(RegExp["$1"] == 'NT'){
        switch (RegExp["$2"]) {
          case "5.0":
            system.win = '2000';
            break;
          case "6.0":
            system.win = 'Vista';
            break;
          case "6.1":
            system.win = '7';
            break;
          case "10.0":
            system.win = '10';
            break;
          default:
              system.win = 'NT';
            break;
        }
      }else if(RegExp["$1"] == "9x"){ system.win = "me"; }
      else { system.win = RegExp["$1"]; }
    }
  }

  // 移动设备
  system.iphone = ua.indexOf('iPhone') > -1;
  system.ipod = ua.indexOf('iPod') > -1;
  system.ipad = ua.indexOf('iPad') > -1;
  system.nokiaN = ua.indexOf('NokiaN') > -1;

  // 检测 winMobile
  if(system.win == 'CE'){system.winMobile = system.win;}
  else if(system.win == 'Ph'){
    if(/Windows Phone OS (\d+.\d+)/.test(ua)){ system.win='Phone';system.winMobile=parseFloat(RegExp["$1"]); }
  }

  // 检测 ios 版本
  if(system.mac && ua.indexOf('Mobile') > -1){
    if(/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){ system.ios = parseFloat(RegExp.$1.replace('_', '.')); }
    else{ system.ios=2; /* 不能真正检测出来，所以只能猜测 */ }
  }

  // 检测 Android 版本
  if(/Android (\d+\.\d+)/.test(ua)){ system.android=parseFloat(RegExp.&1); }

  // 游戏系统
  system.wii = ua.indexOf('Wii') > -1;
  system.ps = /playstation/i.test(ua);

  // 返回对象
  return {
    engine: engine,
    browser: browser,
    system: system
  };
}();

function test(a,b){
  if(!b){b=client.engine.ver;}
  if(console && typeof console.log === 'function'){ console.log('针对'+a+'代码', b); }
  else {alert('针对'+a+'代码\n版本：'+b);}
}

if(client.engine.ie){ // 如果是ie，client.engine.ie 大于0
  // 针对IE代码
  test('IE');
}else if(client.engine.webkit){/* webkit */
  if(client.browser.chrome){
    // 针对chrome代码
    test('chrome');
  }else if(client.browser.safari){
    // 针对safari代码
    test('safari');
  }
}
else if(client.engine.gecko){
  if(client.engine.gecko > 1.5){ test('gecko > 1.5 '); }
  if(client.engine.ver == '1.8.1'){ // 针对这个版本执行某些操作
    test('gecko = 1.8.1 ');
  }
  
  if(client.engine.firefox){ // 针对firefox代码
    console.log('针对firefox代码')
    test('firefox ');
  }else { // 针对其他 gecko 浏览器代码
    test('其他 gecko 浏览器 ');
  }

}else if(client.browser.edge){
  // 针对edge代码
  test('edge',client.browser.ver);
}