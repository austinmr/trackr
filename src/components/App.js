import React from 'react';
import Navigation from '../containers/Navigation'
import '../App.css'
import '../css/Results.css'
import '../css/Profile.css'

const App = ({ children }) => (
    <div className="App">
      <Navigation />
        { children }
    </div>
);

export default App;
