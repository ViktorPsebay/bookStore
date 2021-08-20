import React from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/Header';
import { Main } from './components/Main';

function App(): JSX.Element {
  return (
    <Router>
      <div className="App" style={{display: 'flex', flexDirection: 'column'}}>
        <Header/>
        <Main />        
      </div>
    </Router>
  );
}

export default App;
