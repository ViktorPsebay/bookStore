import styled, { css } from 'styled-components';

export const NavBar = styled.ul`
  width: 100%;
  display: flex;
  justify-content:space-around;
  padding: 0;
  ${props =>
    props.children &&
    css`
     list-style-type: none; 
    `};
`;

