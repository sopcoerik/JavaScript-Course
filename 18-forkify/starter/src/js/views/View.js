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
  _message;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markup = _generateMarkup(); // this function is individual for every view
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;

    const newMarkup = _generateMarkup(); // at this point it's just a string so we can not compare it to the current dom
    const newDOMFromNewMarkupString = document
      .createRange()
      .createContextualFragment(newMarkup); // we first convert the html string to a DOM obj which lives only in memory, not actual part of DOM
    const newDOMElements = Array.from(
      newDOMFromNewMarkupString.querySelectorAll('*')
    ); // and here we take out all the elements from the new DOM object
    const currentDOMElements = Array.from(
      this._parentElement.querySelectorAll('*')
    ); // we take out the current DOM elements from the parent element where we want to update the view with new data

    newDOMElements.forEach((newEl, i) => {
      const currEl = currentDOMElements[i];

      // Updates based on TEXT-CHANGE
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(currEl)) {
        Array.from(newDOMElements.attributes).forEach(
          // here we can set the current elements attributes if they change
          attribute => currEl.setAttributes(attribute.name, attribute.value)
        );
      }
    });
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

  renderMessage() {
    const message = `
    <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>
      ${this._message};
    </p>
  </div>
    `;

    this._parentElement.insertAdjacentHTML('afterbegin', message);
  }
}
