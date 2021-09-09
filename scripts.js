

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
const searchFilter = document.getElementById('searchFilter');
searchFilter.addEventListener('change', search);
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('input', search);

//Catalog//
let myLibrary = loadLocalStorage();
window.onload = sortGrid;
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














/*/This function checks that every field is completed with the correct 
information and if all requirements are fullfiled it adds a book to the library/*/
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
  } else if (compareTitlesAndAuthor(titleField.value, authorField.value)) {
    submitStatus.style.color = 'red';
    submitStatus.textContent = 'This document or book has already been uploaded.';
  } else if (titleField.value != '' &&
    authorField.value != '' &&
    yearField.value != '' &&
    pagesField.value != '' &&
    bookType.value != '' &&
    yearField.value <= currentYear) {
    addBookToLibrary
      ((new createBook
        (titleField.value, authorField.value, yearField.value,
          pagesField.value, bookType.value,
          (isRead.checked === true) ? 'Finished!' : 'Not finished yet!'))
      );
    clearInputs();
    submitStatus.style.color = 'green';
    submitStatus.textContent = `${bookType.value} uploaded succesfully!`
  } else {
    submitStatus.style.color = 'red';
    submitStatus.textContent = 'Please complete all fields before submitting your entry';
  }
}

/*/Object creator function that takes the inputs from the form fields
Capitalizes the first letter of both the title and the author value
It also adds a method for removing the object from the grid/*/
function createBook(title, author, year, pages, type, read) {
  let fxdTitle = title.charAt(0).toUpperCase() + title.toLowerCase().slice(1);
  let authorWords = author.split(' ');
  for (let i = authorWords.length - 1; i >= 0; i--) {
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
  this.remove = () => { removeItem(fxdAuthor, fxdTitle) };
  this.toggleRead = () => {
    (this.read === 'Finished!') ?
      this.read = 'Not finished yet!' :
      this.read = 'Finished!';
    saveLocalStorage();
    sortGrid();
  }
}


function clearInputs() {
  titleField.value = '';
  authorField.value = '';
  yearField.value = '';
  pagesField.value = '';
}

//Checks if the file is already uploaded//
function compareTitlesAndAuthor(title, author) {
  let fxdTitle = title.charAt(0).toUpperCase() + title.toLowerCase().slice(1);
  let authorWords = author.split(' ');
  for (let i = authorWords.length - 1; i >= 0; i--) {
    authorWords[i] = authorWords[i].charAt(0).toUpperCase() +
      authorWords[i].toLowerCase().slice(1);
  }
  let fxdAuthor = authorWords.join(' ');
  return (myLibrary.some((e) => (e.title === fxdTitle) &&
    (e.author === fxdAuthor)));
}




//Adds the file to the array, sorts the array and then creates the grid//
function addBookToLibrary(book) {
  myLibrary.push(book);
  saveLocalStorage()
  sortGrid()
  CreateLibraryItem();
}

//Creates the grid with the array objects in it//
function CreateLibraryItem(docList = myLibrary) {
  document.querySelectorAll('.libraryItem').forEach(e => e.remove());
  for (i = 0; i <= docList.length - 1; i++) {
    let newBook = document.createElement('div');
    newBook.classList.add('libraryItem');
    let title = document.createElement('p');
    title.textContent = `Title: ${docList[i].title}`;
    title.style.gridColumnStart = '1';
    title.style.gridColumnEnd = '2';
    let author = document.createElement('p');
    author.textContent = `Author: ${docList[i].author}`;
    author.style.gridColumnStart = '1';
    author.style.gridColumnEnd = '2';
    let year = document.createElement('p');
    year.textContent = `Release Year: ${docList[i].year}`;
    year.style.gridColumnStart = '1';
    year.style.gridColumnEnd = '2';
    let pages = document.createElement('p');
    pages.textContent = `Pages: ${docList[i].pages}`;
    pages.style.gridColumnStart = '1';
    pages.style.gridColumnEnd = '2';
    let type = document.createElement('p');
    type.textContent = `Type: ${docList[i].type}`;
    type.style.gridColumnStart = '1';
    type.style.gridColumnEnd = '2';
    let status = document.createElement('p');
    status.textContent = `Status: ${docList[i].read}`;
    status.style.gridColumnEnd = '1';
    status.style.gridColumnStart = '1';
    let removeBtn = document.createElement('button');
    removeBtn.textContent = 'x';
    removeBtn.style.gridColumnStart = '2';
    removeBtn.style.gridColumnEnd = '3';
    removeBtn.addEventListener('click', docList[i].remove);
    removeBtn.classList.add('removeBtn');
    icon = document.createElement('img');
    let rmvBtnAndIcon = document.createElement('div');
    rmvBtnAndIcon.classList.add('rmvBtnAndIcon');
    rmvBtnAndIcon.appendChild(icon);
    rmvBtnAndIcon.appendChild(removeBtn);
    let toggleStatus = document.createElement('input');
    toggleStatus.type = 'checkbox';
    toggleStatus.checked = (status.textContent === 'Status: Finished!') ? true : false;
    toggleStatus.addEventListener('click', docList[i].toggleRead);
    toggleStatus.style.gridColumnStart = '2';
    toggleStatus.style.gridColumnEnd = '3';
    newBook.appendChild(rmvBtnAndIcon);
    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(year);
    newBook.appendChild(pages);
    newBook.appendChild(type);
    newBook.appendChild(status);
    newBook.appendChild(toggleStatus);
    //This function sets the visuals based on the file type//
    if (docList[i].type === 'Document') {
      icon.setAttribute('src', '/images/folder.svg');
      icon.classList.add('docIco');
      newBook.style.backgroundColor = 'red';
    } else {
      icon.setAttribute('src', '/images/book.png');
      icon.classList.add('bookIco');
      newBook.style.backgroundColor = 'yellow';
    }
    //
    catalog.appendChild(newBook);
  }
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
        CreateLibraryItem()
      } else {
        myLibrary.sort((a, b) => {
          if (a.title < b.title) { return -1; }
          if (a.title > b.title) { return 1; }
          return 0;
        })
        CreateLibraryItem()
      }
      break;

    case 'byAuthor':
      if (sortingOrder.checked) {
        myLibrary.sort((a, b) => {
          if (a.author < b.author) { return 1; }
          if (a.author > b.author) { return -1; }
          return 0;
        })
        CreateLibraryItem()
      } else {
        myLibrary.sort((a, b) => {
          if (a.author < b.author) { return -1; }
          if (a.author > b.author) { return 1; }
          return 0;
        })
        CreateLibraryItem()
      }
      break;

    case 'byYear':
      if (sortingOrder.checked) {
        myLibrary.sort((a, b) => b.year - a.year);
        CreateLibraryItem()
      } else {
        myLibrary.sort((a, b) => a.year - b.year);
        CreateLibraryItem()
      }
      break;

    case 'byPages':
      if (sortingOrder.checked) {
        myLibrary.sort((a, b) => b.pages - a.pages);
        CreateLibraryItem()
      } else {
        myLibrary.sort((a, b) => a.pages - b.pages);
        CreateLibraryItem()
      }
      break;

    case 'byType':
      if (sortingOrder.checked) {
        myLibrary.sort((a, b) => {
          if (a.type < b.type) { return 1; }
          if (a.type > b.type) { return -1; }
          return 0;
        })
        CreateLibraryItem()
      } else {
        myLibrary.sort((a, b) => {
          if (a.type < b.type) { return -1; }
          if (a.type > b.type) { return 1; }
          return 0;
        })
        CreateLibraryItem()
      }
      break;

    case 'byStatus':
      if (sortingOrder.checked) {
        myLibrary.sort((a, b) => {
          if (a.read < b.read) { return 1; }
          if (a.read > b.read) { return -1; }
          return 0;
        })
        CreateLibraryItem()
      } else {
        myLibrary.sort((a, b) => {
          if (a.read < b.read) { return -1; }
          if (a.read > b.read) { return 1; }
          return 0;
        })
        CreateLibraryItem()
      }
      break;

    default:
      alert('Something went wrong');
      break;
  }
}

