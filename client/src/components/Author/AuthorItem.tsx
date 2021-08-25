import React from 'react';
import { getBooksByAuthor } from '../../api/getBooksByAuthor';
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
      {author.name}
    </li>
  );
};