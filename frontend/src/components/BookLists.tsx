import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Books } from '../types/Books';
import { CartItem } from '../types/CartItem';
import { fetchBooks } from '../api/ProjectsAPI';
import Pagination from './Pagination';

function BookLists({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Books[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const navigate = useNavigate();
  const { addToCart } = useCart();
  //Check for errors
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleToCart = (book: Books) => {
    const cartItem: CartItem = {
      bookID: book.bookID,
      title: book.title,
      price: book.price,
      quantity: 1,
      donationAmount: 0,
    };
    addToCart(cartItem);
    navigate('/cart');
  };

  //Trying this!

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          sortOrder,
          selectedCategories
        );
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: (error)</p>;

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

      <br />
      <div style={{ textAlign: 'center' }}>
        <label>
          Sort By Title:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="form-select w-auto d-inline-block ms-2"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default BookLists;
