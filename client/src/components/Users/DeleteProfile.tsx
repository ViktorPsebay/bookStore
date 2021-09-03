import React from 'react';

import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUsers } from '../../api/userAPI';
import { useSelector } from 'react-redux';
import { usersInterface } from '../../types/types';
import { Box, TextField, Typography } from '@material-ui/core';

import styled from 'styled-components';

export const DeleteProfile =  ():JSX.Element => {
  const dispatch = useDispatch();
  interface RootState {
    authUser: usersInterface,
  }  
  const authUser = useSelector((state: RootState) => state.authUser) || 0;  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { password, email} = e.currentTarget;

    interface userInter {
      id: number,
      email: string,
      password: string,
    }
    
    const user: userInter = {
      id: authUser.id,
      email: email.value,
      password: password.value,
    };
    
    const token = 'Bearer ' + localStorage.getItem('userToken');
    dispatch(deleteUsers(user, token)); 
  };

  return (
    <Box>      
      <Form onSubmit={handleSubmit}>
        <PageTitle>
          <Typography variant="h6">Удалить профиль</Typography>
        </PageTitle>
       
        <TextField
          size='small'
          variant='outlined'
          required 
          type="email" 
          name="email"
          defaultValue={authUser.email}
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
        
        <br /><Button type="submit" value="Удалить" />
      </Form>
    </Box>
  
  );
};

const Button = styled.input`
  width: 106px;
  height: 30px;
  border: solid 1px lightgrey;
  border-radius: 5px;
  margin: 40px;
  color: #fff;
  background-color: #3f51b5;
`;

const Form = styled.form`
  padding: 70px 40vw;
`;

const PageTitle = styled.div`
  text-align: center;
  padding: 20px;
`;