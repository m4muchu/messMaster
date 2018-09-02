import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { messCut } from '../actions/dateAction';

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

  onChange(date, dateString) {
    const fromDate = dateString[0].toString();
    const toDate = dateString[1].toString();

    const messNumber = localStorage.getItem('messNumber');

    var data = {
      fromDate: fromDate,
      toDate: toDate,
      messNumber: messNumber
    };

    this.setState({ data: data });
  }

  submit(e) {
    e.preventDefault();

    this.props.messCut(this.state.data);
  }

  render() {
    const { user } = this.props.auth;
    console.log(user);

    return (
      <div>
        <RangePicker onChange={this.onChange} />
        <Button onClick={this.submit.bind(this)}>Submit</Button>
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
