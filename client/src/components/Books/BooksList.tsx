import React from 'react';
import styled from 'styled-components';
import { countBooksOnPage } from '../../consts';
import { booksInterface } from '../../types/types';
import { BookItem } from './BookItem';

interface BooksListProps {
  page?: number,
  books: booksInterface[] | null,
  isFavorite?: boolean,
  filter?: () => void,
}

export const BooksList = ({filter, books, isFavorite, page=1}: BooksListProps):JSX.Element => {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>
      {books?.
        filter((item, index) => (index < page * countBooksOnPage && index >= (page-1) * countBooksOnPage)).
        map(book => 
          <BookItem key={book?.id} book={book} isFavorite={isFavorite} filter={filter}/>)}
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 20px;
`;