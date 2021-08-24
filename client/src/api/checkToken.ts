import { instance } from '.';

export const checkToken = async (token: string): Promise<boolean> => {
  
  try {
    const response = await instance('/users/token/check', {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': token
      }
    });
      
    const user = response.data;
    if (user) return true;
    return false;
  } catch(e) {
    console.log(e);
    return false;
  }

};