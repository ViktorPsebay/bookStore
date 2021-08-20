import React from 'react';
import { SideBarStyle } from '../styledComponents/SideBarStyle';
import { booksInterface } from '../types/types';
import { Categories } from './Categories';

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
    </SideBarStyle>
  );
};
