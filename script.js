const closeBtn = document.getElementById('close');
const newBookBtn = document.getElementById('new-book-btn');
const formContainer = document.querySelector('.form-container');
const backDrop = document.querySelector('.backdrop');
const form = document.getElementById('form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const card = document.getElementById('card');
const read = document.getElementById('read');
const myLibrary = [];
let book;

// Book Factory Function
const Book = (title, author, pages, read) => {
  return { title, author, pages, read };
};

// Book Operations Module
const bookOperations = ( () => {
  const createBook = () => {
    //const book = Book(title.value, author.value, pages.value, read.value);
    return Book(title.value, author.value, pages.value, read.value);
    //return book;
  }

  const addBookToLibrary = (inputArr) => {
    myLibrary.push(inputArr);
  }

  const displayBook = (newBook) => {
    const bookContainer = card.appendChild(document.createElement('div'));
    bookContainer.setAttribute('class', 'bkcontainer');
    Object.entries(newBook).forEach((book) => {
      let newElem;
      const [key, value] = book;
  
      if (key === 'read') {
        newElem = bookContainer.appendChild(document.createElement('button'));
        newElem.setAttribute('class', 'toggleBtn');
        newElem.setAttribute('data-status', `${myLibrary.indexOf(newBook)}`);
        if (value === 'No') { newElem.classList.add('status-color'); } else { newElem.classList.remove('status-color'); }
      } else {
        newElem = bookContainer.appendChild(document.createElement('p'));
      }
  
      newElem.appendChild(document.createTextNode(`${key} : ${value}`));
    });
  
    const removeBtn = bookContainer.appendChild(document.createElement('button'));
    removeBtn.appendChild(document.createTextNode('Remove Book'));
    removeBtn.setAttribute('class', 'removeBtn');
    removeBtn.setAttribute('data-index', `${myLibrary.indexOf(newBook)}`);
  }

  const displayBooks = (library) => {
    while (card.childNodes.length) {
      card.removeChild(card.lastChild);
    }
  
    library.forEach((book) => {
      displayBook(book);
    });
  }

  const deleteBook = (index) => {
    myLibrary.splice(index, 1);
  }

  return { createBook, addBookToLibrary, displayBooks, deleteBook };
})();

// Clear Form
function clearForm() {
  form.reset();
  read.setAttribute('value', 'No');
}

// Event Listeners
newBookBtn.addEventListener('click', () => {
  formContainer.classList.add('visible');
  backDrop.classList.add('display');
  card.classList.remove('visible');
  card.classList.add('not-visible');
});

closeBtn.addEventListener('click', () => {
  clearForm();
  formContainer.classList.remove('visible');
  backDrop.classList.remove('display');
});

read.addEventListener('click', () => {
  read.setAttribute('value', 'Yes');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  bookOperations.addBookToLibrary(bookOperations.createBook());
  clearForm();
  formContainer.classList.remove('visible');
  backDrop.classList.remove('display');
  card.classList.remove('not-visible');
  bookOperations.displayBooks(myLibrary);
});

card.addEventListener('click', (e) => {
  if (e.target && e.target.matches('button.removeBtn')) {
    // Remove a book
    const index = parseInt(e.target.getAttribute('data-index'), 10);
    bookOperations.deleteBook(index);
    e.target.parentNode.remove();
  } else if (e.target && e.target.matches('button.toggleBtn')) {
    // Toggle the read status
    const statusIndex = parseInt(e.target.getAttribute('data-status'), 10);
    if (myLibrary[statusIndex].read === 'Yes') {
      myLibrary[statusIndex].read = 'No';
      e.target.innerHTML = 'read : No';
      e.target.classList.add('status-color');
    } else {
      myLibrary[statusIndex].read = 'Yes';
      e.target.innerHTML = 'read : Yes';
      e.target.classList.remove('status-color');
    }
  }
});