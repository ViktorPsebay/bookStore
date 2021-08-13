import React from 'react';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { authUser } from '../api/auth';
import { postUsers } from '../api/postUser';
import '../style/main.css';

export const Registration =  ():JSX.Element => {

  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const {userName, password, againPassword, email, birthday} = e.currentTarget;
    if (password.value !== againPassword.value) {
      const label = e.currentTarget.querySelector('.label');
      if (label) {
        label.innerHTML = 'Пароли не совпадают';
      }      
      return;
    }
    
    const user = {
      fullName: userName.value,
      email: email.value,
      password: password.value,
      birthday: birthday.value,
    };
    
    dispatch(postUsers(user));
    authUser(user);
  };

  return (
    <div>
      <form action="" 
        onSubmit={handleSubmit}
        className="main">
        <label className="label">Заполните форму</label>
        <input type="text" name="userName" placeholder="Введите ваше имя"/>
        <input type="email" name="email" placeholder="Введите ваш email"/>
        <input type="password" name="password" placeholder="Введите ваш пароль"/>
        <input type="password" name="againPassword" placeholder="Повторите пароль"/>
        <input type="date" name="birthday" placeholder="Введите дату рождения"/>
        <button>Зарегистрироваться</button>
      </form>
    </div>
  );
};