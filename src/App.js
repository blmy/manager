import React, { Component } from 'react';
import { Provider } from 'react-redux'; //connector between react & react-redux
import { createStore, applyMiddleware } from 'redux'; //redux store, middleware helper
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk'; //middleware
import reducers from './reducers'; //the system will look for index file
import Router from './Router';

//root component App
class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBfdR1sbrsiNlCiI5r-_5qSeVo1ZUxT1XQ',
      authDomain: 'manager-b6e87.firebaseapp.com',
      databaseURL: 'https://manager-b6e87.firebaseio.com',
      projectId: 'manager-b6e87',
      storageBucket: 'manager-b6e87.appspot.com',
      messagingSenderId: '226886170395'
    };
    firebase.initializeApp(config);
  }

  render() {
    //destructuring
    //The second argument '{}' is for any initial state that we want to
    //pass to redux application (optional)
    //mostly applicable to serverside rendering.
    //The third argument 'applyMiddleware' is a store enhencer,
    //adding additional functions to the store.
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      //<Router /> is my navigation
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
