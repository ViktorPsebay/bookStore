import { Dispatch } from 'react';
import { Action } from 'redux';
import { addUsers, deleteUser, editUser, setUser } from '../store/action';
import { instance } from '.';
import { usersInterface } from '../types/types';

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

export const setUserInStore = (token: string) => {
  return async (dispatch: Dispatch<Action>): Promise<boolean> => {
    try {
      const response = await instance('/users/token/check', {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'authorization': token
        }
      });

      if (response.status !== 200) return false;
      
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

export const authUser = async (user: {
  email: string,
  password: string,
}): Promise<void> => {
  const response = await instance.post('/users/login', user);    
  const result = await response.data;
  if (response.status == 200) {
    localStorage.setItem('userToken', result);
    console.log(result);
    document.location.href = 'http://localhost:3000/';
  }
  else {
    alert(result.message);
  }    
};


export const logout = (): void => {
  localStorage.setItem('userToken', '');
  document.location.href = 'http://localhost:3000/';
};


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

export const getOneUser = async (token: string): Promise<usersInterface> => {
  
  try {
    const response = await instance('/users/token/check', {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': token
      }
    });      
    
    if (response.status === 200) return response.data;
    return {id:-1, email:''};
  } catch(e) {
    console.log(e);
    return {id:-1, email:''};
  }

};