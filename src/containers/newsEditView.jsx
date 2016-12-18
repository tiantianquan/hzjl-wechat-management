import React, { Component } from 'react';
import { Form, Input, Spin, Button, Select } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'
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
class NewsEditView extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      type: props.location.state.type,
      selectWechatAccountId: this.props.edit.EditData.WechatAccountId
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
  _handleContentCopyChange = (e) => {
    console.log(e.target.value)
    this.props.form.setFieldsValue({
      content: e.target.value
    })
  }

  _handleWechatAccountSelectChange = (value,option) => {
    this.setState({
      ...this.state,
      selectWechatAccountId: value
    })

    this.props.form.setFieldsValue({
      CategoryId: null
    })

    console.log(option)
  }

  _renderCategroyOptions = () => {
    return this.props.edit.CategoryList
      .map(c => {
        if (c.WechatAccountId == this.state.selectWechatAccountId)
          return (
            <Select.Option key={c.Id}>{c.Name}</Select.Option>
          )
      }).filter(i => !!i)
  }

  _renderCityForm = () => {
    const { getFieldDecorator } = this.props.form
    if (this.state.selectWechatAccountId == 1) {
      return (<Form.Item
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        label="城市"
        hasFeedback
        className='edit-input'
        >
        {getFieldDecorator('CityId', {
          // rules: [{ required: true, message: '必填' }]
        })(
          <Select allowClear={true}>
            {this.props.edit.CityList.map(i => <Select.Option key={i.Id}>{i.Name}</Select.Option>)}
          </Select>
          )}
      </Form.Item>)
    }
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
            label="标题"
            hasFeedback
            className='edit-input'
            >
            {
              getFieldDecorator('title', {
                rules: [{ required: true, message: '必填' }]
              })(
                <Input />
                )
            }
          </Form.Item>
          <Form.Item
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            label="描述"
            hasFeedback
            className='edit-input'
            >
            {
              getFieldDecorator('digest', {
                rules: [{ required: true, message: '必填' }]
              })(
                <Input type="textarea" rows={4} />
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
            {getFieldDecorator('WechatAccountI', {
              rules: [{ required: true, message: '必填' }],
            })(
              <Select onSelect={this._handleWechatAccountSelectChange}>
                {
                  this.props.edit.WechatAccountList
                    .map(w => <Select.Option bindItem={w} key={w.Id}>{w.Name}</Select.Option>)
                }
              </Select>

              )}
          </Form.Item>
          <Form.Item
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            label="分类"
            hasFeedback
            className='edit-input'
            >
            {getFieldDecorator('CategoryId', {
              rules: [{ required: true, message: '必填' }]
            })(
              <Select>
                {this._renderCategroyOptions()}
              </Select>
              )}
          </Form.Item>

          {this._renderCityForm()}

          <Form.Item
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            label="正文内容"
            hasFeedback
            className='edit-input'
            >
            {
              getFieldDecorator('content', {
                rules: [{ required: true, message: '必填' }]
              })(
                <Input type="textarea" rows={4} readOnly={true} />
                // <div contentEditable={true}></div>
                )
            }
          </Form.Item>
          <Form.Item
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            label="复制窗口"
            hasFeedback
            className='edit-input'
            >
            <ContentEditable onChange={this._handleContentCopyChange} />
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
    ...state.news,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions.news, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailEdit(NewsEditView))