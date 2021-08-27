import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Box, InputLabel, TextField } from '@material-ui/core';

import { authorsInterface, bookAuthorInterface, booksRequestInterface, categoriesInterface } from '../../types/types';
import { setUserInStore } from '../../api/setUser';
import { instance } from '../../api';
import { getCategories } from '../../api/getCategories';
import { getAuthors } from '../../api/getAuthors';
import { postBook } from '../../api/postBook';
import { postBookAuthor } from '../../api/postBookAuthor';
import { postCategory } from '../../api/postCategory';
import { postAuthor } from '../../api/postAuthor';

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



  const [author, setAuthor] = useState('');
  const handleChangeAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    const { value }= e.currentTarget;
    setAuthor(value);
  };

  const [category, setCategory] = useState('');
  const handleChangeCategory = (e: ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    const { value }= e.currentTarget;
    setCategory(value);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {titleOfBook, filedata, price} = e.currentTarget;
    const formData = new FormData();
    // filedata.name = Math.random().toString();
    if (filedata.files)
      formData.append('filedata', filedata.files[0]);
    const currentCategory = categories.find(item => item.nameOfCategory === category);
    const currentAuthor = authors.find(item => item.name === author);
    if (!author || !category) return;

    let categoryId: number;
    if (!currentCategory) categoryId = await postCategory({nameOfCategory: category});
    else categoryId = currentCategory.id;

    let authorId: number;
    if (!currentAuthor) authorId = await postAuthor({name: author});
    else authorId = currentAuthor.id;
    
    const book : booksRequestInterface = {
      title: titleOfBook.value,
      author,
      price: price.value,
      categoryId: categoryId,
      image: filedata.files[0]?.name || null,

    };
    const bookId = await postBook(book);
    const bookAuthor: bookAuthorInterface = {
      bookId, 
      authorId,
    };
    postBookAuthor(bookAuthor);
    if (!filedata.files[0]) return;
    const res = await instance.post('books/upload', formData);
    console.log(res);

    console.log(filedata.files[0].name);
    console.log(titleOfBook.value);
  };


  return (
    <Box>
      <PageTitle>Добавление книги</PageTitle>
      <Form onSubmit={submitHandler}>
        
     
        <TextField
          size='small'
          variant='outlined'
          required type="text"
          name="titleOfBook"
          label="название книги"
        />
        
        <br />
        <br />
        <TextField size='small' variant='outlined' required type="number" name="price" label="Цена"/><br /><br />
    
        <InputLabel id="labelAuthor">Автор</InputLabel>

        <Input type="text" list="authors" id="chosenAuthor" name="chosenAuthor" onChange={handleChangeAuthor}/>

        <datalist id="authors">
          {authors.map( author => (
            <option key={author.id} value={author.name}>{author.name}</option>
          ))}
        </datalist>

        <br /><br /><InputLabel id="labelCategory">Категория</InputLabel>
        <Input type="text" list="categoties" onChange={handleChangeCategory}/>
        <datalist id="categoties">
          {categories.map( category => (
            <option key={category.id} value={category.nameOfCategory}>{category.nameOfCategory}</option>
          ))}
        </datalist>    
        <br /><br /><InputLabel>добавить обложку</InputLabel><br />
        <input type="file" name="filedata"/><br />
   
        <br /><Button type="submit" value="Добавить" />
      </Form>
    </Box>
    
  );
};

const Input = styled.input`
  width: 206px;
  height: 36px;
  border: solid 1px lightgrey;
  border-radius: 5px;
`;

const Button = styled.input`
  width: 106px;
  height: 30px;
  border: solid 1px lightgrey;
  border-radius: 5px;
  margin: 40px;
  color: #fff;
  background-color: #3f51b5
`;

const Form = styled.form`
  padding: 70px 40vw;
`;

const PageTitle = styled.h1`
  font-family: 'Roboto';
  text-align: center;
  padding: 20px;
`;