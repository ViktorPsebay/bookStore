import { instance } from '.';

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