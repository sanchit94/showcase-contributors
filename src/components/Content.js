import React, { Component } from 'react';
import { connect } from "react-redux";

import Board from './Board';
import Login from './Login';
import Farewell from './Farewell';
import { loginAsync, login } from '../actions/login';
import { Switch, Route } from 'react-router-dom';

class Content extends Component {
    componentDidMount = () => {
        if (localStorage.getItem('user')) {
            this.props.loginAsync(localStorage.getItem('user'))
            .then(res => {
              this.props.login(res.data);
            });
        }
    }
    render() {
        return(
            <Switch>
                <Route exact path="/" component={Board} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Farewell} />
            </Switch>
        );
    }

}

const mapStateToProps = store => ({
    lists: store.lists,
    boards: store.boards.boards,
    loading: store.loading
})

export default connect(mapStateToProps, { loginAsync, login })(Content); 
