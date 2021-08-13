import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Auth } from './Auth';
import { EditProfile } from './EditProfile';
import { DeleteProfile } from './DeleteProfile';
import { Registration } from './Registration';
import { Users } from './Users';
import { ProtectedRoute } from './ProtectedRoute';
import { ProtectedPage } from './ProtectedPage';
import { HomePage } from './HomePage';
import { UserProfile } from './UserProfile';

export const Main = ():JSX.Element => {
  return (
    <Switch>
      <Route path="/registration">
        <Registration />
      </Route>
          
      <Route path="/auth">
        <Auth />
      </Route>

      <Route path="/users">
        <Users />
      </Route>

      <Route path="/editing">
        <EditProfile />
      </Route>

      <Route path="/deleting">
        <DeleteProfile />
      </Route>

      <ProtectedRoute path="/profile">
        <UserProfile />
      </ProtectedRoute>

      <Route exact path="/">
        <HomePage />
      </Route>
      
      <ProtectedRoute path="/private">
        <ProtectedPage />
      </ProtectedRoute>

      <Redirect to="/"></Redirect>     
    </Switch>
  );
};