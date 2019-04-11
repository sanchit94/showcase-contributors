import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, Image, Accordion } from 'semantic-ui-react';

import { domain } from '../constants'

class CardInfo extends Component {

    getIndex = () => {
        const { id } = this.props;
        const index = this.props.cards.findIndex(
            card => card.id === id
        );
        return index;

    }

    renderDate = () => {
        const index = this.getIndex();
        let { timeStamp } = this.props.cards[index];
        console.log(timeStamp, "card")
        timeStamp = new Date(timeStamp);
        console.log(typeof cardTime, "TimeStamp")
        const now = new Date();
        if (timeStamp.toDateString() === now.toDateString()) {
            return "Today";
        }
        return timeStamp.toDateString().slice(0,9);

    }

    renderCard = () => {
        const index = this.getIndex();
        const imageSource = `${domain}/uploads/${this.props.cards[index].cardImage}`;

        const panel = [{
            key: index,
            title: {
                content: (
                    <div>
                <Card.Header className="card-header">{this.props.cards[index].heading}</Card.Header>
                <Card.Meta className="mt-2">
                    <span className='date'>{this.renderDate()}</span>
                </Card.Meta>
                </div>),
                icon: ''
            },
            content: {
                content: <Card.Description>{this.props.cards[index].content}</Card.Description>
            }
        }];

        return(
            <Card className="raised card-norad mb-2" fluid>
                <div></div> {/* For avoiding wierd card css from semantic-ui */}
                {this.props.cards[index].cardImage && <Image src={imageSource} alt="Couldn't load image" />}
                <div className={`card__labels__${this.props.cards[index].priority || 2}`}>
                </div>
                <Card.Content>
                    <Accordion className="mt--2" panels={panel} fluid />
                </Card.Content>
            </Card>
        );

    }
    render() {
        return(
            <div>
            {!this.props.loading && this.renderCard()}
            </div>
        );
    }
}

const mapDispatchToProps = store => ({
    cards: store.cards,
    loading: store.loading
})

export default connect(mapDispatchToProps, null)(CardInfo)