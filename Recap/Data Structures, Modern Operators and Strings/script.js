'use strict';

// Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const openingHours = {
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
};
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //ES6 Enhanced Object literals
  openingHours,

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
};

// property names

const properties = Object.keys(openingHours);
let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

//property values
const values = Object.values(openingHours);
console.log(values);

//Entire object
const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

// Optional chaining
console.log(restaurant.openingHours.mon?.open);

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
const { name, openingHours: hours1, categories } = restaurant;
console.log(name, hours1, categories);

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

// for of loop
const menu3 = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const food of menu3) console.log(food);
for (const [index, food] of menu3.entries())
  console.log(`${index + 1}: ${food}`);

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? `closed`;
  console.log(`On ${day},we open at ${open}`);
}

// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Arrays
const users = [
  {
    name: 'John',
    email: 'hello@john.org',
  },
];

const users2 = [];

console.log(users[0]?.name ?? 'User array empty');

if (users2.length > 0) console.log(users2[0].name);
else console.log('user array empty');

// Coding Challenge #2

//1
for (const [playerNumber, player] of game.scored.entries()) {
  console.log(`Goal ${playerNumber + 1}: ${player}`);
}

//2
const objVals = Object.values(game.odds);
let sum = 0;
for (const odd of objVals) {
  sum += odd;
}
console.log(sum / objVals.length);

//3
for (const [key, value] of Object.entries(game.odds)) {
  console.log(
    `Odd of ${
      key === 'team1'
        ? game.team1
        : key === 'x'
        ? 'Draw'
        : key === 'team2'
        ? game.team2
        : 0
    }: ${value}`
  );
}

//4
const scorers = {};

game.scored.forEach(scorer =>
  scorers[scorer] ? scorers[scorer]++ : (scorers[scorer] = 1)
);

console.log(scorers);

// Sets

const ordersSet = new Set(['Pasta', 'Pizza', 'Risotto', 'Pizza', 'Pasta']);
console.log(ordersSet);
console.log(new Set('Jonass'));
console.log(ordersSet.size);
console.log(ordersSet.has('Bread'));
console.log(ordersSet.has('Pizza'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
console.log(ordersSet);

for (const order of ordersSet) console.log(order);

//Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);

// Maps

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
rest.set(2, 'Lisbon, Portugal');

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are close');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);
console.log(rest.size);
const arr4 = [1, 2];
rest.set(arr4, 'Test');
console.log(rest.get(arr4));

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try Again!'],
]);

console.log(question);

//Convert object to Map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

//Quizz app
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt('Your answer'));
// console.log(answer);
// console.log(question.get(question.get('correct') === answer));

//Convert map to array
console.log([...question]);

// Coding Challenge #3
const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '� Substitution'],
  [47, '⚽ GOAL'],
  [61, '� Substitution'],
  [64, '� Yellow card'],
  [69, '� Red card'],
  [70, '� Substitution'],
  [72, '� Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '� Yellow card'],
]);

console.log(gameEvents.values());
const set = new Set([...gameEvents.values()]);
const events = [...set];
console.log(events);
gameEvents.delete(64);
console.log(gameEvents);

console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

for (const [key, value] of gameEvents.entries()) {
  console.log(`${key <= 45 ? '[FIRST HALF]' : '[SECOND HALF]'}: ${value}`);
}

// Strings
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(airline.length);
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('portugal'));

console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));
console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = seat => {
  if (seat.slice(-1) === 'E' || seat.slice(-1) === 'B')
    console.log('You got the middle seat');
  else console.log('You got lucky');
};

checkMiddleSeat('11C');

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

const passenger = 'jOnAS';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

const toUpperName = personName => {
  const nameLower = personName.toLowerCase();
  const nameCorrect = nameLower[0].toUpperCase() + nameLower.slice(1);

  return nameCorrect;
};

// comparing emails

const email = 'hello@jonas.io';
const loginEmail = ' Hello@Jonas.io \n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing

const priceGB = '288,97💷';
const priceUS = priceGB.replace('💷', '💵').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
// console.log(announcement.replaceAll('door', 'gate'));

console.log(announcement.replace(/door/g, 'gate'));

// Booleans

const plane2 = 'A320 Neo';
console.log(plane2.includes('A320'));
console.log(plane2.includes('Boeing'));
console.log(plane2.startsWith('A'));

if (plane2.startsWith('A') && plane2.endsWith('Neo')) {
  console.log('Part of the NEW product family');
}

// Practice exercise
const checkBaggage = item => {
  const baggage = item.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun'))
    console.log('You are NOT allowed on board');
  else console.log('Welcome aboard!');
};
checkBaggage('I have a laptop, some food and a pocket knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');
console.log(firstName, lastName);

const fullName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(fullName);
const capitalizeName = persName => {
  const namesUpper = [];
  const names = persName.split(' ');
  for (const word of names) {
    namesUpper.push(word[0].toUpperCase() + word.slice(1));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

//padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+'));
console.log('erik'.padEnd(25, '+'));

const maskCreditCard = number => {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(235402983402934823));
console.log(maskCreditCard('289037420938423904'));

//repeat
const message2 = 'Bad weather... All departures delayed... ';
console.log(message2.repeat(5));

const planesInLine = n => {
  console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
};

planesInLine(5);
planesInLine(21);
planesInLine(15);

// Coding Challenge #4

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const textarea = document.querySelector('textarea');
const button = document.querySelector('button');

let arr5;
const newWordArr = [];
button.addEventListener('click', function () {
  arr5 = textarea.value.split('\n');
  console.log(arr5);
  arr5.forEach(word => {
    let temp = word.toLowerCase().trim().split('_');
    for (let i = 1; i < temp.length; i++) {
      temp[i] = temp[i][0].toUpperCase() + temp[i].slice(1);
    }
    newWordArr.push(temp.join(''));
    console.log(temp);
  });

  for (const [index, key] of newWordArr.entries()) {
    console.log(`${key.padEnd(20)} ${'✅'.repeat(index + 1)}`);
  }
});

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🛑' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${from.slice(0, 3).toUpperCase()} to ${to
    .slice(0, 3)
    .toUpperCase()} (${time.replace(':', 'h')})`.padStart(45);
  console.log(output);
}
