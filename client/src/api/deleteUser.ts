import { Dispatch } from 'react';
import { Action } from 'redux';
import { deleteUser } from '../store/action';
import { instance } from '.';

export const deleteUsers = (user: {
  id: number,
  email: string,
  password: string,
}, token: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
   
    const response = await instance.delete(`/users/${user.id}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': token
      }
    });
    
    const result = await response.data;
    

    if (response.status == 200) {
      console.log(result);
      const users = [{
        id: user.id,
        email: user.email,
      }];
      dispatch(deleteUser(users));
      document.location.href = 'http://localhost:3000/';
    }
    else {
      alert(result.message);
    }
  };
};