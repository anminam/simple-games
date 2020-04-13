import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Tictactoe from 'components/Tictactoe';
import Googoodan from 'components/Googoodan';
import Header from 'components/Header';
import Main from 'components/Main';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Main />
      </div>
    </Router>
  );
}

export default App;
