import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainScreen from './screen/MainScreen';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainScreen />
      </div>
    );
  }
}

export default App;
