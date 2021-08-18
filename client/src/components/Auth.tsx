import React from 'react';
import { FormEvent } from 'react';
import { authUser } from '../api/auth';
import { Form } from '../styledComponents/Form';

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
      <Form action="" onSubmit={handleSubmit}>
        <h3 className="label">Авторизация</h3>
        <label>email:</label>
        <input type="email" name="email" placeholder="Введите ваш email"/>
        <label>пароль:</label>
        <input type="password" name="password" placeholder="Введите ваш пароль"/>
        <button style={{marginTop: '20px'}}>Войти</button>
      </Form>
    </div>
  );
};
