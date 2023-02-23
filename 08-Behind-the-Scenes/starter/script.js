'use strict';

//Video #99
// let age = 30
// let oldAge = age;
// age = 31;
// console.log(age)
// console.log(oldAge)

// const me = {
// 	name: 'Erik',
//   age: 30,
// }

// const friend = me;
// friend.age = 34;

// console.log(friend.age)
// console.log(me.age )

//Video #100
//primitive types

// let lastName = 'Williams'
// let oldLastName = lastName
// lastName = 'Davis'
// console.log(lastName, oldLastName)

//reference types

// const jessica = {
// 	firstName: 'Jessica',
//   lastName: 'Williams',
//   age: 27
// }

// const marriedJessica = jessica
// marriedJessica.lastName = 'Davis'

// console.log(jessica)
// console.log(marriedJessica)

//copying objects

// const jessica2 = {
// 	firstName: 'Jessica',
//   lastName: 'Williams',
//   age: 27
// }

// const jessica2Copy = Object.assign({}, jessica2);
// jessica2Copy.lastName = 'Davis';
// console.log(jessica2)
// console.log(jessica2Copy)

//Video #104

// const functionExpression = ({starter, main, time, address}) => {
// 	console.log(starter, main, time, address);
// }

// const object = {
// 	time: '22:30',
//  	address: 'Whatever, 22',
//   main: 'risotto',
//   starter: 'garlic bread',
// }

// functionExpression(object);

//Video #105

// let array = [1, 2, 3, 4, 5, 6, 7];
// console.log(...array);

// let newArray = [...array, 10, 12, 13, 14, 15, 16, 17];
// console.log(...newArray);

// let bigArray = [...array, ...newArray];
// console.log(...bigArray);

// let str = 'Erik';
// console.log(...str);

// const argumentSpread = (arg1, arg2, arg3) => {
// 	return `Your arguments are: ${arg1}, ${arg2}, ${arg3}`;
// }
// const yourArguments = [prompt('Argument 1:'), prompt('Argument 2:'), prompt('Argument 3:')];
// console.log(argumentSpread(...yourArguments));
