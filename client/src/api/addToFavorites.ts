import { instance } from '.';

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