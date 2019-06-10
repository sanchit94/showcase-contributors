import React, { useEffect } from 'react';
import * as firebase from 'firebase/app';
import './App.css';
import 'rodal/lib/rodal.css';

import Content from './Content';
import AppBar from './AppBar';




function App() {
  useEffect(() => {
    console.log('used')
    const firebaseConfig = {
      apiKey: "AIzaSyAj3JWUu8PeYi3OWuWqt2ghT7XzN0WqQvk",
      authDomain: "roadmap-714c8.firebaseapp.com",
      databaseURL: "https://roadmap-714c8.firebaseio.com",
      projectId: "roadmap-714c8",
      storageBucket: "roadmap-714c8.appspot.com",
      messagingSenderId: "408935502660",
      appId: "1:408935502660:web:d6ea7551b3fd0d08"
    };
  
    firebase.initializeApp(firebaseConfig);
  })

  return (
    <div className="App">
      <AppBar />
      <Content />
    </div>
  );
}


export default App;