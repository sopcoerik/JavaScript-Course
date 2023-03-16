'use strict';

// -------- Prototypal Inheritance ---------
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //Never do this (never create a function inside a constructor function)
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 1997);
const jack = new Person('Jack', 1975);

console.log(jonas, matilda, jack);

console.log(matilda instanceof Person);

//Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();
jack.calcAge();

// OOP Coding Challenge #1

// My solution
const Car = function (make, speed) {
  this.speed = speed;
  this.make = make;
};

Car.prototype.accelerate = function () {
  return this.speed + 10;
};
Car.prototype.break = function () {
  return this.speed - 5;
};

console.log(Car.prototype.accelerate(10));
console.log(Car.prototype.break(10));

const bmw = new Car('2015', 120);
const mercedes = new Car('Mercedes', 95);

console.log(`The BMW now has accelerated to ${bmw.accelerate()}`);
console.log(`The Mercedes now has deaccelerated to ${mercedes.break()}`);

console.log(bmw.__proto__);
// console.log(bmw.make);

//Instructor's solution
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed}km/h`);
};
Car.prototype.break = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed}km/h`);
};

bmw.accelerate();
bmw.accelerate();
bmw.break();
bmw.accelerate();

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

const jessica = new PersonCl('Jessica Davis', 1996);
const jake = new PersonCl('Jake', 1975);

console.log(jessica);
jessica.calcAge();

jessica.greet();

// Classes are not Hoisted
// Classes are first-class citizens
// Classes are executed in strict mode

const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],
  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);
