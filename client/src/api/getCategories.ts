import { instance } from '.';
import { categoriesInterface } from '../types/types';

export const getCategories = async (): Promise<categoriesInterface []> => {
  try {
    const response = await instance('/categories');
    const books = await response.data;
    return books;
      
  } catch(e) {
    console.log(e);
    return [];
  }
};