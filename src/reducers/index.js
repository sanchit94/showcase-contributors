import * as asyncInitialState from 'redux-async-initial-state';
import userReducer from './user';
import cardReducer from './card';
import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';


// const defaultState = {
//   boards: {},
//   lists: {},
//   cards: {},
//   loading: true,
//   isLoggedIn: false
// };

const boardReducer = (state = {}, action) => {
  switch (action.type) {
    default:
    return state;
  }
};
const listReducer = (state = [], action) => {
  switch (action.type) {
    default:
    return state;
  }
};

const loadingReducer = (state = true, action) => {
  switch (action.type) {
    default:
    return state;
  }
};
const logReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.LOGIN: {
      return true;
    }
    case actionTypes.LOGOUT: {
      return false;
    }
    default:
    return state;
  }
};


export default asyncInitialState.outerReducer(combineReducers({
  boards: boardReducer,
  lists: listReducer,
  cards: cardReducer,
  loading: loadingReducer,
  isLoggedIn: logReducer,
  user: userReducer
}));