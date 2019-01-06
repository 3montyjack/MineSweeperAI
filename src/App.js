import React, { Component } from 'react';
import './App.css';
import GameArea from './GameArea/GameArea.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <GameArea></GameArea>
      </div>
    );
  }
}

export default App;
