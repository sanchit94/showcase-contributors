import * as asyncInitialState from 'redux-async-initial-state';


const defaultState = {
  boards: {},
  lists: {},
  cards: {}
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
    return state;
  }
};


export default asyncInitialState.outerReducer(appReducer);