import React from 'react';
import { booksInterface } from '../types/types';
import { FormEvent } from 'react';
import { getBooksByPrice } from '../api/getBooksByPrice';
import styled from 'styled-components';

interface FilterByPriceProps {
  filter: (books: booksInterface[]) => void,
}


export const FilterByPrice = ({filter}: FilterByPriceProps):JSX.Element => {
  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { price } = e.currentTarget;
    const { value } = price;
    const books = await getBooksByPrice(value);
    filter(books);
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