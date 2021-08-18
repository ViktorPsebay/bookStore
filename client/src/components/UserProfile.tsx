import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../api/logout';
import { VoidLink } from '../styledComponents/VoidLink';

export const UserProfile = ():JSX.Element => {

  return (
    <div>
      <h1>User Profile</h1>
      <ul>
        <li>
          <Link to="/editing">Редактирование</Link>
        </li>
        <li>
          <Link to="/deleting">Удаление</Link>
        </li>
        <li>
          <VoidLink onClick={() => {logout();}}>Выйти</VoidLink>  
        </li>     
      </ul>
      
    </div>
  );
};