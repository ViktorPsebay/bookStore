import React, { useEffect, useState } from 'react';

import { BooksList } from './BooksList';
import { SideBar } from './SideBar';
import { Pagination } from './Pagination';

import { getBooks, getCountOfBooks} from '../../api/bookAPI';

import { booksInterface } from '../../types/types';
import { countBooksOnPage } from '../../consts';

export const Books = ():JSX.Element => {
  const voidArrayOfBooks: booksInterface[] = [];

  const [books, setBooks] = useState(voidArrayOfBooks);

  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
 
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
    // const token = 'Bearer ' + localStorage.getItem('userToken');

    // dispatch(setUserInStore(token));

    loadBooks();
 
  }, []);  

  return (
    <div style={{display: 'flex'}}>      
      <SideBar filter={filterBooks} />

      <div style={{width: '85%'}}>
        <BooksList books={books} page={page}/>
        <Pagination page={Math.ceil(count / countBooksOnPage)} choose={choosePage} />
      </div>
  
    </div>
  );
};