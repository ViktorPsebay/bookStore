import React from 'react';

import { Button, TextField, Typography } from '@material-ui/core';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { authUser, postUsers } from '../../api/userAPI';
import {  Form, Label } from '../../styledComponents/Form';

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
      birthday: birthday.value || null,
    };
    
    dispatch(postUsers(user));
    authUser(user);
  };

  return (
    <div>
      <Form action="" onSubmit={handleSubmit}>
        <div style={{textAlign: 'center', padding: '30px'}}>
          <Typography variant="h6">Авторизация</Typography>
        </div>
        
        <TextField 
          size='small'
          variant='outlined' 
          required
          type="text"
          name="userName" 
          label="Имя"
        /><br /><br />

        <TextField 
          size='small'
          variant='outlined' 
          required
          type="email"
          name="email" 
          label="email"
        /><br /><br />

        <TextField
          size='small'
          variant='outlined'
          required
          type="password"
          name="password"          
          label="пароль"
        /><br /><br />

        <TextField
          size='small'
          variant='outlined'
          required
          type="password"
          name="againPassword"          
          label="Повторите пароль"
        /><br /><br />

        <Label>Укажите дату рождения:</Label>
        <TextField
          size='small'
          variant='outlined'
          type="date"
          required
          name="birthday"
        /><br /><div className='label' style={{height: '10px', color: 'red'}}></div><br />
        
        <Button type='submit' variant="contained" color="secondary" style={{marginTop: '20px'}}>Зарегистрироваться</Button>
      </Form>
    </div>
  );
};