import { instance } from '.';
import { authorsInterface, booksInterface } from '../types/types';

export const getBooksByAuthor = async (id?: number): Promise<booksInterface []> => {
  try {
    const response = await instance(`/book_authors/by_author/${id}`);
    const books: {
      id: number,
      book: booksInterface,
      author: authorsInterface,
    } [] = await response.data;
    return books.map(book => book.book);
      
  } catch(e) {
    console.log(e);
    return [];
  }
};