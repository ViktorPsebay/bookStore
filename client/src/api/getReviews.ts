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
