'use strict';

///////////////////////////////////////
// Initialization of variables
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
const imgs = document.querySelectorAll('.features__img');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');

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

///////////////////////////////////////
//'Learn more' button
btnLearnMore.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
//handling nav links (hover effects and smooth scroll)
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

///////////////////////////////////////
// sections observer for section scroll effect
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

///////////////////////////////////////
// handling operations tabs and contents
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

///////////////////////////////////////
// observer for section1 so navbar gets sticky when user scrolls there
const section1BarObsCallback = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    nav.classList.add('sticky');
  }
};

const navHeight = nav.getBoundingClientRect().height;

const section1BarObsOptions = {
  root: null,
  threshold: 0.5,
  rootMargin: `${navHeight}px`,
};

const section1BarObserver = new IntersectionObserver(
  section1BarObsCallback,
  section1BarObsOptions
);
section1BarObserver.observe(section1);

///////////////////////////////////////
// observer for header
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

///////////////////////////////////////
// lazy-loading the images (observer etc.)
imgs.forEach(img => {
  const imgsObsCallback = function (entries) {
    const [entry] = entries;
    if (entry.isIntersecting) {
      img.classList.remove('lazy-img');
      img.src = img.dataset.src;
    }
  };

  const imgsObsOptions = {
    root: null,
    threshold: 0.7,
  };

  const imgsObserver = new IntersectionObserver(
    imgsObsCallback,
    imgsObsOptions
  );
  imgsObserver.observe(img);
});

const getIdFromElementClass = function (element) {
  return element.classList.value.split('--')[1];
};

///////////////////////////////////////
// Initial state of slides and dots
slides.forEach((slide, index) => {
  slide.style.transform = `translateX(${index * 100}%)`;
  const dot = document.createElement('div');
  dot.classList.add('dots__dot');
  dot.setAttribute('id', `${getIdFromElementClass(slide)}`);
  dotContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dots__dot');
let currentSlideId = getIdFromElementClass(slides[0]);
const maxSlides = slides.length;

///////////////////////////////////////
// For activating dots based on active slide
const updateActiveDotFromCurrentSlide = () => {
  dots.forEach(dot => {
    dot.classList.remove('dots__dot--active');
    if (dot.getAttribute('id') == currentSlideId)
      dot.classList.add('dots__dot--active');
  });
};

updateActiveDotFromCurrentSlide();

const updateCurrentActiveSlideId = increment => {
  let currentActiveSlideIndex = Array.from(slides).findIndex(
    slide => getIdFromElementClass(slide) == currentSlideId
  );
  if (increment > 0) {
    if (currentActiveSlideIndex >= maxSlides - 1) currentActiveSlideIndex = 0;
    else currentActiveSlideIndex++;
  } else {
    if (currentActiveSlideIndex <= 0) currentActiveSlideIndex = maxSlides - 1;
    else currentActiveSlideIndex--;
  }

  currentSlideId = getIdFromElementClass(slides[currentActiveSlideIndex]);
};

///////////////////////////////////////
// Sliding right
const getCurrentSlideIndex = () => {
  //currentSlideId
  //slides array
  return [...slides].findIndex(
    element => getIdFromElementClass(element) === currentSlideId
  );
};

const slideRight = () => {
  updateCurrentActiveSlideId(1);
  updateActiveDotFromCurrentSlide();
  const currentSlideIndex = getCurrentSlideIndex();
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currentSlideIndex)}%)`;
  });
};

///////////////////////////////////////
// Sliding left
const slideLeft = () => {
  updateCurrentActiveSlideId(-1);
  updateActiveDotFromCurrentSlide();
  const currentSlideIndex = getCurrentSlideIndex();

  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currentSlideIndex)}%)`;
  });
};

btnRight.addEventListener('click', slideRight);

btnLeft.addEventListener('click', slideLeft);

document.addEventListener('keydown', function (e) {
  e.key === 'ArrowRight' && slideRight();
  e.key === 'ArrowLeft' && slideLeft();
});

///////////////////////////////////////
//Changing slides by clicking on dots

const onDotClick = e => {
  const dotId = e.target.getAttribute('id');
  currentSlideId = dotId;
  updateActiveDotFromCurrentSlide();

  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(-${100 * index}%)`;
  });
};

dots.forEach(dot => {
  dot.addEventListener('click', onDotClick);
});
