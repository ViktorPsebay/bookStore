export const logout = (): void => {
  localStorage.setItem('userToken', '');
  document.location.href = 'http://localhost:3000/';
};
