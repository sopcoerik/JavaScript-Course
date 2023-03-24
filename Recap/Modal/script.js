'use strict';

const showModalButtons = document.querySelectorAll('.show-modal');
const closeModalButton = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

// Show Modal on Click
const showModalOnClick = () => {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

// Handling the closing of the modal
const closeModal = () => {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

for (let button of showModalButtons) {
  button.addEventListener('click', function () {
    showModalOnClick();
  });
}

// Close button
closeModalButton.addEventListener('click', closeModal);

// When clicking on overlay
overlay.addEventListener('click', closeModal);

// When pressing Esc
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