function search() {
  let searchInput;
  switch (searchFilter.value) {
    case 'byTitle':
      searchInput = myLibrary.filter((e) => {
        return e.title.toLowerCase().includes(searchBar.value.toLowerCase());
      });
      CreateLibraryItem(searchInput);
      break;

    case 'byAuthor':
      searchInput = myLibrary.filter((e) => {
        return e.author.toLowerCase().includes(searchBar.value.toLowerCase());
      });
      CreateLibraryItem(searchInput);
      break;

    default:
      alert('Something went wrong');
      break;
  }
}


function removeItem(title, author) {
  let mappedMyLibrary = myLibrary.map(e => {
    if (e.title === title && e.author === author) {
      return true
    } else {
      return false
    }
  })
  myLibrary.splice(mappedMyLibrary.indexOf(true), 1);
  searchBar.value = '';
  saveLocalStorage()
  sortGrid();
}

function saveLocalStorage() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
  return;
}

function loadLocalStorage() {
  if (localStorage.length != 0) {
    let tempLibrary = JSON.parse(localStorage.getItem('library'));
    tempLibrary.forEach(e => e.remove = () => { removeItem(e.author, e.title) });
    tempLibrary.forEach(e => e.toggleRead = () => {
      (e.read === 'Finished!') ?
        e.read = 'Not finished yet!' :
        e.read = 'Finished!';
      saveLocalStorage();
      sortGrid();
    }
    )
    return tempLibrary;
  } else {
    return [];
  }
}