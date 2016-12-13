import React, { Component } from 'react'
import { Table, Modal, Button } from 'antd'
import { Link, withRouter } from 'react-router'



const ListEdit = WrapComponent => {
  class InnerComponent extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        showModal: false
      }
    }

    handleCancel = () => {
      this.props.router.push({ pathname: this.props.location.state.returnTo })
    }

    componentWillReceiveProps(nextProps) {
      if (!!nextProps.location.state && !!nextProps.location.state.modal) {
        this.setState({ showModal: true })
      } else {
        this.setState({ showModal: false })
      }
    }

    render() {
      return <WrapComponent {...this.props} />
    }
  }

  return withRouter(InnerComponent)
}

export default ListEdit