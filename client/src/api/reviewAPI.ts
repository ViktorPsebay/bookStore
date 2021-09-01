import { instance } from '.';
import { booksInterface, reviewInterface, usersInterface } from '../types/types';

export const getReviews = async (id: number): Promise<reviewInterface[] | null> => {
  try {
    const response = await instance(`/reviews/by_book/${id}`);
    
    console.log(response.data);
    const reviews: {
      id: number,
      textOfReview: string,
      book: booksInterface,
      user: usersInterface,
    }[] = response.data;
    return reviews.map(review => (
      {
        id: review.id,
        bookId: review.book.id,
        userId: review.user.id,
        textOfReview: review.textOfReview,}
    ));

  } catch(e) {
    console.log(e);
    return null;
  }
};

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