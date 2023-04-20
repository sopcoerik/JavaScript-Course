const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const showSpinner = (parentElementClass, state) => {
  const spinner = document
    .querySelector(parentElementClass)
    .querySelector('.spinner');

  state ? spinner.classList.remove('hidden') : spinner.classList.add('hidden');
};

const updateLocalStorage = bookmarkedRecipes => {
  localStorage.setItem('bookmarkedRecipes', JSON.stringify(bookmarkedRecipes));
};
