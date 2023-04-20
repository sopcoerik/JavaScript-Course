import icons from 'url:../img/icons.svg';

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

      return recipe;
    } catch (err) {
      // recipeView.showError() -> but don't call it here!
      // the controller handles the errors
      // the controller is the glue between model and view
      // DON'T CALL VIEW OR CONTROLLER FUNCTIONS IN THE MODEL
      document.querySelector('.recipe').textContent = '';
      const html = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>No recipes found for your query. Please try again!</p>
      </div>
      `;
      document.querySelector('.recipe').insertAdjacentHTML('afterbegin', html);
    }
  };

  getRecipesFromSearch = async function () {
    const query = document.querySelector('.search__field').value;
    const getResults = fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
    );
    const results = await getResults;
    const results2 = await results.json();
    const { recipes: recipesArr } = results2.data;

    return recipesArr;
  };

  // updateServings

  //addBookmark

  // deleteBookmark
}

export default new Model();
