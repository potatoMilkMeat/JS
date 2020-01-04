/**
 * EventTarget 类
 * 自定义事件绑定
 */
function EventTarget() {
  this.handlers = {}
}

EventTarget.prototype = {
  constructor: EventTarget,
  addHandler: function (type, handler) {
    if (typeof this.handlers[type] === 'undefined') {
      this.handlers[type] = [];
    }

    return this.handlers[type].push(handler);
  },

  fire: function (event) {
    if (!event.target) {
      event.target = this;
    }
    if (Object.prototype.toString.call(this.handlers[event.type]) === '[object Array]') {
      var handlers = this.handlers[event.type];
      for (var i = 0, l = handlers.length; i < l; i++) {
        handlers[i](event);
      }
    }
  },

  removeHandler: function (type, handler) {
    if (Object.prototype.toString.call(this.handlers[type]) === '[object Array]') {
      var handlers = this.handlers[type];
      for (var i = 0, l = handlers.length; i < l; i++) {
        if (handlers[i] === handler) {
          break;
        }
      }

      return handlers.splice(i, 1);
    }
  }
};

/**
 * 拖拽
 */
var DragDrop = function () {
  var dragdrop = new EventTarget(),
    dragging = null,
    diffX = 0,
    diffY = 0;

  function handleEvent(event) {
    var target = event.target;

    switch (event.type) {
      case 'mousedown':
        if (target.className.indexOf('draggable') > -1) {
          dragging = target;
          diffX = event.clientX - target.offsetLeft;
          diffY = event.clientY - target.offsetTop;

          // 触发事件
          dragdrop.fire({
            type: 'dragstart',
            target: dragging,
            x: event.clientX,
            y: event.clientY
          })
        }
        break;
      case 'mousemove':
        if (dragging !== null) {
          dragging.style.left = (event.clientX - diffX) + 'px';
          dragging.style.top = (event.clientY - diffY) + 'px';

          // 触发事件
          dragdrop.fire({
            type: 'drag',
            target: dragging,
            x: event.clientX,
            y: event.clientY
          })
        }
        break;

      case 'mouseup':
        // 触发事件
        dragdrop.fire({
          type: 'dragend',
          target: dragging,
          x: event.clientX,
          y: event.clientY
        })
        dragging = null;
        break;
    }
  };


  dragdrop.enable = function () {
    document.addEventListener('mousedown', handleEvent);
    document.addEventListener('mousemove', handleEvent);
    document.addEventListener('mouseup', handleEvent);
  };
  dragdrop.disable = function () {
    document.removeEventListener('mousedown', handleEvent);
    document.removeEventListener('mousemove', handleEvent);
    document.removeEventListener('mouseup', handleEvent);
  }
  return dragdrop
}()

function dragsFuc(event) {
  switch (event.type) {
    case 'dragstart':
      console.log("开始拖拽：" + event.target.id)
      break;
    case 'drag':
        console.log("<br>拖拽：" + event.target.id + ' to (' + event.x + ',' + event.y + ')');
      break;
    case 'dragend':
        console.log("<br>拖拽结束：" + event.target.id + ' at (' + event.x + ',' + event.y + ')');
      break;
  }

}

DragDrop.addHandler('dragstart', dragsFuc);
DragDrop.addHandler('drag', dragsFuc);
DragDrop.addHandler('dragend', dragsFuc);

DragDrop.enable(); // 开启拖拽