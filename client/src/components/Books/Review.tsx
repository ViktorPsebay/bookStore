import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const Review = (): JSX.Element => {
  const addingHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={addingHandler}>
      <AreaForReview /><br />
      <Button variant="contained" color="secondary" >оставить отзыв</Button>
    </form>
  );
};

const AreaForReview = styled.textarea`
  width: 400px;
  height: 200px;
`;