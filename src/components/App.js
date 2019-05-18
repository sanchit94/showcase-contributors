import React from 'react';
import './App.css';
import 'rodal/lib/rodal.css';

import Content from './Content';
import AppBar from './AppBar';

function App() {

  return (
    <div className="App">
      <AppBar />
      <Content />
    </div>
  );
}


export default App;
