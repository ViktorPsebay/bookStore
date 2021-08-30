import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { booksInterface, usersInterface } from '../../types/types';
import { BooksList } from '../Books/BooksList';
import { getFavorites } from '../../api/getFavorites';
import { Pagination } from '../Books/Pagination';
import { countBooksOnPage } from '../../consts';
import { UserProfile } from './UserProfile';
import styled from 'styled-components';

export const Favorites =  ():JSX.Element => {
  const voidArrayOfBooks: booksInterface[] = [];
  interface RootState {
    authUser: usersInterface
  }
  const user = useSelector((state: RootState) => state.authUser);

  const [page, setPage] = useState(1);
  const choosePage = async (page: number) => {
    setPage(page);
  };

  const removingFromFavorites = () => {
    loadBooks();
  };

  const [books, setBooks] = useState(voidArrayOfBooks);
  
  const loadBooks = async () => {
    if (!user) return;
    const promiseBooks = await getFavorites(user.id);
    setBooks(promiseBooks);
  };

  useEffect(() => {
    loadBooks();
   
  }, [user]);  

  return (
    <div style={{display: 'flex'}}>
      <Container>
        <UserProfile />
      </Container>
      {!books.length ? 
        <h2>Пока в избранном ничего нет</h2> :
        (
          <div style={{display: 'flex', flexDirection: 'column', width: '85%'}}>      
            <BooksList books={books} isFavorite={true} page={page} filter={removingFromFavorites}/>
            <Pagination page={Math.ceil(books.length / countBooksOnPage)} choose={choosePage} />
          </div>
        )}
    </div>
  );
};

const Container = styled.div`
  padding: 0 20px;
  background-color: lightsteelblue;
  width: 15%;
  min-height:100vh;
`;