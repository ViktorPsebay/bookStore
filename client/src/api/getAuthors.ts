import { instance } from '.';
import { authorsInterface } from '../types/types';

export const getAuthors = async (): Promise<authorsInterface []> => {
  try {
    const response = await instance('/authors');
    const authors = await response.data;
    return authors;
      
  } catch(e) {
    console.log(e);
    return [];
  }
};