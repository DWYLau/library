// variables

let myLibrary = [];

// DOM manipulation for form elements

const form = document.getElementById("form");
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

// book constructor

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// functions for adding book

function addBook() {
  let bookTitle = title.value;
  let bookAuthor = author.value;
  let numberOfPages = pages.value;
  let read = checkReadStatus();
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

    const title = document.createElement("h1");
    const author = document.createElement("h1");
    const pages = document.createElement("h1");
    const readButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(readButton);
    if (item.read === true) {
      readButton.style.background = "lightgreen";
    } else {
      readButton.style.background = "#ffcccb";
    }
    card.appendChild(deleteButton);

    title.textContent = `Title: ${item.title}`;
    author.textContent = `Author: ${item.author}`;
    pages.textContent = `Pages: ${item.pages}`;
    readButton.textContent = changeReadContent(item);
    readButton.addEventListener("click", changeReadStatus);
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteBook(item.title);
      card.remove();
    });
  });
}

function changeReadContent(book) {
  if (book.read === true) {
    return "Read";
  } else {
    return "Unread";
  }
}

function changeReadStatus() {
  if (this.textContent === "Read") {
    this.textContent = "Unread";
    this.style.background = "#ffcccb";
  } else if (this.textContent === "Unread") {
    this.textContent = "Read";
    this.style.background = "lightgreen";
  }
}

function deleteBook(bookTitle) {
  let index = myLibrary.findIndex((x) => x.title === bookTitle);
  myLibrary.splice(index, 1);
}

// validate form

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateInputs();
  if (document.querySelectorAll(".valid").length === 3) {
    addBook();
  }
});

function validateInputs() {
  const bookValue = title.value.trim();
  const authorValue = author.value.trim();
  const pagesValue = pages.value.trim();

  if (bookValue === "") {
    setError(title, "Title is required");
  } else {
    setValid(title);
  }
  if (authorValue === "") {
    setError(author, "Author is required");
  } else {
    setValid(author);
  }
  if (isNaN(pagesValue) || pagesValue === "") {
    setError(pages, "Pages is required and only numbers will be accepted");
  } else {
    setValid(pages);
  }
}

function setError(element, message) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("valid");
}

function setValid(element) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("valid");
  inputControl.classList.remove("error");
}
