import icons from 'url:../img/icons.svg';

class Model {
  getRecipeData = async function () {
    let id;
    if (!window.location.hash) return;
    else id = window.location.hash;

    try {
      const getData = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id.slice(1)}`
      );
      const data = await getData.json();
      let { recipe } = data.data;

      recipe = {
        cookingTime: recipe.cooking_time,
        id: recipe.id,
        imageUrl: recipe.image_url,
        ingredients: recipe.ingredients,
        publisher: recipe.publisher,
        servings: recipe.servings,
        sourceUrl: recipe.source_url,
        title: recipe.title,
      };

      return recipe;
    } catch (err) {
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
      throw new Error(err);
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
}

export default new Model();
