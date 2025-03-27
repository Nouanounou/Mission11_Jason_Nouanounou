import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Books } from '../types/Books';
import { CartItem } from '../types/CartItem';

function BookLists({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Books[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleToCart = (book: Books) => {
    const cartItem: CartItem = {
      bookID: book.bookID,
      title: book.title,
      price: book.price,
      quantity: 1,
    };
    addToCart(cartItem);
    navigate('/cart');
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const params = new URLSearchParams({
        pageSize: pageSize.toString(),
        pageNum: pageNum.toString(),
        sortOrder,
      });

      selectedCategories.forEach((cat) => {
        params.append('categories', cat);
      });

      try {
        const response = await fetch(
          `https://localhost:5000/Book/AllBooks?${params.toString()}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data.books);
        setTotalItems(data.totalNumBooks);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        console.error('Fetching books failed:', error);
      }
    };

    fetchBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  return (
    <>
      <br />
      {books.map((b) => (
        <div id="bookcard" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.isbn}
              </li>
              <li>
                <strong>Classification: </strong>
                {b.classification}
              </li>
              <li>
                <strong>Category: </strong>
                {b.category}
              </li>
              <li>
                <strong>Number of Pages: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong>${b.price.toFixed(2)}
              </li>
            </ul>

            <button className="btn btn-success" onClick={() => handleToCart(b)}>
              Add Book
            </button>
          </div>
        </div>
      ))}

      <div className="pagination">
        <button
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
          className="btn btn-primary"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPageNum(i + 1)}
            disabled={pageNum === i + 1}
            className="btn btn-outline-secondary"
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
          className="btn btn-primary"
        >
          Next
        </button>
      </div>

      <br />
      <label>
        Results Per Page:
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageNum(1);
          }}
          className="form-select"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>

      <br />
      <label>
        Sort By Title:
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="form-select"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </>
  );
}

export default BookLists;
