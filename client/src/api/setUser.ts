import { Dispatch } from 'react';
import { Action } from 'redux';
import { instance } from '.';
import { setUser } from '../store/action';

export const setUserInStore = (token: string) => {
  return async (dispatch: Dispatch<Action>): Promise<boolean> => {
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
      return true;
    } catch(e) {
      console.log(e);
      return false;
    }
  };
};