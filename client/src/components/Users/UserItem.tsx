import React from 'react';
import { usersInterface } from '../../types/types';

interface UserItemProps {
  user: usersInterface,
}

export const UserItem = ({user}: UserItemProps):JSX.Element => {
  return (
    <div style={{border: '2px solid green'}}>
      <h3>{user.fullName}</h3>
      <h4>{user.email}</h4>
    </div>
  );
};