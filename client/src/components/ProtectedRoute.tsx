import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { usersInterface } from '../types/types';


export const ProtectedRoute = ({ children, ...rest }: {children: JSX.Element, path: string}): JSX.Element => {
  interface RootState {
    authUser: usersInterface | null
  }

  const isAuth = useSelector((state: RootState) => state.authUser);
  
  return (
    <Route
      {...rest}
      render={() =>
        isAuth ? (
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