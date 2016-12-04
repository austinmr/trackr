import React, { Component } from 'react';
import Nav from '../containers/Navigation'

const App = ({ children }) => (
    <div className="App">
      <div className="App-header">
        <h2 style={{margin:10}}>Welcome to React-Redux Boilerplate</h2>
      </div>
        <Nav /> 
        { children }
    </div>
);

export default App;
