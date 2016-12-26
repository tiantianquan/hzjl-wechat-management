import React, { Component } from 'react'
import { Table, Modal, message, Button } from 'antd'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ListEdit from '../components/hoc/listEdit.jsx'
import actions from '../actions'


const { Column } = Table

class CategoryListView extends Component {
  _commandColRender = (text, record) => (
    <span>
      <Link to={{
        pathname: `${this.props.location.pathname}/Edit/${record.Id}`,
        state: {
          showModal: true,
          returnTo: this.props.location.pathname,
          modalTitle: '编辑分类',
          type: 'EDIT'
        }
      }}> 编辑</Link>
      <span className="ant-divider" />
      <a onClick={() => this._handleDeleteBtnClick(record.Id)}>刪除</a>
    </span>
  )

  _handleDeleteBtnClick = (id) => {
    this.props.actions.deleteStart(id)
  }

  _initListData = () => {
    this.props.actions.getListStart()
  }

  _handleAddBtnClick = () => {
    let {router} = this.props
    router.push({
      pathname: `${this.props.location.pathname}/Add`,
      state: {
        showModal: true,
        returnTo: this.props.location.pathname,
        modalTitle: '新增分类',
        type: 'ADD'
      }
    })

  }

  componentWillMount() {
    this._initListData()
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.msg.haveShow) {
      if (nextProps.msg.State === true) {
        message.success(nextProps.msg.Content)
        this.props.handleCancel()
        this._initListData()
      }
      if (nextProps.msg.State === false) {
        message.error(nextProps.msg.Content)
      }
      this.props.actions.updateMsgShowState(true)
    }
  }

  render() {
    return (
      <div>
        <div className='add-btn'>
          <Button type="primary" onClick={this._handleAddBtnClick}>新增</Button>
        </div>
        <Table dataSource={this.props.list} 
        loading={this.props.isLoading}
        bordered>
          <Column
            title="名称"
            dataIndex="Name"
            key="Name"
            />
          <Column
            title="所属微信账户"
            dataIndex="WechatAccountName"
            key="AppId"
            />
          <Column
            title="操作"
            key="action"
            render={this._commandColRender}
            />
        </Table>
        <Modal
          visible={this.props.showModal}
          title={this.props.modalTitle}
          // onOk={this.handleOk}
          onCancel={this.props.handleCancel}
          footer={null}
          maskClosable={false}
          >
          {this.props.children}
        </Modal>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListEdit(CategoryListView))