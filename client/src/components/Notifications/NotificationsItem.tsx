import React from 'react';

import { MenuItem, Typography } from '@material-ui/core';


interface NotificationItemProps {
  id: number,
  handleClose: () => void,
}

export const NotificationItem
 = ({id, handleClose}: NotificationItemProps):JSX.Element => {
   //  const clickHandler = async (id: number ) => {
   //    const books = await getBooksByCategory(id);
   //    filter(books);
   //  };

   return (
     <MenuItem onClick={handleClose}>
       <Typography>{id}</Typography>
     </MenuItem>
   );
 };