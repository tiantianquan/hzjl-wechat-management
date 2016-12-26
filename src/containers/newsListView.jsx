import React, { Component } from 'react'
import { Table, Modal, message, Button } from 'antd'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ListEdit from '../components/hoc/listEdit.jsx'
import actions from '../actions'


const { Column } = Table

class NewsListView extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      pagination: {}
    }
  }


  _commandColRender = (text, record) => (
    <span>
      <Link to={{
        pathname: `${this.props.location.pathname}/Edit/${record.Id}`,
        state: {
          showModal: true,
          returnTo: this.props.location.pathname,
          modalTitle: '编辑图文消息',
          type: 'EDIT'
        }
      }}> 编辑</Link>
      <span className="ant-divider" />
      <a onClick={() => this._handleDeleteBtnClick(record.Id)}>刪除</a>
    </span>
  )

  _titleColRender = (text, record) => (
    <a href={record.url} target="blank">
      {text}
    </a>
  )

  _handleDeleteBtnClick = (id) => {
    this.props.actions.deleteStart(id)
  }

  _initListData = () => {
    this.props.actions.getListStart({ pageSize: 10, pageNum: 1 })
  }

  _handleAddBtnClick = () => {
    let {router} = this.props
    router.push({
      pathname: `${this.props.location.pathname}/Add`,
      state: {
        showModal: true,
        returnTo: this.props.location.pathname,
        modalTitle: '新增图文消息',
        type: 'ADD'
      }
    })

  }

  _handleTableChange = (pagination, filters, sorter) => {
    const pager = this.state.pagination
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })

    this.props.actions.getListStart({
      pageSize: pagination.pageSize,
      pageNum: pagination.current,
      sortItem: {
        sortField: sorter.field,
        sortOrder: sorter.order
      },
      filterItem: {
        ...filters
      }
    })
  }

  _createFilter = (filterlist) => {
    return filterlist.map(i => {
      return { text: i.Name, value: i.Name }
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

    if (nextProps.list.TotalCount !== this.props.list.TotalCount) {
      this.setState({
        pagination: { ...this.state.pagination, total: nextProps.list.TotalCount }
      })
    }
  }

  render() {
    return (
      <div>
        <div className='add-btn'>
          <Button type="primary" onClick={this._handleAddBtnClick}>新增</Button>
        </div>
        <Table dataSource={this.props.list.ListData}
          pagination={this.state.pagination}
          loading={this.props.isLoading}
          onChange={this._handleTableChange}
          bordered>
          <Column width="20%"
            title="标题"
            dataIndex="title"
            key="title"
            render={this._titleColRender}
            />
          <Column width="40%"
            title="描述"
            dataIndex="digest"
            key="digest"
            />
          <Column
            filters={this._createFilter(this.props.list.WechatAccountList)}
            title="所属微信账户"
            dataIndex="WechatAccountName"
            key="WechatAccountName"
            sorter={true}
            />
          <Column
            filters={this._createFilter(this.props.list.CategoryList)}
            sorter={true}
            title="分类"
            dataIndex="CategoryName"
            key="CategoryName"
            />
          <Column
            filters={this._createFilter(this.props.list.CityList)}
            sorter={true}
            title="城市"
            dataIndex="CityName"
            key="CityName"
            />
          {/*<Column
            title="发布状态"
            dataIndex="PublishStateName"
            key="PublishStateName"
            />*/}
          <Column
            title="创建时间"
            dataIndex="CreateTime"
            key="CreateTime"
            sorter={true}
            render={this.props.handleDateColumnRender}
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
          width={1000}
          >
          {this.props.children}
        </Modal>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListEdit(NewsListView))