import React, { useEffect, useState } from 'react';
import { authorsInterface, booksInterface } from '../../types/types';
import { AuthorsList } from './AuthorsList';
import { getAuthors } from '../../api/getAuthors';

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
      Авторы
      <AuthorsList authors={authors} filter={filter} />
    </div>
  );
};