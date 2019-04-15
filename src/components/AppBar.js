import React, { Component } from 'react';
import { connect } from "react-redux";

import { Header } from 'semantic-ui-react';

class AppBar extends Component {
    renderHeading = () => {
        return this.props.boards[1].listIds.map(listId => {
            return (<div className="list-responsive" key={listId} width={3}>
                        <Header as='h3'>{this.props.lists[listId].name}</Header>
                    </div>)
        })
    }

    render() {
        return(
        <header className="app-bar mt-4 ml-4">
            <div className="d-flex">
                {!this.props.loading && this.renderHeading()}
            </div>
        </header>
            
        );
    }
}

const mapDispatchToProps = store => ({
    lists: store.lists,
    boards: store.boards.boards,
    loading: store.loading
})

export default connect(mapDispatchToProps, null)(AppBar);