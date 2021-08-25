import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authorsInterface, bookAuthorInterface, booksRequestInterface, categoriesInterface } from '../../types/types';
import { setUserInStore } from '../../api/setUser';
import { instance } from '../../api';
import { getCategories } from '../../api/getCategories';
import { getAuthors } from '../../api/getAuthors';
import { postBook } from '../../api/postBook';
import { postBookAuthor } from '../../api/postBookAuthor';

export const AddBook = (): JSX.Element => {
  const voidArrayOfCategories: categoriesInterface[] = [];
  const [categories, setCategories] = useState(voidArrayOfCategories);

  const voidArrayOfAuthors: authorsInterface[] = [];
  const [authors, setAuthors] = useState(voidArrayOfAuthors);

  const loadCategories = async () => {
    const promiseCategories = await getCategories();
    setCategories(promiseCategories);
  };

  const loadAuthors = async () => {
    const promiseAuthors = await getAuthors();
    setAuthors(promiseAuthors);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const token = 'Bearer ' + localStorage.getItem('userToken');

    dispatch(setUserInStore(token));

    loadCategories();
    loadAuthors();
 
  }, []);  

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {titleOfBook, author, category, filedata, price} = e.currentTarget;
    const formData = new FormData();
    if (filedata.files)
      formData.append('filedata', filedata.files[0]);
    const currentCategory = categories.find(item => item.nameOfCategory === category[category.selectedIndex].value);
    const currentAuthor = authors.find(item => item.name === author[author.selectedIndex].value);
    if (!currentAuthor || !currentCategory) return;
    const book : booksRequestInterface = {
      title: titleOfBook.value,
      author: currentAuthor.name,
      price: price.value,
      categoryId: currentCategory?.id,
      image: filedata.files[0]?.name || null,

    };
    const bookId = await postBook(book);
    const bookAuthor: bookAuthorInterface = {
      bookId, 
      authorId: currentAuthor.id
    };
    postBookAuthor(bookAuthor);
    if (!filedata.files[0]) return;
    const res = await instance.post('books/upload', formData);
    console.log(res);

    console.log(filedata.files[0].name);
    console.log(titleOfBook.value);
    console.log(author[author.selectedIndex].value);
    console.log(category[category.selectedIndex].value);
  };


  return (
    <form onSubmit={submitHandler}>
      <label>Название:</label><br />
      <input type="text" name="titleOfBook" placeholder="название книги"/><br />
      <label>Цена:</label><br />
      <input required type="number" name="price" /><br />
      <label>Автор:</label><br />
      <select name="author">
        {authors.map( author => (
          <option key={author.id} value={author.name}>{author.name}</option>
        ))}
      </select><br />
      <label>Категория:</label><br />
      <select name="category">
        {categories.map( category => (
          <option key={category.id} value={category.nameOfCategory}>{category.nameOfCategory}</option>
        ))}
      </select><br />
      <label>добавить обложку</label><br />
      <input type="file" name="filedata"/><br />
      <input type="submit" value="Send" />
    </form>
  );
};