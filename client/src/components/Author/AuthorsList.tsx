import React from 'react';
import { authorsInterface, booksInterface } from '../../types/types';
import { AuthorItem } from './AuthorItem';

interface AuthorsListProps {
  authors: authorsInterface[] | null,
  filter: (books: booksInterface[]) => void,
}

export const AuthorsList = ({authors, filter}: AuthorsListProps):JSX.Element => {
  return (
    <ul>
      {authors?.map(author => 
        <AuthorItem key={author.id} author={author} filter={filter}/>)}
    </ul>
  );
};