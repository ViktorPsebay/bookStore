
import { createStore, compose, applyMiddleware } from 'redux';
import { reducer } from './reducer';
import thunk from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* eslint-disable no-underscore-dangle */
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));