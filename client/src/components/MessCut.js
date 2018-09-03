import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { messCut } from '../actions/dateAction';
import { Spin, Icon, notification } from 'antd';

import './messcut.css';

import { DatePicker, Button } from 'antd';

const { RangePicker } = DatePicker;

class MessCut extends Component {
  constructor() {
    super();

    this.state = {
      fromDate: '',
      toDate: '',
      messNumber: '',
      data: {}
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    const { user } = this.props.auth;
    this.setState({
      messNumber: user
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.lateMess) {
      console.log(this.props.auth.cutDate);

      const openNotification = () => {
        notification.open({
          message: 'YOUR MESS CUT IS SUCCESSFULL',
          description:
            'Take the food as per mess number provided in the plate,if you',
          icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />
        });
      };

      openNotification();
    }
  }

  onChange(date, dateString) {
    const fromDate = dateString[0].toString();
    const toDate = dateString[1].toString();

    // const messNumber = localStorage.getItem('messNumber');
    const messNumber = this.state.messNumber;

    var data = {
      fromDate: fromDate,
      toDate: toDate,
      messNumber: messNumber
    };

    console.log(data);

    this.setState({ data: data });
  }

  submit(e) {
    e.preventDefault();

    this.props.messCut(this.state.data);
  }

  render() {
    return (
      <div>
        <section className="section section-mess-cut center">
          <div className="container">
            <div className="row">
              <div className="col s12">
                <div className="card">
                  <div className="card-content">
                    <RangePicker onChange={this.onChange} />
                  </div>

                  <div className="card-action">
                    <div
                      className="btn waves-effect lighten-effect red lighten-2"
                      onClick={this.submit.bind(this)}
                    >
                      submit
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

MessCut.propTypes = {
  messCut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { messCut }
)(MessCut);
