import React, { Component } from 'react';

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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
