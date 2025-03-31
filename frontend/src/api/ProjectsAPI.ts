import { Books } from '../types/Books';

interface FetchBooksResponse {
  Books(books: any): unknown;
  projects: Books[];
  totalNumBooks: number;
}

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  sortOrder: string, // <- string is most flexible and appropriate here
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `categories=${encodeURIComponent(cat)}`)
      .join('&');

    const response = await fetch(
      `https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${categoryParams.length ? `&${categoryParams}` : ''}`
    );

    //Error handling
    if (!response.ok) {
      throw new Error('Failed to fetch Books');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};
