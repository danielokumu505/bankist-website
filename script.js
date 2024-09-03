'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
///// Modal window

const openModal = function (event) {
  // event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////scrolling to feature section
btnScrollTo.addEventListener('click', function (event) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  // console.log(event.target.getBoundingClientRect());

  // console.log(window.pageXOffset,pageYOffset)
  // console.log(window.scrollX,window.scrollY);
  // console.log(
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  //////scrolling
  // window.scrollTo(s1coords.left + window.pageXOffset,s1coords.top + window.pageYOffset)

  // window.scrollTo({
  //   top: s1coords.top + window.pageYOffset,
  //   left: s1coords.left,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

/////page navigation
// this method is not optimal since an event is assigned to every(multiple) element
//..in the node list array while only one element is clicked
// document.querySelectorAll('.nav__link').forEach(function (element) {
//   element.addEventListener('click', function (event) {
//     event.preventDefault(); //prevents default scrolling page action behavior

//     if (!element.classList.contains('nav__link--btn')) {
//       const id = this.getAttribute('href');
//       console.log(id);
//       const section = document.querySelector(id);
//       console.log(section);

//       section.scrollIntoView({ behavior: 'smooth' });
//     }
//   });
// });

/////page navigation with event delegation
// 1. add event listener to common parent element
document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    event.preventDefault();
    console.log(event.target);

    if (
      event.target.classList.contains('nav__link') &&
      !event.target.classList.contains('nav__link--btn')
    ) {
      const id = event.target.getAttribute('href');
      console.log(id);
      const section = document.querySelector(id);
      console.log(section);

      section.scrollIntoView({ behavior: 'smooth' });
    }
  });

// 2. determine what element originated the event

////////////////////////////////////
///////////////////////////////
////////////////////////
//Lessons
//selecting elements*********************
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section'); //returns nodelist.
//nodelist does not get updated when one of its element is deleted in the html

console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); //returns HTML Live collection. if the dom changes, the collection is also immediately updated

console.log(document.getElementsByClassName('btn')); //returns HTML Live collection. if the dom changes, the collection is also immediately updated

//creating and inserting elements********************

//insert adjacentHtml

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = `We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>`;
//textcontent adds actual text only
// message.innerHTML = `We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>`;
//innerHTML can also add html content ie elements and tags. the text is parsed as HTML.
// header.prepend(message);//prepend adds new element as the first child
// header.append(message); //append adds new element as the last child. prepend and append can be used to insert and move elements
// a dom element is unique . it can only exist in one place at a time ie prepend add it and append moves it.

// const clone = message.cloneNode(true);

// header.append(message.cloneNode(true)); //copies new inserted element and appends it in the parent element

// header.before(message)//inserts message element before header element as a sibling
// header.after(message)//inserts message element after header element as a sibling. the new dom element is moved to this location
//ie it can only exist in one place at a time unless it is cloned

//deleting elements******************
// const btn = document.querySelector('.btn--close-cookie');
// btn.addEventListener('click', () => {
//   // message.remove();

//   message.parentElement.removeChild(message); //dom traversing(moving up and down in the dom tree)
// });

//styling
// message.style.backgroundColor = '#37383d'; //these javascript invoked styles are set as inline styles in the html
// message.style.width = '120%'; //these javascript invoked styles are set as inline styles in the html

// console.log(message.style.height); //can only access styles invoked by javascript
// console.log(message.style.width); //can only access styles invoked by javascript

// console.log(getComputedStyle(message).color); //gives computed style as it appears on page even when not defined in css
// console.log(getComputedStyle(message).width);
// console.log(getComputedStyle(message).backgroundColor);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered'); //setting properties for css variables

//attributes

const logo = document.querySelector('.nav__logo');
console.log(logo.alt); //works for standard element attribute
console.log(logo.src); //returns absolute source
console.log(logo.className);
logo.alt = 'Beautiful minimalist logo';

//non standard attribute

console.log(logo.designer); //the attribute will not be accessed for a non-standard attribute
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.getAttribute('src')); //returns relative source

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

//data attributes
console.log(logo.dataset.versionNumber);

// //classes
// logo.classList.add('c','v','s')//multiples classes can be added.
// logo.classList.remove()
// logo.classList.toggle()
// logo.classList.contains()// not includes

// logo.className = 'className'; //overrides existing classes, prevents existance of multiple classes

///

//types of events and event handlers******************************
// const h1 = document.querySelector('h1');

// const alertH1 = function (event) {
//   alert('event');
//   // h1.removeEventListener('mouseenter', alertH1); //export a function into its own function.
//   //enables addition and removal of event using the same event(addEventlistener())
//   //when addeventlistener is initiated, it also initiates alertH1 which contains removeEventListener()
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alertH1); //export a function into its own function
// }, 5000);

// h1.onmouseenter = function (event) {
//   alert('lol');
// };

// buttonScrollTo.addEventListener(
//   'click',
//   function () {
//     console.log('Only once');
//   },
//   { once: true }
// );

//Event Propagation: Bubbling and Capturing**************************************
//
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomcolor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document
//   .querySelector('.nav__link')
//   .addEventListener('click', function (event) {
//     this.style.backgroundColor = randomcolor(); //this keyword points to the element on which the event listener is attached to
//     console.log('link', event.target); //event.target returns where the event originated and not the element on which the
//     //...handler is attached.
//     console.log(event.currentTarget === this); ///currenTarget also points to the element on which the event listener is attached to

//     //stopping propagation
//     // event.stopPropagation()
//   });

// document
//   .querySelector('.nav__links')
//   .addEventListener('click', function (event) {
//     this.style.backgroundColor = randomcolor();
//     console.log('container', event.target);
//   });

// document.querySelector('.nav').addEventListener('click', function (event) {
//   this.style.backgroundColor = randomcolor();
//   console.log('nav', event.target);
// });
