import React from 'react';
import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUsers } from '../../api/editUser';
import { usersInterface } from '../../types/types';
import styled from 'styled-components';
import { Box, TextField } from '@material-ui/core';

export const EditProfile =  ():JSX.Element => {
  const dispatch = useDispatch();

  interface RootState {
    authUser: usersInterface,
  }  
  const authUser = useSelector((state: RootState) => state.authUser) || 0;  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const {userName, email, birthday} = e.currentTarget;  
    const user = {
      id: authUser.id,
      fullName: userName.value,
      email: email.value,
      birthday: birthday.value,
    };
    
    const token = 'Bearer ' + localStorage.getItem('userToken');
    dispatch(editUsers(user, token));
  };

  return (
    <Box>
      <PageTitle>Редактировать профиль</PageTitle>
      <Form onSubmit={handleSubmit}>
       
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
          type="email" 
          name="email"
          defaultValue={authUser.email}
          label="email"
        /><br /><br />
        
        <TextField
          size='small'
          variant='outlined'
          required
          type="date"
          name="birthday"
          defaultValue={authUser.birthday?.toString()}
          label="дата рождения"
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

const PageTitle = styled.h1`
font-family: 'Roboto';
text-align: center;
padding: 20px;
`;