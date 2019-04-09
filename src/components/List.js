import React, { Component } from 'react';
import _ from 'underscore';

import CardInfo from './CardInfo';


export default class List extends Component {
    renderCards = () => {
        const cardIndexed = _.indexBy(this.props.superState.cards);
        this.props.data.cardIds.map(cardId => {
            return <CardInfo id={cardId} data={cardIndexed[cardId]} />
        });
    }
    render() {
        return(
            <div>
                {this.props.data}
            </div>
        );
    }

}