import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addPrevButton() {
    this._parentElement.insertAdjacentHTML(
      'afterbegin',
      `<button class="btn--inline pagination__btn--prev" data-page-number="1">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page 1</span>
        </button>`
    );
  }

  addNextButton() {
    this._parentElement.insertAdjacentHTML(
      'beforeend',
      `<button class="btn--inline pagination__btn--next" data-page-number="3">
        <span>Page 3</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>`
    );
  }
}

export default new PaginationView();
