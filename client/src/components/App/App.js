import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Navbar from '../Navbar/Navbar';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import Game from '../Game/Game';
import Profile from '../Profile/Profile';
import Main from '../Main/Main';

function App() {
  
  return (
    <div>
      <Navbar />
      <div>
      <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/" exact>
          <Main />
        </Route>
      </div>
      <Route path="/game">
        <Game />
      </Route>
    </div>
  );
}

export default App;
