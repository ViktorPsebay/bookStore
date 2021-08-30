import React, { ChangeEvent } from 'react';
import { booksInterface } from '../types/types';
import { FormEvent } from 'react';
import { getBooksByPrice } from '../api/getBooksByPrice';
import styled from 'styled-components';

interface FilterByPriceProps {
  filter: (books: booksInterface[]) => void,
  books: booksInterface[],
}


export const FilterByPrice = ({filter, books}: FilterByPriceProps):JSX.Element => {
  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { price } = e.currentTarget;
    const { value } = price;
    const books = await getBooksByPrice(value);
    filter(books);
    // filter(books.filter((book) => book.price <= value));
  };

  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // const { price } = e.currentTarget;
    const { value } = e.currentTarget;
    // const books = await getBooksByPrice(value);
    // filter(books);
    filter(books.filter((book) => book.price <= +value));
  };

  return (
    <form action="" onSubmit={formHandler}>
      <label htmlFor="">Цена до:</label><br />
      <Input type="number" name="price" />
      <button>Найти</button>  
    </form>     
  );
};

const Input = styled.input`
  max-width: 100%;
`;