import { instance } from '.';

export const authUser = async (user: {
  email: string,
  password: string,
}): Promise<void> => {
  const response = await instance.post('/users/login', user);    
  const result = await response.data;
  if (response.status == 200) {
    localStorage.setItem('userToken', result);
    console.log(result);
    document.location.href = 'http://localhost:3000/';
  }
  else {
    alert(result.message);
  }    
};
