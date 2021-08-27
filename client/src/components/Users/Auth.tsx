import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { FormEvent } from 'react';
import { authUser } from '../../api/auth';
import { Form } from '../../styledComponents/Form';

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
        
        <Button type='submit' variant="contained" color="secondary" style={{marginTop: '20px'}}>Войти</Button>
      </Form>
    </div>
  );
};
