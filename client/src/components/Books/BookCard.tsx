import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { booksInterface, usersInterface } from '../../types/types';
import { setUserInStore } from '../../api/setUser';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getOneBookById } from '../../api/getOneBookById';
import { serverUrl } from '../../consts';
import { AddingReview } from './AddingReview';
import { postRate } from '../../api/postRate';
import { getRatingForBook } from '../../api/getRatingForBook copy';
import { BlockOfReview } from './BlockOfReview';
import { Box } from '@material-ui/core';

export const BookCard = ():JSX.Element => {
  const { id }: {id: string} = useParams();
  const dispatch = useDispatch();

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

  useEffect(() => {
    const token = 'Bearer ' + localStorage.getItem('userToken');

    dispatch(setUserInStore(token));

    loadBook();

  }, []);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { rate } = e.currentTarget;
    const rating = {
      rate: +rate[rate.selectedIndex].value,
      userId: user.id,
      bookId: +id,
    };
    await postRate(rating);
    await getRatingForBook(id);
    loadBook();
  };

  return (
    <div>
      <StyledBook>
        <Image src={`${serverUrl}/uploads/${book.image || 'book_placeholder.png'}`} />
        <Box>
          <h2>{book.author}</h2>
          <h1>{book.title}</h1>
          <h3>{book.price}</h3>
          <h3>{book.rating || 0}<img src='/image/star.png' style={{width: '15px'}}/></h3>
          <p>{book.description || null}</p>
       
          <form onSubmit={submitHandler}>
            <select name="rate">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select><br />
            <input type="submit" value="Оценить" />
          </form>
        </Box>
        
      </StyledBook>
      <AddingReview bookId={+id} userId={user?.id || null}/>
      <BlockOfReview id={+id}/>
    </div>    
  );
};

const StyledBook = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  /* border: 1px solid grey; */
`;

const Image = styled.img`
  width: 20vw;
  padding: 30px 100px;
`;
