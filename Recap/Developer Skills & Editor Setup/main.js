'use strict';

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// what is temperature amplitude?
// diff between highest and lowest temps in the array

// how to compute the max and min temps?
// what's a sensor error? what to do if it occurs?

//sub-problems

// how to ignore errors?
// find max value in temp array
// find min value in temp array
// subtract min from  max (amplitude) and return it

// const calcTempAmplitude = temps => {
//   let max = temps[0];
//   let min = temps[0];

//   for (let i = 0; i < temps.length; i++) {
//     if (typeof temps[i] !== 'number') continue;
//     if (temps[i] > max) max = temps[i];
//     if (temps[i] < min) min = temps[i];
//   }

//   return max - min;
// };

// console.log(calcTempAmplitude(temperatures));

//Coding Challenge #1

// const maxTemperatures = [17, 21, 23];

// const printForecast = arr => {
//   for (let i = 0; i < arr.length; i++) {
//     console.log(`... ${arr[i]}C in ${i + 1} days ...`);
//   }
// };

// printForecast(maxTemperatures);

// // Instructor's version

// const printForecast2 = arr => {
//   let str = '';
//   for (let i = 0; i < arr.length; i++) {
//     str = str + `... ${arr[i]}C days `;
//   }
//   str += '...';
//   return str;
// };

// console.log(printForecast2(maxTemperatures));
