import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Tictactoe from './Tictactoe';
import Googoodan from './Googoodan';
import Mine from './Mine';

const Main = () => {
    return (
        <main className="App-main">
          <Switch>
            <Route path="/tictactoe" component={Tictactoe}></Route>
            <Route path="/googoodan" component={Googoodan}></Route>
            <Route path="/Mine" component={Mine}></Route>
            <Route expact path="/" component={Tictactoe}></Route>
          </Switch>
        </main>
    )
}

export default Main;