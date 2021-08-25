import { instance } from '.';
import { booksInterface } from '../types/types';

export const getOneBookById = async (id: number): Promise<booksInterface> => {
  try {
    const response = await instance(`/books/${id}`);
    const book = await response.data;
    return book;
      
  } catch(e) {
    console.log(e);
    return {
      id: 0,
      title: '',
      price: 0,    
    };
  }
};