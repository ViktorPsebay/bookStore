import { instance } from '.';
import { booksRequestInterface } from '../types/types';

export const postBook = async (book: booksRequestInterface): Promise<number> => {
  try {
    const response = await instance.post('/books/', book);
      
    console.log(response.data);
    return response.data.id;
  } catch(e) {
    console.log(e);
    return 0;
  }
};
