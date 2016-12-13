import React, { Component } from 'react';
import { Form, Input, Spin } from 'antd'

class WxKeyEditView extends Component {
  render() {
    console.log(this.props.params)
    return (
      <Spin spinning={true}>
        <Form horizontal
          onSubmit={this.handleSubmit}>
          <Form.Item
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            label="AppID"
            hasFeedback
            className='edit-input'
            >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            label="AppKey"
            hasFeedback
            className='edit-input'
            >
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    )
  }
}

export default WxKeyEditView;