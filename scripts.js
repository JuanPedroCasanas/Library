

//Navbar Inputs//
const openFormBtn = document.getElementById('openForm');
openFormBtn.addEventListener('click', () => {
  document.getElementById('popUpId').classList.add('active');
  document.getElementById('overlay').classList.add('active');
});
const sortBySelect = document.getElementById('sort');
sortBySelect.addEventListener('change', sortGrid)
const sortingOrder = document.getElementById('sortingOrder');
sortingOrder.addEventListener('change', sortGrid);

//Catalog//
let myLibrary = [];
const catalog = document.getElementById('catalog');





//Form inputs//
const closeFormBtn = document.getElementById('closePopUp');
const titleField = document.getElementById('title');
const authorField = document.getElementById('author');
const yearField = document.getElementById('year');
const pagesField = document.getElementById('pages');
const bookType = document.getElementById('bookType');
const submitBtn = document.getElementById('submit');
const submitStatus = document.getElementById('submitStatus');
const currentYear = (new Date).getFullYear();
yearField.setAttribute('max', currentYear);
submitBtn.addEventListener('click', submitBook)
const isRead = document.getElementById('isRead');

closeFormBtn.addEventListener('click', () => {
  document.getElementById('popUpId').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
  submitStatus.textContent = '';
})
//


















function submitBook() {
  if (yearField.value != '' && yearField.value > currentYear) {
    submitStatus.style.color = 'red';
    submitStatus.textContent = 'Release year cannot exceed current year.';
  } else if ((yearField.value <= 0 && yearField.value != '') ||
    (pagesField.value <= 0 && pagesField.value != '')) {
    submitStatus.style.color = 'red';
    submitStatus.textContent = 'Negative numbers and zero are not valid values.';
  } else if (isNaN(parseInt(yearField.value)) || isNaN(parseInt(pagesField.value))) {
    submitStatus.style.color = 'red';
    submitStatus.textContent = 'The year and pages field must be specified in numbers.';
  } else if (yearField.value % 1 != 0 || pagesField.value % 1 != 0) {
    submitStatus.style.color = 'red';
    submitStatus.textContent = 'Float numbers are not allowed.';
  } else if (/\d/.test(authorField.value)) {
    submitStatus.style.color = 'red';
    submitStatus.textContent = 'Numbers are not allowed in the author field.';
  } else if (compareTitles(titleField.value)) {
    submitStatus.style.color = 'red';
    submitStatus.textContent = 'This document or book has already been uploaded.';
  } else if (titleField.value != '' &&
    authorField.value != '' &&
    yearField.value != '' &&
    pagesField.value != '' &&
    bookType.value != '' &&
    yearField.value <= currentYear) {
    addBookToLibrary
      (new createBook
        (titleField.value, authorField.value, yearField.value,
          pagesField.value, bookType.value,
          (isRead.checked === true) ? 'Finished!' : 'Not finished yet!')
      );
    clearInputs();
    submitStatus.style.color = 'green';
    submitStatus.textContent = `${bookType.value} uploaded succesfully!`
  } else {
    submitStatus.style.color = 'red';
    submitStatus.textContent = 'Please complete all fields before submitting your entry';
  }
}


function createBook(title, author, year, pages, type, read) {

  let fxdTitle = title.charAt(0).toUpperCase() + title.toLowerCase().slice(1);
  let authorWords = author.split(' ');

  for (let i = authorWords.length - 1; i > 0; i--) {
    authorWords[i] = authorWords[i].charAt(0).toUpperCase() +
      authorWords[i].toLowerCase().slice(1);
  }

  let fxdAuthor = authorWords.join(' ');

  this.title = fxdTitle;
  this.author = fxdAuthor;
  this.year = year;
  this.pages = pages;
  this.type = type;
  this.read = read;
}


function clearInputs() {
  titleField.value = '';
  authorField.value = '';
  yearField.value = '';
  pagesField.value = '';
}

function compareTitles(title) {
  let fxdTitle = title.charAt(0).toUpperCase() + title.toLowerCase().slice(1);
  return myLibrary.some((e) => e.title === fxdTitle);
}





function addBookToLibrary(book) {
  myLibrary.push(book);
  let newBook = document.createElement('div');
  let title = document.createElement('p');
  title.textContent = `Title: ${book.title}`;
  let author = document.createElement('p');
  author.textContent = `Author: ${book.author}`;
  let year = document.createElement('p');
  year.textContent = `Release Year: ${book.year}`;
  let pages = document.createElement('p');
  pages.textContent = `Pages: ${book.pages}`;
  let type = document.createElement('p');
  type.textContent = `Type: ${book.type}`;
  let status = document.createElement('p');
  status.textContent = `Status: ${book.read}`;
  newBook.appendChild(title);
  newBook.appendChild(author);
  newBook.appendChild(year);
  newBook.appendChild(pages);
  newBook.appendChild(type);
  newBook.appendChild(status);
  newBook.style.height = '60%';
  newBook.style.display = 'grid';
  newBook.style.gridTemplateRows = '2.5em 2.5em 2.5em 2.5em 2.5em 2.5em';
  newBook.style.gridTemplateColumns = '1fr';
  newBook.style.rowGap = '0.5em';
  newBook.style.padding = '0em 0em 0em 0.5em';
  newBook.style.padding = '0.5 em';
  newBook.style.border = 'solid black 5px';
  newBook.style.overflow = 'auto';
  catalog.appendChild(newBook);
  sortGrid()
}



function sortGrid() {
  switch (sortBySelect.value) {
    case 'byTitle':
      if (sortingOrder.checked) {
        myLibrary.sort((a, b) => {
          if (a.title < b.title) { return 1; }
          if (a.title > b.title) { return -1; }
          return 0;
        })
      } else {
        myLibrary.sort((a, b) => {
          if (a.title < b.title) { return -1; }
          if (a.title > b.title) { return 1; }
          return 0;
        })
      }
      break;

    case 'byAuthor':
      if (sortingOrder.checked) {
        myLibrary.sort((a, b) => {
          if (a.author < b.author) { return 1; }
          if (a.author > b.author) { return -1; }
          return 0;
        })
      } else {
        myLibrary.sort((a, b) => {
          if (a.author < b.author) { return -1; }
          if (a.author > b.author) { return 1; }
          return 0;
        })
      }
      break;

    case 'byYear':
      if(sortingOrder.checked) {
        myLibrary.sort((a, b) => b.year - a.year);
      } else {
        myLibrary.sort((a, b) => a.year - b.year);
      }
      break;

    case 'byPages':
      if(sortingOrder.checked) {
        myLibrary.sort((a, b) => b.pages - a.pages);
      } else {
        myLibrary.sort((a, b) => a.pages - b.pages);
      }
      break;

    case 'byType':
      if (sortingOrder.checked) {
        myLibrary.sort((a, b) => {
          if (a.type < b.type) { return 1; }
          if (a.type > b.type) { return -1; }
          return 0;
        })
      } else {
        myLibrary.sort((a, b) => {
          if (a.type < b.type) { return -1; }
          if (a.type > b.type) { return 1; }
          return 0;
        })
      }
      break;

    case 'byStatus':
      if (sortingOrder.checked) {
        myLibrary.sort((a, b) => {
          if (a.read < b.read) { return 1; }
          if (a.read > b.read) { return -1; }
          return 0;
        })
      } else {
        myLibrary.sort((a, b) => {
          if (a.read < b.read) { return -1; }
          if (a.read > b.read) { return 1; }
          return 0;
        })
      }
      break;

    default:
      alert('Something went wrong');
      break;
  }
}