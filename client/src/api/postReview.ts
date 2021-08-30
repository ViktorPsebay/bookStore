import { instance } from '.';
import { reviewInterface } from '../types/types';

export const postReview = async (review: reviewInterface): Promise<boolean> => {
  try {
    const response = await instance.post('/reviews/', review);
    if (response.status === 200) return true;
    return false;
    
  } catch(e) {
    console.log(e);
    return false;
  }
};
