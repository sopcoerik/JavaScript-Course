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

// Coding Challenge #3

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

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeLevel) {
//   this.charge = chargeLevel;
//   console.log(`Battery now charged to ${this.charge}%`);
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   --this.charge;
//   console.log(
//     `${this.make} is going now with ${this.speed}km/h, with a charge of ${this.charge}%`
//   );
// };

// const tesla = new EV(`Tesla`, 120, 23);

// tesla.accelerate();
// tesla.brake();
// tesla.chargeBattery(90);

// Coding Challenge #4

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log('accelerate: ', this.speed);
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log('brake :', this.speed);
    return this;
  }

  get speedUS() {
    console.log('speedUS: ', Number((this.speed / 1.6).toFixed(2)));
  }

  set speedUS(speedUSInput) {
    this.speed = speedUSInput * 1.6;
    console.log(this.speed);
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeValue) {
    this.#charge = chargeValue;
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
rivian.accelerate().chargeBattery(90).brake().accelerate().accelerate();
