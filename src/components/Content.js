import React, { Component } from 'react';
import { connect } from "react-redux";

import { Grid } from 'semantic-ui-react';

import List from './List';
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    } 

    renderBoard = () => {
        
        return this.props.boards[1].listIds.map(list => {
            return (
                <Grid.Column width={5}>
                    <List id={list} />
                </Grid.Column>
            );
        });
    }

    render() {
        return(
            <Grid>
                <div>Hello!</div>
                {this.state.data && this.renderBoard()}
            </Grid>
        );
    }

}

const mapStateToProps = store => ({
    lists: store.lists,
    boards: store.boards.boards
})

export default connect(mapStateToProps, null)(Content); 
