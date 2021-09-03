import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Box, FormHelperText, InputLabel, TextField, Typography } from '@material-ui/core';

import { authorsInterface, bookAuthorInterface, booksRequestInterface, categoriesInterface } from '../../types/types';
import { instance } from '../../api';
import { getCategories, postCategory} from '../../api/categoryAPI';
import { getAuthors, postAuthor} from '../../api/AuthorAPI';
import { postBook } from '../../api/bookAPI';
import { postBookAuthor } from '../../api/bookAuthorAPI';
import { useHistory } from 'react-router-dom';


interface addBookProps {
  sendNotification: (id: number) => void,
}


export const AddBook = ({sendNotification}: addBookProps): JSX.Element => {
  const history = useHistory(); 

  const voidArrayOfCategories: categoriesInterface[] = [];
  const [categories, setCategories] = useState(voidArrayOfCategories);

  const voidArrayOfAuthors: authorsInterface[] = [];
  const [authors, setAuthors] = useState(voidArrayOfAuthors);

  const [isTitleError, setTitleError] = useState(false);
  const [titleHelper, setTitleHelper] = useState('');

  const [isPriceError, setPriceError] = useState(false);
  const [priceHelper, setPriceHelper] = useState('');

  const [isAuthorError, setAuthorError] = useState(false);
  const [authorHelper, setAuthorHelper] = useState('');

  const [isCategoryError, setCategoryError] = useState(false);
  const [categoryHelper, setCategoryHelper] = useState('');

  const loadCategories = async () => {
    const promiseCategories = await getCategories();
    setCategories(promiseCategories);
  };

  const loadAuthors = async () => {
    const promiseAuthors = await getAuthors();
    setAuthors(promiseAuthors);
  };


  useEffect(() => {
    loadCategories();
    loadAuthors();
  }, []);  


  const [author, setAuthor] = useState('');
  const handleChangeAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    const { value }= e.currentTarget;
    setAuthor(value);
  };

  const [category, setCategory] = useState('');
  const handleChangeCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const { value }= e.currentTarget;
    setCategory(value);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    const {titleOfBook, filedata, price} = e.currentTarget;

    if (!titleOfBook.value.trim()) {
      setTitleError(true);
      setTitleHelper('Поле не должно быть пустым');
      return;
    }
    
    if (price.value > 1e7) {
      setPriceError(true);
      setPriceHelper('Цена не может превышать 1 000 000');
      return;
    }
    
    const formData = new FormData();
  
    if (filedata.files)
      formData.append('filedata', filedata.files[0]);

    const normalizeAuthor=author.trim();
    const normalizeCategory=category.trim();

    setAuthor(normalizeAuthor);
    setCategory(normalizeCategory);

    if (!normalizeAuthor) {
      setAuthorError(true);
      setAuthorHelper('Выберите автора');
      return;
    }

    if (!normalizeCategory) {
      setCategoryError(true);
      setCategoryHelper('Выберите категорию');
      return;
    }
    const currentCategory = categories.find(item => item.nameOfCategory === category);
    const currentAuthor = authors.find(item => item.name === author);
    
    let categoryId: number;
    if (!currentCategory) categoryId = await postCategory({nameOfCategory: category});
    else categoryId = currentCategory.id;

    let authorId: number;
    if (!currentAuthor) authorId = await postAuthor({name: author});
    else authorId = currentAuthor.id;
    
    const book : booksRequestInterface = {
      title: titleOfBook.value.trim(),
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

    if (filedata.files[0])
      await instance.post('books/upload', formData);
    
    sendNotification(bookId);

    history.push(`/book_card/${bookId}`);
  };


  return (
    <Box>
      <PageTitle>
        <Typography variant="h4">Добавление книги</Typography> 
      </PageTitle>      
      <Form onSubmit={submitHandler}>     
        <TextField
          size='small'
          variant='outlined'
          required type="text"
          name="titleOfBook"
          label="название книги"
          error={isTitleError}
          helperText = {titleHelper}
        /><br /><br />
        
        <TextField
          size='small'
          variant='outlined'
          required
          type="number"
          name="price"
          label="Цена"
          error={isPriceError}
          helperText = {priceHelper}
        /><br /><br />

        <InputLabel id="labelAuthor">Автор</InputLabel>

        <Input
          type="text"
          maxLength={30}
          required
          list="authors"
          id="chosenAuthor"
          name="chosenAuthor"
          onChange={handleChangeAuthor}
        />

        <FormHelperText error={isAuthorError}>
          {authorHelper}
        </ FormHelperText>

        <datalist id="authors">
          {authors.map( author => (
            <option key={author.id} value={author.name}>{author.name}</option>
          ))}
        </datalist>

        <br /><br /><InputLabel id="labelCategory">Категория</InputLabel>
        <Input
          required
          type="text"
          list="categoties"
          onChange={handleChangeCategory}
        />
        <datalist id="categoties">
          {categories.map( category => (
            <option key={category.id} value={category.nameOfCategory}>{category.nameOfCategory}</option>
          ))}
        </datalist>

        <FormHelperText error={isCategoryError}>
          {categoryHelper}
        </ FormHelperText>

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

const PageTitle = styled.div`
  text-align: center;
  padding: 20px;
`;