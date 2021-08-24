import { instance } from '.';
import { booksInterface } from '../types/types';

export const getBooksByPrice = async (price?: number): Promise<booksInterface []> => {
  try {
    const response = await instance(`/books/get_by_price/${price}`);
    const books = await response.data;
    return books;
      
  } catch(e) {
    console.log(e);
    return [];
  }
};