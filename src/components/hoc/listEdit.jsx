import React, { Component } from 'react'
import { message } from 'antd'
import { withRouter } from 'react-router'



const ListEdit = (WrapComponent) => {
  class InnerComponent extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        showModal: false,
        modalTitle: ''
      }
    }

    handleCancel = () => {
      if (!!this.state.showModal) {
        this.props.router.push({
          pathname: this.props.location.state.returnTo,
          state: { showModal: false, modalTitle: '' }
        })
      }
    }

    componentWillReceiveProps(nextProps) {
      let routeState = nextProps.location.state
      if (!!routeState) {
        this.setState({ ...routeState })
      }
    }

    render() {
      return <WrapComponent {...this.props} handleCancel={this.handleCancel} showModal={this.state.showModal}
        modalTitle={this.state.modalTitle} handleValidate={this.handleValidate}
        />
    }
  }

  return withRouter(InnerComponent)
}

export default ListEdit