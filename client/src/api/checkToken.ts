import { instance } from '.';

export const checkToken = async (token: string): Promise<boolean> => {
  
  try {
    const response = await instance('/users/token/check', {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': token
      }
    });      
    
    if (response.status === 200) return true;
    return false;
  } catch(e) {
    console.log(e);
    return false;
  }

};