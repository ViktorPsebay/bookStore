import React from 'react';

import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUsers } from '../../api/userAPI';
import { usersInterface } from '../../types/types';
import { Box, TextField, Typography } from '@material-ui/core';

import styled from 'styled-components';

export const EditProfile = ():JSX.Element => {
  const dispatch = useDispatch();

  interface RootState {
    authUser: usersInterface,
  } 
  const token = 'Bearer ' + localStorage.getItem('userToken');
  
  const authUser = useSelector((state: RootState) => state.authUser) || 0;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const {userName, birthday} = e.currentTarget;
    const user = {
      id: authUser.id,
      fullName: userName.value,
      email: authUser.email,
      birthday: birthday.value,
    };
    
    dispatch(editUsers(user, token));
  };

  return (
    <Box>
      <Form onSubmit={handleSubmit}>
        <PageTitle>
          <Typography variant="h6">Редактировать профиль</Typography>
        </PageTitle>
       
        <TextField 
          size='small'
          variant='outlined' 
          required
          type="text"
          name="userName" 
          defaultValue={authUser.fullName}
          label="Имя"
        /><br /><br />
       
        <TextField
          size='small'
          variant='outlined'
          required
          type="date"
          name="birthday"
          defaultValue={authUser.birthday?.toString()}
        /><br /><br />
        
        <br /><Button type="submit" value="Изменить" />
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