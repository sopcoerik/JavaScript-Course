'use strict';

// -------- Prototypal Inheritance ---------
// const Person = function (firstName, birthYear) {
//   // Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//Never do this (never create a function inside a constructor function)
//   this.calcAge = function () {
//     console.log(2037 - this.birthYear);
//   };
// };

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

// const jonas = new Person('Jonas', 1991);
// const matilda = new Person('Matilda', 1997);
// const jack = new Person('Jack', 1975);

// console.log(jonas, matilda, jack);

// console.log(matilda instanceof Person);

//Prototypes
// console.log(Person.prototype);

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// jonas.calcAge();
// matilda.calcAge();
// jack.calcAge();

// OOP Coding Challenge #1

// My solution
// const Car = function (make, speed) {
//   this.speed = speed;
//   this.make = make;
// };

// Car.prototype.accelerate = function () {
//   return this.speed + 10;
// };
// Car.prototype.break = function () {
//   return this.speed - 5;
// };

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// console.log(`The BMW now has accelerated to ${bmw.accelerate()}`);
// console.log(`The Mercedes now has deaccelerated to ${mercedes.break()}`);

// console.log(bmw);
// console.log(bmw.make);

//Instructor's solution
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed}km/h`);
// };
// Car.prototype.break = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed}km/h`);
// };

// bmw.accelerate();
// bmw.accelerate();
// bmw.break();
// bmw.accelerate();

// ------- ES6 Classes --------

//class expression

// const PersonCl = class {};

// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Methods will be added to the .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey, ${this.firstName}`);
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
}

// const jessica = new PersonCl('Jessica Davis', 1996);
// // const jake = new PersonCl('Jake', 1975);

// console.log(jessica);
// jessica.calcAge();

// jessica.greet();

// Classes are not Hoisted
// Classes are first-class citizens
// Classes are executed in strict mode

console.log(`-----------------------------------`);

const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],
  // here in the next lines we set the latest movement dynamically
  // meaning that if we add a new move to the movements arr, it will 'get' us the new movement as the latest one
  get latest() {
    return this.movements.slice(-1).pop();
  },

  // here further down we can 'set' or add a new movement by calling the set function like at line 145
  set latest(mov) {
    this.movements.push(mov);
  },
};

// console.log(account.latest);

// account.latest = 50;
// console.log(account.movements);

class Personnel {
  constructor(fullName, occupation, responsibilities) {
    this.fullName = fullName;
    this.occupation = occupation;
    this.responsibilities = responsibilities;
  }

  set newResponsibility(resp) {
    this.responsibilities.push(resp);
  }

  get latestResponsibility() {
    return this.responsibilities.slice(-1).pop();
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert('Entered name is not a full name!');
  }

  get fullName() {
    return this._fullName;
  }
  static hey() {
    console.log('👋');
  }
}

// const erik = new Personnel('Sopco Erik', 'junior', ['learning', 'focusing']);
// console.log(erik);
// console.log(erik.latestResponsibility);
// erik.newResponsibility = 'working faster';
// console.log(erik.latestResponsibility);

// const Class = function (prop1, prop2) {
//   this.prop1 = prop1;
//   this.prop2 = prop2;
// };

// const newObj = new Class('four legs', 'round');
// console.log(newObj);

// Class.hey = function () {
//   console.log(`👋`);
// };

// Class.hey();

// Personnel.hey();

// Coding Challenge #2

// My version

// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   get speedUS() {
//     return `Speed in mi/h: ${this.speed / 1.6}`;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }

//   accelerate() {
//     this.speed += 10;
//   }

//   break() {
//     this.speed -= 5;
//   }
// }

// const ford = new CarCl('Ford', 120);
// console.log(ford);
// ford.speedUS = 80;
// console.log(ford.speed);
// ford.break();
// console.log(ford.speed);
// console.log(ford.speedUS);

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
// mike.introduce();
// console.log(mike);
// mike.calcAge();

// Coding Challenge #3

// My version

// const Car = function (make, speed) {
//   this.speed = speed;
//   this.make = make;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   return `${this.make} is now going with ${this.speed}`;
// };
// Car.prototype.break = function () {
//   this.speed -= 5;
//   return `${this.make} is now going with ${this.speed}`;
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype);
// EV.prototype.constructor = EV;
// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge--;
//   console.log(
//     `${this.make} going at ${this.speed}km/h, with charge of ${this.charge}%`
//   );
// };

// const tesla = new EV('Tesla', 120, 23);

// console.log(tesla);

// tesla.accelerate();
// console.log(tesla);
// tesla.break();
// console.log(tesla);
// tesla.chargeBattery(90);
// console.log(tesla);
// tesla.accelerate();
// console.log(tesla);
