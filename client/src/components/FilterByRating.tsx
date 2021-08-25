import React from 'react';
import { booksInterface } from '../types/types';
import { FormEvent } from 'react';
import { getBooksByRating } from '../api/getBooksByRating';

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
    <form action="" onSubmit={formHandler}>
      <label htmlFor="">Рейтинг от:</label>
      <input type="number" name="rate" />
      <button>Найти</button>  
    </form>     
  );
};