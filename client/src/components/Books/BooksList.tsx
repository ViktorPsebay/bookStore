import React from 'react';
import { booksInterface } from '../../types/types';
import { BookItem } from './BookItem';

interface BooksListProps {
  books: booksInterface[] | null,
  isFavorite?: boolean,
}

export const BooksList = ({books, isFavorite}: BooksListProps):JSX.Element => {
  return (
    <div style={{display: 'flex', width: '100%'}}>
      {books?.map(book => 
        <BookItem key={book.id} book={book} isFavorite={isFavorite}/>)}
    </div>
  );
};