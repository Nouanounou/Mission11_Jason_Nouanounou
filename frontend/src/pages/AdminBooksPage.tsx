import { useEffect, useState } from 'react';
import { Books } from '../types/Books';
import { fetchBooks } from '../api/ProjectsAPI';

const AdminBooksPage = () => {
  const [books, setBooks] = useState<Books[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks(10, 1, []); //Default for now
        setBooks(data.books);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
  }, []);
};

export default AdminBooksPage;
