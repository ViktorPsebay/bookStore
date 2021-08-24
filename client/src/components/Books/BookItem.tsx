import React from 'react';
import { useSelector } from 'react-redux';
import { addToFavorites } from '../../api/addToFavorites';
import { removeFromFavorites } from '../../api/removeFromFavorites';
import { booksInterface, usersInterface } from '../../types/types';
import styled from 'styled-components';

interface BookItemProps {
  book: booksInterface,
  isFavorite?: boolean,
}

export const BookItem = ({book, isFavorite}: BookItemProps):JSX.Element => {
  interface RootState {
    authUser: usersInterface
  }
  const user = useSelector((state: RootState) => state.authUser);
 
  const addingHandler = () => {
    addToFavorites({userId: user.id, bookId: book.id});
  };

  const removingHandler = () => {
    removeFromFavorites({userId: user.id, bookId: book.id});
  };

  return (
    <StyledBook>
      <h3>{book.author}</h3>
      <h4>{book.title}</h4>
      <p>{book.description || null}</p>
      {isFavorite ? <button onClick={removingHandler}>удалить из избранного</button> : <button onClick={addingHandler}>В избранное</button>}
    </StyledBook>
  );
};

const StyledBook = styled.div`
  width: 25%;
  padding: 10px;
  border: 1px solid grey;
`;
