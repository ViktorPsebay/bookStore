import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkToken } from '../api/userAPI';

export const ProtectedRoute = ({ children, ...rest }: {children: JSX.Element, path: string}): JSX.Element => {
 
  const [hasRight, setRight] = useState(true);

  const check = async () => {
    const token = 'Bearer ' + localStorage.getItem('userToken');    
    const check = await checkToken(token);
    setRight(check);
  };

  useEffect(() => {        
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