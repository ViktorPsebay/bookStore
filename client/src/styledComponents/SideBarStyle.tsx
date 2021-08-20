import styled, { css } from 'styled-components';

export const SideBarStyle = styled.ul`
  max-width: 200px;
  display: flex;
  /* justify-content:space-around; */
  flex-direction: column;
  padding: 15px;
  ${props =>
    props.children &&
    css`
     list-style-type: none; 
    `};
`;
