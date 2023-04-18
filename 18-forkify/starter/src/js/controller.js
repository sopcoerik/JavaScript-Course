import 'core-js/stable';
import 'regenerator-runtime';
import fracty from 'fracty';

import Model from './model';
import View from './view';
import SearchView from './searchView';

const recipeContainer = document.querySelector('.recipe');
const recipeSearchResults = document.querySelector('.results');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
// 5ed6604591c37cdc054bcd09

///////////////////////////////////////

const renderRecipe = async function () {
  const recipe = await Model.getRecipeData();
  View.renderRecipeView(recipe);
};

document
  .querySelector('.search')
  .addEventListener('submit', async function (e) {
    e.preventDefault();
    const recipesArr = await Model.getRecipesFromSearch();
    console.log(recipesArr);
    recipesArr.forEach(recipe => {
      return SearchView.renderSearchView(recipe);
    });
  });

recipeSearchResults.addEventListener('click', function (e) {
  if (e.target.closest('.preview')) {
    window.location.hash = e.target
      .closest('.preview')
      .querySelector('.preview__link')
      .getAttribute('href');
    renderRecipe();
  }
});
