import View from './View.js';

class BookmarkView extends View {
  _bookmarkButton = document.querySelector('.btn--round');
  _parentElement = document.querySelector('.bookmarks__list');
  _message = `No bookmarks yet. Find a nice recipe and bookmark it :)`;

  bookmarkViewMessageToggler() {
    if (!this._parentElement.firstChild) {
      this.renderMessage;
    } else {
      this.delMessage();
    }
  }

  _generateMarkup() {
    return `<li class="preview">
      <a class="preview__link" href="#${this._data.id}">
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

  handleAddBookmarkEvent(handlerFunctionAdd, handlerFunctionDelete) {
    _bookmarkButton.addEventListener('click', e => {
      e.preventDefault();
      const attributeValueOfUse = this.bookmarkButton
        .querySelector('use')
        .getAttribute('href')
        .split('#');
      console.log(attributeValueOfUse);
      if (attributeValueOfUse[1] === 'icon-bookmark-fill')
        handlerFunctionDelete();
      else handlerFunctionAdd();
    });
  }

  delRecipeFromBookmarks(recipe) {
    const allBookmarkedRecipes =
      this._parentElement.querySelectorAll('.preview__link');
    allBookmarkedRecipes.forEach(currRecipe => {
      console.log(currRecipe);
      const currRecipeId = currRecipe.getAttribute('href').split('#');
      console.log(currRecipeId.splice(0, 1));
      if (currRecipeId[0] === recipe.id) {
        currRecipe.closest('.preview').remove();
      }
    });
  }

  delMessage() {
    document.querySelector('.message').style.display = 'none';
  }

  fillBookmarkIcon(icons) {
    this._bookmarkButton
      .querySelector('use')
      .setAttribute('href', `${icons}#icon-bookmark-fill`);
  }

  unfillBookmarkIcon(icons) {
    this._bookmarkButton
      .querySelector('use')
      .setAttribute('href', `${icons}#icon-bookmark`);
  }

  bookmarkListener(icons, recipe, bookmarkedRecipes) {
    const bookmarkButton = document.querySelector('.btn--round');

    bookmarkButton.addEventListener('click', function (e) {
      e.preventDefault();
      if (recipe.bookmarked) {
        recipe.bookmarked = false;
        unfillBookmarkIcon(icons, e);
        const indexOfCurrentRecipe = bookmarkedRecipes.findIndex(
          curr => curr.id === recipe.id
        );
        delRecipeFromBookmarks(recipe);
        bookmarkedRecipes.splice(indexOfCurrentRecipe, 1);
        updateLocalStorage(bookmarkedRecipes);
        return bookmarkedRecipes;
      } else {
        fillBookmarkIcon(icons, e);
        bookmarkedRecipes.push(recipe);
        updateLocalStorage(bookmarkedRecipes);
        addRecipeToBookmarks(recipe);
        delMessage();
        return bookmarkedRecipes;
      }
    });
  }
}

export default new BookmarkView();
