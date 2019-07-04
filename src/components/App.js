import React, { useEffect } from 'react';
import * as firebase from 'firebase/app';
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