import React, { Component } from 'react';
import _ from 'underscore';

import CardInfo from './CardInfo';
import { connect } from 'react-redux';


class List extends Component {
    renderCards = () => {
        const { id } = this.props;
        return this.props.lists[id].cardIds.map(cardId => {
            return <CardInfo key={cardId} id={cardId} />
        });
    }
    render() {
        return(
            <div>
                {!this.props.loading && this.renderCards()}
            </div>
        );
    }
}

const mapStateToProps = store => ({
    cards: store.cards,
    lists: store.lists,
    loading: store.loading
});

export default connect(mapStateToProps, null)(List);