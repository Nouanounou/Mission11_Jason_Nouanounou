import { useState } from 'react';
import { Link } from 'react-router-dom'; // <-- Import React Router Link
import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';
import BookLists from '../components/BookLists';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      {/* Bootstrap Navbar with Logo using React Router Link for the users to navigate the filtered page */}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light mb-4"
        style={{ height: '60px' }}
      >
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/universe_1.png"
            alt="Logo"
            width="60"
            height="60"
            className="d-inline-block align-text-top me-2"
          />
        </Link>
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
        <div
          className="collapse navbar-collapse align-items-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a
                className="nav-link"
                href="https://scriptures.byu.edu/#::s"
                target="_blank"
                rel="noopener noreferrer"
              >
                Scripture
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www.etsy.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rare Finds
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www.barnesandnoble.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Extended Collection
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <WelcomeBand />
      <CartSummary />

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

      {/* Boostrap: Footer at the bottom of the page for copyright purposes */}
      <footer className="text-center mt-5 py-3 border-top">
        <small>
          © {new Date().getFullYear()} BookStore Universe. All rights reserved.
        </small>
      </footer>
    </div>
  );
}

export default BooksPage;
