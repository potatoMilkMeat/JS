/** =====5.2 抽象工程模式=================== */
// 抽象工厂方法
var VehicleFactory= function(subType, superType){
  if(typeof VehicleFactory[superType] === 'function'){
    function F() {};
    F.prototype = new VehicleFactory[superType]();
    subType.constructor = subType;
    subType.prototype= new F();
  }else {
    throw new Error('未创建该抽象类');
  }
}

VehicleFactory.throwError = function () {
  return new Error('抽象方法不能调用');
}

// 汽车类
VehicleFactory.Car = function () {this.type = 'car';}
VehicleFactory.Car.prototype = {getPrice: VehicleFactory.throwError,getSpeed: VehicleFactory.throwError}

// 公交车
VehicleFactory.Bus = function () {this.type = 'bus';}
VehicleFactory.Bus.prototype = {getPrice: VehicleFactory.throwError,getPassengerNum: VehicleFactory.throwError}

// 货车类
VehicleFactory.Truck = function () {this.type = 'truck';}
VehicleFactory.Truck.prototype = {getPrice: VehicleFactory.throwError,getTrainload: VehicleFactory.throwError}

/** =====5.3 抽象与实现=================== */
// 宝马汽车类
var BMW = function(price, speed){
  this.price = price; this.speed = speed;
}
// 抽象工厂类实现对 Car抽象类的继承
VehicleFactory(BMW, 'Car');
BMW.prototype.getPrice =function(){return this.price;}
BMW.prototype.getSpeed = function(){return this.speed;}

// 奔驰汽车子类
var BenzTruck = function(price, trainload){this.price=price;this.trainload= trainload;}
VehicleFactory(BenzTruck, 'Truck');
BenzTruck.prototype.getPrice=function () {return this.price;}
BenzTruck.prototype.getTrainload = function() {return this.trainload;}

/** =====使用=================== */
var a = new BenzTruck('10万','1千');
console.log(a.getPrice());
console.log(a);