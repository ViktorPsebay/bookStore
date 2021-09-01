import React from 'react';

import { Button, TextField, Typography } from '@material-ui/core';
import { FormEvent } from 'react';
import { authUser } from '../../api/userAPI';
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
      <div style={{textAlign: 'center', padding: '30px'}}>
        <Typography variant="h6">Авторизация</Typography>
      </div>
      <Form action="" onSubmit={handleSubmit}>
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

