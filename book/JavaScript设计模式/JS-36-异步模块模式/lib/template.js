F.module('lib/template', function(){
  /**
   * 模板引擎 处理数据与编译模板入口
   * @param {*} str 模板容器ID 或者模板字符串
   * @param {*} data 渲染数据
   */
  var _TplEngine = function(str, data){
        // 如果数据是数组
        if(data instanceof Array){
              // 缓存渲染模板结果
          var html = '',
              // 数据索引
              i = 0,
              // 数据长度
              len = data.length;
          // 遍历数据
          for(; i < len; i++){
            // 缓存模板渲染结果， 也可以写成 html += arguments.callee(str, data[i]);
            html +=_getTpl(str)(data[i]);
          }
          // 返回模板渲染最终结果
          return html;
        }else{
          // 返回模板渲染结果
          // console.log(window.fn=_getTpl(str)); // 暴露出 _compileTpi编译后的函数，见最后面
          return _getTpl(str)(data);
        }
      },
      /**
       * 获取模板
       * @param {*} str 模板容器ID 或者模板字符串
       */
      _getTpl = function(str){
        // 获取元素
        var ele = document.getElementById(str);
        // 如果元素存在
        if(ele){
          // 如果是input或者textarea 表单元素， 则获取该元素的Value值，否则获取元素的内容
          var html = /^(textarea|input)$/i.test(ele.nodeName) ? ele.value : ele.innerHTML;
          // 编译模板
          return _compileTpi(html);
        }else{
          // 编译模板
          return _compileTpi(str);
        }
      },
      // 处理模板
      _dealTpl = function(str){
        var _left = '{%', // 左分隔符
            _right = '%}'; // 右分隔符
        // 显式转化为字符串
        return String(str)
            // 转义标签内的< 如：<div>{%if(a&lt;b)%}</div> => <div>{%if(a<b)%}</div>
            .replace(/&lt;/g, '<')
            // 转义标签内的>
            .replace(/&gt;/g, '>')
            // 过滤 回车符，制表符，换行符
            .replace(/[\r\t\n]/g, '')
            // 过滤多个空格为一个
            .replace(/\s+/g, ' ')
            // 替换内容
            .replace(new RegExp(_left + '=(.*?)'+_right, 'g'), "',typeof($1)==='undefined'?'':$1,'")
            // 替换左分隔符
            .replace(new RegExp(_left, 'g'), "');")
            // 替换右分割符
            .replace(new RegExp(_right, 'g'), "template_array.push('");
      },
      /**
       * 编译执行
       * @param {*} str 模板数据
       */
      _compileTpi = function(str){
        // 编译函数体
        var fnBody = "var template_array=[];\nvar fn=(function(data){\nvar template_key='';\nfor(key in data){\ntemplate_key+=('var '+key+'=data[\"'+key+'\"];');\n}\neval(template_key);\ntemplate_array.push('"+_dealTpl(str)+"');\ntemplate_key=null;\n})(templateData);\nfn=null;\nreturn template_array.join('');";
        // 编译函数
        return new Function("templateData", fnBody);
      };
  return _TplEngine;
})

/**
 * 编译函数体 - 解析  var fnBody = "";
 * ```js
 * // 申明template_array模板容器组
 * var template_array=[];
 * // 闭包，模板容器组添加成员
 * var fn=(function(data){
 *    // 渲染数据变量的执行函数体
 *    var template_key='';
 *    // 遍历渲染数据
 *    for(key in data){
 *      // 为渲染数据变量的执行函数体添加赋值语句
 *      template_key+=('var '+key+'=data[\"'+key+'\"];');
 *    }
 *    // 执行渲染数据变量函数
 *    eval(template_key);
 *    // 为模板容器组添加成员（注意，此时渲染数据将替换容器中的变量）
 *    template_array.push('"+_dealTpl(str)+"');
 *    // 释放渲染数据变量函数
 *    template_key=null;
 *    //为闭包传入数据
 * })(templateDate);
 * // 释放闭包
 * fn=null;
 * //染回渲染后的模板容器组，并拼接成字符串
 * return template_array.join('');
 * ```
 */

/**
 * _compileTpi 编译执行 返回的代码
 * ```js
 * (function anonymous(templateData){
 * var template_array=[];
 * var fn=(function(data){
 * var template_key='';
 * for(key in data){
 * template_key+=('var '+key+'=data["'+key+'"];');
 * }
 * eval(template_key);
 * template_array.push('    <div id="tag_cloud">      '); for(var i = 0, len = tagCloud.length; i < len; i++){          var ctx = tagCloud[i];template_array.push('          <a href="#" class="tag_item          '); if(ctx["is_selected"]){ template_array.push('            selected          '); } template_array.push('          " title="',typeof(ctx["title"])==='undefined'?'':ctx["title"],'">',typeof(ctx["text"])==='undefined'?'':ctx["text"],'</a>        '); } template_array.push('    </div>  ');
 * template_key=null;
 * })(templateData);
 * fn=null;
 * return template_array.join('');
 * })
 * ```
 */
