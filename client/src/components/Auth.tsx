import React from 'react';
import { FormEvent } from 'react';
import '../style/main.css';
import { authUser } from '../api/auth';

export const Auth =  ():JSX.Element => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const {password, email} = e.currentTarget;  
    const user = {
      email: email.value,
      password: password.value,
    };
    
    authUser(user);
  };

  return (
    <div>
      <form action=""
        onSubmit={handleSubmit}
        className="main">
        <label className="label">Заполните форму</label>
        <input type="email" name="email" placeholder="Введите ваш email"/>
        <input type="password" name="password" placeholder="Введите ваш пароль"/>
        <button>Войти</button>
      </form>
    </div>
  );
};