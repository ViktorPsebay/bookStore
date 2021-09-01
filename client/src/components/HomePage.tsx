import React from 'react';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setUserInStore } from '../api/userAPI';

export const HomePage = ():JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = 'Bearer ' + localStorage.getItem('userToken');

    dispatch(setUserInStore(token));
 
  });
  
  return (<Redirect
    to={{
      pathname: '/favorites'
    }}
  />);
};