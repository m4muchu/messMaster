import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { lateMess } from '../actions/dateAction';

class Home extends Component {
  lateMess(e) {
    e.preventDefault();

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    today = dd + '-' + mm + '-' + yyyy;

    const messNumber = localStorage.getItem('messNumber');

    var data = {
      messNumber: messNumber,
      date: today
    };

    this.props.lateMess(data);
  }

  render() {
    return (
      <div>
        <Link to="/mess-cut" className="btn-large blue lighten-2">
          mess cut
        </Link>

        <div className="btn-large" onClick={this.lateMess.bind(this)}>
          late mess
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { lateMess }
)(Home);
