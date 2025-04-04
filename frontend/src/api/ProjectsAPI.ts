import { Books } from '../types/Books';

interface FetchBooksResponse {
  books(books: any): unknown;
  Books(books: any): unknown;
  projects: Books[];
  totalNumBooks: number;
}

const API_URL =
  'https://bookproject-nouanounou-backend-fmehb9fheqgcezc5.eastus-01.azurewebsites.net/Book';

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
      `${API_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${categoryParams.length ? `&${categoryParams}` : ''}`
    );

    //Error handling
    if (!response.ok) {
      throw new Error('Failed to fetch Books');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const addBook = async (newBook: Books): Promise<Books> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error('Failed to add book');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding book', error);
    throw error;
  }
};

export const updateBooks = async (
  bookID: number,
  updatedBook: Books
): Promise<Books> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBooks/${bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

export const deleteBooks = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBooks/${bookID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(
      `Delete request sent for book ${bookID}, status: ${response.status}`
    );

    if (!response.ok) {
      throw new Error(`Failed to delete book: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
