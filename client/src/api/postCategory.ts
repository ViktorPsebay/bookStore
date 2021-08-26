import { instance } from '.';

export const postCategory = async (nameOfCategory: {nameOfCategory: string}): Promise<number> => {
  try {
    const response = await instance.post('/categories/', nameOfCategory);
    
    console.log(response.data);
    if (response.status === 200) 
      return response.data.id;
    return -1;
  } catch(e) {
    console.log(e);
    return -1;
  }
};
