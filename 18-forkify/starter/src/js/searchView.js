import { showSpinner } from './helpers';

class SearchView {
  #parentElement = document.querySelector('.results');

  renderSearchView(recipe) {
    const html = `
    <li class="preview">
    <a
      class="preview__link"
      href="#${recipe.id}"
    >
      <figure class="preview__fig">
        <img src="${recipe.image_url}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${recipe.title}</h4>
        <p class="preview__publisher">${recipe.publisher}</p>
      </div>
    </a>
  </li>`;

    this.#parentElement.insertAdjacentHTML('afterbegin', html);
  }

  showSpinner(state) {
    showSpinner('.results', state);
  }
}

export default new SearchView();
