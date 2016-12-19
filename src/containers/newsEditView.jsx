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
      // selectWechatAccount: this.props.edit.EditData.WechatAccountId
      // selectWechatAccount:this.props.edit.WechatAccountList.filter(i=>i.Id===this.props.edit.EditData.WechatAccountId)
      selectWechatAccount: {},
      selectCategory: {}
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
    this.props.form.setFieldsValue({
      content: e.target.value
    })
  }

  _handleContentChange = (value)=>{
    console.log(1)
  }

  _handleWechatAccountSelectChange = (value, option) => {
    this.setState({
      ...this.state,
      selectWechatAccount: option.props.bindItem
    })

    this.props.form.setFieldsValue({
      CategoryId: null
    })

  }

  _handleCategorySelectChange = (value, option) => {
    this.setState({
      ...this.state,
      selectCategory: option.props.bindItem
    })

  }

  _renderCategroyOptions = () => {
    return this.props.edit.CategoryList
      .map(c => {
        if (c.WechatAccountId == this.state.selectWechatAccount.Id)
          return (
            <Select.Option bindItem={c} key={c.Id} value={c.Id}>{c.Name}</Select.Option>
          )
      }).filter(i => !!i)
  }

  _renderCityForm = () => {
    const { getFieldDecorator } = this.props.form
    if (!!this.state.selectCategory.HaveCity) {
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
            {this.props.edit.CityList.map(i => <Select.Option key={i.Id} value={i.Id}>{i.Name}</Select.Option>)}
          </Select>
          )}
      </Form.Item>)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit.EditData.WechatAccountId !== this.props.edit.EditData.WechatAccountId
      || nextProps.edit.EditData.CategoryId !== this.props.edit.EditData.CategoryId)
      this.setState({
        ...this.state,
        selectWechatAccount: nextProps.edit.WechatAccountList
          .filter(i => i.Id === nextProps.edit.EditData.WechatAccountId)[0] || {},
        selectCategory: nextProps.edit.CategoryList
          .filter(i => i.Id === nextProps.edit.EditData.CategoryId)[0] || {}
      })
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
            {getFieldDecorator('WechatAccountId', {
              rules: [{ required: true, message: '必填', type: 'number' }],
            })(
              <Select onSelect={this._handleWechatAccountSelectChange}>
                {
                  this.props.edit.WechatAccountList
                    .map(w => <Select.Option bindItem={w} key={w.Id} value={w.Id}>{w.Name}</Select.Option>)
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
              rules: [{ required: true, message: '必填', type: 'number' }]
            })(
              <Select onSelect={this._handleCategorySelectChange}>
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
                rules: [{ required: true, message: '必填' }],
                
              })(
                <Input onChange={this._handleContentChange} type="textarea" rows={4} readOnly={true} />
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
            <ContentEditable ref='contentCopy' onChange={this._handleContentCopyChange} />
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