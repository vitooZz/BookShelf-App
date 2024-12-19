  document.addEventListener('DOMContentLoaded', function () {
      const bookForm = document.getElementById('bookForm');
      const searchBookForm = document.getElementById('searchBook');
      const incompleteBookList = document.getElementById('incompleteBookList');
      const completeBookList = document.getElementById('completeBookList');
      const searchInput = document.getElementById('searchBookTitle');
    
      // Load books from localStorage
      const loadBooks = () => {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        displayBooks(books);
      };
    
      // Display books in their respective sections
      const displayBooks = (books) => {
        incompleteBookList.innerHTML = '';
        completeBookList.innerHTML = '';
    
        books.forEach((book) => {
          const bookElement = createBookElement(book);
          if (book.isComplete) {
            completeBookList.appendChild(bookElement);
          } else {
            incompleteBookList.appendChild(bookElement);
          }
        });
      };
    
      // Create book element HTML
      const createBookElement = (book) => {
        const div = document.createElement('div');
        div.setAttribute('data-bookid', book.id);
        div.setAttribute('data-testid', 'bookItem');
    
        div.innerHTML = `
          <h3 data-testid="bookItemTitle">${book.title}</h3>
          <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
          <p data-testid="bookItemYear">Tahun: ${book.year}</p>
          <div>
            <button data-testid="bookItemIsCompleteButton" onclick="toggleComplete(${book.id})">
              ${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}
            </button>
            <button data-testid="bookItemDeleteButton" onclick="deleteBook(${book.id})">Hapus Buku</button>
          </div>
        `;
        return div;
      };
    
      // Add new book to localStorage
      bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const title = document.getElementById('bookFormTitle').value;
        const author = document.getElementById('bookFormAuthor').value;
        const year = parseInt(document.getElementById('bookFormYear').value);
        const isComplete = document.getElementById('bookFormIsComplete').checked;
        const id = new Date().getTime();
    
        const newBook = { id, title, author, year, isComplete };
    
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books.push(newBook);
        localStorage.setItem('books', JSON.stringify(books));
    
        loadBooks();
        bookForm.reset();
      });
    
      // Toggle book completion status
      window.toggleComplete = (bookId) => {
        let books = JSON.parse(localStorage.getItem('books')) || [];
        const bookIndex = books.findIndex((book) => book.id === bookId);
        if (bookIndex !== -1) {
          books[bookIndex].isComplete = !books[bookIndex].isComplete;
          localStorage.setItem('books', JSON.stringify(books));
          loadBooks();
        }
      };
    
      // Delete a book
      window.deleteBook = (bookId) => {
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books = books.filter((book) => book.id !== bookId);
        localStorage.setItem('books', JSON.stringify(books));
        loadBooks();
      };
    
      // Search books by title
      searchBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.toLowerCase();
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books = books.filter((book) => book.title.toLowerCase().includes(query));
        displayBooks(books);
      });
    
      loadBooks(); // Initial load of books
    });
    