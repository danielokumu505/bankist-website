'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

//////////////////////////////
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

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = `We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>`;
//textcontent adds actual text only
message.innerHTML = `We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>`;
//innerHTML can also add html content ie elements and tags. the text is parsed as HTML.
// header.prepend(message);//prepend adds new element as the first child
header.append(message); //append adds new element as the last child. prepend and append can be used to insert and move elements
// a dom element is unique . it can only exist in one place at a time ie prepend add it and append moves it.

// const clone = message.cloneNode(true);

// header.append(message.cloneNode(true)); //copies new inserted element and appends it in the parent element

// header.before(message)//inserts message element before header element as a sibling
// header.after(message)//inserts message element after header element as a sibling. the new dom element is moved to this location
//ie it can only exist in one place at a time unless it is cloned

//deleting elements******************
const btn = document.querySelector('.btn--close-cookie');
btn.addEventListener('click', () => {
  // message.remove();

  message.parentElement.removeChild(message); //dom traversing(moving up and down in the dom tree)

});
