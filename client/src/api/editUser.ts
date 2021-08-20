import { Dispatch } from 'react';
import { Action } from 'redux';
import { editUser } from '../store/action';
import { instance } from '.';
import { usersInterface } from '../types/types';

export const editUsers = (user: usersInterface, token: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {   
    const response = await instance.put('/users', user, {     
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
        fullName: user.fullName,
        email: user.email,
        birthday: user.birthday,
      }];
      dispatch(editUser(users));
      document.location.href = 'http://localhost:3000/';
    }
    else {
      alert(result.message);
    }
  };
};