import React, { Component } from 'react';
import { Form, Input, Spin, Button, Select, Upload, Icon, message } from 'antd'
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
          value: typeof (props.edit.EditData[k]) === 'number' ? props.edit.EditData[k].toString() : props.edit.EditData[k]
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
      selectCategory: {},
      contentCopy: '',
      thumbImg: null
    }
  }

  _handleValidate = () => {
    if (!this.state.thumbImg) {
      message.info('请上传图片')
      return false
    }
    if (this.state.thumbImg === 'uploading') {
      message.info('图片上传中')
      return false
    }
    return true
  }

  _handleAdd = () => {
    let addData = {
      ...this.props.form.getFieldsValue(),
      UploadThumbImgId: this.state.thumbImg.response.Data.Id
    }
    this.props.actions.addStart(addData)
  }

  _handleEdit = () => {
    let {EditData} = this.props.edit
    let updateData = {
      ...EditData,
      ...this.props.form.getFieldsValue(),
      UploadThumbImgId: this.state.thumbImg.response.Data.Id
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
    this.setState({
      ...this.state,
      contentCopy: e.target.value
    })
    this.props.form.setFieldsValue({
      content: e.target.value
    })
  }

  _handleContentCopyClearBtn = (e) => {
    this.setState({
      ...this.state,
      contentCopy: ''
    })
    this.props.form.setFieldsValue({
      content: ''
    })
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
            <Select.Option bindItem={c} key={c.Id} value={c.Id.toString()}>{c.Name}</Select.Option>
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
            {this.props.edit.CityList.map(i => <Select.Option key={i.Id} value={i.Id.toString()}>{i.Name}</Select.Option>)}
          </Select>
          )}
      </Form.Item>)
    }
  }

  _handleUploadThumbImgChange = (item) => {
    switch (item.file.status) {
      case 'error':
        this.setState({
          ...this.state,
          thumbImg: null
        })
        message.error(item.file.response.Content)
        break
      case 'done':
        this.setState({
          ...this.state,
          thumbImg: item.file
        })
        message.success(item.file.response.Content)
        break
      case 'uploading':
        this.setState({
          ...this.state,
          thumbImg: item.file
        })
        break
      case 'removed':
        this.setState({
          ...this.state,
          thumbImg: null
        })
        break
      default:
        break
    }
  }

  _handleUploadThumbImgRemove = (file) => {
    // this.setState({
    //   thumbImg: null
    // })
  }

  _formatThumbImgObj = (serverThumImg) => {
    if (!!serverThumImg)
      return {
        uid: serverThumImg.Id,
        name: serverThumImg.OriginFileName,
        status: 'done',
        url: serverThumImg.Path,
        response: {
          Data: serverThumImg
        }
      }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit.EditData.WechatAccountId !== this.props.edit.EditData.WechatAccountId
      || nextProps.edit.EditData.CategoryId !== this.props.edit.EditData.CategoryId
      || nextProps.edit.EditData.content !== this.props.edit.EditData.content
      || nextProps.edit.ThumbImg !== this.props.edit.ThumbImg)
      this.setState({
        ...this.state,
        contentCopy: nextProps.edit.EditData.content,
        selectWechatAccount: nextProps.edit.WechatAccountList
          .filter(i => i.Id === nextProps.edit.EditData.WechatAccountId)[0] || {},
        selectCategory: nextProps.edit.CategoryList
          .filter(i => i.Id === nextProps.edit.EditData.CategoryId)[0] || {},
        thumbImg: this._formatThumbImgObj(nextProps.edit.ThumbImg)
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
            label="上传题图"
            hasFeedback
            className='edit-input'
            >
            <Upload
              action="/api/News/UploadThumbImg"
              listType="picture-card"
              fileList={!!this.state.thumbImg ? [this.state.thumbImg] : []}
              // onPreview={this.handlePreview}
              onChange={this._handleUploadThumbImgChange}
              onRemove={this._handleUploadThumbImgRemove}
              >
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
              </div>
            </Upload>
          </Form.Item>


          <Form.Item
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            label="所属微信账户"
            hasFeedback
            className='edit-input'
            >
            {getFieldDecorator('WechatAccountId', {
              rules: [{ required: true, message: '必填' }],
            })(
              <Select onSelect={this._handleWechatAccountSelectChange}>
                {
                  this.props.edit.WechatAccountList
                    .map(w => <Select.Option bindItem={w} key={w.Id} value={w.Id.toString()}>{w.Name}</Select.Option>)
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
                <Input placeholder="请在复制区域粘贴微信内容" type="textarea" rows={4} readOnly={true} />
                )
            }
          </Form.Item>

          <Form.Item className='submit-btn'>
            {/*<Button className='submit-btn-item' htmlType="submit">保存草稿</Button>*/}
            <Button className='submit-btn-item' type="primary" htmlType="submit">发布到微信</Button>
          </Form.Item>

          <Form.Item
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            label="复制区域"
            hasFeedback
            className='edit-input'
            >
            <ContentEditable className={'content-copy'} html={this.state.contentCopy} onChange={this._handleContentCopyChange} />
            <Button onClick={this._handleContentCopyClearBtn} type="default" className={'content-copy-clear-btn'} htmlType="button">清除</Button>
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