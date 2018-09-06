import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableItem extends Component {
  render() {
    const { date } = this.props;
    console.log('inside tableItem', date);
    return (
      <tr>
        <td>{date.fromDate}</td>

        <td>{date.toDate}</td>
      </tr>
    );
  }
}

TableItem.propTypes = {
  date: PropTypes.object.isRequired
};

export default TableItem;
