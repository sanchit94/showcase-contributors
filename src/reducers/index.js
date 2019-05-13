import * as asyncInitialState from 'redux-async-initial-state';
import userReducer from './user';
import voteReducer from './vote';
import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

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

const reqReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.SENT_REQ: {
      return true;
    }
    case actionTypes.LOGIN: {
      return false;
    }
    case actionTypes.SIGNUP: {
      return false;
    }
    case actionTypes.FAILED_REQ: {
      return false;
    }
    default: {
      return state;
    }
  }
}


export default asyncInitialState.outerReducer(combineReducers({
  boards: boardReducer,
  lists: listReducer,
  cards: voteReducer,
  loading: loadingReducer,
  isLoggedIn: logReducer,
  user: userReducer,
  reqSent: reqReducer
}));