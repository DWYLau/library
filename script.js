// variables

let myLibrary = [];

// DOM manipulation for form elements

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const checkbox = document.getElementById("read");

// functions for opening/closing form

function openForm() {
  document.querySelector(".form-popup").style.display = "block";
}

function closeForm() {
  document.querySelector(".form-popup").style.display = "none";
  title.value = "";
  author.value = "";
  pages.value = "";
  checkbox.checked = false;
}

// querySelector/function for submit button

const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  addBook();
});

// book constructor

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// functions for adding book

function addBook() {
  let bookTitle = title.value;
  let bookAuthor = author.value;
  let numberOfPages = pages.value;
  read = checkReadStatus();
  let book = new Book(bookTitle, bookAuthor, numberOfPages, read);
  closeForm();
  myLibrary.push(book);
  createCard();
}

function checkReadStatus() {
  let readStatus = false;
  if (checkbox.checked === true) {
    readStatus = true;
  } else {
    readStatus = false;
  }
  return readStatus;
}

// functions for creating card/appending cards

function createCard() {
  const cardContainer = document.querySelector(".card-container");
  const cardsSquares = cardContainer.querySelectorAll("div");
  cardsSquares.forEach((square) => square.remove());

  myLibrary.forEach((item) => {
    const card = document.createElement("div");
    cardContainer.appendChild(card);
    card.classList.add("card");
  });
}
