import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Auth } from './Users/Auth';
import { EditProfile } from './Users/EditProfile';
import { DeleteProfile } from './Users/DeleteProfile';
import { Registration } from './Users/Registration';
import { Users } from './Users/Users';
import { ProtectedRoute } from './ProtectedRoute';
import { ProtectedPage } from './ProtectedPage';
import { HomePage } from './HomePage';
import { UserProfile } from './Users/UserProfile';
import { Books } from './Books/';
import { Favorites } from './Users/Favorites';
import { AddBook } from './Users/AddBook';
import { BookCard } from './Books/BookCard';

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

      <Route path="/books">
        <Books />
      </Route>

      <Route path="/book_card/:id">
        <BookCard />
      </Route>

      <Route path="/editing">
        <EditProfile />
      </Route>

      <Route path="/deleting">
        <DeleteProfile />
      </Route>

      <Route path="/favorites">
        <Favorites />
      </Route>

      <Route path="/add_book">
        <AddBook />
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