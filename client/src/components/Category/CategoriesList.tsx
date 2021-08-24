import React from 'react';
import { booksInterface, categoriesInterface } from '../../types/types';
import { CategoryItem } from './CategoryItem';

interface CategoriesListProps {
  categories: categoriesInterface[] | null,
  filter: (books: booksInterface[]) => void,
}

export const CategoriesList = ({categories, filter}: CategoriesListProps):JSX.Element => {
  return (
    <ul>
      {categories?.map(category => 
        <CategoryItem key={category.id} category={category} filter={filter}/>)}
    </ul>
  );
};