import React, { Component } from 'react';
import { connect } from "react-redux";

import { Grid, Header } from 'semantic-ui-react';

class AppBar extends Component {
    renderHeading = () => {
        return this.props.boards[1].listIds.map(listId => {
            return (<Grid.Column key={listId} width={4}>
                        <Header as='h3'>{this.props.lists[listId].name}</Header>
                    </Grid.Column>)
        })
    }

    render() {
        return(
        <header className="app-bar mt-4 ml-4">
            <Grid>
                {!this.props.loading && this.renderHeading()}
            </Grid>
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