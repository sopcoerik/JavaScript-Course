class Model {
  getRecipeData = async function () {
    const id = window.location.hash;

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
