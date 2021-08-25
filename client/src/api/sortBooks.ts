import { instance } from '.';
import { authorsInterface, booksInterface } from '../types/types';

export const sortBooks = async (criterion: string): Promise<booksInterface []> => {
  try {
    const response = await instance(`/books/sort/${criterion}`);
    const books: booksInterface[] = await response.data;
    return books;
      
  } catch(e) {
    console.log(e);
    return [];
  }
};