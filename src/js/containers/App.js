import React from 'react';
import { sessionService } from 'redux-react-session';

import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
//
import RouterApp from './RouterApp';
import configureStore from '../store/configureStore';

const store = configureStore();
// Init the session service
sessionService.initSessionService(store);
const App = () => <Provider store={store}><RouterApp /></Provider>;

export default hot(module)(App);
