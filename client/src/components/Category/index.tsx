import React, { useEffect, useState } from 'react';

import { CategoriesList } from './CategoriesList';
import { getCategories } from '../../api/categoryAPI';
import { Typography } from '@material-ui/core';

import { booksInterface, categoriesInterface } from '../../types/types';

interface CategoriesProps {
  filter: (books: booksInterface[]) => void,
}


export const Categories = ({filter}: CategoriesProps):JSX.Element => {
  const voidArrayOfCategories: categoriesInterface[] = [];
  const [categories, setCategories] = useState(voidArrayOfCategories);
  
  const loadBooks = async () => {
    const promiseCategories = await getCategories();
    setCategories(promiseCategories);
  };

  useEffect(() => {
    loadBooks(); 
  }, []);  

  return (
    <div>
      <Typography>Категории</Typography>
      
      <CategoriesList categories={categories} filter={filter} />
    </div>
  );
};