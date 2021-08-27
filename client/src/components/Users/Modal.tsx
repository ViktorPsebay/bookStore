import React from 'react';
import { modesOfLogin } from '../../consts';
import { Auth } from './Auth';
import { Registration } from './Registration';
import styled from 'styled-components';

export const Modal = ({mode, clickModalHandler}: {mode: string, clickModalHandler: () => void}):JSX.Element => {
  return (
    <StyledModal onClick={clickModalHandler} >
      {(mode === modesOfLogin.authorization) ? (
        <PopUp onClick={(e)=>e.stopPropagation()}>
          <Auth />
        </PopUp>) : (
        <PopUp onClick={(e) => e.stopPropagation()}>
          <Registration />
        </PopUp>)}
    </StyledModal>
  );
};

const StyledModal = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content:space-around;
  opacity: 1;
  z-index:1000;
`;

const PopUp = styled.div`
  padding: 50px;
  border-radius: 12px;
  background-color: white; 
`;
