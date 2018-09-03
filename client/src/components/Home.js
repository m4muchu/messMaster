import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Icon, notification } from 'antd';
import PropTypes from 'prop-types';
import { lateMess } from '../actions/dateAction';
import axios from 'axios';
import { messCutFetch } from '../actions/messCutAction';

class Home extends Component {
  componentDidMount() {
    let messNumber = this.props.auth.user;

    console.log('component did mount executed', messNumber);
    this.props.messCutFetch(messNumber);
  }

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
    const openNotification = () => {
      notification.open({
        message: 'YOUR LATE MESS IS SUCCESSFULL',
        description:
          'Take the food as per mess number provided in the plate,if you',
        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />
      });
    };
    openNotification();
  }

  messcut(e) {
    e.preventDefault();
    this.props.history.push('/mess-cut');
  }

  logout() {
    axios.post('/logout').then(res => {
      console.log(res);
      localStorage.clear();
      window.location.href = '/';
    });
  }

  render() {
    // const dates = this.props.auth.messCutHistory;
    // const datesArray = JSON.stringify(dates);
    const { messCutHistory } = this.props;

    return (
      <div className="home-section">
        <section className="section section-head">
          <div className="container">
            <div className="row">
              <div className="">
                <div
                  className="btn-large waves-effect lighten-effect blue lighten-2 col s12 m4"
                  onClick={this.messcut.bind(this)}
                >
                  mess cut
                </div>
              </div>
              <div className="">
                <div
                  className="btn-large waves-effect lighten-effect blue lighten-2 col s12 m4"
                  onClick={this.lateMess.bind(this)}
                >
                  late mess
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-middle">
          <div className="container">
            <div className="row">
              <div className="col s12 m4">
                <div className="card indigo lighten-1 messNumberCard">
                  <div className="card-content">
                    <p className="white-text">MESS NO</p>
                    <span className="messNumber">{this.props.auth.user}</span>
                  </div>
                </div>
              </div>
              <div className="col s12 m4 offset-m1 ">
                <p className="center" id="messcutHeading">
                  Mess-cut History
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>To</th>
                    </tr>
                  </thead>

                  <tbody>
                    {messCutHistory.map(dates => (
                      <tr>
                        <td>{dates.fromDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="center">
            <div
              className="btn-large waves-effect lighten-effect red lighten-2 col s12 m4"
              onClick={this.logout.bind(this)}
            >
              log out
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  messCutFetch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { lateMess, messCutFetch }
)(Home);
