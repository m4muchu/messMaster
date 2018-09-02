import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import store from './store';
import './App.css';

import Login from './components/auth/Login';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/register" component={Login} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
