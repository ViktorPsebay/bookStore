import React from 'react';
import { FormEvent } from 'react';
import { Form } from '../../styledComponents/Form';
import { useDispatch } from 'react-redux';
import { deleteUsers } from '../../api/deleteUser';
import { useSelector } from 'react-redux';
import { usersInterface } from '../../types/types';

export const DeleteProfile =  ():JSX.Element => {
  const dispatch = useDispatch();
  interface RootState {
    authUser: usersInterface,
  }  
  const id = useSelector((state: RootState) => state.authUser.id) || 0;  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { password, email} = e.currentTarget;

    interface userInter {
      id: number,
      email: string,
      password: string,
    }
    
    const user: userInter = {
      id,
      email: email.value,
      password: password.value,
    };
    
    const token = 'Bearer ' + localStorage.getItem('userToken');
  

    dispatch(deleteUsers(user, token));
 
  };

  return (
    <div>
      <Form action="" onSubmit={handleSubmit}>
        <label className="label">Заполните форму</label>
        <input type="email" name="email" placeholder="Введите ваш email"/>
        <input type="password" name="password" placeholder="Введите ваш пароль"/>       
        <button>удалить</button>
      </Form>
    </div>
  );
};
