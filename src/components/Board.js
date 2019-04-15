import React, { Component } from 'react';
import { connect } from "react-redux";

import List from './List';


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    componentDidUpdate = () => {
        console.log(this.props.boards[1].listIds, "MIB");
    }

    renderBoard = () => {
        return this.props.boards[1].listIds.map(list => {
            return (
                <div className="list-responsive" key={list} width={3}>
                    <List key={list} id={list} />
                </div>
            );
        });
    }

    render() {
        return(
            <div className="board">
                <div className="mt-4 ml-4 scroll-overflow d-flex">
                    {!this.props.loading && this.renderBoard()}
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
