import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Auth } from './Users/Auth';
import { EditProfile } from './Users/EditProfile';
import { DeleteProfile } from './Users/DeleteProfile';
import { Registration } from './Users/Registration';
import { ProtectedRoute } from './ProtectedRoute';
import { HomePage } from './HomePage';
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

      <Route path="/books">
        <Books />
      </Route>

      <Route path="/book_card/:id">
        <BookCard />
      </Route>

      <ProtectedRoute path="/editing">
        <EditProfile />
      </ProtectedRoute>

      <ProtectedRoute path="/deleting">
        <DeleteProfile />
      </ProtectedRoute>

      <ProtectedRoute path="/favorites">
        <Favorites />
      </ProtectedRoute>

      <ProtectedRoute path="/add_book">
        <AddBook />
      </ProtectedRoute>

      <Route exact path="/">
        <HomePage />
      </Route>
      
      <Redirect to="/"></Redirect>     
    </Switch>
  );
};