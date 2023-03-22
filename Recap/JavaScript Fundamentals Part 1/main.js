"strict mode";

// Coding Challenge #1

const markMass = 95;
const markHeight = 1.88;

const johnMass = 85;
const johnHeight = 1.76;

const calculateMarkBMI = markMass / markHeight ** 2;
const calculateJohnBMI = johnMass / johnHeight ** 2;

const markBMI = calculateMarkBMI;
const johnBMI = calculateJohnBMI;

const hasMarkGotHigherBMI = markBMI > johnBMI;

console.log(`Mark's BMI: ${markBMI}
John's BMI: ${johnBMI}
Is Mark's BMI higher? ${hasMarkGotHigherBMI ? "Yes" : "No"}`);
