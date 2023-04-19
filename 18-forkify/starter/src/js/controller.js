import 'core-js/stable';
import 'regenerator-runtime';
import fracty from 'fracty';

import icons from 'url:../img/icons.svg';

import Model from './model';
import View from './recipeView';
import SearchView from './searchView';
import BookmarkView from './bookmarkView';

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

let bookmarkedRecipes = [];
var recipe;
window.addEventListener('load', async function () {
  const recipe = await Model.getRecipeData();
  // View.renderRecipeView(recipe);
  renderRecipe(recipe);
});
window.addEventListener('hashchange', async function () {
  const recipe = await Model.getRecipeData();

  // View.renderRecipeView(recipe);
  renderRecipe(recipe);
});
const renderRecipe = async function (recipe, state) {
  if (!recipe) recipe = await Model.getRecipeData();

  recipe.bookmarked = recipe.bookmarked ? recipe.bookmarked : false;
  View.renderRecipeView(recipe);

  if (
    recipe.bookmarked ||
    bookmarkedRecipes.find(recipeCurr => recipeCurr.id === recipe.id)
  ) {
    document
      .querySelector('.btn--round')
      .querySelector('use')
      .setAttribute('href', `${icons}#icon-bookmark-fill`);
  }

  document.querySelector('.btn--round').addEventListener('click', function (e) {
    e.preventDefault();
    bookmarkedRecipes =
      JSON.parse(localStorage.getItem('bookmarkedRecipes')) || [];
    console.log(bookmarkedRecipes);
    if (recipe.bookmarked) {
      recipe.bookmarked = false;
      // console.log(e.target);
      e.target
        .closest('.btn--round')
        .querySelector('use')
        .setAttribute('href', `${icons}#icon-bookmark`);
      const indexOfCurrentRecipe = bookmarkedRecipes.findIndex(
        currRecipe => currRecipe.id === recipe.id
      );
      BookmarkView.delRecipeFromBookmarks(recipe);
      bookmarkedRecipes.splice(indexOfCurrentRecipe, 1);
      localStorage.setItem(
        'bookmarkedRecipes',
        JSON.stringify(bookmarkedRecipes)
      );
      return;
    } else {
      e.target
        .closest('.btn--round')
        .querySelector('use')
        .setAttribute('href', `${icons}#icon-bookmark-fill`);

      bookmarkedRecipes.push(recipe);
      localStorage.setItem(
        'bookmarkedRecipes',
        JSON.stringify(bookmarkedRecipes)
      );
      BookmarkView.addRecipeToBookmarks(recipe);
      delMessage();
    }
  });

  document
    .querySelector('.btn--increase-servings')
    .addEventListener('click', View.increaseServings);
  document
    .querySelector('.btn--decrease-servings')
    .addEventListener('click', View.decreaseServings);
};

const delMessage = () => {
  document.querySelector('.message').style.display = 'none';
};

recipeSearchResults.addEventListener('click', function (e) {
  if (e.target.closest('.preview')) {
    e.target
      .closest('.search-results')
      .querySelectorAll('.preview__link')
      .forEach(link => link.classList.remove('preview__link--active'));
    const link = e.target.closest('.preview').querySelector('.preview__link');
    window.location.hash = link.getAttribute('href');
    link.classList.add('preview__link--active');
    renderRecipe();
  }
});

document.querySelector('.bookmarks').addEventListener('click', function (e) {
  if (e.target.closest('.preview')) {
    e.target
      .closest('.bookmarks')
      .querySelectorAll('.preview__link')
      .forEach(link => link.classList.remove('preview__link--active'));
    const link = e.target.closest('.preview').querySelector('.preview__link');
    window.location.hash = link.getAttribute('href');
    link.classList.add('preview__link--active');
    renderRecipe(undefined, true);
  }
});

document
  .querySelector('.search')
  .addEventListener('submit', async function (e) {
    e.preventDefault();

    document.querySelector('.results').textContent = '';

    const searchedArr = await Model.getRecipesFromSearch();

    searchedArr.forEach(rec => SearchView.renderSearchView(rec));
  });

const getLocalStorage = () => {
  bookmarkedRecipes =
    JSON.parse(localStorage.getItem('bookmarkedRecipes')) || [];

  if (!bookmarkedRecipes) return;
  bookmarkedRecipes.forEach(recipe => {
    recipe.bookmarked = true;
    BookmarkView.addRecipeToBookmarks(recipe);
    delMessage();
  });
  console.log(bookmarkedRecipes);
};

getLocalStorage();
