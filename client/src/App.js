import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import Login from './components/auth/Login';
import Home from './components/Home';
import MessCut from './components/MessCut';
import { setCurrentUser } from './actions/authActions';

if (localStorage.messNumber) {
  var messNo = localStorage.messNumber;

  store.dispatch(setCurrentUser(messNo));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="container">
              <Route exact path="/" component={Login} />

              <Route exact path="/home" component={Home} />
              <Route exact path="/mess-cut" component={MessCut} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
