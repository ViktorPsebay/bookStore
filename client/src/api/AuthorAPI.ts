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

export const postAuthor = async (name: {name: string}): Promise<number> => {
  try {
    const response = await instance.post('/authors/', name);
    
    console.log(response.data);
    if (response.status === 200) 
      return response.data.id;
    return -1;
  } catch(e) {
    console.log(e);
    return -1;
  }
};
