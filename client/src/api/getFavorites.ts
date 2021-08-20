import { instance } from '.';
import { booksInterface, favoritesInterface } from '../types/types';

export const getFavorites = async (id: number): Promise<booksInterface []> => {
  try {
    const response = await instance(`/favorites/by_user/${id}`);
    const favorites = await response.data;
    const books = favorites.map((item: favoritesInterface) => item.book);
    return books;
      
  } catch(e) {
    console.log(e);
    return [];
  }
};