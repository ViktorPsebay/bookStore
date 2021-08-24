import React from 'react';
import { booksInterface } from '../types/types';
import { Categories } from './Category';
import { FilterByPrice } from './FilterByPrice';
import { FilterByRating } from './FilterByRating';
import styled, { css } from 'styled-components';

interface SideBarProps {
  filter: (books: booksInterface[]) => void,
}

export const SideBar = ({filter}: SideBarProps): JSX.Element => {

  return (
    <SideBarStyle>
      <Categories filter={filter}/>      
      <div>
      Автор
        <ul>
          <li></li>
          <li></li>
          <li></li>  
        </ul>  
      </div>
      <FilterByPrice filter={filter} />
      <FilterByRating filter={filter} />
    </SideBarStyle>
  );
};

const SideBarStyle = styled.ul`
  max-width: 200px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  ${props =>
    props.children &&
    css`
     list-style-type: none; 
    `};
`;

