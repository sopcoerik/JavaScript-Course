class Model {
  state = {
    recipe: {},
    bookmarks: [],
    search: {
      query: '',
      results: [],
      // page: 1
    },
  };

  // update following functions to update the state when called.
  getRecipeData = async function (recipeId) {
    try {
      const getData = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId.slice(1)}`
      );

      const data = await getData.json();

      let { recipe } = data.data;
      recipe = {
        cookingTime: recipe.cooking_time,
        recipeId: recipe.recipeId,
        imageUrl: recipe.image_url,
        ingredients: recipe.ingredients,
        publisher: recipe.publisher,
        servings: recipe.servings,
        sourceUrl: recipe.source_url,
        title: recipe.title,
      };

      state.recipe = recipe;
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

  getRecipesFromSearch = async function () {
    this.state.query = document.querySelector('.search__field').value;
    const getResults = fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${this.state.query}`
    );
    const results = await getResults;
    const results2 = await results.json();
    const { recipes: recipesArr } = results2.data;

    recipesArr.forEach(recipe => state.results.push(recipe));
  };

  // updateServings
  updateRecipeServings(servings) {
    this.state.recipe.servings = servings;
  }

  //addBookmark
  addRecipeToBookmarks(recipe) {
    this.state.bookmarks.push(recipe);
  }
  // deleteBookmark
  deleteRecipeFromBookmarks(recipe) {
    const recipeIndex = this.state.bookmarks.findIndex(
      recipeCurr => recipe.id === recipeCurr.id
    );
    this.state.bookmarks.splice(recipeIndex, 1);
  }
}

export default new Model();
