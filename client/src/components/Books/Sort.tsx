import React from 'react';
import { booksInterface } from '../../types/types';
import { FormEvent } from 'react';
import { sortBooks } from '../../api/bookAPI';
import { Button, Select, Typography } from '@material-ui/core';

interface FilterByRatingProps {
  filter: (books: booksInterface[]) => void,
}

export const Sort = ({filter}: FilterByRatingProps):JSX.Element => {
  const sortHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { sorting } = e.currentTarget;
    const books = await sortBooks(sorting.value);
    filter(books);
  };

  return (
    <form onSubmit={sortHandler}>
      <Typography variant='body1'>Сортировать по:</Typography>
      <Select 
        name='sorting'
        defaultValue='rating'
        variant='outlined'
        style={{backgroundColor: 'white', marginBottom: '10px'}}  
      >        
        <option value='title'>Названию</option>
        <option value='price'>Цене</option>
        <option value='rating'>Рейтингу</option>       
      </Select>

      <Button
        type="submit"
        size='small'
        variant='contained'
      >
        сортировать
      </Button>
    </form>      
  );
};
