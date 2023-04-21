import 'core-js/stable';
import 'regenerator-runtime';

import {
  getRecipesFromSearch,
  state,
  getRecipeData,
  addRecipeToBookmarks,
  deleteRecipeFromBookmarks,
  updateRecipeServings,
} from './model';

import RecipeView from './views/recipeView';
import SearchView from './views/searchView';
import BookmarkView from './views/bookmarkView';
import PreviewLinks from './views/activeLinksView';
import ServingsView from './views/servingsView';

// https://forkify-api.herokuapp.com/v2
// 5ed6604591c37cdc054bcd09

///////////////////////////////////////

// -------------------------------------------------------------------------------------------------------

// ---------------------Checking for active links
PreviewLinks.checkForActiveLinks();

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

// --------------------Handling Recipe View
const handleRecipeView = async () => {
  try {
    if (window.location.hash) {
      RecipeView.renderSpinner();

      const recipeId = getRecipeIdFromUrl();

      await getRecipeData(recipeId);

      RecipeView.render(state.recipe);

      state.bookmarks.forEach(bookmarkedRecipe => {
        if (state.recipe.recipeId === bookmarkedRecipe.recipeId) {
          state.recipe.bookmarked = true;
          BookmarkView.fillBookmarkButton();
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// -------------------Handling Bookmark View

const handleBookmarkView = () => {
  if (!state.recipe.bookmarked) {
    BookmarkView.render(state.recipe);

    addRecipeToBookmarks(state.recipe);

    BookmarkView.fillBookmarkButton();
  } else {
    BookmarkView.deleteRecipeHTMLFromBookmarks(state.recipe);

    deleteRecipeFromBookmarks(state.recipe);

    BookmarkView.unfillBookmarkButton();
  }
  if (state.bookmarks.length === 0) {
    BookmarkView.renderMessage();
  } else {
    BookmarkView.removeMessage();
  }
};

const renderBookmarksOnLoadEvent = () => {
  if (state.bookmarks.length === 0) {
    BookmarkView.renderMessage();
  }
  state.bookmarks.map(bookmarkedRecipe =>
    BookmarkView.render(bookmarkedRecipe)
  );
};

const changeServingsAndIngredientQuantity = e => {
  let servings = state.recipe.servings;

  if (e.target.closest('.btn--increase-servings')) servings++;
  if (e.target.closest('.btn--decrease-servings') && servings > 1) servings--;

  const newServingsQuantity = servings;

  state.recipe.ingredients.forEach(ing => {
    const quantityPerServing = ing.quantity / state.recipe.servings;

    const newIngredientQuantity = (
      quantityPerServing * newServingsQuantity
    ).toFixed(1);
    if (!ing.quantity) return;
    ing.quantity = newIngredientQuantity;
  });
  state.recipe.servings = newServingsQuantity;

  RecipeView.update(state.recipe);
};

const init = () => {
  SearchView.addSubmitListener(handleSearchView);
  RecipeView.addRecipeRenderEventListener(handleRecipeView);
  BookmarkView.addBookmarkEventListener(handleBookmarkView);
  BookmarkView.addLoadEventListenerForBookmarkMessage(
    renderBookmarksOnLoadEvent
  );
  RecipeView.addServingsChangeHandler(changeServingsAndIngredientQuantity);
};

init();

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
