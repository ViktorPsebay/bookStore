import { Box, List, ListItem } from '@material-ui/core';
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
          <List style={{marginLeft: 0, paddingLeft: 0}}>
            <ListItem>
              <Link to="/editing">Редактировать профиль</Link>
            </ListItem>
            <ListItem>
              <Link to="/deleting">Удалить профиль</Link>
            </ListItem>
            {/* <Li>
              <Link to="/favorites">Избранное</Link>
            </Li> */}
            <ListItem>
              <Link to="/add_book">Добавить книгу</Link>
            </ListItem>
            <ListItem>
              <VoidLink onClick={() => {logout();}}>Выйти</VoidLink>  
            </ListItem>     
          </List>
        </div>) : (<Box></Box>)}    
      
    </Box>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Li = styled.li`
  list-style-type: circle;
  padding: 20px 0;

`;