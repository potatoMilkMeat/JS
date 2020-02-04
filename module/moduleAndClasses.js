// square.js  文件
class Square {
  constructor(ctx, listId, length, x, y, color) {
    ...
  }

  draw() {
    ...
  }

  ...
}

export { Square };

// main.js 文件
import { Square } from './modules/square.js';

    // 使用该类绘制我们的方块：
let square1 = new Square(myCanvas.ctx, myCanvas.listId, 50, 50, 100, 'blue');
square1.draw();
square1.reportArea();
square1.reportPerimeter();