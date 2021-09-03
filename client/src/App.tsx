import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { idText } from 'typescript';

import { Header } from './components/Header';
import { Main } from './components/Main';
import { serverUrl } from './consts';
import { setCountOfNewBooks } from './store/action';
import { usersInterface } from './types/types';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.authUser);

  const initialState: number[] = []; 

  const [booksId, setBooksId] = useState(initialState);

  const socket: { current: Socket | undefined} = useRef();
  const connect = () => {
    socket.current = io(serverUrl);

    socket.current.on('message', (message) => {
      console.log(message);
      dispatch(setCountOfNewBooks());
      if (message.id)
        setBooksId(prev => [message.id, ...prev]);
    });
    socket.current.on('close', () => {
      console.log('Socket закрыт');
    });
    socket.current.on('error', () => {
      console.log('Socket произошла ошибка');
    });
  };


  const sendMessage = (id: number) => {
    const message = {
      user: user?.fullName || 'unknown',
      message: 'добавлена книга',
      id,
      event: 'message'
    };
    socket.current?.emit('message', JSON.stringify(message));
  };
  interface RootState {
    authUser: usersInterface | null
  }

  useEffect(() => {
    connect();
  }, []);

  return (
    <Router>
      <div className="App" style={{display: 'flex', flexDirection: 'column'}}>
        <Header booksId={booksId}/>
        <Main sendNotification={(id) => sendMessage(id)}/>        
      </div>
    </Router>
  );
}

export default App;
