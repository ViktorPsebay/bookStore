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

export const postCategory = async (nameOfCategory: {nameOfCategory: string}): Promise<number> => {
  try {
    const response = await instance.post('/categories/', nameOfCategory);
    
    console.log(response.data);
    if (response.status === 200) 
      return response.data.id;
    return -1;
  } catch(e) {
    console.log(e);
    return -1;
  }
};
