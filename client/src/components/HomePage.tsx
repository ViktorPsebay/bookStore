import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkToken } from '../api/checkToken';

export const HomePage = ():JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = 'Bearer ' + localStorage.getItem('userToken');

    dispatch(checkToken(token));
 
  });
  return (<h1>Home Page</h1>);
};