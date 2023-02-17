'use strict';
//FUNCTIONS
// nr.1

// function describeCountry(country, population, capitalCity){
//     return `${country} has ${population} million people and its capital city is ${capitalCity}`;
// }

// const romania = describeCountry('Romania', 7000000, 'Bucharest');
// const hungary = describeCountry('Hungary', 7000000, 'Budapest');
// const russia = describeCountry('Russia', 30000000, 'Moscow');

// console.log(`${romania},
// ${hungary},
// ${russia}`);


// nr.2

// const percentageOfWorld2 = function(population){
//     return (population/7900)*100;
// }

// const ctry1 = percentageOfWorld1(1441);
// const ctry2 = percentageOfWorld1(78);
// const ctry3 = percentageOfWorld1(50);
// const ctry4 = percentageOfWorld1(1441);
// const ctry5 = percentageOfWorld1(78);
// const ctry6 = percentageOfWorld1(50);

// console.log(ctry1,
// ctry2,
// ctry3,
// ctry4,
// ctry5,
// ctry6);


// function percentageOfWorld1(population)
// {
//     return (population/7900)*100;
// }

//nr.3
// const percentageOfWorld3 = population => (population/7900)*100;

// const ctry7 = percentageOfWorld3(1441);
// const ctry8 = percentageOfWorld3(78);
// const ctry9 = percentageOfWorld3(50);

// console.log(`${ctry7}
// ${ctry8}
// ${ctry9}`);

//nr.4

// function describePopulation(country, population){
//     return `${country} has ${population} million people, which is about ${percentageOfWorld1(population)}% of the world`;
// }

// const china = describePopulation('China', 1441);
// const russia = describePopulation('Russia', 130);
// const romania = describePopulation('Romania', 8);

// console.log(`${china},
// ${russia},
// ${romania}`);


//coding challenge nr.1

// const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

// const scoreDolphins = calcAverage(44, 23, 71);
// const scoreKoalas = calcAverage(65, 54, 49);

// console.log(`Score Dolphins ${scoreDolphins} 
// Score Koalas ${scoreKoalas}`);

// function checkWinner(avgDolphins, avgKoalas){
//     if (avgDolphins > 2 * avgKoalas){
//         console.log(`Dolphins win ${avgDolphins} vs. ${avgKoalas}`);
//     }
//     else if (avgKoalas > 2 * avgDolphins){
//         console.log(`Koalas win ${avgKoalas} vs ${avgDolphins}`);
//     }
//     else {
//         console.log(`No winner!`);
//     }
// }

// checkWinner(scoreDolphins, scoreKoalas);



//ARRAYS
//nr.5

// let neighbours = ['Hungary', 'Montenegro', 'Ucraine'];
// neighbours.push('Utopia');
// neighbours.pop('Utopia');
// if (!neighbours.includes('Germany')){
//     console.log(`Probably not a central European country :D`);
// }
// else{
//     console.log(`Definitely a central European country`);
// }

// neighbours[2] = 'Russia';

// console.log(neighbours);



//coding challenge nr.2

// function calcTip(bill){
//     return bill >= 50 || bill <= 300 ? (bill*15)/100 : (bill*20)/100;
// }

// const tip = calcTip(100);

// console.log(tip);

// let bills = [125, 555, 44];
// let tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// let total = [tips[0] + bills[0], tips[1] + bills[1], tips[2] + bills[2]];

// console.log(`${bills}
// ${tips}
// ${total}`);

// arrayName.push - adds to the end of the array an element
// arrayName.unshift - adds an element to the start of the array
// arrayName.pop - deletes an element from the end of the array
// arrayName.shift - deletes an element from the start of the array




//OBJECTS
// as for the arrays we used brackets, we USE CURLY BRACES FOR OBJECTS      \\\\\\const object = {}/////
//objects have properties or key:value pairs

