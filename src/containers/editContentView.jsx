import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
import { Input } from 'antd'


class EditContentView extends Component {
  constructor(props) {
    super(props)
    this.state = { html: "<b>Hello <i>World</i></b>" }
  }

  handleChange = (evt) => {
    this.setState({ html: evt.target.value }, () => {
      this.refs.renderContent.innerHTML = this.state.html
    })
  }

  render() {
    return (
      <div>
        <Input type="textarea" rows={4} onChange={this.handleChange} />
        <div ref='renderContent'></div>

        <div contentEditable={true}></div>
      </div>
    )
  }

}

export default EditContentView