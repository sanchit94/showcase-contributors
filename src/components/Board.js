import React, { Component } from 'react';
import { connect } from "react-redux";
import { loadInitialState } from '../actions';
import { loginAsync, login, logout } from '../actions/user';

import { Dimmer, Loader } from 'semantic-ui-react';

import List from './List';


class Board extends Component {
       
    componentWillMount = () => {
        if (localStorage.getItem('user')) {
            this.props.loginAsync(localStorage.getItem('user'))
            .then(res => {
              this.props.loadInitialState();
              this.props.login(res.data);
            })
            .catch(() => {
                console.log("Caught an error")
                this.props.logout();
            })
        } else {
            this.props.loadInitialState();
        }
    }
        

    renderHeading = () => {
        return this.props.boards[1].listIds.map(listId => {
            return (<div className="list-responsive mt-2" key={listId}>
                        <h3>{this.props.lists[listId].name}</h3>
                    </div>)
        })
    }

    renderBoard = () => {
        return this.props.boards[1].listIds.map(list => {
            return (
                <div className="list-responsive" key={list}>
                    <List key={list} id={list} />
                </div>
            );
        });
    }

    render() {
        if (this.props.loading) {
            return (
                <div className="d-flex align-center block-centered vh-height">
                    <Dimmer inverted>
                    {/* active */}
                        <Loader inverted></Loader>
                    </Dimmer>
                </div>
            );
        }
        return(
            
            <div className="app-over content">
                <header className="app-bar mt-4">
                <div className="d-flex">
                    {!this.props.loading && this.renderHeading()}
                </div>
                </header>
                <div className="board">
                    <div className="auto-height d-flex">
                        {!this.props.loading && this.renderBoard()}
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = store => ({
    lists: store.lists,
    boards: store.boards.boards,
    loading: store.loading
})

export default connect(mapStateToProps, { loginAsync, login, logout, loadInitialState })(Board); 
