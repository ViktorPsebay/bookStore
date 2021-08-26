import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { booksInterface, usersInterface } from '../../types/types';
import { setUserInStore } from '../../api/setUser';
import { BooksList } from '../Books/BooksList';
import { getFavorites } from '../../api/getFavorites';
import { Pagination } from '../Books/Pagination';
import { countBooksOnPage } from '../../consts';
import { UserProfile } from './UserProfile';
import styled from 'styled-components';

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
  // const dispatch = useDispatch();

  const loadBooks = async () => {
    if (!user) return;
    const promiseBooks = await getFavorites(user.id);
    setBooks(promiseBooks);
  };


  // useEffect(() => {
  //   const token = 'Bearer ' + localStorage.getItem('userToken');

  //   dispatch(setUserInStore(token));

  //   loadBooks();
 
  // }, []);  

  useEffect(() => {
    loadBooks();
   
  }, [user]);  

  return (
    <div style={{display: 'flex'}}>
      <div style={{padding: '0 50px'}}>
        <UserProfile />
      </div>
      
      <div style={{display: 'flex', flexDirection: 'column'}}>      
        <BooksList books={books} isFavorite={true} page={page}/>
        <Pagination page={Math.ceil(books.length / countBooksOnPage)} choose={choosePage} />
      </div>
    </div>
  );
};

