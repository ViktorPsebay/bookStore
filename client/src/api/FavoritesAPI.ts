import { instance } from '.';
import { booksInterface, favoritesInterface } from '../types/types';

export const getFavorites = async (id: number): Promise<booksInterface []> => {
  try {
    const response = await instance(`/favorites/by_user/${id}`);
    const favorites = await response.data;
    const books: booksInterface[] = favorites.map((item: favoritesInterface) => item.book);
    return books.filter(book => book);
      
  } catch(e) {
    console.log(e);
    return [];
  }
};

export const addToFavorites = async (adding: {
  userId: number,
  bookId: number,
}): Promise<void> => {
  try {
    const response = await instance.post('/favorites/', adding);
      
    console.log(response.data);
    alert(response.data);
  } catch(e) {
    console.log(e);
  }
};

export const removeFromFavorites = async (removing: {
  userId: number,
  bookId: number,
}): Promise<void> => {
  try {
    const id = await instance.post('/favorites/get_id', removing);

    const response = await instance.delete(`/favorites/${id.data.id}`);
      
    console.log(response.data);
  } catch(e) {
    console.log(e);
  }
};