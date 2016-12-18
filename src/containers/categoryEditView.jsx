import React, { Component } from 'react';
import { Form, Input, Spin, Button, Select } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DetailEdit from '../components/hoc/detailEdit.jsx'

import actions from '../actions'

@Form.create({
  mapPropsToFields(props) {
    let formData = {}
    for (var k in props.edit.EditData) {
      if (props.edit.EditData.hasOwnProperty(k)) {
        formData[k] = {
          value: props.edit.EditData[k]
        }
      }
    }
    return formData
  }
})
@DetailEdit
class CategoryEditView extends Component {
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
    this.props.actions.addStart(addData)
  }

  _handleEdit = () => {
    let {EditData} = this.props.edit
    let updateData = {
      ...EditData,
      ...this.props.form.getFieldsValue()
    }
    this.props.actions.updateStart(updateData)
  }

  _handleSubmit = (e) => {
    if (this.state.type === 'ADD')
      this.props.handleSubmit(e, this._handleAdd)

    if (this.state.type === 'EDIT')
      this.props.handleSubmit(e, this._handleEdit)
  }

  componentWillMount() {
    if (this.state.type === 'EDIT')
      this.props.actions.getStart(this.props.params.id)
    else
      this.props.actions.getStart(0)
  }
  componentWillUnmount() {
    this.props.actions.clear(this.props.edit)
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
            label="所属微信账户"
            hasFeedback
            className='edit-input'
            >
            {getFieldDecorator('WechatAccountId', {
              //  initialValue:1
            })(
              <Select>
                {
                  this.props.edit.WechatAccountList
                    .map(w => <Select.Option key={w.Id} value={w.Id}>{w.Name}</Select.Option>)
                }
              </Select>

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
    ...state.category,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions.category, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailEdit(CategoryEditView))