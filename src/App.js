import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Heck yeah. I did a thing.
        </p>
        <a
          className="App-link"
          href="https://s3.amazonaws.com/ocn-media/d677ba27-a53d-4a69-8cc7-e217bc93fe86.jpeg"
          target="_blank"
          rel="noopener noreferrer"
        >
          What could this be?
        </a>
      </header>
    </div>
  );
}

export default App;
