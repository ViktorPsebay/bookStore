export interface usersInterface {
  id: number,
  fullName?: string,  
  email: string,
  birthday?: Date,
}

export interface categoriesInterface{
  id: number,
  nameOfCategory: string,
}

export interface authorsInterface{
  id: number,
  name: string,
}

export interface bookAuthorInterface {
  id?: number,
  bookId: number,
  authorId: number,
}

export interface booksInterface {
  id: number,
  title: string,  
  author?: string,
  categoryId?: number,
  price: number,
  intro?: string,
  rating?: number,
  description?: string,
  image?: string,
}

export interface ratesInterface {
  rate: number,
  userId: number,
  bookId: number,
}

export interface reviewInterface {
  bookId: number,
  userId: number | null,
  textOfReview?: string,
  id?: number,
}

// export interface reviewResponseInterface {
//   id: number,
//   textOfReview?: string,
//   book: booksInterface,
//   user: usersInterface,
// }

export interface booksRequestInterface {
  id?: number,
  title: string,  
  author?: string,
  categoryId?: number,
  price: number,
  intro?: string,
  rating?: number,
  description?: string,
  image?: string,
}

export interface favoritesInterface {
  id: number,
  book: booksInterface,
  user: usersInterface,
}


export interface actionInterface {
  type: string,
  payload: usersInterface[],
}