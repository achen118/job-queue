import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './reducers/root_reducer';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
    const store = createStore(RootReducer, applyMiddleware(thunk));
    const root = document.getElementById('root');
    ReactDOM.render(<Root store={ store } />, root);
});