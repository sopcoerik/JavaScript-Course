export const state = {
  recipe: {},
  bookmarks: [],
  search: {
    query: '',
    results: [],
    // page: 1
  },
};

export const getRecipeData = async function (recipeId) {
  try {
    const getData = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId.slice(1)}`
    );

    const data = await getData.json();

    let { recipe } = data.data;

    state.recipe = {
      cookingTime: recipe.cooking_time,
      recipeId: recipe.id,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
  } catch (err) {
    throw err;
  }
};
// } catch (err) {
//   // recipeView.showError() -> but don't call it here!
//   // the controller handles the errors
//   // the controller is the glue between model and view
//   // DON'T CALL VIEW OR CONTROLLER FUNCTIONS IN THE MODEL
//   document.querySelector('.recipe').textContent = '';
//   const html = `
//   <div class="error">
//     <div>
//       <svg>
//         <use href="${icons}#icon-alert-triangle"></use>
//       </svg>
//     </div>
//     <p>No recipes found for your query. Please try again!</p>
//   </div>
//   `;
//   document.querySelector('.recipe').insertAdjacentHTML('afterbegin', html);
// }

export const getRecipesFromSearch = async query => {
  state.query = query;
  const getResults = fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${state.query}`
  );
  const results = await getResults;
  const resultsJson = await results.json();
  const { recipes: recipesArr } = resultsJson.data;

  state.search.results = recipesArr.map(currRecipe => ({
    id: currRecipe.id,
    imageUrl: currRecipe.image_url,
    publisher: currRecipe.publisher,
    title: currRecipe.title,
  }));
};

export const updateRecipeServings = newServings => {
  const oldServings = state.recipe.servings;

  state.recipe.servings = newServings;

  state.recipe.ingredients.forEach(ingredient => {
    // get quantity necessary for serving
    const quantityPerServing = ingredient.quantity / oldServings;
    // calculate the new ingredient quantity based on the new servings, starting from the data you have in the recipe data
    const newIngredientQuantity = (quantityPerServing * newServings).toFixed(1);
    ingredient.quantity = newIngredientQuantity;
  });
};

//addBookmark
export const addRecipeToBookmarks = recipe => {
  recipe.bookmarked = true;
  state.bookmarks.push(recipe);
  localStorage.setItem('bookmarkedRecipes', JSON.stringify(state.bookmarks));
};

// deleteBookmark
export const deleteRecipeFromBookmarks = recipe => {
  recipe.bookmarked = false;

  const recipeIndex = state.bookmarks.findIndex(
    recipeCurr => recipe.id === recipeCurr.id
  );
  state.bookmarks.splice(recipeIndex, 1);

  localStorage.setItem('bookmarkedRecipes', JSON.stringify(state.bookmarks));
};

export const initBookmarkedRecipes = () => {
  const bookmarkedRecipes = JSON.parse(
    localStorage.getItem('bookmarkedRecipes')
  );
  return bookmarkedRecipes;
};

const init = () => {
  state.bookmarks = initBookmarkedRecipes();
};

init();
