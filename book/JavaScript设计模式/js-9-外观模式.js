/** =====9.2 兼容模式=================== */
var Dom = {
  addEvent(dom, type, fn){
    if(dom.addEventListener){dom.addEventListener(type,fn);}
    else if(dom.attachEvent){dom.attachEvent('on'+type, fn);}
    else {dom['on'+ type] = fn;}
  }
}

/** =====9.3 兼容模式-其他=================== */
var Dom = {
  getEvent(event){ return event || window.event;},
  getTarget(event){
    let e = Dom.getEvent(event);
    return e.target || e.srcElement;
  },
  preventDefault(event){
    let e = Dom.getEvent(event);
    if(e.preventDefault){e.preventDefault();}
    else e.returnValue = false;
  }
}

/** =====9.4 小型代码库=================== */
var Dom = {
  g(id){ return document.getElementById(id);},
  css(id, key, value){ Dom.g(id).style[key] = value; },
  attr(id, key, value){ Dom.g(id)[key] = value;},
  html(id, htmlString){ Dom.g(id).innerHTML = htmlString; }
}

