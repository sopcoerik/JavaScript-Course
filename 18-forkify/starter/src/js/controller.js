import 'core-js/stable';
import 'regenerator-runtime';
import fracty from 'fracty';

import icons from 'url:../img/icons.svg';

import Model from './model';
import View from './recipeView';
import SearchView from './searchView';
import BookmarkView from './bookmarkView';
import PaginationView from './paginationView';

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

PaginationView.addPrevButton();
PaginationView.addNextButton();

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

  const isLoadedRecipeBookmarked = bookmarkedRecipes.find(
    currentRecipe => recipe.id === currentRecipe.id
  );
  if (isLoadedRecipeBookmarked) {
    isLoadedRecipeBookmarked.bookmarked = true;
    View.renderRecipeView(isLoadedRecipeBookmarked);
    recipe = isLoadedRecipeBookmarked;
  } else {
    recipe.bookmarked = false;
    View.renderRecipeView(recipe);
  }

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
    .addEventListener('click', () => View.increaseServings(recipe));
  document
    .querySelector('.btn--decrease-servings')
    .addEventListener('click', () => View.decreaseServings(recipe));
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
    if (!document.querySelector('.search__field').value) return;

    recipeSearchResults.textContent = '';

    recipeSearchResults.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`
    );

    const searchedArr = await Model.getRecipesFromSearch();

    searchedArr.forEach(rec => SearchView.renderSearchView(rec));
  });

const btnPreviousPage = document.querySelector('.pagination__btn--prev');
const btnNextPage = document.querySelector('.pagination__btn--next');
const elementsPerPage = 10;


btnPreviousPage.addEventListener('click', function (e) {
  e.preventDefault();
  let pageNumber = e.target.closest('button').dataset.pageNumber;
  console.log(`page ${pageNumber}`);
  e.target.closest('button').dataset.pageNumber--;
});

btnNextPage.addEventListener('click', function (e) {
  e.preventDefault();
  let pageNumber = e.target.closest('button').dataset.pageNumber;
  console.log(`page ${pageNumber}`);
  e.target.closest('button').dataset.pageNumber++;
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
};

getLocalStorage();
