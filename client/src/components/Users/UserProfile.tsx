import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../../api/logout';
import { setUserInStore } from '../../api/setUser';
import { VoidLink } from '../../styledComponents/VoidLink';
import { usersInterface } from '../../types/types';

export const UserProfile = ():JSX.Element => {
  interface RootState {
    authUser: usersInterface
  }
  const user = useSelector((state: RootState) => state.authUser);

  const dispatch = useDispatch();
  
  useEffect(() => {
    const token = 'Bearer ' + localStorage.getItem('userToken');

    dispatch(setUserInStore(token));
 
  }, []);  

  return (
    <Box color="text.primary">
      {(user !== null) ?
        (<div>
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
        </div>) : (<Box></Box>)}    
      
    </Box>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;