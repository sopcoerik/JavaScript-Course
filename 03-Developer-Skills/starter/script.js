// Remember, we're gonna use strict mode in all scripts now!
"use strict";

// I need an array 'arr'
// then I need a function in which I log the given string
// I can do that by iterating through the array with a for loop
// calling the function and testing if it works

const arr = [12, 5, -5, 0, 4];

const printForecast = function (arr) {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str = str + `${arr[i]}C in ${i + 1} days ... `;
  }
  console.log(" ... " + str);
};

printForecast(arr);
