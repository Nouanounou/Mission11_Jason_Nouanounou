import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';
import BookLists from '../components/BookLists';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      {/* Bootstrap Navbar (New Functionality) */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <a className="navbar-brand" href="#">
          Bookstore
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a
                className="nav-link"
                href="https://www.byustore.com/books-main/textbooks?srsltid=AfmBOoq1Y7DwrLfR4DKDdPLZPGLFiVOu_m8C_cIn7QoHvz3FlNV1RJ2h"
                target="_blank"
                rel="noopener noreferrer"
              >
                BYU-Books
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www.youtube.com/watch?v=6ibCtsHgz3Y"
                target="_blank"
                rel="noopener noreferrer"
              >
                TED-Book
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://blog.reedsy.com/book-genres/"
                target="_blank"
                rel="noopener noreferrer"
              >
                More-Categories
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <WelcomeBand />

      {/* Book Lists with CategoryFilter */}
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>

        <div className="col-md-9">
          <BookLists selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
