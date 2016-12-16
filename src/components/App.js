import React from 'react';
import Navigation from '../containers/Navigation'

const App = ({ children }) => (
    <div className="App">
      <Navigation />
        { children }
    </div>
);

export default App;
