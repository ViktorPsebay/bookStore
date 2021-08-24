import React from 'react';
import { usersInterface } from '../../types/types';
import { UserItem } from './UserItem';

interface UsersListProps {
  users: usersInterface[],
}

export const UsersList = ({users}: UsersListProps):JSX.Element => {
  return (
    <div>
      {users.map(user => 
        <UserItem key={user.id} user={user} />)}
    </div>
  );
};