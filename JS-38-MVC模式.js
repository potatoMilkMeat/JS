/** ===== $ 简化引用 ========= */
var $ = function(){};
$.create = function(tagName, obj){
  var dom = document.createElement(tagName);
  for(var key in obj){
    dom.setAttribute(key, obj[key]);
  }
  return dom;
}
/** =====38.2- MVC ========= */
// 魏建华页面操作逻辑，这里引用链模式中实现的A框架，具体方法参考附录A
// 页面加载后创建MVC对象
window.onload = function(){
  // 初始化MVC对象
  var MVC = MVC || {};
  // 初始化MVC数据模型层
  MVC.module = function(){
    // 内部数据对象
    var M = {};
    // 服务器端获取的数据，通常通过ajax获取并存储，后面的案例为简化实现，直接作为同步数据
    // 卸载页面中，减少服务器端异步请求操作
    M.data = {
      // 左侧侧边栏导航服务器端请求得到的相应数据
      slideBar: [
        {text: '萌妹子', icon: 'left_meng.png', title: '萌妹子_title', content: '萌妹子_content', img: 'left_meng_img.png', href: 'http://moe.hao123.com'},
        {text: '动漫', icon: 'left_comic.png', title: '动漫_title', content: '动漫_content', img: 'left_comic_img.png', href: 'http://v.hao123.com/dongman'},
        {text: 'lol直播', icon: 'left_lol.png', title: 'lol直播_title', content: 'lol直播_content', img: 'left_lol_img.png', href: 'http://www.hao123.com/video/lol'},
        {text: '网络剧', icon: 'left_tv.png', title: '网络剧_title', content: '网络剧_content', img: 'left_tv_img.png', href: 'http://www.hao123.com/video/yuanchuang'},
        {text: '热帖', icon: 'left_tie.png', title: '热帖_title', content: '热帖_content', img: 'left_tie_img.png', href: 'http://www.hao123.com/gaoxin/retie'}
      ]
    };
    // 配置数据，页面加载时 即提供
    M.conf = {
      // 侧边导航动画配置数据
      slideBarCloseAnimate: false
    };
    // 返回数据模型层对象操作方法
    return {
      // 获取服务器端数据
      getData: function(m){
        // 根据数据字段获取数据
        return M.data[m];
      },
      // 获取配置数据
      getConf: function(c){
        // 根据配置数据字段获取配置数据
        return M.conf[c];
      },
      // 设置服务器端数据（通常将服务器端异步获取到的数据，更新该数据）
      setData: function(m, v){
        // 设置数据字段m对应的数据
        M.data[m] = v;
        return this;
      },
      // 设置配置数据（通常在页面中执行某些操作，为做记录 而更新配置数据）
      setConf: function(c, v){
        // 设置配置字段c对应的配置数据v
        M.conf[c] = v;
        return this;
      }
    }
  }();
  // 初始化MVC视图层
  MVC.view = function(){
    // 模型数据层对象操作方法引用
    var M = MVC.module;
    // 内部视图创建方法对象
    var V = {
      // 创建侧边导航模块视图
      createSlideBar: function(){
            // 导航图标内容
        var html = '',
            // 视图渲染数据
            data = M.getData('slideBar');
        // 屏蔽无效数据
        if(!data || !data.length){
          return;
        }
        // 创建视图容器（参考附录A中，A框架中创建元素方法create）
        var dom = $.create('div', {class: 'slideBar', id: 'slideBar'});
        // 视图容器模板
        var tpl = {
          container: [
            '<div class="slidebar-inner"><ul>{#content#}</ul></div>',
            '<a hidefocus href="#" class="slide-close" title="收起" />',
          ].join(''),
          // 导航图标模块模板
          item: [
            '<li>',
              '<a class="icon" href="{#href#}">',
                '<img src="common/img/{#icon#}">',
                '<span>{#text#}</span>',
              '</a>',
              '<div class="box">',
                '<div>',
                  '<a class="title" href="{#href#}">{#title#}</a>',
                  '<a href="{#href#}">{#content#}</a>',
                '</div>',
                '<a class="image" href="{#href#}"><img src="common/img/{#img#}"></a>',
              '</div>',
            '</li>'
          ].join('')
        };
        // 渲染全部导航图片模块
        for(var i=0,len=data.length;i<len;i++){
          html += $.formateString(tpl.item, data[i]);
        }
        // 在页面中创建侧边导航视图
        // 渲染导航视图（content为导航图片内容）
        dom.innerHTML = $.formateString(tpl.container, {content: html})
        // 将侧边导航模块容器插入页面中
        document.body.appendChild(dom);
      }
    };
    // 获取视图接口的方法
    return function(v){
      // 根据视图名称 返回视图（由于获取的是一个方法，这里需要将该方法执行一遍一获取相应视图）
      V[v]();
    }
  }();
  // 初始化MVC控制器层
  MVC.ctrl = function(){
    // 模型数据层对象操作方法引用
    var M = MVC.module;
    // 视图层对象操作方法引用
    var V = MVC.View;
    // 控制器创建方法对象
    var C = {
      initSlideBar: function(){
        //
        V('createSlideBar');
        console.log(V('createSlideBar'))
      }()
    };
    // // 遍历C中的每一个方法并执行
    // for(var i in C){
    //   console.log('&&&&&&&',C[i]);
    //   // 如果模块方法存在则执行
    //   C[i] && C[i]();
    // }
  }();
  
};

/** =====38.3- 数据层 ========= */
// 提供 M.data M.conf 私有变量，并提供4个接口作为 获取或者修改

/** =====38.4- 视图层 ========= */
// 提供 V 私有变量，M的操作方法引用，并提供接口 外部获取视图创建方法

/** =====38.5- 控制层 ========= */
// 提供 V的操作方法引用，M的操作方法引用，和 控制器创建方法对象

/** =====38.7- 侧边导航栏 ========= */
// 1. 导航模块的数据； 2. 箭头的显示隐藏效果 配置数据； 3. 
// M.data= {} M.conf = {}

/** =====38.8- 侧边导航栏视图层 ========= */
// 1. 模块容器模板； 2. 导航图标模块模板
// 模板渲染引擎formateString () 
// V = {}

/** =====38.9- 侧边导航栏视图层 ========= */
// 1. 模块容器模板； 2. 导航图标模块模板
// 模板渲染引擎formateString () 
// V = {}