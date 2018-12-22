import React, {PureComponent} from 'react';
import Expo from 'expo';
import { AppRegistry, View, Text } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {authStateReducer}  from './components/login/login';
import {Provider as PaperProvider} from 'react-native-paper';


const reducers = combineReducers({
  authState:authStateReducer
})


const store = createStore(reducers)


export default class entry extends PureComponent{

  render(){
    return(
      <PaperProvider>
        <Provider store = {store}><App/></Provider>
      </PaperProvider>
  )
  }
}

Expo.registerRootComponent(entry)
