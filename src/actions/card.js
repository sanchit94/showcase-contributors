import * as actionTypes from './types';

export const incrementVotes = cardId => {
    return {
        type: actionTypes.INCREMENT_VOTES,
        payload: cardId
    }
}

export const decrementVotes = cardId => {
    return {
        type: actionTypes.DECREMENT_VOTES,
        payload: cardId
    }
}