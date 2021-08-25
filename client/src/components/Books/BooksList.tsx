import React from 'react';
import { countBooksOnPage } from '../../consts';
import { booksInterface } from '../../types/types';
import { BookItem } from './BookItem';

interface BooksListProps {
  page?: number,
  books: booksInterface[] | null,
  isFavorite?: boolean,
}

export const BooksList = ({books, isFavorite, page=1}: BooksListProps):JSX.Element => {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>
      {books?.
        filter((item, index) => (index < page * countBooksOnPage && index >= (page-1) * countBooksOnPage)).
        map(book => 
          <BookItem key={book.id} book={book} isFavorite={isFavorite}/>)}
    </div>
  );
};