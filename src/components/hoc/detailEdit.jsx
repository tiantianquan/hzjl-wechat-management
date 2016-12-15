import React, { Component } from 'react'

const DetailEdit = (WrapComponent) => {
  return class extends Component {
    constructor(props, context) {
      super(props, context);
    }

    handleValidate(form) {
      let flag = true
      form.validateFields((err, values) => {
        if (err) {
          flag = false
        }
      })
      return flag
    }

    render() {
      return <WrapComponent {...this.props} handleValidate={this.handleValidate} />
    }
  }

}

export default DetailEdit