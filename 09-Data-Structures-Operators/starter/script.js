'strict mode';

//Coding Challenge #4

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const btn = document.querySelector('button');
const t_area = document.querySelector('textarea');

btn.addEventListener('click', () => {
  const snake = t_area.value.toLowerCase().split('\n');
  const sorted = snake.map(element => element.trim().split('_'));
  const camelCase = [];
  sorted.map(el =>
    camelCase.push(el[0].concat(el[1][0].toUpperCase() + el[1].slice(1)))
  );
  return console.log(camelCase);
});
