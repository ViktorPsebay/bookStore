import React from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/Header';
import { Main } from './components/Main';

function App(): JSX.Element {
  // const [visibility, setVisibility] = useState(false);

  // const clickAuthHandler = () => {
  //   setVisibility((true));
  // };

  // const clickModalHandler = () => {
  //   setVisibility((false));
  // };

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
