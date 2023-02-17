'use strict';

const modal = document.querySelector('.modal');
const showModal = document.querySelectorAll('.show-modal');
const hidden = document.querySelector('.hidden');
const closeModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

const show = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const close = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const isModalHidden = function () {
  return modal.classList.contains('hidden');
};

for (let i = 0; i < showModal.length; i++) {
  showModal[i].addEventListener('click', show);
}

closeModal.addEventListener('click', close);
overlay.addEventListener('click', close);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !isModalHidden()) {
    close();
  }
});
