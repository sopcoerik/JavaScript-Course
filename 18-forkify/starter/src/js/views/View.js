// implement default class view.
// todo: look in the course how it was implemented and implement it.
/*
    render(data)
    update(data)
*/
import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  _errorMessage;
  _parentElement;

  render(data) {
    this._data = data;

    const markup = _generateMarkup(); // this function is individual for every view
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const spinner = `
    <div class="spinner">
        <svg>
            <use href="${icons}#icon-loader"></use>
        </svg>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('beforebegin', spinner);
  }

  renderError() {
    const errorMessage = `
    <div class="error">
        <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
        </div>
        <p>${this._errorMessage}</p>
    </div>
    `;

    this._parentElement.insertAdjacentHTML('afterbegin', errorMessage);
  }
}
