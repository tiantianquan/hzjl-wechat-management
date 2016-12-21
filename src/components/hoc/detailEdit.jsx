import React, { Component } from 'react'

const DetailEdit = (WrapComponent) => {
  return class extends Component {
    constructor(props, context) {
      super(props, context)
    }

    _handleValidate = () => {
      let {form} = this.props
      let flag = true
      form.validateFields((err, values) => {
        if (err) {
          flag = false
        }
      })

      if (!flag) {
        return flag
      } else {
        flag = !!this.refs.wrapComponent._handleValidate ?
          this.refs.wrapComponent._handleValidate() : true
        return flag
      }
    }

    _handleSubmit = (e, cb) => {
      e.preventDefault()
      if (this._handleValidate()) {
        cb()
      }
    }

    render() {
      return <WrapComponent ref='wrapComponent'  {...this.props}
        handleSubmit={this._handleSubmit}
        handleValidate={this._handleValidate} />
    }
  }

}

export default DetailEdit