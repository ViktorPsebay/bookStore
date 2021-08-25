import { instance } from '.';
// import { booksInterface } from '../types/types';

export const getRatingForBook = async (id: string): Promise<number> => {
  try {
    const response = await instance(`/books/get_rates/${id}`);
    const rate = await response.data.avg;
    console.log(rate);
    return rate;
      
  } catch(e) {
    console.log(e);
    return 0;
  }
};