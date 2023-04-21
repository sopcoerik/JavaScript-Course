import View from './View.js';

class SearchView extends View {
  _parentElement = document.querySelector('.results');

  getSearchQuery = () => {
    return document.querySelector('.search__field').value;
  };

  _generateMarkup() {
    return this._data
      .map(recipe => {
        return `
        <li class="preview">
        <a class="preview__link" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.imageUrl}" alt="${recipe.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
          </div>
        </a>
      </li>`;
      })
      .join('');
  }

  addSubmitListener(handlerFunction) {
    document.querySelector('.search').addEventListener('submit', function (e) {
      e.preventDefault();
      handlerFunction();
    });
  }
}

export default new SearchView();
