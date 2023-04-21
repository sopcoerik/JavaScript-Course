import 'core-js/stable';
import 'regenerator-runtime';
import fracty from 'fracty';

import icons from 'url:../img/icons.svg';
import { updateLocalStorage } from './helpers';
import {
  getRecipesFromSearch,
  state,
  getRecipeData,
  addRecipeToBookmarks,
  deleteRecipeFromBookmarks,
} from './model';
import RecipeView from './views/recipeView';
import SearchView from './views/searchView';
import BookmarkView from './views/bookmarkView';
import PaginationView from './views/paginationView';

const recipeContainer = document.querySelector('.recipe');
const recipeSearchResults = document.querySelector('.results');

// https://forkify-api.herokuapp.com/v2
// 5ed6604591c37cdc054bcd09

///////////////////////////////////////

let bookmarkedRecipes = [];
let recipeCurrent;

PaginationView.addPrevButton();
PaginationView.addNextButton();

// -------------------------------------------------------------------------------------------------------

// ---------------------Getting Recipes From URL
const getRecipeIdFromUrl = () => {
  let recipeId;
  if (window.location.hash) recipeId = window.location.hash;
  else return;
  return recipeId;
};

// ---------------------Handling Search View
const handleSearchView = async () => {
  const query = SearchView.getSearchQuery();

  await getRecipesFromSearch(query);

  SearchView.render(state.search.results);
};

SearchView.handleSubmitEvent(handleSearchView);

// --------------------Handling Recipe View
const handleRecipeView = async () => {
  if (window.location.hash) {
    const recipeId = getRecipeIdFromUrl();
    await getRecipeData(recipeId);

    RecipeView.render(state.recipe);

    callBookmarkEventHandler();
  }
};

RecipeView.handleRecipeRenderEvents(handleRecipeView);

// -------------------Handling Bookmark View
const handleAddBookmarkView = () => {
  BookmarkView.bookmarkViewMessageToggler();

  BookmarkView.fillBookmarkIcon(icons);

  BookmarkView.render(state.recipe);

  addRecipeToBookmarks();
};

const handleDeleteBookmarkView = () => {
  BookmarkView.bookmarkViewMessageToggler();

  BookmarkView.unfillBookmarkIcon(icons);

  deleteRecipeFromBookmarks();
};

const callBookmarkEventHandler = () => {
  BookmarkView.handleBookmarkEvent(
    handleAddBookmarkView,
    handleDeleteBookmarkView
  );
};

// ------------------------------------------------------------------------------------------------------

const initLoadAndRenderRecipe = async () => {
  // RecipeView.showSpinner(true);
  const recipeId = getRecipeIdFromUrl();
  const recipe = await getRecipeData(recipeId);
  recipeCurrent = recipe;
};

const checkIfRecipeIsBookmarked = recipe => {
  const BookmarkedLoadedRecipe = bookmarkedRecipes.find(
    currentRecipe => recipe.id === currentRecipe.id
  );
  if (BookmarkedLoadedRecipe) {
    BookmarkedLoadedRecipe.bookmarked = true;
    // RecipeView.renderRecipeView(BookmarkedLoadedRecipe);
    recipeCurrent = BookmarkedLoadedRecipe;
  } else {
    // recipeCurrent.bookmarked = false;
    RecipeView.renderRecipeView(recipe);
  }

  if (recipe.bookmarked || BookmarkedLoadedRecipe) {
    BookmarkView.fillBookmarkIcon(icons);
  }
};

const listenForBookmarkButtonClick = () => {
  BookmarkView.bookmarkListener(icons, recipeCurrent, bookmarkedRecipes);
};

const loadAndRenderRecipe = function () {
  initLoadAndRenderRecipe();
  checkIfRecipeIsBookmarked(recipeCurrent);
  listenForBookmarkButtonClick();
};

// window.addEventListener('load', loadAndRenderRecipe);
// window.addEventListener('hashchange', loadAndRenderRecipe);

recipeSearchResults.addEventListener('click', function (e) {
  if (e.target.closest('.preview')) {
    e.target
      .closest('.search-results')
      .querySelectorAll('.preview__link')
      .forEach(link => link.classList.remove('preview__link--active'));
    const link = e.target.closest('.preview').querySelector('.preview__link');
    window.location.hash = link.getAttribute('href');
    link.classList.add('preview__link--active');
    loadAndRenderRecipe();
  }
});

//todo: extract into function with meaningful name
document.querySelector('.bookmarks').addEventListener('click', function (e) {
  if (e.target.closest('.preview')) {
    e.target
      .closest('.bookmarks')
      .querySelectorAll('.preview__link')
      .forEach(link => link.classList.remove('preview__link--active'));
    const link = e.target.closest('.preview').querySelector('.preview__link');
    window.location.hash = link.getAttribute('href');
    link.classList.add('preview__link--active');
    loadAndRenderRecipe();
  }
});

// document
//   .querySelector('.search')
//   .addEventListener('submit', async function (e) {
//     e.preventDefault();
//     if (!document.querySelector('.search__field').value) return;

//     recipeSearchResults.textContent = '';

//     recipeSearchResults.insertAdjacentHTML(
//       'afterbegin',
//       `
//       <div class="spinner">
//         <svg>
//           <use href="${icons}#icon-loader"></use>
//         </svg>
//       </div>`
//     );

//     const searchedArr = await Model.getRecipesFromSearch();
//     console.log(searchedArr);
//     searchedArr.forEach(rec => SearchView.renderSearchView(rec));
//   });

const btnPreviousPage = document.querySelector('.pagination__btn--prev');
const btnNextPage = document.querySelector('.pagination__btn--next');

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
