'use strict';

// Coding Challenge #1

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(this.speed);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(this.speed);
// };

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// mercedes.brake();
// mercedes.brake();
// mercedes.accelerate();
// mercedes.accelerate();
// mercedes.accelerate();
// mercedes.accelerate();

// Coding Challenge #2

// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log('accelerate: ', this.speed);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log('brake :', this.speed);
//   }

//   get speedUS() {
//     console.log('speedUS: ', Number((this.speed / 1.6).toFixed(2)));
//   }

//   set speedUS(speedUSInput) {
//     this.speed = speedUSInput * 1.6;
//     console.log(this.speed);
//   }
// }

// const ford = new CarCl('Ford', 120);
// ford.accelerate();
// ford.brake();
// ford.speedUS;
// ford.speedUS = 120;
