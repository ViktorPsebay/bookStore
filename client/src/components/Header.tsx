import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { usersInterface } from '../types/types';
import { NavBar } from '../styledComponents/NavBar';
import { useState } from 'react';
import { Modal } from './Modal';
import { modesOfLogin } from '../consts';
import { VoidLink } from '../styledComponents/VoidLink';

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
        <li>
          <Link to="/users">Пользователи</Link>
        </li>        
        <li>
          <Link to="/private">Приватная страница</Link>
        </li>
        {isAuth ? (
          <li>
            <Link to="/profile">Профиль</Link>
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
