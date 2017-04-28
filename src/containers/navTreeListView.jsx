import React, { Component } from 'react'
import { Tree, message, Button } from 'antd'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import actions from '../actions'


const { TreeNode } = Tree

class NavListView extends Component {
  constructor(props) {
    super(props)
    const keys = this.props.keys
    this.state = {
      defaultExpandedKeys: keys,
      defaultSelectedKeys: keys,
      defaultCheckedKeys: keys,
    }
  }
  static defaultProps = {
    keys: ['0-0-0', '0-0-1']
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
        modalTitle: '新增导航',
        type: 'ADD'
      }
    })
  }

  _renderTreeNode = (data)=>{
    data.map((item)=>{
      return <TreeNode title={item.Name} key={item.Id} />
    })
  }


  render() {


    return (
      <div>
        <div className='add-btn'>
          <Button type="primary" onClick={this._handleAddBtnClick}>新增</Button>
        </div>
        <Tree className="myCls" showLine checkable
          defaultExpandedKeys={this.state.defaultExpandedKeys}
          defaultSelectedKeys={this.state.defaultSelectedKeys}
          defaultCheckedKeys={this.state.defaultCheckedKeys}
          onSelect={this.onSelect} onCheck={this.onCheck}
          >
          <TreeNode title="parent 1" key="0-0">
            <TreeNode title="parent 1-0" key="0-0-0" disabled>
              <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
              <TreeNode title="leaf" key="0-0-0-1" />
            </TreeNode>
            <TreeNode title="parent 1-1" key="0-0-1">
              <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key="0-0-1-0" />
            </TreeNode>
          </TreeNode>
        </Tree>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...state.nav,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions.nav, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavListView)