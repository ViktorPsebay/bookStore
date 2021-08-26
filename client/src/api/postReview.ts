import { instance } from '.';
import { reviewInterface } from '../types/types';

export const postReview = async (review: reviewInterface): Promise<void> => {
  try {
    const response = await instance.post('/reviews/', review);
      
    console.log(response.data);
    
  } catch(e) {
    console.log(e);
  }
};
