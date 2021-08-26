import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  choose: (page: number) => void,
  page: number,
}

export const Pagination = ({page, choose}: PaginationProps):JSX.Element => {


  return (
    <List>
      {(page > 1) ? Array(page).fill(0).map((element, index) => (
        <ListElement key={index} value={index + 1} onClick={() => choose(index + 1)}>{index + 1}</ListElement>
      )) : null}
    </List>
  );
};

const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content:space-around;
`;

const ListElement = styled.li`
  list-style-type: none;
  border: solid 1px gray;
  cursor: pointer;
`;

