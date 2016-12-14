import React, { Component } from 'react'
import { Table, Modal, message } from 'antd'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ListEdit from '../components/hoc/listEdit.jsx'
import actions from '../actions'


const { Column } = Table

class WxKeyListView extends Component {
  _commandColRender = (text, record) => (
    <span>
      <Link to={{
        pathname: `${this.props.location.pathname}/Edit/${record.Id}`,
        state: {
          showModal: true,
          returnTo: this.props.location.pathname
        }
      }}> 编辑</Link>
    </span>
  )

  _initListData = () => {
    this.props.actions.getWechatAccountListStart()
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
        <Table dataSource={this.props.wechatAccountList} bordered>
          <Column
            title="Name"
            dataIndex="Name"
            key="Name"
            />
          <Column
            title="AppId"
            dataIndex="AppId"
            key="AppId"
            />
          <Column
            title="AppSecret"
            dataIndex="AppSecret"
            key="AppSecret"
            />
          <Column
            title="操作"
            key="action"
            render={this._commandColRender}
            />
        </Table>
        <Modal
          visible={this.props.showModal}
          title="编辑微信账户信息"
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
    ...state.rootReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEdit(WxKeyListView))