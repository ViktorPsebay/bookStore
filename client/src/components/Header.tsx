import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { usersInterface } from '../types/types';
import { useState } from 'react';
import { Modal } from './Users/Modal';
import { modesOfLogin } from '../consts';
import { VoidLink } from '../styledComponents/VoidLink';
import styled, { css } from 'styled-components';

export const Header = ():JSX.Element => {

  const [visibility, setVisibility] = useState(false);
  const [login, setLogin] = useState(modesOfLogin.authorization);

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
  return (
    <nav>
      <NavBar>
        <li>
          <Link to="/">Дом</Link>
        </li>
        {/* <li>
          <Link to="/users">Пользователи</Link>
        </li> */}
        <li>
          <Link to="/books">Книги</Link>
        </li>        
        {/* <li>
          <Link to="/private">Приватная страница</Link>
        </li> */}
        {isAuth ? (
          <li>
            <Link to="/profile"><img src='/image/avatar.webp' style={{width: '25px'}}/></Link>
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
      {visibility ? (<Modal mode={login} clickModalHandler={clickModalHandler} />) : null}
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
