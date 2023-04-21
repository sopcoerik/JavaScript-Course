import 'core-js/stable';
import 'regenerator-runtime';

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
import ServingsView from './views/servingsView';

// https://forkify-api.herokuapp.com/v2
// 5ed6604591c37cdc054bcd09

///////////////////////////////////////

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
  SearchView.renderSpinner();

  const query = SearchView.getSearchQuery();

  await getRecipesFromSearch(query);

  SearchView.render(state.search.results);
};

SearchView.addSubmitListener(handleSearchView);

// --------------------Handling Recipe View
const handleRecipeView = async () => {
  if (window.location.hash) {
    RecipeView.renderSpinner();

    const recipeId = getRecipeIdFromUrl();

    await getRecipeData(recipeId);

    RecipeView.render(state.recipe);

    state.bookmarks.forEach(bookmarkedRecipe => {
      if (state.recipe.id === bookmarkedRecipe.id) {
        state.recipe.bookmarked = true;
        BookmarkView.fillBookmarkButton();
      }
    });
  }
};

RecipeView.addRecipeRenderEventListener(handleRecipeView);

// -------------------Handling Bookmark View

const handleBookmarkView = () => {
  if (!state.recipe.bookmarked) {
    BookmarkView.bookmarkViewMessageToggler();

    BookmarkView.render(state.recipe);

    addRecipeToBookmarks(state.recipe);

    BookmarkView.fillBookmarkButton();

    BookmarkView.removeMessage();
  } else {
    BookmarkView.deleteRecipeHTMLFromBookmarks(state.recipe);

    deleteRecipeFromBookmarks(state.recipe);

    BookmarkView.unfillBookmarkButton();
  }
  if (state.bookmarks.length === 0) {
    BookmarkView.renderMessage();
  }
};

BookmarkView.addBookmarkEventListener(handleBookmarkView);

const renderBookmarksOnLoadEvent = () => {
  if (state.bookmarks.length === 0) {
    BookmarkView.renderMessage();
  }
  state.bookmarks.map(bookmarkedRecipe =>
    BookmarkView.render(bookmarkedRecipe)
  );
};

BookmarkView.addLoadEventListenerForBookmarkMessage(renderBookmarksOnLoadEvent);

// todo:
// create an init function in controller. in which you add listeners

// ------------------------------------------------------------------------------------------------------

// document.querySelector('.bookmarks').addEventListener('click', function (e) {
//   if (e.target.closest('.preview')) {
//     e.target
//       .closest('.bookmarks')
//       .querySelectorAll('.preview__link')
//       .forEach(link => link.classList.remove('preview__link--active'));
//     const link = e.target.closest('.preview').querySelector('.preview__link');
//     window.location.hash = link.getAttribute('href');
//     link.classList.add('preview__link--active');
//     loadAndRenderRecipe();
//   }
// });

// const btnPreviousPage = document.querySelector('.pagination__btn--prev');
// const btnNextPage = document.querySelector('.pagination__btn--next');

// btnPreviousPage.addEventListener('click', function (e) {
//   e.preventDefault();
//   let pageNumber = e.target.closest('button').dataset.pageNumber;
//   console.log(`page ${pageNumber}`);
//   e.target.closest('button').dataset.pageNumber--;
// });

// btnNextPage.addEventListener('click', function (e) {
//   e.preventDefault();
//   let pageNumber = e.target.closest('button').dataset.pageNumber;
//   console.log(`page ${pageNumber}`);
//   e.target.closest('button').dataset.pageNumber++;
// });
