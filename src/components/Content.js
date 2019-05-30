import React, { Component } from 'react';
import { connect } from "react-redux";

import Board from './Board';
import Login from './Login';
import Farewell from './Farewell';
import Signup from './Signup';

import { Switch, Route } from 'react-router-dom';

class Content extends Component {
    
    render() {
        return(
            <Switch>
                <Route exact path="/" component={Board} />
                <Route exact path="/logout" component={Farewell} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/home" component={Board} />
            </Switch>
        );
    }

}

const mapStateToProps = store => ({
    lists: store.lists,
    boards: store.boards.boards,
    loading: store.loading
})

export default connect(mapStateToProps, {})(Content); 
