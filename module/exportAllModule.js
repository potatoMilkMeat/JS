// 合并模块
// 有时你会想要将模块聚合在一起。 您可能有多个级别的依赖项，您希望简化事物，将多个子模块组合到一个父模块中。 
// 这可以使用父模块中以下表单的导出语法：

// shapes.js  文件
export * from 'x.mjs'
export { Square } from './modules/shapes/square.js';
export { Triangle } from './modules/shapes/triangle.js';
export { Circle } from './modules/shapes/circle.js';

// main.js  文件
import { Square, Circle, Triangle } from './modules/shapes.js';