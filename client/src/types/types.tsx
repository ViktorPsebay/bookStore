export interface usersInterface {
  id?: number,
  fullName?: string,  
  email: string,
  birthday?: Date,
}

export interface actionInterface {
  type: string,
  payload: usersInterface[],
}