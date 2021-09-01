import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';

import styled from 'styled-components';

interface PaginationProps {
  choose: (page: number) => void,
  page: number,
}

export const Pagination = ({page, choose}: PaginationProps):JSX.Element => {
  return (
    <Pages>
      <ButtonGroup color="primary" aria-label="outlined primary button group" style={{display: 'flex', justifyContent: 'center'}}>
        {(page > 1) ? Array(page).fill(0).map((element, index) => (
          <Button key={index} value={index + 1} onClick={() => choose(index + 1)}>{index + 1}</Button>
        )) : null}
      </ButtonGroup>
    </Pages>    
  );
};

const Pages = styled.div`
  margin: 0;
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content:space-around;
`;