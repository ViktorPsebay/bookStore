import React, { useEffect, useState } from 'react';
import { authorsInterface, booksInterface } from '../../types/types';
import { AuthorsList } from './AuthorsList';
import { getAuthors } from '../../api/AuthorAPI';
import { Typography } from '@material-ui/core';

interface AuthorsProps {
  filter: (books: booksInterface[]) => void,
}

export const Authors = ({filter}: AuthorsProps):JSX.Element => {
  const voidArrayOfAuthors: authorsInterface[] = [];
  const [authors, setAuthors] = useState(voidArrayOfAuthors);

  const loadBooks = async () => {
    const promiseAthors = await getAuthors();
    setAuthors(promiseAthors);
  };

  useEffect(() => {
    loadBooks(); 
  }, []);  

  return (
    <div>
      <Typography>Авторы</Typography>      
      <AuthorsList authors={authors} filter={filter} />
    </div>
  );
};