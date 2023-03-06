'use strict';

// const bookings = [];

// const createBooking = (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) => {
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', 2);
// createBooking('LH123', undefined);

// const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 3534566151,
// };

// const checkIn = (flightNum, passenger) => {
//   flightNum = 'LH999';
//   passenger.name = 'Mr' + passenger.name;

//   if (passenger.passport === 3534566151) {
//     alert('Check In');
//   } else {
//     alert('Wrong Passport');
//   }
// };

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//Coding Challenge #1

//My solution

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section!
//   answers: new Array(4).fill(0),

//   registerNewAnswer() {
//     let input;
//     input = Number(
//       prompt(
//         `${this.question}\n${this.options[0]}\n${this.options[1]}\n${this.options[2]}\n${this.options[3]}\n(Write option number)`
//       )
//     );
//     input >= 0 && input <= 3 ? this.answers[input]++ : false;
//     this.displayResults(this.answers);
//   },

//   displayResults(type) {
//     console.log(type);
//   },
// };

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

//Guy's solution
// const pollButton = document.querySelector('.poll');

// pollButton.addEventListener('click', function () {
//   poll.registerNewAnswer();
// });

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     // Get answer
//     const answer = Number(
//       prompt(
//         `${this.question}\n${this.options.join('\n')}\n(Write option number)`
//       )
//     );
//     console.log(answer);

//     // Register answer
//     typeof answer === 'number' &&
//       answer < this.answers.length &&
//       this.answers[answer]++;

//     this.displayResults();
//     this.displayResults('string');
//   },

//   displayResults(type = 'array') {
//     if (type === 'array') {
//       console.log(this.answers);
//     } else if (type === 'string') {
//       // Poll results are 13, 2, 4, 1
//       console.log(`Poll results are ${this.answers.join(', ')}`);
//     }
//   },
// };

// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]

//example 1

// let f;

// const g = function () {
//   const a = 23;
//   f = function () {
//     console.log(a * 2);
//   };
// };

// const h = function () {
//   const b = 777;
//   f = function () {
//     console.log(b * 2);
//   };
// };

// g();
// f();
// h();
// f();

// console.dir(f);

//example 2

// const boardPassengers = (n, wait) => {
//   const perGroup = n / 3;

//   setTimeout(function () {
//     console.log(`We are now boarding all ${n} passengers`);
//     console.log(`There are 3 groups, each with ${perGroup} passengers`);
//   }, wait * 1000);

//   console.log(`Will start boarding in ${wait} seconds`);
// };

// boardPassengers(180, 3);

//Coding challenge #2

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  header.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
