'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnLearnMore = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const navLinks2 = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('.section');
const operationsTabAll = document.querySelectorAll('.operations__tab');
const operationsContentAll = document.querySelectorAll('.operations__content');
const header = document.querySelector('header');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//'Learn more' button

btnLearnMore.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

navLinks.addEventListener('mouseover', function (e) {
  const link = e.target.classList.contains('nav__link');
  const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
  const logo = e.target.closest('.nav').querySelector('img');

  if (!link) return;

  siblings.forEach(s => (s.style.opacity = 0.5));
  logo.style.opacity = 0.5;
  e.target.style.opacity = 1;
});

navLinks.addEventListener('mouseleave', function (e) {
  const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
  const logo = nav.querySelector('img');

  siblings.forEach(s => (s.style.opacity = 1));
  logo.style.opacity = 1;
});

navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  const link = e.target.classList.contains('nav__link');
  if (!link) return;

  const id = e.target.getAttribute('href');
  const section = document.querySelector(`${id}`);
  section.scrollIntoView({
    behavior: 'smooth',
  });
});

sections.forEach(section => section.classList.add('section--hidden'));

sections.forEach(section => {
  const obsCallback = function (entries) {
    const [entry] = entries;
    if (entry.isIntersecting) {
      section.classList.remove('section--hidden');
    }
  };

  const obsOptions = {
    root: null,
    threshold: 0.25,
  };

  const observer = new IntersectionObserver(obsCallback, obsOptions);
  observer.observe(section);
});

operationsTabAll.forEach(tab => {
  tab.addEventListener('click', function () {
    operationsTabAll.forEach(tab =>
      tab.classList.remove('operations__tab--active')
    );
    tab.classList.add('operations__tab--active');
    const contentNumber = tab.dataset.tab;
    operationsContentAll.forEach(content => {
      content.classList.remove('operations__content--active');
    });
    document
      .querySelector(`.operations__content--${contentNumber}`)
      .classList.add('operations__content--active');
  });
});

const section1BarObsCallback = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    nav.classList.add('sticky');
  }
};

const navHeight = nav.getBoundingClientRect().height;

const section1BarObsOptions = {
  root: null,
  threshold: 0.6,
  rootMargin: `${navHeight}px`,
};

const section1BarObserver = new IntersectionObserver(
  section1BarObsCallback,
  section1BarObsOptions
);
section1BarObserver.observe(section1);

const headerObsCallback = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    nav.classList.remove('sticky');
  }
};

const headerObsOptions = {
  root: null,
  threshold: 0.1,
};

const headerObserver = new IntersectionObserver(
  headerObsCallback,
  headerObsOptions
);

headerObserver.observe(header);
