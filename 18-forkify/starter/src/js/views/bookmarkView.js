import View from './View.js';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');

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

  fillBookmarkIcon(icons, e) {
    e.target
      .querySelector('.btn--round')
      .querySelector('use')
      .setAttribute('href', `${icons}#icon-bookmark-fill`);
  }

  unfillBookmarkIcon(icons, e) {
    e.target
      .closest('.btn--round')
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
