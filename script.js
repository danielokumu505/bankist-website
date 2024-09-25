'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

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
  const s1coords = section1.getBoundingClientRect(); //returns a DOMRect object providing information about
  //... the size of an element and its position relative to the viewport.
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

/////page navigation***************************************

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
// 1. add event listener to a common parent element
document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    event.preventDefault();
    console.log(event.target);

    // 2. determine what element originated the event
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

/////tabbed components

// console.log(tabsContent);

//this method is not optimal since an event is assigned to every(multiple) elements
// tabs.forEach(function(tab){
// tab.addEventListener('click',()=>console.log(tab))
// })

//tabbed functionality with event delegation
tabsContainer.addEventListener('click', function (event) {
  const clicked = event.target.closest('.operations__tab'); //selects the closest PARENT element with
  // //...the class specified in the parenthesis () . usefull in event delegation
  // console.log(clicked);

  //Guard clause(cleaner code)
  if (!clicked) return; // if clicked is null, the function is immediately finished. any code afterwords
  //...is not executed

  //removing active classes
  tabs.forEach(function (tab) {
    tab.classList.remove('operations__tab--active');
  }); //remove 'operations__tab--active' class in all tabs

  tabsContent.forEach(function (tabContent) {
    tabContent.classList.remove('operations__content--active');
  });

  //activating tab
  clicked.classList.add('operations__tab--active'); //add 'operations__tab--active' class to clicked tab

  // ///variant non clean code
  // if (clicked) {
  //   clicked.classList.toggle('operations__tab--active');
  // }

  //activating content area
  const currentTabcontent = document.querySelector(
    `.operations__content--${clicked.dataset.tab}`
  );

  currentTabcontent.classList.add('operations__content--active');
});

/////menu fade animation
const handleHover = function (event, opacity) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); //closest() is a dom selector that requires the period '.' for class selection
    //...queryselector can be used on an element to search for a certain query only in that element
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(function (element) {
      if (element !== link) {
        // console.log(element);
        element.style.opacity = opacity;
      }
    });

    logo.style.opacity = opacity;
  }
};

//Passing 'arguements' into handler function
nav.addEventListener('mouseover', function (event) {
  handleHover(event, 0.5);
}); //mouseover is similar to mouse enter but mouse over allows event bubbling
//...addeventlistener expects a function as the second arguement and not any other regular value
//...bind returns a new function with this keyword set to the arguement passed into bind

nav.addEventListener('mouseout', function (event) {
  handleHover(event, 1);
}); //mouse out is the opposite of mouse over

//////sticky navigation
// const initialCoords = section1.getBoundingClientRect(); //returns a DOMRect object providing
// //... information about the size of an element and its position relative to the viewport.
// console.log(initialCoords);

// window.addEventListener('scroll', function (event) {
//   console.log(window.scrollY);//returns pixels scrolled from top of window in the y axis
//   //...non performing since window.scrollY is returned every time the screen is scrolled
//   console.log(initialCoords.top);

//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

//sticky navigation with intersection observer API
// const observerCallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// }; //this callback function will get called each time that
// //...the observed element (target element) is intersecting the root element at the defined threshold

// const observerOptions = {
//   root: null, //root is the element that the target is intersecting.
//   //.. for 'null' the target element is observed intersecting the viewport
//   threshold: [0, 0.2], //the percentage of intersection at which the observer callback will be called
// };

// const observer = new IntersectionObserver(observerCallBack, observerOptions);//notice the callback function in the observer brackets does
//...not have brackets
// observer.observe(section1);

const header = document.querySelector('.header');

const navHeight = nav.getBoundingClientRect().height; //returns a DOMRect object providing information about
//... the size of an element and its position relative to the viewport.

// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries; //destructuring the same way as writing entries[0]

  // console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, //prevents overlapping the sticky navigation into the the
  //...next section (features section). the  root margin is the height of the navigation
});

headerObserver.observe(header);

/////Revealing sections on scroll
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  // const [entry] = entries; //destructuring the same way as writing entries[0]
  // console.log(entries);
  entries.forEach(entry => {
    // console.log(entry);
    // console.log(observer);

    if (!entry.isIntersecting) return; // if true, the function is immediately finished. any code afterwords
    //...is not executed

    entry.target.classList.remove('section--hidden');

    observer.unobserve(entry.target); //disables continous observation of target element once observed.
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // for root 'null' the target element is observed intersecting the viewport
  threshold: 0.15, //the section is revealed with animation when it is 15% visible in the viewport
});

allSections.forEach(function (section) {
  section.classList.add('section--hidden');

  sectionObserver.observe(section);
});

////lazy loading images using  the intersection observer API
const imageTargets = document.querySelectorAll('img[data-src]');

const loadImage = function (entries, observer) {
  // const [entry] = entries; //destructuring the same way as writing entries[0]

  entries.forEach(entry => {
    // console.log(entry);

    if (!entry.isIntersecting) return;

    //if intersecting, replace source image with data source image
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img'); //the blurry filter is removed once the new image is completely loaded
      //...once the loading is finished, a load event is emmited
    });

    observer.unobserve(entry.target); //disables continous observation of target element once observed.
  });
};

const imageObserver = new IntersectionObserver(loadImage, {
  root: null, //set to entire viewport
  threshold: 0,
  rootMargin: '200px', //enables image to load earlier before being in the users view** important
});

imageTargets.forEach(image => imageObserver.observe(image));

////////////////////////////////////
///////////////////////////////
////////////////////////
//Lessons
//selecting elements*********************
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section'); //returns nodelist.
// //nodelist does not get updated when one of its element is deleted in the html

// console.log(allSections);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons); //returns HTML Live collection. if the dom changes, the collection is also immediately updated

// console.log(document.getElementsByClassName('btn')); //returns HTML Live collection. if the dom changes, the collection is also immediately updated

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

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt); //works for standard element attribute
// console.log(logo.src); //returns absolute source
// console.log(logo.className);
// logo.alt = 'Beautiful minimalist logo';

//non standard attribute

// console.log(logo.designer); //the attribute will not be accessed for a non-standard attribute
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// console.log(logo.getAttribute('src')); //returns relative source

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// //data attributes
// console.log(logo.dataset.versionNumber);

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

//Dom traversing**************************************
// const h1 = document.querySelector('h1');

//Going downwards: selecting child elements
// console.log(h1.querySelectorAll('.highlight')); //queryselector also works on dom elements
// console.log(h1.childNodes); // returns all content inside h1
// console.log(h1.children); //gives a live collection of elements in h1
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'white';

// console.log(h1.parentNode);
// console.log(h1.parentElement); //The parent element is also the parent node

// h1.closest('.header').style.background = 'var(--gradient-secondary)'; //selects the closest parent element with
// //...the class specified in the parenthesis () . usefull in event delegation
// //...closest finds parent elements no matter how high up in the dom tree

// h1.closest('h1').style.background = 'var(--gradient-primary)';

//Going sideways: selecting sibling elements

//only previous and next sibings can be accessed
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children); //returns array like html collection. it is an iterable that can
//...be spread into an array
// Array.from(h1.parentElement.children).forEach(function (element) {
//   if (element !== h1) {
//     element.style.transform = 'scale(0.5)';
//   }
// });
