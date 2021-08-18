import React from 'react';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { authUser } from '../api/auth';
import { postUsers } from '../api/postUser';
import {  Form, Label } from '../styledComponents/Form';

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
      <Form action="" onSubmit={handleSubmit}>
        <h3>Регистрация</h3>
        <Label>Имя:</Label>
        <input type="text" name="userName" placeholder="Введите ваше имя"/>
        <Label>email:</Label>
        <input type="email" name="email" placeholder="Введите ваш email"/>
        <Label>пароль:</Label>
        <input type="password" name="password" placeholder="Введите ваш пароль"/>
        <Label>Повторите пароль:</Label>
        <input type="password" name="againPassword" placeholder="Повторите пароль"/>
        <Label>Укажите дату рождения:</Label>
        <input type="date" name="birthday" placeholder="Введите дату рождения"/>
        <button style={{marginTop: '20px'}}>Зарегистрироваться</button>
      </Form>
    </div>
  );
};