import React from 'react';
import { Typography } from '@material-ui/core';
import { getBooksByAuthor } from '../../api/bookAPI';
import { authorsInterface, booksInterface } from '../../types/types';

interface AuthorItemProps {
  author: authorsInterface,
  filter: (books: booksInterface[]) => void,
}

export const AuthorItem = ({author, filter}: AuthorItemProps):JSX.Element => {
  const clickHandler = async (id: number ) => {
    const books = await getBooksByAuthor(id);
    filter(books);
  };

  return (
    <li onClick={() => clickHandler(author.id)} style={{cursor: 'pointer'}}>
      <Typography>{author.name}</Typography>
    </li>
  );
};