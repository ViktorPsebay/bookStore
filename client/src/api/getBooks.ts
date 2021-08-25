import { instance } from '.';
import { booksInterface } from '../types/types';

export const getBooks = async (): Promise<booksInterface []> => {
  try {
    const response = await instance('/books/');
    const books = await response.data;
    return books;
      
  } catch(e) {
    console.log(e);
    return [];
  }
};