'use strict';

// // Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

console.log(flights.split('+'));

// // Data needed for first part of the section

// const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// const openingHours = {
//   [weekdays[3]]: {
//     open: 12,
//     close: 22,
//   },
//   [weekdays[4]]: {
//     open: 11,
//     close: 23,
//   },
//   [weekdays[5]]: {
//     open: 0, // Open 24 hours
//     close: 24,
//   },
// };

// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],

//   openingHours,
// };

// const objectKeys = Object.keys(openingHours);
// const objectValues = Object.values(openingHours);
// const objectEntries = Object.entries(openingHours);
// console.log(objectKeys);
// console.log(objectValues);
// console.log(objectEntries);

// for (const [objectKeys, { open, close }] of objectEntries) {
//   console.log(`On ${objectKeys} we open at ${open} and close at ${close}`);
// }

// console.log(restaurant?.openingHours?.fri?.open);

// for (const item of weekdays) {
//   const open = restaurant.openingHours[item]?.open ?? 'closed';
//   console.log(`${item} open from ${open}`);
// }

// console.log(restaurant.tellPrice?.() || `No method found`);

// const users = ['me'];
// console.log(users[1]?.length || 'No element found at position 1');

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// for (const item of menu) {
//   console.log(item);
// }

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// for (const [pos, el] of menu.entries()) {
//   console.log(`${pos + 1} : ${el}`);
// }

//Coding challenge #1

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

//1
// const [players1, players2] = [game.players[0], game.players[1]];

//2
// const [gk, ...fieldPlayers] = players1;

//3
// const [...allPlayers] = [...players1, ...players2];

//4
// const [...players1Final] = [...team1Players, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

//5
// const { team1, x: draw, team2 } = game.odds;
// console.log(team1, draw, team2);

//6
// const printGoals = (...playerNames) => {
//   console.log(
//     `Players scored: ${playerNames}\nNumber of goals: ${playerNames.length}`
//   );
// };
// printGoals(...game.scored);

//7
// const moreLikelyToWin = team1 || team2;
// console.log(`More likely to win ${moreLikelyToWin}`);

//refacut
//1
// const [players1, players2] = game.players;

//3
// const allPlayers = [...players1, ...players2];

//4
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

//5
// const {
//   odds: { team1, x: draw, team2 }, //in modul asta de destructuring 'odds' ce va fi? Nu inteleg
// } = game;
// console.log(team1, draw, team2);

//7;
// team1 < team2 && console.log(`Team 1 is more likely to win`);
// team2 < team1 && console.log(`Team 2 is more likely to win`);

//Coding Challenge #2

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };
// //1
// for (const [goal, scorer] of game.scored.entries()) {
//   console.log(`Goal ${goal + 1}: ${scorer}`);
// }

// //2
// let oddAdd = 0;
// for (const odd of Object.values(game.odds)) {
//   oddAdd += odd;
// }
// const oddAvg = oddAdd / 3;
// console.log(oddAvg);

// //3
// const odds = Object.entries(game.odds);
// const [team1, draw, team2] = Object.values(game.odds);
// console.log(team1, draw, team2);
// console.log(
//   `Odd of victory ${game.team1}: ${team1}\nOdd of draw : ${draw}\nOdd of victory ${game.team2}: ${team2}`
// );

//4
// const scorers = {
//   [game.scored[1]]: 1,
//   [game.scored[3]]: 1,
//   [game.scored[2]]: 2,
// };
// console.log(scorers);

//redone

//2
// const odds = Object.values(game.odds);
// let oddAdd = 0;
// for (const odd of odds) {
//   oddAdd += odd;
// }
// const oddAvg = oddAdd / odds.length;
// console.log(oddAvg);

//3
// for (const [team, odd] of Object.entries(game.odds)) {
//   const result = team === 'x' ? 'draw' : `victory ${game[team]}`;
//   console.log(`Odd of ${result} : ${odd}`);
// }

//4
// const scorers = {};

// for (const playerName of game.scored) {
//   console.log(playerName);
//   scorers[playerName] ? scorers[playerName]++ : (scorers[playerName] = 1); // >>>>>>> What is happening here? <<<<<<<<
// }

// console.log(scorers);

//--------------------MAPS-----------------------

//Coding challenge #3

// const gameEvents = new Map([
//   [17, '⚽ GOAL'],
//   [36, '� Substitution'],
//   [47, '⚽ GOAL'],
//   [61, '� Substitution'],
//   [64, '� Yellow card'],
//   [69, '� Red card'],
//   [70, '� Substitution'],
//   [72, '� Substitution'],
//   [76, '⚽ GOAL'],
//   [80, '⚽ GOAL'],
//   [92, '� Yellow card'],
// ]);

// //1
// const events = new Set([...gameEvents.values()]);
// console.log(events);

// //2
// gameEvents.delete(64);

// //3
// console.log(`An event happened every ${90 / [...gameEvents].length} minutes`);

// //4
// for (const [minute, event] of gameEvents) {
//   const half = minute <= 45 ? 'FIRST HALF' : 'SECOND HALF';
//   console.log(`[${half}]${minute}: ${event}`);
// }

//redone

//1
//const events = [...new Set(gameEvents.values())];

//3
// console.log(`An event happened every ${90 / gameEvents.size} minutes`);

//Coding challenge #4

// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));

// const bigArray = [];

//Coding Challenge #4

//My solution
const camelCaseConvert = words => {
  words.trim().toLowerCase();
  const wordsArray = words.split('_');
  let camelCase = [];
  camelCase.push(wordsArray[0]);
  camelCase.push(wordsArray[1][0].toUpperCase() + wordsArray[1].slice(1));
  const joined = camelCase.join('');
  console.log(joined);
};

camelCaseConvert('');

const textarea = document.querySelector('textarea');
const button = document.querySelector('button');

//Guy's solution
document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});
