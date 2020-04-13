import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return(
        <header className="App-header">
          <div className="title">게임맨</div>
          <nav>
            <ul className="nav-list">
              <li><Link to='/tictactoe'>틱텍토</Link></li>
              <li><Link to='/googoodan'>구구단</Link></li>
            </ul>
          </nav>
        </header>
    )
}

export default Header;