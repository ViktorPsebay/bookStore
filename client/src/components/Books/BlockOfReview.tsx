import React, { FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { reviewInterface } from '../../types/types';
import { postReview } from '../../api/postReview';
import { getReviews } from '../../api/getReviews';

export const BlockOfReview = ({id} :{id: number}): JSX.Element => {
  const voidReview: reviewInterface = {
    userId: null,
    bookId: id,    
  };
  const [reviews, setReview] = useState([voidReview]);

  const loadReviews = async () => {
    const promiseReviews = await getReviews(+id);
    if (!promiseReviews) return;
    setReview(promiseReviews);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <BoxForReview>
      <h3> {reviews.length ? 'Отзывы на книгу:' : 'У книги еще нет отзывов'}</h3>
     
      <ul>
        {reviews.map(review => 
          <li key={review.id}>{review.textOfReview}</li>)}
      </ul>
    </BoxForReview>
  );
};

const BoxForReview = styled.div`
  width: 100vw;
  /* height: 200px; */
  /* display: flex; */
`;