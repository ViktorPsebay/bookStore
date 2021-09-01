import { instance } from '.';
import { authorsInterface, booksInterface, booksRequestInterface } from '../types/types';

export const getBooks = async (): Promise<booksInterface []> => {
  try {
    const response = await instance('/books/');
    const books = await response.data;
    return books;
      
  } catch(e) {
    console.log(e);
    return [];
  }
};

export const sortBooks = async (criterion: string): Promise<booksInterface []> => {
  try {
    const response = await instance(`/books/sort/${criterion}`);
    const books: booksInterface[] = await response.data;
    return books;
      
  } catch(e) {
    console.log(e);
    return [];
  }
};

export const getBooksByPrice = async (price?: number): Promise<booksInterface []> => {
  try {
    const response = await instance(`/books/get_by_price/${price}`);
    const books = await response.data;
    return books;
      
  } catch(e) {
    console.log(e);
    return [];
  }
};

export const getBooksByRating = async (rate?: number): Promise<booksInterface []> => {
  try {
    const response = await instance(`/books/get_by_rate/${rate}`);
    const books = await response.data;
    return books;
      
  } catch(e) {
    console.log(e);
    return [];
  }
};

export const getBooksByCategory = async (id?: number): Promise<booksInterface []> => {
  try {
    const response = await instance(`/books/get_by_category/${id}`);
    const books = await response.data;
    return books;
      
  } catch(e) {
    console.log(e);
    return [];
  }
};


export const getBooksByAuthor = async (id?: number): Promise<booksInterface []> => {
  try {
    const response = await instance(`/book_authors/by_author/${id}`);
    const books: {
      id: number,
      book: booksInterface,
      author: authorsInterface,
    } [] = await response.data;
    return books.map(book => book.book);
      
  } catch(e) {
    console.log(e);
    return [];
  }
};

export const getCountOfBooks = async (): Promise<number>=> {
  try {
    const response = await instance('books/count/book');
    const books = await response.data;
    return books;
      
  } catch(e) {
    console.log(e);
    return 0;
  }
};

export const getOneBookById = async (id: number): Promise<booksInterface> => {
  try {
    const response = await instance(`/books/${id}`);
    const book = await response.data;
    return book;
      
  } catch(e) {
    console.log(e);
    return {
      id: 0,
      title: '',
      price: 0,    
    };
  }
};

export const postBook = async (book: booksRequestInterface): Promise<number> => {
  try {
    const response = await instance.post('/books/', book);
      
    console.log(response.data);
    return response.data.id;
  } catch(e) {
    console.log(e);
    return 0;
  }
};


export const getRatingForBook = async (id: string): Promise<number> => {
  try {
    const response = await instance(`/books/get_rates/${id}`);
    const rate = await response.data.avg;
    console.log(rate);
    return rate;
      
  } catch(e) {
    console.log(e);
    return 0;
  }
};