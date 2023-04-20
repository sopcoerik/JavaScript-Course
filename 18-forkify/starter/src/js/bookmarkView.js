class BookmarkView {
  #parentElement = document.querySelector('.bookmarks__list');

  addRecipeToBookmarks(recipe) {
    const html = `<li class="preview">
      <a class="preview__link" href="#${recipe.id}">
        <figure class="preview__fig">
          <img src="${recipe.image_url}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__name">${recipe.title}</h4>
          <p class="preview__publisher">${recipe.publisher}</p>
        </div>
      </a>
    </li>`;

    this.#parentElement.insertAdjacentHTML('afterbegin', html);

    recipe.bookmarked = true;
  }

  delRecipeFromBookmarks(recipe) {
    const allBookmarkedRecipes =
      this.#parentElement.querySelectorAll('.preview__link');
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
