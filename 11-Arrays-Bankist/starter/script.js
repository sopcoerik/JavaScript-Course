'strict mode';

//Challenge #1

// const checkDogs = (dogsJulia, dogsKate) => {
//  //1
//   dogsJuliaCorrect = dogsJulia.slice();
//   dogsJuliaCorrect.splice(0, 1);
//   dogsJuliaCorrect.splice(-2);
//      console.log(dogsJuliaCorrect)
//  //2
//   allDogs = [...dogsJuliaCorrect, ...dogsKate];
//   console.log(allDogs);
//  //3
//   allDogs.forEach((dogAge, index) =>
//     dogAge < 3
//       ? console.log(`Dog number ${index + 1} is still a puppy 🐶`)
//       : console.log(
//           `Dog number ${index + 1} is an adult, and is ${dogAge} years old`
//         )
//   );
// };

// // Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// // Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

//  //4
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// ---------------------------------------------------------------

//Challenge #2

// const calcAverageHumanAge = ages => {
//  //1
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//      console.log(humanAges);
//  //2
//   const humanAgesFiltered = humanAges.filter(age => age >= 18);
//      console.log(humanAgesFiltered);
//  //3
//   const averageHumanAge =
//     humanAgesFiltered.reduce((accumulator, age) => accumulator + age, 0) /
//     humanAgesFiltered.length;
//   return averageHumanAge;
// };
//  //4
//console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
//console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

//Challenge #3

// const calcAverageHumanAge = ages => {
//   const humanAges = ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18);

//   const avgHumanAges =
//     humanAges.reduce((accumulator, age) => accumulator + age, 0) /
//     humanAges.length;

//   return avgHumanAges;
// };

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

//Challenge #4

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

// //1
// dogs.forEach(dog => (dog.recommendedFood = dog.weight ** 0.75 * 28));
// console.log(dogs);

// //2
// sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(sarahsDog);
// console.log(
//   `Sarah\'s dog eats too ${
//     sarahsDog.curFood > sarahsDog.recommendedFood ? 'much' : 'little'
//   }`
// );

// //3
// const ownersEatTooMuch = dogs
//   .map(dog => (dog.curFood > dog.recommendedFood ? dog.owners : false))
//   .filter(dog => dog !== false)
//   .flat();
// const ownersEatTooLittle = dogs
//   .map(dog => (dog.curFood < dog.recommendedFood ? dog.owners : false))
//   .filter(dog => dog !== false)
//   .flat();

// //4
// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

// //5
// console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// //6
// console.log(
//   dogs.some(
//     dog =>
//       dog.curFood > dog.recommendedFood * 0.9 &&
//       dog.curFood < dog.recommendedFood * 1.1
//   )
// );

// //7
// const ownersEatOkay = dogs.filter(
//   dog =>
//     dog.curFood > dog.recommendedFood * 0.9 &&
//     dog.curFood < dog.recommendedFood * 1.1
// );
// console.log(ownersEatOkay);

// //8
// const shallowCopyDogs = dogs.map(dog => dog);
// shallowCopyDogs.sort((a, b) => a.recommendedFood - b.recommendedFood);
// console.log(shallowCopyDogs);
