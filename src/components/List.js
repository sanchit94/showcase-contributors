import React from 'react';

import CardInfo from './CardInfo';
import { connect } from 'react-redux';


function List(props) {

    const renderCards = () => {
			return props.lists[props.id].cardIds.map(cardId => {
				return <CardInfo key={cardId} id={cardId} />
			});
		}

			return(
				<div>
					{ !props.loading && renderCards() }
				</div>
			);
}

const mapStateToProps = store => ({
    cards: store.cards,
    lists: store.lists,
    loading: store.loading
});

export default connect(mapStateToProps, null)(List);
