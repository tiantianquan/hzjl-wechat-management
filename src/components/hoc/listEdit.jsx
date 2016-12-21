import React, { Component } from 'react'
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

    _handleCancel = () => {
      if (!!this.state.showModal) {
        this.props.router.push({
          pathname: this.props.location.state.returnTo,
          state: { showModal: false, modalTitle: '' }
        })
      }
    }

    _handleDateColumnRender = (text, record) => {
      let str
      if (!!text) {
        let date = new Date(text)
        str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      }
      return (
        <div>{str}</div>
      )
    }

    componentWillReceiveProps(nextProps) {
      let routeState = nextProps.location.state
      if (!!routeState) {
        this.setState({ ...routeState })
      }
    }

    render() {
      return <WrapComponent {...this.props} handleCancel={this._handleCancel} showModal={this.state.showModal}
        modalTitle={this.state.modalTitle} handleDateColumnRender={this._handleDateColumnRender}
        />
    }
  }

  return withRouter(InnerComponent)
}

export default ListEdit