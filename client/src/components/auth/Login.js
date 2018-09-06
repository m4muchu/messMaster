import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon } from 'antd';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';

const antIcon = (
  <Icon type="loading" style={{ fontSize: 24, color: '#00897b' }} spin />
);

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

  renderButton() {
    if (this.props.auth.loading) {
      return (
        <div>
          <Spin indicator={antIcon} />
        </div>
      );
    } else {
      return (
        <input
          type="submit"
          value="submit"
          className="btn teal teal darken-1"
        />
      );
    }
  }

  renderError() {
    if (this.props.auth.error) {
      return <p className="red-text">Please Check Your Mess No and password</p>;
    }
  }

  render() {
    return (
      <div className="body-register">
        <section className="section section-register center">
          <div className="container">
            <div className="row">
              <div className="col s12 m6 offset-m3">
                <div className="card-panel grey lighten-3">
                  <h5 className="loginHeading">LOGIN</h5>
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
                    <div>{this.renderError()}</div>
                    <div>{this.renderButton()}</div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
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
