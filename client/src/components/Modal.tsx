import React from 'react';
import { PopUp, StyledModal } from '../styledComponents/StyledModal';
import { modesOfLogin } from '../consts';
import { Auth } from './Auth';
import { Registration } from './Registration';

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
