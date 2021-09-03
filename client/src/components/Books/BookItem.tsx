import React from 'react';
import { useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites} from '../../api/favoritesAPI';
import { booksInterface, usersInterface } from '../../types/types';
import styled from 'styled-components';
import { serverUrl } from '../../consts';
import { Button, Typography } from '@material-ui/core';
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
              <Typography variant="h5" style={{color: 'gray'}}>{book.author || null}</Typography>
            </Inscription>

            <Title>
              <Typography 
                variant="body1"
                style={{maxHeight: '100%', overflow: 'hidden'}}
              >
                {book.title}
              </Typography>
            </Title>

            <Inscription>
              <Typography variant="h6" style={{margin:'0', color: 'green'}}>
                {book.price || null} p.
              </Typography>
            </Inscription>

            <Inscription>
              <Typography variant="h6">
                {book.rating?.toFixed(1) || 0}<img src='image/star.png' style={{width: '15px'}}/>
              </Typography>
            </Inscription>            
          </Description>

          {isFavorite ? 
            <Button 
              variant="contained"
              color="primary"
              onClick={(e) => {e.stopPropagation(); removingHandler();}}
            >
              удалить из избранного
            </Button> 
            :
            <Button 
              variant="contained"
              color="primary"
              onClick={(e) => {e.stopPropagation(); addingHandler();}}
            >
              В избранное
            </Button>}
        </StyledBook>) : (<h1>Нет подходящих книг</h1>)    
      }     
    </div>    
  );
};

const StyledBook = styled.div`
  width: 90%;
  padding: 10px;
  cursor: pointer;
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
  height: 160px;
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Inscription = styled.div`
  height: 23%;
  width: 100%;
`;

const Title = styled.div`
  height: 31%;
  width: 100%;
`;