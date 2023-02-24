'use strict';

// // Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// // Data needed for first part of the section
// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],

//   openingHours: {
//     thu: {
//       open: 12,
//       close: 22,
//     },
//     fri: {
//       open: 11,
//       close: 23,
//     },
//     sat: {
//       open: 0, // Open 24 hours
//       close: 24,
//     },
//   },
// };

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
// const [...players1Final] = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

//5
// const {
//   odds: { team1, x: draw, team2 }, //in modul asta de destructuring 'odds' ce va fi? Nu inteleg
// } = game;
// console.log(team1, draw, team2);

//7;
// team1 < team2 && console.log(`Team 1 is more likely to win`);
// team2 < team1 && console.log(`Team 2 is more likely to win`);
