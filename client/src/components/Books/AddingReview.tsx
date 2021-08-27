import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { reviewInterface } from '../../types/types';
import { postReview } from '../../api/postReview';

export const AddingReview = ({bookId, userId}: reviewInterface): JSX.Element => {
  const addingHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return alert('Вы не авторизованы');
    const { textOfReview } = e.currentTarget;
    const review: reviewInterface = {
      bookId,
      userId,
      textOfReview: textOfReview.value,
    };
    await postReview(review);
  };

  return (
    <form onSubmit={addingHandler}>
      <AreaForReview name="textOfReview" /><br />
      <Button type="submit" variant="contained" color="secondary">оставить отзыв</Button>
    </form>
  );
};

const AreaForReview = styled.textarea`
  width: 95vw;
  padding-left: 3%;
  height: 200px;
`;