import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { reviewInterface } from '../../types/types';

export const BlockOfReview = ({reviews} :{reviews: reviewInterface[]}): JSX.Element => {
  return (
    <BoxForReview>
      <h3> {reviews.length ? 'Отзывы на книгу:' : 'У книги еще нет отзывов'}</h3>
     
      <ul>
        {reviews.map(review => 
          <Li key={review.id}> 
            <Typography variant="body2" >
              {review.textOfReview}  
            </Typography>
          </Li>)}
      </ul>
    </BoxForReview>
  );
};

const BoxForReview = styled.div`
  width: 100vw;
`;

const Li = styled.li`
  max-width: 90%;
  word-wrap:break-word;
  list-style-type: decimal;
`;