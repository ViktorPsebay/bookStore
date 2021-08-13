import React from 'react';
import { UsersList } from './UsersList';
import { useSelector, useDispatch } from 'react-redux';
import { usersInterface } from '../types/types';
import { getUsers } from '../api/getUsers';

export const Users =  ():JSX.Element => {
  interface RootState {
    users: usersInterface[]
  }

  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.users);

  return (
    <div className="App">     
      <UsersList users={users} />
      <button onClick={() => dispatch(getUsers())}>список пользователей</button>
    </div>
  );
};