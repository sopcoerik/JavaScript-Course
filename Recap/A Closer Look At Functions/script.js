'use strict';

const bookings = [];

const createBooking = (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) => {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
createBooking('LH123', undefined, 1000);

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 234235235,
};

const greet = greeting => {
  return name => {
    console.log(`${greeting}, ${name}`);
  };
};

const greeter = greet('Hey');
greeter('Erik');

//Bind method

const addTax = (rate, value) => {
  return value + value * rate;
};

const addVAT = value => {
  return addTax(0.23, value);
};

console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = rate => {
  return value => {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

// Coding Challenge #1
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3:C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const input = Number(
      prompt(`What is your favorite programming language?
    0: JavaScript
    1: Python
    2: Rust
    3: C++
    (Write option number)`)
    );

    if (typeof input == 'number' && input >= 0 && input <= 3) {
      this.answers[input]++;
      this.displayResults('string');
    }
  },

  displayResults(type) {
    if (type === 'string') {
      let res = `The poll results are: `;
      for (const ans of this.answers) {
        res += `${ans}, `;
      }
      console.log(res);
    }
    console.log(this.answers);
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));
