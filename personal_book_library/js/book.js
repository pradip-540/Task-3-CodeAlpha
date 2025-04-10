// Load categories into select element
function loadCategories() {
    const categorySelect = document.getElementById('category');
    if (categorySelect) {
        const categories = JSON.parse(localStorage.getItem('categories'));
        categorySelect.innerHTML = '';
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    }
}

// Handle add book form submission
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    
    const addBookForm = document.getElementById('add-book-form');
    if (addBookForm) {
        addBookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const isbn = document.getElementById('isbn').value;
            const publishedDate = document.getElementById('published-date').value;
            const categoryId = parseInt(document.getElementById('category').value);
            
            const categories = JSON.parse(localStorage.getItem('categories'));
            const category = categories.find(c => c.id === categoryId);
            
            const books = JSON.parse(localStorage.getItem('books'));
            const newBook = {
                id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
                title,
                author,
                isbn,
                publishedDate,
                category: category.name,
                categoryId,
                status: 'Available',
                dateAdded: new Date().toISOString()
            };
            
            books.push(newBook);
            localStorage.setItem('books', JSON.stringify(books));
            
            alert('Book added successfully!');
            window.location.href = 'books.html';
        });
    }
    
    // Load books table
    const booksTable = document.getElementById('books-table');
    if (booksTable) {
        const books = JSON.parse(localStorage.getItem('books'));
        const searchInput = document.getElementById('search-books');
        
        function renderBooks(booksToRender) {
            booksTable.innerHTML = '';
            
            booksToRender.forEach(book => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.category}</td>
                    <td><span class="badge ${book.status === 'Available' ? 'bg-success' : 'bg-warning'}">${book.status}</span></td>
                    <td>
                        <a href="book-detail.html?id=${book.id}" class="btn btn-sm btn-info">View</a>
                        <button class="btn btn-sm btn-danger" onclick="deleteBook(${book.id})">Delete</button>
                    </td>
                `;
                booksTable.appendChild(row);
            });
        }
        
        renderBooks(books);
        
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const filteredBooks = books.filter(book => 
                    book.title.toLowerCase().includes(searchTerm) || 
                    book.author.toLowerCase().includes(searchTerm) ||
                    book.isbn.toLowerCase().includes(searchTerm)
                );
                renderBooks(filteredBooks);
            });
        }
    }
});

// Delete book function (needs to be global for onclick)
function deleteBook(bookId) {
    if (confirm('Are you sure you want to delete this book?')) {
        const books = JSON.parse(localStorage.getItem('books'));
        const updatedBooks = books.filter(book => book.id !== bookId);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
        window.location.reload();
    }
}