import React from 'react';

import { Box, List, ListItem, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../api/userAPI';
import { VoidLink } from '../../styledComponents/VoidLink';
import { usersInterface } from '../../types/types';

import styled from 'styled-components';

export const UserProfile = ():JSX.Element => {
  interface RootState {
    authUser: usersInterface
  }
  const user = useSelector((state: RootState) => state.authUser);

  return (
    <Box color="text.primary">
      {(user !== null) ?
        (<div>
          <Typography variant="h4">Hello, {user.fullName}</Typography>
          <List style={{marginLeft: 0, paddingLeft: 0}}>
            <ListItem> 
              <Link component={NavElement} to="/editing">
                <Typography variant="body1">Редактировать профиль</Typography>
              </Link>
            </ListItem>

            <ListItem>
              <Link component={NavElement} to="/deleting">
                <Typography variant="body1">Удалить профиль</Typography>
              </Link>
            </ListItem>

            <ListItem>
              <Link component={NavElement} to="/add_book">
                <Typography variant="body1">Добавить книгу</Typography>
              </Link>
            </ListItem>

            <ListItem>
              <VoidLink onClick={() => {logout();}}>
                <Typography variant="body1">Выйти</Typography>
              </VoidLink>  
            </ListItem>     
          </List>
        </div>) 
        :
        (<Box></Box>)}      
    </Box>
  );
};

const NavElement = styled.a`
  text-decoration: none;
  &:visited {
    color: black;
  }
  &:hover {
    color: gray;
  }
`;
