import { instance } from '.';
import { booksInterface } from '../types/types';

export const getBooksByCategory = async (id?: number): Promise<booksInterface []> => {
  try {
    const response = await instance(`/books/get_by_category/${id}`);
    const books = await response.data;
    return books;
      
  } catch(e) {
    console.log(e);
    return [];
  }
};