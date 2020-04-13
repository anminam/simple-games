import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Tictactoe from 'components/Tictactoe';
import Googoodan from 'components/Googoodan';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li><Link to='/tictactoe'>틱텍토</Link></li>
              <li><Link to='/googoodan'>구구단</Link></li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route exact path='/' component={Tictactoe} />
          <Route path='/tictactoe' component={Tictactoe} />
          <Route path='/googoodan' component={Googoodan} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
