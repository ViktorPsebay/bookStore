import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { usersInterface } from '../types/types';
import '../style/header.css';

export const Header = ():JSX.Element => {
  interface RootState {
    authUser: usersInterface | null
  }

  const isAuth = useSelector((state: RootState) => state.authUser);
  return (
    <nav>
      <ul className="navBar">
        {isAuth ? (
          <li>
            <Link to="/profile">Профиль</Link>
          </li>
        ) : (
          <div>
            <li>
              <Link to="/registration">Регистрация</Link>
            </li>
            <li>
              <Link to="/auth">Авторизация</Link>
            </li>
          </div>
        )
        }       
        <li>
          <Link to="/">Дом</Link>
        </li>
        <li>
          <Link to="/users">Пользователи</Link>
        </li>
        <li>
          <Link to="/editing">Редактирование</Link>
        </li>
        <li>
          <Link to="/deleting">Удаление</Link>
        </li>
        <li>
          <Link to="/private">Приватная страница</Link>
        </li>
      </ul>
    </nav>
  );
};
