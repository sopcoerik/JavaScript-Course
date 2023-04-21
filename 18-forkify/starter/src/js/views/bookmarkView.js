import View from './View.js';
import icons from 'url:../../img/icons.svg';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _message = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  /* 
    this._data structure:
  */

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;

    const markup = this._generateMarkup(); // this function is individual for every view
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  bookmarkViewMessageToggler() {
    if (!this._parentElement.firstChild) {
      this.renderMessage;
    }
  }

  _generateMarkup() {
    return `<li class="preview">
      <a class="preview__link" href="#${this._data.recipeId}">
        <figure class="preview__fig">
          <img src="${this._data.imageUrl}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__name">${this._data.title}</h4>
          <p class="preview__publisher">${this._data.publisher}</p>
        </div>
      </a>
    </li>`;
  }

  addBookmarkEventListener(handlerFunction) {
    document.querySelector('.recipe').addEventListener('click', e => {
      e.preventDefault();
      if (e.target.closest('.btn--round')) {
        handlerFunction();
      }
    });
  }
  fillBookmarkButton() {
    document
      .querySelector('.recipe')
      .querySelector('.btn--round')
      .querySelector('use')
      .setAttribute('href', `${icons}#icon-bookmark-fill`);
  }

  unfillBookmarkButton() {
    document
      .querySelector('.recipe')
      .querySelector('.btn--round')
      .querySelector('use')
      .setAttribute('href', `${icons}#icon-bookmark`);
  }

  deleteRecipeHTMLFromBookmarks() {
    const allBookmarkedRecipes = Array.from(
      this._parentElement.querySelectorAll('.preview__link')
    );
    allBookmarkedRecipes.forEach(recipePreview => {
      if (recipePreview.hash === window.location.hash) {
        recipePreview.closest('.preview').remove();
      }
    });
  }

  addLoadEventListenerForBookmarkMessage(handlerFunction) {
    window.addEventListener('load', handlerFunction);
  }

  removeMessage(parent) {
    parent.querySelector('.message').remove();
  }
}

export default new BookmarkView();
