/**
 * 在线阅读框架启动入口
 */
function loaded(){
  // 用变量接收, 供Book类使用
  window.el = clearELE(); 
  // 框架以【书名】作为 表名 存储的, 所以初始化DB 必须等到获取 书名，在book类中 initDB()初始化
  window.book = new Book();
  book.init();
}

window.onload = loaded