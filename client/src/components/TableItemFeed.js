import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableItem from './TableItem';

class TableItemFeed extends Component {
  render() {
    const { messCutHistory } = this.props;
    console.log('table item feed', messCutHistory);

    // messCutHistory.map(date => console.log(date));

    return messCutHistory.map(date => <TableItem key={date._id} date={date} />);
  }
}

TableItemFeed.propTypes = {
  messCutHistory: PropTypes.array.isRequired
};

export default TableItemFeed;
