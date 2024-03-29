'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

let sorted = false;
// Created username for each acc
const usernameCreation = () => {
  accounts.forEach(
    acc =>
      (acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map(word => word[0])
        .join(''))
  );
};
usernameCreation();

let currentUser;
const now = new Date(); // so first I need a new date in a variable
labelDate.textContent = Intl.DateTimeFormat(navigator.language).format(now); // then I can format that new date with the intl api based on the browsers language

const startTimer = () => {
  let time = 120;

  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
    }

    time--;
  };

  tick();
  const timer = setInterval(tick, 1000);
};

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  containerMovements.textContent = '';
  accounts.forEach(acc => {
    if (
      inputLoginUsername.value === acc.username &&
      Number(inputLoginPin.value) === acc.pin
    ) {
      containerApp.style.opacity = 1;
      currentUser = acc;
    }
  });
  startTimer();
  inputLoginUsername.value = inputLoginPin.value = '';
  labelWelcome.textContent = `Welcome back, ${currentUser.owner}`;
  console.log(currentUser);
  displayMovements(currentUser);
  displayBalance(currentUser);
  displaySummary(currentUser);
});

const displayMovements = (acc, sorted) => {
  containerMovements.textContent = '';

  const movs = sorted
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, i) => {
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${
      mov > 0 ? 'deposit' : 'withdrawal'
    }">${i + 1} ${mov > 0 ? 'deposit' : 'withdrawal'}</div>
    <div class="movements__date"></div>
    <div class="movements__value">${Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: `${navigator.language == 'en-US' ? 'USD' : 'EUR'}`,
    }).format(mov)}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displayBalance = acc => {
  acc.balance = acc.movements.reduce((sum, curr) => sum + curr, 0);
  labelBalance.textContent = Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: `${navigator.language == 'en-US' ? 'USD' : 'EUR'}`,
  }).format(acc.balance);
};

const displaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: `${navigator.language == 'en-US' ? 'USD' : 'EUR'}`,
  }).format(incomes);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: `${navigator.language == 'en-US' ? 'USD' : 'EUR'}`,
  }).format(Math.abs(out));

  const interest = acc.movements
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(mov => {
      return mov >= 1;
    })
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: `${navigator.language == 'en-US' ? 'USD' : 'EUR'}`,
  }).format(interest);
};

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const transferTo = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  const amount = Number(inputTransferAmount.value);

  if (
    transferTo &&
    transferTo !== currentUser &&
    amount > 0 &&
    amount <= currentUser.balance
  ) {
    transferTo.movements.push(amount);
    currentUser.movements.push(-amount);
    displayMovements(currentUser);
    displayBalance(currentUser);
    displaySummary(currentUser);
  }

  inputTransferTo.value = inputTransferAmount.value = '';
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const loan = Number(inputLoanAmount.value);

  if (loan > 0 && currentUser.movements.some(mov => mov >= loan * 0.1)) {
    currentUser.movements.push(loan);
    displayMovements(currentUser);
    displaySummary(currentUser);
    displayBalance(currentUser);
    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentUser.username &&
    Number(inputClosePin.value) === currentUser.pin
  ) {
    const accIndex = accounts.findIndex(
      acc => acc.username === inputCloseUsername.value
    );
    accounts.splice(accIndex, 1);
    containerApp.style.opacity = 0;
  }
});

btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentUser, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// //SLICE
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// console.log([...arr]);

// //SPLICE
// // console.log(arr.splice(2));
// arr.splice(-1);
// console.log(arr);
// arr.splice(1, 2);

// console.log(arr);
// // mutates original array

// //REVERSE
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);
// //mutates original array

// //CONCAT

// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// //JOIN

// console.log(letters.join(' - '));

// // at method

// const arr3 = [23, 11, 64];
// console.log(arr3[0]);
// console.log(arr3.at(0));

// // getting last el
// console.log(arr3[arr3.length - 1]);
// console.log(arr3.slice(-1)[0]);
// console.log(arr3.at(-1));

// console.log('jonas'.at(-1));

// //forEach
// // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log(`-----------------FOREACH-----------------`);

// movements.forEach((mov, i, arr) => {
//   if (mov > 0) {
//     console.log(`Movement${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });

// // with maps and sets

// //map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach((value, key, map) => {
//   console.log(`${key}: ${value}`);
// });

// // set
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach((value, _, map) => {
//   console.log(`${value}: ${value}`);
// });

// // sets have no indexes

// // Coding Challenge #1

// // const checkDogs = (dogsJulia, dogsKate) => {
// //   const shallowCopyDogsJulia = dogsJulia.slice().splice(1);
// //   shallowCopyDogsJulia.splice(-2);
// //   const dogsArrAll = shallowCopyDogsJulia.concat(dogsKate);
// //   dogsArrAll.forEach((dogAge, i) =>
// //     dogAge < 3
// //       ? console.log(`Dog number ${i + 1} is still a puppy`)
// //       : console.log(
// //           `Dog number ${i + 1} is an adult and is ${dogAge} years old`
// //         )
// //   );
// // };

// // checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// // console.log(`---------------------------`);
// // checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// const eurToUsd = 1.1;

// const movementsUSD = movements.map(mov => mov * eurToUsd);

// console.log(movements);
// console.log(movementsUSD);

// const deposits = movements.filter(mov => mov > 0);
// console.log(deposits);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// const balance = movements.reduce((accumulator, mov) => accumulator + mov, 0);
// console.log(balance);

// // maximum value
// const max = movements.reduce(
//   (acc, mov) => (acc > mov ? acc : mov),
//   movements[0]
// );

// console.log(max);

// Coding Challenge #2

// const calcAvgHumanAge = ages => {
//   const humanAges = ages
//     .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
//     .filter(dogAge => dogAge >= 18);
//   const avgHumanAge =
//     humanAges.reduce((acc, cur) => acc + cur, 0) / humanAges.length;
//   console.log(avgHumanAge);
// };

// calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAvgHumanAge([16, 6, 10, 5, 6, 1, 4]);

// Coding Challenge #3
// already written in arr func format

//Coding Challenge #4
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

// dogs.map(dog => (dog.recFood = Math.floor(dog.weight ** 0.75 * 28)));
// const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
// const isSarahsDogEatingTooMuch =
//   dogSarah.curFood > dogSarah.recFood ? 'Too Much' : `Too Little`;
// console.log(isSarahsDogEatingTooMuch);

// const ownersEatTooMuch = dogs
//   .flatMap(dog => dog.curFood > dog.recFood && dog.owners)
//   .filter(owner => owner);

// const ownersEatTooLittle = dogs
//   .flatMap(dog => dog.curFood < dog.recFood && dog.owners)
//   .filter(owner => owner);

// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

// console.log(dogs.some(dog => dog.curFood === dog.recFood));
// console.log(
//   dogs.some(
//     dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
//   )
// );

// const dogsEatOkay = dogs.filter(
//   dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
// );
// console.log(dogsEatOkay);

// const shallowCopyDogs = dogs
//   .map(dog => dog)
//   .sort((a, b) => a.recFood - b.recFood);
// console.log(shallowCopyDogs);
