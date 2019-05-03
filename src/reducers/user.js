import * as actionTypes from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
        case actionTypes.LOGIN: {
            const newState = action.payload;
            return newState;

        }
        case actionTypes.LOGOUT: {
            const newState = null;
            return newState;
        }
        case actionTypes.INCREMENT_VOTES: {
            const newState = Object.assign({}, state);
            newState.votes.push(action.payload);
            return newState;
        }
        case actionTypes.DECREMENT_VOTES: {
            const newState = Object.assign({}, state);
            const index = newState.votes.findIndex(id => id === action.payload);
			newState.votes.splice(index, 1);
            return newState;
        }
        default: {
            return state;
        }
    }
} 