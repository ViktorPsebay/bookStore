import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserInStore } from '../api/setUser';

export const HomePage = ():JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = 'Bearer ' + localStorage.getItem('userToken');

    dispatch(setUserInStore(token));
 
  });
  return (<h1>Home Page</h1>);
};