// const jonas = {
//     firstName: 'Jonas',
//     lastName: 'Schmedtmann',
//     age: 2037 - 1991,
//     job: 'teacher',
//     friends: ['Michael', 'Peter', 'Steven']
// };                                                       //<--- object literal syntax

// in objects the order of values does not matter 

// use arrays for more ordered data
// use objects for more unstructured data

//to use '.' in retrieving data from an object we have to specify the exact name of the data like ex: jonas.firstName
// if we use '[]' like ex: jonas['firstName'], in the '[]' we can use expressions like concatenation of strings to make retrieval easier like ex: 
// nameKey = 'Name';
// jonas['first' + nameKey]; <-- retrieves firstName
// jonas['last' + nameKey]; <-- retrieves lastName

//console.log(`${jonas.firstName} has ${jonas.friends.length}, and his best friend is ${jonas.friends[jonas.friends.length - 3]}`); // <-------- ask SOrinel about the nr 3 and why is it working the way it does

// const jonas = {
//     firstName: 'Jonas',
//     lastName: 'Schmedtman',
//     birthYear: 1991,
//     job: 'teacher',
//     friends: ['Michael', 'Peter', 'Steven'],
//     hasDriversLicense: true,
    
//     // calcAge: function (birthYear)                   //any function that is attached to an object is called a method
//     // {
//     //     return 2037 - birthYear;
//     // }

//     calcAge: function (){
//         return 2037 - this.birthYear;
//     }

//     getSummary: function(){
//         return `${this.firstName} is a ${this.calcAge()}-year old ${jonas.job}, and he has ${this.hasDriversLicense == true ? 'a' : 'no'} driver's license`
//     }

// };

// console.log(jonas.age);

//assignment on OBJECTS
// const myCountry = {
//     country: 'Romania',
//     capital: 'Bucharest',
//     language: 'romanian',
//     population: 19,
//     neighbours: 6,

//     describe: function(){
//         console.log(`${this.country} has ${this['population']} million ${this.language}-speaking people, ${this.neighbours} neighbouring countries
// and a capital called ${this.capital}.`);
//     },

//     checkIsland: function(){
//         this.neighbours === 0 ? this.isIsland = true : this.isIsland = false;
//         return this.isIsland;
//     }

// }

// myCountry.describe();
// console.log(myCountry.checkIsland());






// const Mark = {
//     fullName: 'Mark Miller',
//     weight: 78,
//     height: 1.69,
    
//     calcBMI: function() {
//         this.bmi = this.weight / this.height**2;
//         return this.bmi;
//     }

// }


// const John = {
//     fullName: 'John Smith',
//     weight: 92,
//     height: 1.95,

//     calcBMI: function() {
//         this.bmi = this.weight / this.height**2;
//         return this.bmi;
//     }

// }

// Mark.calcBMI();
// John.calcBMI();
// console.log(`${Mark.bmi}  |  ${John.bmi}`);

// if (Mark.bmi > John.bmi){
//     console.log(`${Mark.fullName}'s BMI(${Mark.bmi}) is higher than ${John.fullName}'s (${John.bmi}).`);
// }
// else{
//     console.log(`${John.fullName}'s BMI(${John.bmi}) is higher than ${Mark.fullName}'s (${Mark.bmi}).`);
// }


// const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
// const tips = [];
// const totals = [];

// const calcTip = function(bill){
//     return bill >= 50 && bill <= 300 ? (bill*15)/100 : (bill*20)/100;
// }

// for (let i = 0; i < bills.length; i++){
//     const tip = calcTip(bills[i]);
//     tips.push(tip);
//     totals.push(tip + bills[i]);
// }

// console.log(bills, tips, totals);

// const calcAverage = function(arr){
//     let sum = 0;
//     for(let i = 0; i < arr.length; i++){
//         sum += arr[i];
//     }
//     return sum / arr.length;
// }

// console.log(calcAverage([2, 3, 7]));
// console.log(calcAverage(totals));
// console.log(calcAverage(tips));