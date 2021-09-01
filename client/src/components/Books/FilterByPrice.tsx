import React from 'react';
import { booksInterface } from '../../types/types';
import { FormEvent } from 'react';
import { getBooksByPrice } from '../../api/bookAPI';
import { Button, TextField } from '@material-ui/core';

interface FilterByPriceProps {
  filter: (books: booksInterface[]) => void,
 }


export const FilterByPrice = ({filter}: FilterByPriceProps):JSX.Element => {
  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { price } = e.currentTarget;
    const { value } = price;
    if (!value) return;
    const books = await getBooksByPrice(value);
    filter(books);
  };

  return (
    <form action="" onSubmit={formHandler} style={{padding: '10px 0'}}>
      <TextField
        size='small'
        variant='outlined'
        color='secondary'
        type="number"
        name="price"
        label="Цена до:"
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
