/** =====7.2 创建一个焦点图=================== */
var LoopImage = function (imgArr, container) {
  this.imagesArray = imgArr;
  this.container = container;
  this.createImage = function () { console.log('LoopImage() createImage'); };
  this.changeImage = function () { console.log('LoopImage() changeImage'); };
}
// 上下滑动切换类
var SlideLoopImg = function(imgArr, container){
  LoopImage.call(this, imgArr, container);
  this.changeImage = function(){console.log('SlideLoopImg() changeImage');};
}
// 渐隐式切换类
var FadeLoopImg = function(imgArr, container, arrow){
  LoopImage.call(this, imgArr, container);
  this.arrow = arrow;
  this.changeImage = function(){console.log('FadeLoopImg() changeImage');};
}
// 实例化
fadeImg = new FadeLoopImg(['01.jpg', '02.jpg', '03.jpg'], 'slide', ['left.jpg', 'right.jpg']);
fadeImg.changeImage();

/** =====7.3 最优解决方案  =================== */
var LoopImage = function (imgArr, container) {
  this.imagesArray = imgArr;
  this.container = container;
}
LoopImage.prototype = {
  createImage() { console.log('LoopImage() createImage'); },
  changeImage() { console.log('LoopImage() changeImage'); }
}

// 上下滑动切换类
var SlideLoopImg = function(imgArr, container){
  LoopImage.call(this, imgArr, container);
}
SlideLoopImg.prototype = new LoopImage();
SlideLoopImg.prototype.changeImage = function(){console.log('SlideLoopImg() changeImage');};

// 渐隐式切换类
var FadeLoopImg = function(imgArr, container, arrow){
  LoopImage.call(this, imgArr, container);
  this.arrow = arrow;
}
FadeLoopImg.prototype = new LoopImage();
FadeLoopImg.prototype.changeImage = function(){console.log('FadeLoopImg() changeImage');};

fadeImg = new FadeLoopImg(['01.jpg', '02.jpg', '03.jpg'], 'slide', ['left.jpg', 'right.jpg']);
fadeImg.changeImage();

// 此模式还不是最优秀的，带有  LoopImage.prototype对象， fadeImg['__proto__'] 对象有{ imagesArray: undefined, container: undefined }
fadeImg['__proto__'].__proto__.createImage(); // LoopImage() createImage


/** =====7.4 原型的拓展    =================== */
LoopImage.prototype.getImageLength = function(){return this.imagesArray.length;};
FadeLoopImg.prototype.getContainer = function(){return this.container;}

console.log(fadeImg.getContainer(), fadeImg.getImageLength());

/** =====7.5 原型继承      =================== */
// 浅复制
function prototypeExtend(){
  const F = function(){};
  const arg = arguments;
  const l = arg.length;
  for(let i=0;i<l;i++){
    for(let j in arg[i]){
      F.prototype[j] = arg[i][j];
    }
  }
  return new F();
}

penguin = prototypeExtend(
  {speed: 20, swim(){console.log('游泳速度'+ this.speed);return this;}},
  {run(speed){console.log('奔跑速度'+ speed);return this;}},
  {jump(){console.log('跳跃动作');return this;}},
  FadeLoopImg.prototype
)

penguin.swim().run(50).jump();
