import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      messNumber: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/home');
    }
  }

  componentWillReceiveProps(nextProps) {
    // we want check the user alredy authenticated ,if so direct to home
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/home');
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      messNumber: this.state.messNumber,
      password: this.state.password
    };

    this.props.loginUser(user);
  }

  render() {
    return (
      <section className="section section-register center">
        <h2>Mess Master</h2>
        <div className="container">
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <div className="card-panel grey lighten-3">
                <h5>REGISTER</h5>
                <form onSubmit={this.onSubmit.bind(this)}>
                  <div className="input-field">
                    <input
                      type="number"
                      name="messNumber"
                      id="messNumber"
                      placeholder="Mess Number"
                      onChange={this.onChange}
                      value={this.messNumber}
                    />
                    <label for="email">Mess Number</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      onChange={this.onChange}
                      value={this.password}
                    />
                    <label for="phone">Password</label>
                  </div>
                  <input type="submit" value="submit" className="btn" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
