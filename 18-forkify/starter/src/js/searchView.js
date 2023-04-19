import icons from 'url:../img/icons.svg';

class SearchView {
  #parentElement = document.querySelector('.results');

  showSpinner = state => {
    const spinner = this.#parentElement.querySelector('.spinner');

    state
      ? spinner.classList.remove('hidden')
      : spinner.classList.add('hidden');
  };

  renderSearchView(recipe) {
    this.showSpinner(true);
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
    this.showSpinner(false);
  }
}

export default new SearchView();
