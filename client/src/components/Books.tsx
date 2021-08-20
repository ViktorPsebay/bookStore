import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { booksInterface } from '../types/types';
import { setUserInStore } from '../api/setUser';
import { getBooks } from '../api/getBooks';
import { BooksList } from './BooksList';
import { SideBar } from './SideBar';

export const Books =  ():JSX.Element => {
  const voidArrayOfBooks: booksInterface[] = [];

  const [books, setBooks] = useState(voidArrayOfBooks);
  const dispatch = useDispatch();

  const loadBooks = async () => {
    const promiseBooks = await getBooks();
    setBooks(promiseBooks);
  };


  const filterBooks = (books: booksInterface[]) => {
    setBooks(books);
  };


  useEffect(() => {
    const token = 'Bearer ' + localStorage.getItem('userToken');

    dispatch(setUserInStore(token));

    loadBooks();
 
  }, []);  

  return (
    <div style={{display: 'flex'}}>
      <SideBar filter={filterBooks} />   
      <BooksList books={books} />
    </div>
  );
};