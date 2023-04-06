'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    openModal();
  });
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////////////////

// Nav Links Hover Handle

const navLinks = document.querySelector('.nav__links');

navLinks.addEventListener('mouseover', e => {
  if (e.target.classList.contains('nav__link')) {
    const siblings = e.target.closest('nav').querySelectorAll('.nav__link');
    siblings.forEach(sibling => {
      if (e.target !== sibling) sibling.style.opacity = 0.5;
      e.target.style.opacity = 1;
    });
  }
});

navLinks.addEventListener('mouseleave', e => {
  const siblings = e.target.closest('nav').querySelectorAll('.nav__link');
  siblings.forEach(sibling => {
    if (e.target !== sibling) sibling.style.opacity = 1;
  });
});

///////////////////////////////////////////////////////////////////////

// Scroll effect on sections

// Nav Links Click Handle
navLinks.addEventListener('click', e => {
  e.preventDefault();
  if (
    e.target.classList.contains('nav__link') &&
    e.target.getAttribute('href').includes('-')
  ) {
    const id = e.target.getAttribute('href');
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: 'smooth' });
  }
});

// 'Learn More' Button

const btnLearnMore = document.querySelector('.btn--scroll-to');
const sectionLearnMore = document.getElementById('section--1');

btnLearnMore.addEventListener('click', e => {
  e.preventDefault();
  sectionLearnMore.scrollIntoView({ behavior: 'smooth' });
});

// Sticky navbar on section intersection

const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

const stickyCallback = entries => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    nav.classList.add('sticky');
  }
};

const stickyOptions = {
  root: null,
  threshold: 0.61,
};

const stickyObserver = new IntersectionObserver(stickyCallback, stickyOptions);
stickyObserver.observe(sectionLearnMore);

const headerCallback = entries => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    nav.classList.remove('sticky');
  }
};

const headerOptions = {
  root: null,
  threshold: 0.08,
};

const headerObserver = new IntersectionObserver(headerCallback, headerOptions);
headerObserver.observe(header);

// All sections observer

const allSections = document.querySelectorAll('.section');
allSections.forEach(section => section.classList.add('section--hidden'));

const sectionsCallback = entries => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
  }
};

const sectionsOptions = {
  root: null,
  threshold: 0.2,
};

const sectionsObserver = new IntersectionObserver(
  sectionsCallback,
  sectionsOptions
);

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionsObserver.observe(section);
});

///////////////////////////////////////////////////////////////////////

// Load images on scroll handler (lazy loading imgs)

const images = sectionLearnMore.querySelectorAll('img');

const imgCallback = entries => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;
    entry.target.classList.remove('lazy-img');
  }
};

const imgOptions = {
  root: null,
  threshold: 0.3,
};

const imgObserver = new IntersectionObserver(imgCallback, imgOptions);
images.forEach(img => {
  imgObserver.observe(img);
});

///////////////////////////////////////////////////////////////////////

// Operations tabs handler

const operationsTabContainer = document.querySelector(
  '.operations__tab-container'
);
const allTabs = document.querySelectorAll('.operations__tab');
const allContents = document.querySelectorAll('.operations__content');

const activateTab = target => {
  allTabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  target.classList.add('operations__tab--active');
};

const activateContent = target => {
  allContents.forEach(content => {
    content.classList.remove('operations__content--active');
    if (
      content.classList.contains(`operations__content--${target.dataset.tab}`)
    ) {
      content.classList.add('operations__content--active');
    }
  });
};

operationsTabContainer.addEventListener('click', e => {
  if (e.target.classList.contains('operations__tab')) {
    console.log(e.target);
    activateTab(e.target);
    activateContent(e.target);
  }
});

///////////////////////////////////////////////////////////////////////

// Testimonial slide

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');

const btnSliderRight = document.querySelector('.slider__btn--right');
const btnSliderLeft = document.querySelector('.slider__btn--left');

let curSlide = 0;
let maxSlides = slides.length;

const dotsContainer = document.querySelector('.dots');

slides.forEach((_, i) => {
  dotsContainer.insertAdjacentHTML(
    `beforeend`,
    `<button class="dots__dot" data-slide="${i}"></button>`
  );
});

const dots = document.querySelectorAll('.dots__dot');

const activateDot = curSlide => {
  dots.forEach(dot => {
    dot.classList.remove('dots__dot--active');
    if (dot.dataset.slide == curSlide) {
      dot.classList.add('dots__dot--active');
    }
  });
};

const slide = curSlide => {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  });
  activateDot(curSlide);
};
slide(0);

const slideRight = () => {
  if (curSlide === maxSlides - 1) curSlide = 0;
  else curSlide++;
  slide(curSlide);
};

const slideLeft = () => {
  if (curSlide === 0) curSlide = maxSlides - 1;
  else curSlide--;
  slide(curSlide);
};

btnSliderRight.addEventListener('click', () => {
  slideRight();
});

btnSliderLeft.addEventListener('click', () => {
  slideLeft();
});

dotsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    slide(e.target.dataset.slide);
  }
});

///////////////////////////////////////////////////////////////////////

// console.log(document.documentElement); // selects whole html
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById(`section--1`);

// const allButtons = document.getElementsByTagName('button'); //returns html collection which is a live collection, meaning that it gets updated in real time
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// // Creating and inserting elements
// // .insertAdjacentHTML

// const msg = document.createElement('div');
// msg.classList.add('cookie-message');
// msg.textContent = 'We use cookies for improved functionality and analytics';
// msg.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// // header.prepend(msg);
// header.append(msg);

// // header.append(msg.cloneNode(true));

// // header.before(msg);
// // header.after(msg);

// // Delete elements

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', () => msg.remove());

// msg.style.backgroundColor = '#37383d';
// msg.style.width = '120%';

// console.log(msg.style.color);
// console.log(msg.style.backgroundColor);

// console.log(getComputedStyle(msg).color);
// console.log(getComputedStyle(msg).height);

// msg.style.height = Number.parseFloat(getComputedStyle(msg).height) + 40 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');
