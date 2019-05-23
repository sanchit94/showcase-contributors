import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import 'rodal/lib/rodal.css';

import Content from './Content';
import AppBar from './AppBar';

import { loadInitialState } from '../actions';
import { loginAsync, login } from '../actions/user';


function App(props) {

  useEffect(() => {
    
    if (localStorage.getItem('user')) {
        props.loginAsync(localStorage.getItem('user'))
        .then(res => {
          props.loadInitialState();
          props.login(res.data);
        })
        .catch(() => {
            console.log("Caught an error")
            props.logout();
        })
    } else {
        props.loadInitialState();
    }
  });

  return (
    <div className="App">
      <AppBar />
      <Content />
    </div>
  );
}


export default connect(() => {}, { loginAsync, login, loadInitialState })(App);
