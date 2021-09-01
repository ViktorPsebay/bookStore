import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { setUserInStore, checkToken } from '../api/userAPI';

export const ProtectedRoute = ({ children, ...rest }: {children: JSX.Element, path: string}): JSX.Element => {
 
  const dispatch = useDispatch();
  const [hasRight, setRight] = useState(true);

  const check = async () => {
    const token = 'Bearer ' + localStorage.getItem('userToken');    
    const check = await checkToken(token);
    setRight(check);
  };

  useEffect(() => {        
    const token = 'Bearer ' + localStorage.getItem('userToken');
    dispatch(setUserInStore(token));
    check();
  }, []);
  
  return (
    <Route
      {...rest}
      render={() =>
        hasRight ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/auth'
            }}
          />
        )
      }
    />
  );
};