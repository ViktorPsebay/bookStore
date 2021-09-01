import React, { useEffect } from 'react';
import { UsersList } from './UsersList';
import { useSelector, useDispatch } from 'react-redux';
import { usersInterface } from '../../types/types';
import { getUsers, setUserInStore } from '../../api/userAPI';

export const Users =  ():JSX.Element => {
  interface RootState {
    users: usersInterface[]
  }
  const dispatch = useDispatch();

  useEffect(() => {
    const token = 'Bearer ' + localStorage.getItem('userToken');

    dispatch(setUserInStore(token));
 
  });

  const users = useSelector((state: RootState) => state.users);

  return (
    <div className="App">     
      <UsersList users={users} />
      <button onClick={() => dispatch(getUsers())}>список пользователей</button>
    </div>
  );
};