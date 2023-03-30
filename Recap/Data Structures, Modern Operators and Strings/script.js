'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

// Destructuring arrays

const arr = [2, 3, 4];
const [x, y, z] = arr;
console.log(x, y, z);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// switching variables
[main, secondary] = [secondary, main];
console.log(main, secondary);

const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

// Destructuring objects
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

//Default values

const { menu = [], starterMenu: starters = [] } = restaurant;

console.log(menu, starters);

//Mutating variables
let a = 111;
let b = 999;

const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

// Nested objects

const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

// Spread operator
const arr2 = [7, 8, 9];
const newArr = [1, 2, ...arr2];
console.log(newArr);
console.log(...newArr);
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// copy array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// join two arrays
const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu2);

//strings
const str = 'Erik';
const letters = [...str];
console.log(letters);
console.log(...str);

// const ingredients = [
//   prompt(`Let's make pasta! Ingredient 1?`),
//   prompt(`Ingredient 2?`),
//   prompt(`Ingredient 3?`),
// ];
// console.log(ingredients);

// restaurant.orderPasta(...ingredients);

//Objects

const newRestaurant = { foundedIn: 2000, ...restaurant, founder: 'Erik' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'New Name';
console.log(restaurantCopy.name);
console.log(restaurant.name);

// spread because of on right side of =
const arr3 = [1, 2, ...[3, 4]];
console.log(arr3);

// rest because of on left side of =
const [h, m, ...others] = [1, 2, 3, 4, 5];
console.log(h, m, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// objects

const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

///2 functions
const add = function (...params) {
  let acc = 0;
  params.forEach(param => (acc += param));
  console.log(acc);
};

add(2, 3, 4);
add(5, 6, 7, 8);
add(1, 2, 4, 7, 0, 9);

const g = [23, 4, 5, 6, 7, 10];
add(...g);

restaurant.orderPizza('salami', 'olives', 'cheese', 'mozzarella', 'ham');

// Coding Challenge #1
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//1
const [players1, players2] = game.players;
console.log(players1, players2);
//2
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

//3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

//5
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

//6
const printGoals = (...playerNames) => {
  playerNames.forEach(player => console.log(player));
  console.log(`Total number of goals scored: ${playerNames.length}`);
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

//7
(team1 < team2 && console.log(`Team 1 is more likely to win!`)) ||
  (team2 < team1 && console.log(`Team 2 is more likely to win!`)) ||
  (team1 === team2 && console.log(`Both teams' odds to win are equal!`));
