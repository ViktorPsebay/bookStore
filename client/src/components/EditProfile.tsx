import React from 'react';
import { FormEvent } from 'react';
import { Form } from '../styledComponents/Form';
import { useDispatch } from 'react-redux';
import { editUsers } from '../api/editUser';

export const EditProfile =  ():JSX.Element => {
  const dispatch = useDispatch();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const {userName, password, email, birthday} = e.currentTarget;  
    const user = {
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
