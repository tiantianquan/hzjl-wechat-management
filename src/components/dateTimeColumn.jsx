import React, { Component } from 'react';
import { Table } from 'antd'

const {Column } = Table


class DateTimeColumn extends Component {
  _handleRender = (text, record) => {
    console.log(text, record)
    return (<div>1</div>)
  }
  render() {
    return (
      <Column {...this.props}
        render={this._handleRender}
        />
    )
  }
}

export default DateTimeColumn