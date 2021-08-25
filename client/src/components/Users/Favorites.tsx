import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { booksInterface, usersInterface } from '../../types/types';
import { setUserInStore } from '../../api/setUser';
import { BooksList } from '../Books/BooksList';
import { getFavorites } from '../../api/getFavorites';
import { Pagination } from '../Pagination';
import { countBooksOnPage } from '../../consts';

export const Favorites =  ():JSX.Element => {
  const voidArrayOfBooks: booksInterface[] = [];
  interface RootState {
    authUser: usersInterface
  }
  const user = useSelector((state: RootState) => state.authUser);

  const [page, setPage] = useState(1);
  const choosePage = async (page: number) => {
    setPage(page);
  };

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
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <BooksList books={books} isFavorite={true} page={page}/>
      <Pagination page={Math.ceil(books.length / countBooksOnPage)} choose={choosePage} />
    </div>
  );
};
