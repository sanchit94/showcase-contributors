import React, { Component } from 'react';
import { connect } from "react-redux";

import Board from './Board';
import LoginForm from './LoginForm';
import { Switch, Route } from 'react-router-dom';

class Content extends Component {
    render() {
        return(
            <Switch>
                <Route exact path="/" component={Board} />
                <Route exact path="/login" component={LoginForm} />
            </Switch>
        );
    }

}

const mapStateToProps = store => ({
    lists: store.lists,
    boards: store.boards.boards,
    loading: store.loading
})

export default connect(mapStateToProps, null)(Content); 
