import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../api/logout';
import { VoidLink } from '../../styledComponents/VoidLink';
import { usersInterface } from '../../types/types';

export const UserProfile = ():JSX.Element => {
  interface RootState {
    authUser: usersInterface
  }
  const user = useSelector((state: RootState) => state.authUser);

  return (
    <div>
      <h1>Hello, {user.fullName}</h1>
      <ul>
        <li>
          <Link to="/editing">Редактирование</Link>
        </li>
        <li>
          <Link to="/deleting">Удаление</Link>
        </li>
        <li>
          <Link to="/favorites">Избранное</Link>
        </li>
        <li>
          <Link to="/add_book">Добавить книгу</Link>
        </li>
        <li>
          <VoidLink onClick={() => {logout();}}>Выйти</VoidLink>  
        </li>     
      </ul>
      
    </div>
  );
};