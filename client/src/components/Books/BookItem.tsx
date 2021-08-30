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
  filter?: () => void,
}

export const BookItem = ({filter, book, isFavorite}: BookItemProps):JSX.Element => {
  interface RootState {
    authUser: usersInterface
  }
  const user = useSelector((state: RootState) => state.authUser);

  const history = useHistory();
 
  const addingHandler = async () => {
    if (!user) return alert('Вы не авторизованы');
    await addToFavorites({userId: user.id, bookId: book.id});
  };

  const removingHandler = async () => {
    await removeFromFavorites({userId: user.id, bookId: book.id});
    if (filter) filter();
  };

  return (
    <div style={{display: 'flex',}}>
      { book ? 
        (<StyledBook onClick={() => history.push(`/book_card/${book.id}`)}>
          <Container>
            <Image src={`${serverUrl}/uploads/${book.image || 'book_placeholder.png'}`} /><br />
          </Container>
          <Description>
            <Inscription>
              <h3 style={{margin:'0', color: 'gray'}}>{book.author || null}</h3>
            </Inscription>
            <Inscription>
              <div style={{margin:'0', fontStyle: 'italic', maxHeight: '100%', overflow: 'hidden'}}>{book.title}</div>
            </Inscription>
            <Inscription>
              <h4 style={{margin:'0', color: 'green'}}>{book.price || null} p.</h4>
            </Inscription>
            <Inscription>
              <h4 style={{margin:'0'}}>{book.rating || 0}<img src='image/star.png' style={{width: '15px'}}/></h4>
            </Inscription>
            
          </Description>
          {isFavorite ? 
            <Button variant="contained" color="primary" onClick={(e) => {e.stopPropagation(); removingHandler();}}>удалить из избранного</Button> 
            :
            <Button variant="contained" color="primary" onClick={(e) => {e.stopPropagation(); addingHandler();}}>В избранное</Button>}
        </StyledBook>) : (<h1>Нет подходящих книг</h1>)
    
      }
     
    </div>
    
  );
};

const StyledBook = styled.div`
  width: 90%;
  padding: 10px;
  cursor: pointer;
  /* border: solid 1px white; */
  &:hover {
    background-color: lightgrey;
  }
`;

const Image = styled.img`
  width: 90%;
  max-height:90%;

`;

const Container = styled.div`
  height: 320px;
  width: 280px;
  display: flex;
`;

const Description = styled.div`
  height: 150px;
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* padding: 20px 5px; */
`;

const Inscription = styled.div`
  height: 25%;
  width: 100%;
`;
