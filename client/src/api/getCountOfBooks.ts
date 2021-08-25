import { instance } from '.';

export const getCountOfBooks = async (): Promise<number>=> {
  try {
    const response = await instance('books/count/book');
    const books = await response.data;
    return books;
      
  } catch(e) {
    console.log(e);
    return 0;
  }
};