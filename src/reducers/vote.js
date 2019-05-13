import * as actionTypes from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case actionTypes.INCREMENT_VOTES: {
            const newState = state.slice(0);
            const index = newState.findIndex(card => card.id === action.payload);
            newState[index].votes++;
            return newState;
        }
        case actionTypes.DECREMENT_VOTES: {
            const newState = state.slice(0);
            const index = newState.findIndex(card => card.id === action.payload);
            newState[index].votes--;
            return newState;
        }
    
      default:
      return state;
    }
  };