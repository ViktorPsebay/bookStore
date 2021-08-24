import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { booksInterface, usersInterface } from '../../types/types';
import { setUserInStore } from '../../api/setUser';
import { BooksList } from '../Books/BooksList';
import { getFavorites } from '../../api/getFavorites';

export const Favorites =  ():JSX.Element => {
  const voidArrayOfBooks: booksInterface[] = [];
  interface RootState {
    authUser: usersInterface
  }
  const user = useSelector((state: RootState) => state.authUser);

  const [books, setBooks] = useState(voidArrayOfBooks);
  const dispatch = useDispatch();

  const loadBooks = async () => {
    const promiseBooks = await getFavorites(user.id);
    setBooks(promiseBooks);
  };


  useEffect(() => {
    const token = 'Bearer ' + localStorage.getItem('userToken');

    dispatch(setUserInStore(token));

    loadBooks();
 
  }, []);  

  return (
    <div style={{display: 'flex'}}>
      <BooksList books={books} isFavorite={true}/>
    </div>
  );
};