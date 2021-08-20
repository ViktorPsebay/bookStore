import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { booksInterface, categoriesInterface } from '../types/types';
import { setUserInStore } from '../api/setUser';
import { CategoriesList } from './CategoriesList';
import { getCategories } from '../api/getCategories';

interface CategoriesProps {
  filter: (books: booksInterface[]) => void,
}


export const Categories =  ({filter}: CategoriesProps):JSX.Element => {
  const voidArrayOfCategories: categoriesInterface[] = [];

  const [categories, setCategories] = useState(voidArrayOfCategories);
  const dispatch = useDispatch();

  const loadBooks = async () => {
    const promiseCategories = await getCategories();
    setCategories(promiseCategories);
  };

  useEffect(() => {
    const token = 'Bearer ' + localStorage.getItem('userToken');

    dispatch(setUserInStore(token));

    loadBooks();
 
  }, []);  

  return (
    <div>
      Категории
      <CategoriesList categories={categories} filter={filter} />
    </div>
  );
};