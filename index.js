import React from 'react';
import DogSagaApp from './src/containers/App';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { reducer } from './src/redux/reducers/redux';
import { watcherSaga } from './src/sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watcherSaga);

const App = () => (
  <Provider store={store}>
    <DogSagaApp />
  </Provider>
);

AppRegistry.registerComponent('dogsaganative', () => App);
