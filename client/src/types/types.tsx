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


export interface booksInterface {
  id: number,
  title: string,  
  author?: string,
  price: number,
  intro?: string,
  rate?: number,
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