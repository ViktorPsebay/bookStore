import { Dispatch } from 'react';
import { Action } from 'redux';
import { instance } from '.';
import { setUser } from '../store/action';

// export const checkToken =  async ():Promise<boolean> => {
//   let hasToken = true;

//   const token = 'Bearer ' + localStorage.getItem('userToken');
//   try {
//     const response = await instance('http://localhost:5000/api/check', {
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//         'authorization': token
//       }
//     });
    
//     const result = response.data;
//     console.log(result);
//   } catch(e) {
//     console.log(e);
//     hasToken = false;
//   }
  

//   return hasToken;
// };

export const checkToken = (token: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const response = await instance('/users/check_token', {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'authorization': token
        }
      });
      
      const user = response.data;
      console.log(user);
      const users = user.id ? [{
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        birthday: user.birthday,
      }] : [];
      dispatch(setUser(users));
    } catch(e) {
      console.log(e);
    }
  };
};