'use strict';

// Coding Challenge #1

/*const calcAvg = (a, b, c) => {
  return (a + b + c) / 3;
};

const scoreDolphins = calcAvg(85, 54, 41);
const scoreKoalas = calcAvg(23, 34, 27);

const checkWinner = (scoreDolphins, scoreKoalas) =>
  scoreDolphins > scoreKoalas * 2
    ? console.log(`Dolphins win (${scoreDolphins} vs. ${scoreKoalas})`)
    : scoreDolphins * 2 < scoreKoalas
    ? console.log(`Koalas win (${scoreKoalas} vs. ${scoreDolphins})`)
    : console.log(`No winner!`);

checkWinner(scoreDolphins, scoreKoalas);*/

// Coding Challenge #2

/*const calcTip = (tip) => {
  return tip >= 50 && tip <= 300 ? tip * 0.15 : tip * 0.2;
};

const bills = [125, 555, 44];
const tips = [];
const total = [];

tips.push(calcTip(bills[0]));
tips.push(calcTip(bills[1]));
tips.push(calcTip(bills[2]));

total.push(bills[0] + tips[0]);
total.push(bills[1] + tips[1]);
total.push(bills[2] + tips[2]);

console.log(tips, total);*/

// Coding Challenge #3

/*const mark = {
  fullName: "Mark Miller",
  mass: 78,
  height: 1.69,
  calcBMI() {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

const john = {
  fullName: "John Smith",
  mass: 92,
  height: 1.95,
  calcBMI() {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

mark.calcBMI();
john.calcBMI();

console.log(
  `${john.bmi > mark.bmi ? "John" : "Mark"}'s BMI (${
    john.bmi > mark.bmi ? john.bmi : mark.bmi
  }) is higher than ${john.bmi > mark.bmi ? "Mark" : "John"}'s (${
    john.bmi > mark.bmi ? mark.bmi : john.bmi
  })`
);*/

// Coding Challenge #4

/*const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

const tips = [];
const totals = [];

const calcTip = tip => {
  return tip >= 50 && tip <= 300 ? tip * 0.15 : tip * 0.2;
};

for (let i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]));
  totals.push(calcTip(bills[i]) + bills[i]);
}

console.log(bills, tips, totals);

const calcAverage = arr => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum / arr.length;
};

console.log(`bills-avg: ${calcAverage(bills)}`);
console.log(`tips-avg: ${calcAverage(tips)}`);
console.log(`totals-avg: ${calcAverage(totals)}`);*/
