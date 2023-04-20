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
      recipeId: recipe.recipeId,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
  } catch (err) {
    throw new Error(err);
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

// todo: will move this somewhere else: document.querySelector('.search__field').value;
export const getRecipesFromSearch = async query => {
  state.query = query;
  const getResults = fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${state.query}`
  );
  const results = await getResults;
  const resultsJson = await results.json();
  const { recipes: recipesArr } = resultsJson.data;

  //TODO: use map to get new state. transform the imageurl to the correct atrribute
  recipesArr.forEach(recipe => state.results.push(recipe));
};

// updateServings
export const updateRecipeServings = servings => {
  state.recipe.servings = servings;
  // TODO: ADD THE logic that calculates the recipe.ingredients quantity here. update the recipe ingredients state.
};

//addBookmark
export const addRecipeToBookmarks = recipe => {
  state.bookmarks.push(recipe);
  // where do you mark the current recipe as bookmarked?  (maybe add state.recipe.bookmarked)

  // where do you persist bookmarks ?
};

// deleteBookmark
export const deleteRecipeFromBookmarks = recipe => {
  const recipeIndex = state.bookmarks.findIndex(
    recipeCurr => recipe.id === recipeCurr.id
  );
  state.bookmarks.splice(recipeIndex, 1);
  // persistence of bookmarks ?
};

// TODO: init function which initializes the bookmarks from local storage
