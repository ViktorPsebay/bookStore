import { Dispatch } from 'react';
import { Action } from 'redux';
import { addUsers } from '../store/action';
import { instance } from '.';

export const postUsers = (user: {
  fullName: string,
  email: string,
  password: string,
  birthday: Date,
}) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const response = await instance.post('/users/registration', user);
      
      console.log(response.data);
      if(response.status !== 200) return alert(response.data.message);
      const users = [{ 
        id: response.data.id, 
        fullName: response.data.fullName, 
        email: response.data.email, 
        birthday: response.data.birthday
      }];

      console.log(users);   

      dispatch(addUsers(users));
    } catch(e) {
      console.log(e);
      return alert(e.response.data.message);
    }
  };
};