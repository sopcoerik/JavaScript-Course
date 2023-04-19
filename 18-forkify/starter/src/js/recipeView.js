import icons from 'url:../img/icons.svg';
import fracty from 'fracty';
class View {
  #parentElement = document.querySelector('.recipe');

  renderRecipeView = function (recipe) {
    const html = `
  <figure class="recipe__fig">
    <img src="${recipe.imageUrl}" alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
        <span>${recipe.title}</span>
    </h1>
    </figure>

    <div class="recipe__details">
    <div class="recipe__info">
        <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          recipe.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
        <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          recipe.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
        <button class="btn--tiny btn--decrease-servings">
            <svg>
            <use href="${icons}#icon-minus-circle"></use>
            </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
            <svg>
            <use href="${icons}#icon-plus-circle"></use>
            </svg>
        </button>
        </div>
    </div>

    <div class="recipe__user-generated hidden">
        <svg>
        <use href="${icons}#icon-user"></use>
        </svg>
    </div>
    <button class="btn--round">
        <svg class="">
        <use href="${icons}#icon-bookmark"></use>
        </svg>
    </button>
    </div>



    <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${recipe.ingredients
          .map(ing => {
            return `
            <li class="recipe__ingredient">
                <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${
                  ing.quantity ? fracty(ing.quantity) : ''
                }</div>
                <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
                </div>
            </li>
            `;
          })
          .join('')}

        
    <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
        </p>
        <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
        >
            <span>Directions</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </a>
    </div>
    `;
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', html);
  };

  decreaseServings() {
    const quantityEls = document.querySelectorAll('.recipe__quantity');

    const servings = document.querySelector('.recipe__info-data--people');

    servings.innerHTML--;
    quantityEls.forEach(el => {
      el.innerHTML =
        Number(el.innerHTML) +
        (Number(el.innerHTML) / Number(servings.innerHTML)).toFixed(1);
    });
  }

  increaseServings() {
    const ingredientQuantityElements =
      document.querySelectorAll('.recipe__quantity');

    const servings = document.querySelector('.recipe__info-data--people');

    servings.innerHTML++;
    ingredientQuantityElements.forEach(el => {
      const elementNumber = el.innerHTML
        .split(' ')
        .map(el => Number(el).toFixed(1));
      console.log(elementNumber);
      if (!el.innerHTML) return;
      const ingredientQuantity = Number(el.innerHTML);
      const servingsQuantity = Number(servings.innerHTML);
      let newIngredientQuantity =
        ingredientQuantity + ingredientQuantity / (servingsQuantity - 1);
      el.innerHTML = fracty(newIngredientQuantity.toFixed(1));
    });
  }
}

export default new View();
