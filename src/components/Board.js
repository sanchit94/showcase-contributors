import React, { Component } from 'react';
import { connect } from "react-redux";

import { Header } from 'semantic-ui-react';
import List from './List';


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
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
        return(
            <div className="app-over">
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

export default connect(mapStateToProps, null)(Board); 
