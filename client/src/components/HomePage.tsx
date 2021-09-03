import React from 'react';
import { Redirect } from 'react-router-dom';

export const HomePage = ():JSX.Element => {
  return (<Redirect
    to={{
      pathname: '/favorites'
    }}
  />);
};