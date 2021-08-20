import React from 'react';
import { FormEvent } from 'react';
import { Form } from '../styledComponents/Form';
import { useDispatch, useSelector } from 'react-redux';
import { editUsers } from '../api/editUser';
import { usersInterface } from '../types/types';

export const EditProfile =  ():JSX.Element => {
  const dispatch = useDispatch();

  interface RootState {
    authUser: usersInterface,
  }  
  const id = useSelector((state: RootState) => state.authUser.id) || 0;  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const {userName, password, email, birthday} = e.currentTarget;  
    const user = {
      id,
      fullName: userName.value,
      email: email.value,
      password: password.value,
      birthday: birthday.value,
    };
    
    const token = 'Bearer ' + localStorage.getItem('userToken');
    dispatch(editUsers(user, token));
  };

  return (
    <div>
      <Form action="" onSubmit={handleSubmit}>
        <label className="label">Заполните форму</label>
        <input type="text" name="userName" placeholder="Введите ваше имя"/>
        <input type="email" name="email" placeholder="Введите ваш email"/>
        <input type="password" name="password" placeholder="Введите ваш пароль"/>
        <input type="date" name="birthday" placeholder="Введите дату рождения"/>
        <button>Редактировать</button>
      </Form>
    </div>
  );
};
