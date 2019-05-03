import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "./reducers";
import { loadStore } from "./asyncLoad";
import * as asyncInitialState from 'redux-async-initial-state';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk, asyncInitialState.middleware(loadStore))));
export default store;