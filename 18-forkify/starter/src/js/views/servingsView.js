class ServingsView {
  increaseButton = document.querySelector('.btn--increase-servings');
  decreaseButton = document.querySelector('.btn--decrease-servings');

  addIncreaseEventListener(handlerFunction) {
    this.increaseButton.addEventListener('click', handlerFunction);
  }

  addDecreaseEventListener(handlerFunction) {
    this.decreaseButton.addEventListener('click', handlerFunction);
  }
}

export default new ServingsView();
