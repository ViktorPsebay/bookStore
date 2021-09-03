import React, { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { booksInterface, reviewInterface, usersInterface } from '../../types/types';

import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getOneBookById, getRatingForBook} from '../../api/bookAPI';
import { serverUrl } from '../../consts';
import { AddingReview } from './AddingReview';
import { postRate } from '../../api/rateAPI';
import { BlockOfReview } from './BlockOfReview';
import { Box, Button, makeStyles, Select, Typography } from '@material-ui/core';
import { getReviews } from '../../api/reviewAPI';

export const BookCard = ():JSX.Element => {
  const { id }: {id: string} = useParams();
  
  const useStyles = makeStyles({
    price: {
      color: 'green',
    },
  });
  const classes = useStyles();

  interface RootState {
    authUser: usersInterface
  }
  const user = useSelector((state: RootState) => state.authUser);

  const voidBook: booksInterface = {
    id: 0,
    title: '',
    price: 0,    
  };

  const [book, setBook] = useState(voidBook);
  
  const loadBook = async () => {
    const promiseBooks = await getOneBookById(+id);
    setBook(promiseBooks);
  };

  const voidReview: reviewInterface = {
    userId: null,
    bookId: +id,    
  };
  const [reviews, setReview] = useState([voidReview]);

  const loadReviews = async () => {
    const promiseReviews = await getReviews(+id);
    if (!promiseReviews) return;
    setReview(promiseReviews);
  };

  useEffect(() => {
    loadBook();
    loadReviews();
  }, []);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { rate } = e.currentTarget;
    const rating = {
      rate: +rate.value,
      userId: user.id,
      bookId: +id,
    };

    await postRate(rating);
    await getRatingForBook(id);
    loadBook();
  };

  const publishReview = () => {
    loadReviews();
  };

  return (
    <div>
      <StyledBook>
        <Image src={`${serverUrl}/uploads/${book.image || 'book_placeholder.png'}`} />
        <Box>
          <Typography variant="h3" >{book.author}</Typography>
          <Typography variant='h2'>{book.title}</Typography>
          <Typography className={classes.price} variant='h3'>{book.price} p.</Typography>
          <Typography color='primary' variant='h3'>
            {book.rating || 0}<img src='/image/star.png' style={{width: '25px'}}/>
          </Typography>
       
          <form onSubmit={submitHandler}>
            <Select name="rate" defaultValue="5">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Select>
            <Button variant="contained" color="primary" type="submit">Оценить</Button>
            
          </form>
        </Box>        
      </StyledBook>
      
      <AddingReview bookId={+id} userId={user?.id || null} publishReview={publishReview}/>

      <BlockOfReview reviews={reviews}/>
    </div>    
  );
};

const StyledBook = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
`;

const Image = styled.img`
  width: 20vw;
  padding: 30px 100px;
`;
