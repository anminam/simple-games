import React from 'react';
import { HashRouter as Router } from "react-router-dom";
import Header from 'components/Header';
import Main from 'components/Main';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Header />
        <Main />
      </div>
    </Router>
  );
}

export default App;
