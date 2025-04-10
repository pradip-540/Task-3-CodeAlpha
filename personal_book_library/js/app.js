// Initialize data if not exists
if (!localStorage.getItem('books')) {
    localStorage.setItem('books', JSON.stringify([]));
}

if (!localStorage.getItem('categories')) {
    localStorage.setItem('categories', JSON.stringify([
        { id: 1, name: 'Fiction' },
        { id: 2, name: 'Non-Fiction' },
        { id: 3, name: 'Science' },
        { id: 4, name: 'Biography' }
    ]));
}

if (!localStorage.getItem('borrowHistory')) {
    localStorage.setItem('borrowHistory', JSON.stringify([]));
}

// Update dashboard stats
function updateDashboardStats() {
    const books = JSON.parse(localStorage.getItem('books'));
    const categories = JSON.parse(localStorage.getItem('categories'));
    
    document.getElementById('total-books').textContent = books.length;
    document.getElementById('borrowed-books').textContent = books.filter(book => book.status === 'Borrowed').length;
    document.getElementById('total-categories').textContent = categories.length;
    
    // Show recent books
    const recentBooksContainer = document.getElementById('recent-books');
    if (recentBooksContainer) {
        recentBooksContainer.innerHTML = '';
        const recentBooks = books.slice(-5).reverse();
        
        recentBooks.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'col-md-4 mb-3';
            bookCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
                        <p class="card-text">${book.category}</p>
                        <span class="badge ${book.status === 'Available' ? 'bg-success' : 'bg-warning'}">${book.status}</span>
                    </div>
                </div>
            `;
            recentBooksContainer.appendChild(bookCard);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateDashboardStats();
});