// 动态加载模块
// 浏览器中可用的JavaScript模块功能的最新部分是动态模块加载。 
// 这允许您仅在需要时动态加载模块，而不必预先加载所有模块。 
// 这有一些明显的性能优势;

// main.js  文件中
let squareBtn = document.querySelector('.square'); // 我们使用document.querySelector()调用获取了对每个按钮的引用

// 我们为每个按钮附加一个事件监听器，以便在按下时，相关模块被动态加载并用于绘制形状：
squareBtn.addEventListener('click', () => {
  import('./modules/square.mjs').then((Module) => {
    let square1 = new Module.Square(myCanvas.ctx, myCanvas.listId, 50, 50, 100, 'blue');
    square1.draw();
    square1.reportArea();
    square1.reportPerimeter();
  })
});
// 由于promise履行会返回一个模块对象，因此该类成为对象的子特征，因此我们现在需要使用 Module访问构造函数
