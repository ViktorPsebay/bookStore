import React from 'react';
import { booksInterface } from '../../types/types';
import { FormEvent } from 'react';
import { getBooksByRating } from '../../api/bookAPI';
import { TextField, Button } from '@material-ui/core';

interface FilterByRatingProps {
  filter: (books: booksInterface[]) => void,
}

export const FilterByRating = ({filter}: FilterByRatingProps):JSX.Element => {
  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { rate } = e.currentTarget;
    const books = await getBooksByRating(rate.value);
    filter(books);
  };

  return (
    <form action="" onSubmit={formHandler} style={{padding: '20px 0'}}>
      <TextField
        size='small'
        variant='outlined'
        color='secondary'
        type="number"
        name="rate"
        label="Рейтинг от:"
        style={{backgroundColor: 'white', marginBottom: '10px'}}
      />

      <Button
        type='submit'
        size='small' 
        variant='contained'
      >
        Найти
      </Button> 
    </form>     
  );
};
