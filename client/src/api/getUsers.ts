import { Dispatch } from 'react';
import { Action } from 'redux';
import { addUsers } from '../store/action';
import { instance } from '.';

export const getUsers = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const response = await instance('/users');
      const users = await response.data;
      dispatch(addUsers(users));
    } catch(e) {
      console.log(e);
    }
  };
};
