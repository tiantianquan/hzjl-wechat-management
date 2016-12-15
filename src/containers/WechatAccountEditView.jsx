import React, { Component } from 'react';
import { Form, Input, Spin, Button, message } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import actions from '../actions'

@Form.create({
  /**
   * @param {any} props
   * @returns
      AppId: {
        value: props.wechatAccount.AppId
      },
      AppSecret: {
        value: props.wechatAccount.AppSecret
      },
      Name: {
        value: props.wechatAccount.Name
      },
      Token: {
        value: props.wechatAccount.Token
      },
      EncodingAESKey: {
        value: props.wechatAccount.EncodingAESKey
      }
   */
  mapPropsToFields(props) {
    let formData = {}
    for (var k in props.wechatAccount) {
      if (props.wechatAccount.hasOwnProperty(k)) {
        formData[k] = {
          value: props.wechatAccount[k]
        }
      }
    }
    return formData


  }
})
class WechatAccountEditView extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      type: props.location.state.type
    }
  }

  _handleAdd = () => {
    let addData = {
      ...this.props.form.getFieldsValue()
  }
    this.props.actions.addWechatAccountStart(addData)
  }

_handleEdit = () => {
  let {wechatAccount} = this.props
  let updateData = {
      ...wechatAccount,
      ...this.props.form.getFieldsValue()
}
this.props.actions.updateWechatAccountStart(updateData)
  }

_handleSubmit = (e) => {
  e.preventDefault()
  if (this.state.type === 'ADD')
    this._handleAdd()

  if (this.state.type === 'EDIT')
    this._handleEdit()
}

componentWillMount() {
  if (this.state.type === 'EDIT')
    this.props.actions.getWechatAccountStart(this.props.params.id)
}
componentWillUnmount() {
  this.props.actions.clearWechatAccount(this.props.wechatAccount)
}


render() {
  const { getFieldDecorator } = this.props.form
  return (
    <Spin spinning={this.props.isLoading}>
      <Form horizontal
        onSubmit={this._handleSubmit}>
        <Form.Item
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          label="名称"
          hasFeedback
          className='edit-input'
          >
          {
            getFieldDecorator('Name', {
              rules: [{ required: true, message: '必填' }]
            })(
              <Input />
              )
          }
        </Form.Item>
        <Form.Item
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          label="AppID"
          hasFeedback
          className='edit-input'
          >
          {getFieldDecorator('AppId', {
            rules: [{ required: true, message: '必填' }]

          })(
            <Input />
            )}
        </Form.Item>
        <Form.Item
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          label="AppSecret"
          hasFeedback
          className='edit-input'
          >
          {getFieldDecorator('AppSecret', {
            rules: [{ required: true, message: '必填' }]
          })(
            <Input />
            )}
        </Form.Item>
        <Form.Item
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          label="Token"
          hasFeedback
          className='edit-input'
          >
          {getFieldDecorator('Token', {
            rules: [{ required: true, message: '必填' }]
          })(
            <Input />
            )}
        </Form.Item>
        <Form.Item
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          label="EncodingAESKey"
          hasFeedback
          className='edit-input'
          >
          {getFieldDecorator('EncodingAESKey', {})(
            <Input type="textarea" rows={4} />
          )}
        </Form.Item>
        <Form.Item className='submit-btn'>
          <Button type="primary" htmlType="submit">保存</Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}
}


function mapStateToProps(state, ownProps) {
  return {
    ...state.rootReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WechatAccountEditView)