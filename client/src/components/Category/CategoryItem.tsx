import React from 'react';

import { Typography } from '@material-ui/core';

import { getBooksByCategory } from '../../api/bookAPI';
import { booksInterface, categoriesInterface } from '../../types/types';

interface CategoryItemProps {
  category: categoriesInterface,
  filter: (books: booksInterface[]) => void,
}

export const CategoryItem = ({category, filter}: CategoryItemProps):JSX.Element => {
  const clickHandler = async (id: number ) => {
    const books = await getBooksByCategory(id);
    filter(books);
  };

  return (
    <li onClick={() => clickHandler(category.id)} style={{cursor: 'pointer'}}>
      <Typography>{category.nameOfCategory}</Typography>
    </li>
  );
};