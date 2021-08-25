import React from 'react';
import { useSelector } from 'react-redux';
import { addToFavorites } from '../../api/addToFavorites';
import { removeFromFavorites } from '../../api/removeFromFavorites';
import { booksInterface, usersInterface } from '../../types/types';
import styled from 'styled-components';
import { serverUrl } from '../../consts';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

interface BookItemProps {
  book: booksInterface,
  isFavorite?: boolean,
}

export const BookItem = ({book, isFavorite}: BookItemProps):JSX.Element => {
  interface RootState {
    authUser: usersInterface
  }
  const user = useSelector((state: RootState) => state.authUser);

  const history = useHistory();
 
  const addingHandler = () => {
    addToFavorites({userId: user.id, bookId: book.id});
  };

  const removingHandler = () => {
    removeFromFavorites({userId: user.id, bookId: book.id});
  };

  return (
    <StyledBook onClick={() => history.push(`/book_card/${book.id}`)}>
      <h3>{book.author}</h3>
      <h4>{book.title}</h4>
      <h5>{book.price}</h5>
      <h5>{book.rating || 0}<img src='image/star.png' style={{width: '15px'}}/></h5>
      <p>{book.description || null}</p>
      <Image src={`${serverUrl}/uploads/${book.image || 'book_placeholder.png'}`} />
      {isFavorite ? 
        <Button variant="contained" color="primary" onClick={removingHandler}>удалить из избранного</Button> 
        :
        <Button variant="contained" color="primary" onClick={addingHandler}>В избранное</Button>}
    </StyledBook>
  );
};

const StyledBook = styled.div`
  width: 25%;
  padding: 10px;
  border: 1px solid grey;
`;

const Image = styled.img`
  max-width: 95%;
`;
