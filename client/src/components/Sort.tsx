import React from 'react';
import { booksInterface } from '../types/types';
import { FormEvent } from 'react';
import { sortBooks } from '../api/sortBooks';

interface FilterByRatingProps {
  filter: (books: booksInterface[]) => void,
}


export const Sort = ({filter}: FilterByRatingProps):JSX.Element => {
  // const sortHandler = async (e: FormEvent<HTMLSelectElement>) => {
  //   e.preventDefault();
  //   const { value } = e.currentTarget;
  //   const books = await sortBooks(value);
  //   filter(books);
  // };

  const sortHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { sorting } = e.currentTarget;
    const books = await sortBooks(sorting[sorting.selectedIndex].value);
    filter(books);
  };

  return (
    <form onSubmit={sortHandler}>
      <label>Сортировать по:</label><br />
      <select name='sorting'>        
        <option value='title'>Названию</option>
        <option value='price'>Цене</option>
        <option value='rating'>Рейтингу</option>       
      </select><br />
      <input type="submit" value="сортировать" />
    </form>      
  );
};
