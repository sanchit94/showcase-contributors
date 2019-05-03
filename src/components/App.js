import React, { Component } from 'react';
import './App.css';

import Content from './Content';
import AppBar from './AppBar';
import { loadInitialState } from '../actions';

import { connect } from 'react-redux';

class App extends Component {
  componentDidMount = () => {
    this.props.loadInitialState();
  }
  
  render() {
    return (
      <div className="App">
        <AppBar />
        <Content />
      </div>
    );
  }
}

export default connect(null, { loadInitialState })(App);
