import { instance } from '.';
import { bookAuthorInterface } from '../types/types';

export const postBookAuthor =  async (bookAuthor: bookAuthorInterface): Promise<void> => {
  try {
    const response = await instance.post('/book_authors/', bookAuthor);
      
    console.log(response.data);
    
  } catch(e) {
    console.log(e);
  }
};
