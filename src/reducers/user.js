import * as actionTypes from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
        case actionTypes.LOGIN: {
            localStorage.setItem('user', action.payload.email);
            localStorage.setItem('username', action.payload.name);
            console.log(action.payload);
            const newState = action.payload;
            return newState;
        }
        case actionTypes.LOGOUT: {
            localStorage.setItem('user', '');
            localStorage.setItem('username', '');
            const newState = null;
            return newState;
        }
        case actionTypes.SIGNUP: {
            const newState = action.payload;
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