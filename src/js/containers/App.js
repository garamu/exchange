import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
//
import RouterApp from './RouterApp';
import configureStore from '../store/configureStore';

const store = configureStore();

const App = () => <Provider store={store}><RouterApp /></Provider>;

export default hot(module)(App);
