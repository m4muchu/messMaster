import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableItem extends Component {
  render() {
    const { date } = this.props;
    console.log('inside tableItem', date);
    return (
      <div>
        <tr>
          <td>{date}</td>
        </tr>
      </div>
    );
  }
}

TableItem.propTypes = {
  date: PropTypes.object.isRequired
};

export default TableItem;
