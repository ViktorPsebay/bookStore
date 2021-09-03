import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { booksInterface, usersInterface } from '../types/types';
import { useState } from 'react';
import { Modal } from './Users/Modal';
import { modesOfLogin } from '../consts';
import { VoidLink } from '../styledComponents/VoidLink';

import styled, { css } from 'styled-components';
import { Badge, Menu, MenuItem, Button } from '@material-ui/core';

import { setUserInStore } from '../api/userAPI';
import { getOneBookById } from '../api/bookAPI';
import { NotificationItem } from './Notifications/NotificationsItem';

interface headerProps {
  booksId: number[];
}

export const Header = ({booksId}: headerProps):JSX.Element => {

  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(false);
  const [login, setLogin] = useState(modesOfLogin.authorization);

  const initialStateBook: string[] = [];
  const [books, setBooks] = useState(initialStateBook);

  const loadBooks = (booksId: number[]) => {
    const titles = booksId.map( (id) =>
      getOneBookById(id).then(res =>
        setBooks(prev =>
          [res.title, ...prev]
        )
      )
    );    
  };


  const clickAuthHandler = () => {
    setVisibility((true));
    setLogin(modesOfLogin.authorization);
  };

  const clickRegistrationHandler = () => {
    setVisibility((true));
    setLogin(modesOfLogin.registration);
  };

  const clickModalHandler = () => {
    setVisibility((false));
  };
  interface RootState {
    authUser: usersInterface | null
  }
  const isAuth = useSelector((state: RootState) => state.authUser);

  const countOfNewBooks = useSelector((state: {countOfNewBooks: number}) => state.countOfNewBooks);

  useEffect(() => {
    if (isAuth) return;
    const token = 'Bearer ' + localStorage.getItem('userToken');
    dispatch(setUserInStore(token));

    // loadBooks(booksId);
  }, []);



  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  // const loadBooks = (booksId: number[]) => {
  //   const titles = booksId.map( (id) =>
  //     getOneBookById(id).then(res =>
  //       setBooks(prev =>
  //         [{title: res.title,
  //           id
  //         }, ...prev]
  //       )
  //     )
  //   );    
  // };
  


  return (
    <nav style={{borderBottom: 'solid 1px gray'}}>
      <NavBar>
        <li>
          <Link component={NavElement} to="/">Дом</Link>
        </li>
        <li>
          <Link component={NavElement} to="/books">Книги</Link>
        </li>        
        {isAuth ? (
          <li>
            <Badge 
              badgeContent={countOfNewBooks}
              color="primary"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {/* <img 
                src='/image/ring.png'
                style={{width: '20px', padding: '0 15px 10px 0'}}
                type='button'
                onClick={handleClick}      
              /> */}
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <img 
                  src='/image/ring.png'
                  style={{width: '20px', padding: '0 15px 10px 0'}}                        
                />
              </Button>
             
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {booksId?.
                  map(id => 
                    <NotificationItem 
                      key={id}
                      handleClose={handleClose}
                      id={id}
                    />)}
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem> */}
              </Menu>
            </Badge>
           
            <Link component={NavElement} to="/favorites"><img src='/image/avatar.webp' style={{width: '25px'}}/></Link>
            
          </li>
        ) : (
          <div>
            <li onClick={clickRegistrationHandler}>
              <VoidLink>Регистрация</VoidLink>
            </li>
            <li onClick={clickAuthHandler}>
              <VoidLink>Авторизация</VoidLink>
            </li>
          </div>
        )
        }       
      </NavBar>
      {visibility
        ? 
        (<Modal mode={login} clickModalHandler={clickModalHandler} />) 
        :
        null
      }
    </nav>
  );
};

const NavBar = styled.ul`
  width: 100%;
  display: flex;
  justify-content:space-around;
  padding: 0;
  ${props =>
    props.children &&
    css`
     list-style-type: none; 
    `};
`;

const NavElement = styled.a`
  text-decoration: none;
  &:visited {
    color: black;
  }
  &:hover {
    color: gray;
  }
`;