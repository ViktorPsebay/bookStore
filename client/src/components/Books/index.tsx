import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { booksInterface } from '../../types/types';
import { setUserInStore } from '../../api/setUser';
import { getBooks } from '../../api/getBooks';
import { BooksList } from './BooksList';
import { SideBar } from '../SideBar';
import { Pagination } from './Pagination';
import { getCountOfBooks } from '../../api/getCountOfBooks';
import { countBooksOnPage } from '../../consts';

export const Books = ():JSX.Element => {
  const voidArrayOfBooks: booksInterface[] = [];

  const [books, setBooks] = useState(voidArrayOfBooks);

  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const choosePage = async (page: number) => {
    setPage(page);
  };

  const loadBooks = async () => {
    const promiseBooks = await getBooks();
    setBooks(promiseBooks);    
    const promiseCount = await getCountOfBooks();
    setCount(promiseCount);
  };


  const filterBooks = (books: booksInterface[]) => {
    setBooks(books);
    setCount(books.length);
  };


  useEffect(() => {
    const token = 'Bearer ' + localStorage.getItem('userToken');

    dispatch(setUserInStore(token));

    loadBooks();
 
  }, []);  

  return (
    <div style={{display: 'flex'}}>      
      <SideBar filter={filterBooks} books={books}/>
      <div style={{width: '85%'}}>
        <BooksList books={books} page={page}/>
        <Pagination page={Math.ceil(count / countBooksOnPage)} choose={choosePage} />
      </div>
  
    </div>
  );
};