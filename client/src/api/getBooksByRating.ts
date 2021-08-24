import { instance } from '.';
import { booksInterface } from '../types/types';

export const getBooksByRating = async (rate?: number): Promise<booksInterface []> => {
  try {
    const response = await instance(`/books/get_by_rate/${rate}`);
    const books = await response.data;
    return books;
      
  } catch(e) {
    console.log(e);
    return [];
  }
};