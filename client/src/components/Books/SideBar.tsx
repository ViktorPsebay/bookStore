import React from 'react';
import { booksInterface } from '../../types/types';
import { Categories } from '../Category';
import { FilterByPrice } from './FilterByPrice';
import { FilterByRating } from './FilterByRating';
import styled, { css } from 'styled-components';
import { Authors } from '../Author/Authors';
import { Sort } from './Sort';

interface SideBarProps {
  filter: (books: booksInterface[]) => void,
}

export const SideBar = ({filter}: SideBarProps): JSX.Element => {

  return (
    <SideBarStyle>
      <Categories filter={filter}/>      
      <Authors filter={filter}/>
      <FilterByPrice filter={filter} />
      <FilterByRating filter={filter} />
      <Sort filter={filter}/>
    </SideBarStyle>
  );
};

const SideBarStyle = styled.ul`
  width: 15%;
  margin:0;
  min-height: 100vh;
  /* background-color: lightsteelblue; */
  /* border-right: solid 1px gray; */
  display: flex;
  flex-direction: column;
  padding: 15px;
  ${props =>
    props.children &&
    css`
     list-style-type: none; 
    `};
`;

