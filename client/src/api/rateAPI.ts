import { instance } from '.';
import { ratesInterface } from '../types/types';

export const postRate = async (rating: ratesInterface): Promise<void> => {
  try {
    const response = await instance.post('/rates/', rating);
      
    console.log(response.data);
  } catch(e) {
    console.log(e);
  }
};
